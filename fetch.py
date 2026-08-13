#!/usr/bin/env python3
"""拉取双色球/大乐透历史数据, 多源 fallback, 按期号合并去重, 输出到 --out 目录.

源顺序: 官方接口优先, 失败自动切换 GitHub 现成数据(yangxb919/lottery-data).
首次自动全量, 之后官方源增量(最近100期); 备源总是全量(单次请求).
"""
import argparse
import json
import os
import sys
import urllib.request
from functools import partial

UA = {"User-Agent": "Mozilla/5.0"}


def _open(req):
    # macOS 上 urllib 不读环境代理, 手动挂上; Actions 上无代理则为直连
    proxies = {k: v for k, v in (("http", os.environ.get("http_proxy")),
                                 ("https", os.environ.get("https_proxy"))) if v}
    opener = urllib.request.build_opener(urllib.request.ProxyHandler(proxies))
    for attempt in range(3):
        try:
            return opener.open(req, timeout=30)
        except Exception:
            if attempt == 2:
                raise


def _norm_issue(i):
    return "20" + i if len(i) == 5 else i  # 第三方源期号 "26092" -> "2026092"


def _norm_date(d):
    return d.split("(")[0]  # 官方源 "2026-08-11(二)" -> "2026-08-11"


def _paginate(url, headers, parse, max_pages, page_size=100):
    rows = []
    for page in range(1, max_pages + 1):
        req = urllib.request.Request(f"{url}&pageNo={page}&pageSize={page_size}", headers=headers)
        batch = parse(json.load(_open(req)))
        if not batch:
            break
        rows += batch
    return rows


# ---- 官方源 ----
def cwl(full):
    url = "https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&systemType=PC"
    headers = {**UA, "Referer": "https://www.cwl.gov.cn/ygkj/wqkjgg/ssq/"}
    parse = lambda d: [{"issue": r["code"], "date": _norm_date(r["date"]),
                        "balls": r["red"].split(","), "special": [r["blue"]]} for r in d["result"]]
    return _paginate(url, headers, parse, 999 if full else 1)


def sporttery(full):
    url = "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&isVerify=1"
    parse = lambda d: [{"issue": r["lotteryDrawNum"], "date": _norm_date(r["lotteryDrawTime"]),
                        "balls": r["frontWinningNum"].split(), "special": r["backWinningNum"].split()}
                       for r in d["value"]["list"]]
    return _paginate(url, UA, parse, 999 if full else 1)


# ---- 备源: GitHub 现成数据(yangxb919/lottery-data, 每日自动更新) ----
def github(game, full):
    url = f"https://raw.githubusercontent.com/yangxb919/lottery-data/main/data/{game}.json"
    data = json.load(_open(urllib.request.Request(url, headers=UA)))
    if game == "ssq":
        return [{"issue": _norm_issue(r["issue"]), "date": _norm_date(r["date"]),
                 "balls": r["red"], "special": r["blue"]} for r in data]
    return [{"issue": _norm_issue(r["issue"]), "date": _norm_date(r["date"]),
             "balls": r["front"], "special": r["back"]} for r in data]


SOURCES = {
    "ssq": [("cwl", cwl), ("github", partial(github, "ssq"))],
    "dlt": [("sporttery", sporttery), ("github", partial(github, "dlt"))],
}


def merge(path, sources, full):
    try:
        old = json.load(open(path, encoding="utf-8"))
    except FileNotFoundError:
        old = []
    by = {r["issue"]: r for r in old}
    for name, fn in sources:
        try:
            rows = fn(full or not old)  # 无旧数据时拉全量
            by.update({r["issue"]: r for r in rows})
            print(f"{path} <- {name}: {len(rows)} 期")
            break
        except Exception as e:
            print(f"  {name} 失败: {e}")
    else:
        raise RuntimeError(f"所有数据源失败: {path}")
    rows = sorted(by.values(), key=lambda r: int(r["issue"]))
    json.dump(rows, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(path, len(rows))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="data")
    ap.add_argument("--full", action="store_true", help="官方源拉全量(默认增量)")
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)
    failed = 0
    for game, path in (("ssq", f"{args.out}/ssq.json"), ("dlt", f"{args.out}/dlt.json")):
        try:
            merge(path, SOURCES[game], args.full)
        except Exception as e:
            failed += 1
            print(f"ERROR {game}: {e}")
    sys.exit(1 if failed == 2 else 0)  # 双源全挂才告警


if __name__ == "__main__":
    main()
