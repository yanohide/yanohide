"""書評記事の文体を確認する（AIっぽい単調さ・定型表現・他記事との重複）。

Usage: python3 check_style.py articles/book-review/<slug>.md

見るもの（本文のみ。表・見出し・引用・リンク・誘導ボックス・参考情報は対象外）:
  1. 文末の単調さ  … 同じ文末が3文以上続く箇所
  2. 文の長さ      … 短文（25字以下）の割合と、長さのばらつき
  3. 接続詞        … 「しかし」「また」などで始まる文が、見出しごとに1個までか
  3b. ひとりごと   … 本文のある見出しに、段落全体を太字にしたひとりごとが1つずつあるか
  3c. 読みやすさ   … 1段落3文まで・漢字35%以下・あおり言葉なし
  3d. 吹き出し     … 読者と筆者のやりとりが2〜3組あるか
  4. 定型表現      … AIの文章に多い決まり文句
  5. 他記事との重複 … 他の書評記事とまったく同じ文（共通の誘導ボックス等は除く）
"""
import glob
import os
import re
import statistics
import sys

path = sys.argv[1]
raw = open(path, encoding="utf-8").read()
body = raw.split("\n---\n", 1)[-1]

# 誘導ボックス・プライムの囲み・参考情報・署名など、全記事共通の部分は除く
for marker in ("👇", "💡 **Kindle", "🎁", "### この記事を書いた人", "### 参考情報"):
    body = re.sub(rf"{re.escape(marker)}.*?(?=\n---\n|\Z)", "", body, flags=re.S)


SPEECH_META = re.compile(r"^(speaker|side|tone|avatarUrl)\s*:")


def sentences_of(text):
    lines = []
    for line in text.split("\n"):
        s = line.strip()
        if not s or s.startswith(("|", "#", ">", "<!--", "👉", "※", "---", "![", ":::")) or SPEECH_META.match(s):
            continue
        s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)
        s = re.sub(r"^([-*]|\d+\.)\s*|\*\*", "", s)
        lines.append(s)
    out = []
    for s in lines:
        out += [x + "。" for x in re.split(r"(?<=[。？！])", s) if x.strip()]
    return [re.sub(r"。。$", "。", x).strip() for x in out if len(x.strip()) > 1]


sents = sentences_of(body)
warn = 0


def ending(s):
    s = re.sub(r"[。？！」』）)]+$", "", s)
    for pat in ("ます", "ました", "です", "でした", "でしょう", "ません", "ください", "ない", "た", "る"):
        if s.endswith(pat):
            return pat
    return "その他"


# 1. 文末の単調さ
run, prev, runs = 1, None, []
for s in sents:
    e = ending(s)
    run = run + 1 if (e == prev and e != "その他") else 1
    if run == 3:
        runs.append((e, s[:30]))
    prev = e
print(f"■ 文末の単調さ：同じ文末が3文以上続く箇所 {len(runs)}件")
for e, s in runs[:8]:
    print(f"   「〜{e}」が続く：{s}…")
if len(runs) > 3:
    warn += 1

# 2. 文の長さ
lens = [len(s) for s in sents]
short = sum(1 for n in lens if n <= 25) / len(lens)
sd = statistics.pstdev(lens)
print(f"■ 文の長さ：平均{statistics.mean(lens):.0f}字／ばらつき{sd:.1f}／短文の割合{short:.0%}（目安：短文15%以上・ばらつき8以上）")
if short < 0.15 or sd < 8:
    warn += 1

# 3. 接続詞（1つの見出しに1個まで）
conj_strong = ("そして", "しかし", "けれども", "だから", "したがって", "さらに", "一方で", "このように", "そのため",
               "加えて", "ところが", "それでも", "要するに", "ちなみに", "なお、", "だけど", "それなのに")
conj_comma = ("また", "ただ", "でも", "では", "まず", "まずは", "つまり", "むしろ", "逆に", "実は", "じつは", "それに",
              "さて", "そこで", "次に", "最後に", "すると", "じゃあ", "だが", "けれど", "とはいえ", "もっとも")


def is_conj(s):
    return s.startswith(conj_strong) or any(s.startswith(c + "、") for c in conj_comma)


sections = re.split(r"\n(?=#{2,3} )", body)
total, over = 0, []
for sec in sections:
    title = sec.strip().split("\n", 1)[0][:30]
    n = sum(1 for s in sentences_of(sec) if is_conj(s))
    total += n
    if n > 1:
        over.append((title, n))
print(f"■ 接続詞で始まる文：{total}文（目安：1つの見出しに1個まで）")
for title, n in over:
    print(f"   {n}個：{title}")
if over:
    warn += 1

# 3b. ひとりごと（本文のある見出しに1つ、段落全体を太字にした40〜100字の段落）
ASIDE = re.compile(r"^\*\*([^*]{30,})\*\*$")

skip_titles = ("本の概要", "よくある質問", "参考情報", "この記事を書いた人")
missing, extra, badlen = [], [], []
for sec in sections:
    lines = sec.strip().split("\n")
    title = lines[0]
    if not title.startswith("#") or any(t in title for t in skip_titles):
        continue
    asides = [ASIDE.match(l.strip()).group(1) for l in lines[1:] if ASIDE.match(l.strip())]
    prose = [l for l in lines[1:] if l.strip() and not l.strip().startswith(("|", "-", "*", ">", "!", "<", "※", "👉", ":::"))
             and not SPEECH_META.match(l.strip())
             and not re.match(r"^\d+\.", l.strip()) and "{{" not in l]
    if not asides and len(prose) >= 2:
        missing.append(title[:30])
    if len(asides) > 1:
        extra.append(title[:30])
    badlen += [a[:20] for a in asides if not 40 <= len(a) <= 100]
print(f"■ ひとりごと：なし{len(missing)}見出し／2つ以上{len(extra)}見出し／字数外{len(badlen)}件（目安：本文のある見出しに1つ・40〜100字）")
for t in missing:
    print(f"   なし：{t}")
for t in extra:
    print(f"   2つ以上：{t}")
for a in badlen:
    print(f"   字数外：{a}…")
if missing or extra or badlen:
    warn += 1

# 3c. 読みやすさ（段落の文数・漢字の割合・あおり言葉）
long_paras = []
for line in body.split("\n"):
    s = line.strip()
    if not s or s.startswith(("|", "#", ">", "<!--", "👉", "※", "---", "![", "-", "*", "（", ":::")) or re.match(r"^\d+\.", s) or SPEECH_META.match(s):
        continue
    n = len([x for x in re.split(r"(?<=[。？！])", s) if x.strip()])
    if n >= 4:
        long_paras.append(s[:25])
text = "".join(sents)
jp = re.findall(r"[\u3040-\u30ff\u4e00-\u9fff]", text)
kanji = re.findall(r"[\u4e00-\u9fff]", text)
ratio = len(kanji) / max(1, len(jp))
hype = [w for w in ("神本", "絶対読むべき", "必読", "人生が変わる", "最強", "読まないと損") if w in body]
print(f"■ 読みやすさ：4文以上の段落{len(long_paras)}個／漢字の割合{ratio:.0%}（目安35%以下）／あおり言葉{len(hype)}個")
for s in long_paras[:5]:
    print(f"   4文以上：{s}…")
for w in hype:
    print(f"   あおり言葉：「{w}」")
if long_paras or ratio > 0.35 or hype:
    warn += 1

# 3d. 吹き出し（:::speech。読者と筆者のやりとりを2〜3組）
speeches = re.findall(r":::speech\s*\n(.*?)\n:::", body, flags=re.S)
reader = sum(1 for s in speeches if re.search(r"^speaker:\s*読者", s, flags=re.M))
author = sum(1 for s in speeches if re.search(r"^speaker:\s*矢野英人", s, flags=re.M))
other = len(speeches) - reader - author
print(f"■ 吹き出し：{len(speeches)}個（読者{reader}・筆者{author}・その他{other}）（目安：やりとり2〜3組＝4〜6個）")
if not 4 <= len(speeches) <= 6 or other:
    warn += 1

# 4. 定型表現
stock = ["いかがでしたか", "と言えるでしょう", "ではないでしょうか", "することが重要です", "について解説します",
         "結論から言うと", "まとめると", "さまざまな", "といっても過言ではありません", "必見", "徹底解説",
         "ことができます", "と言えます", "非常に", "深く考えさせられ"]
found = {w: body.count(w) for w in stock if body.count(w)}
print("■ 定型表現：" + ("なし" if not found else "、".join(f"「{w}」×{n}" for w, n in found.items())))
if sum(found.values()) > 5:
    warn += 1

# 4b. 感想の優等生フレーズ（きれいごとの決意表明・抽象語）
imp = re.search(r"^## [^\n]*(?:感想|医療・介護|医療従事者)[^\n]*\n(.*?)\n---", body, flags=re.S | re.M)
if imp:
    goody = ["改めて", "気づかされ", "大切にしたい", "寄り添", "その人らしさを支え", "胸が熱く",
             "希望を感じ", "たいものです", "心に刻", "忘れずにいたい"]
    gfound = {w: imp.group(1).count(w) for w in goody if imp.group(1).count(w)}
    print("■ 感想の優等生フレーズ：" + ("なし" if not gfound else "、".join(f"「{w}」×{n}" for w, n in gfound.items())))
    if sum(gfound.values()) > 1:
        warn += 1

# 5. 他記事との重複
mine = {s for s in sents if len(s) >= 25}
dups = []
for other in glob.glob(os.path.join(os.path.dirname(path), "*.md")):
    if os.path.abspath(other) == os.path.abspath(path):
        continue
    o = open(other, encoding="utf-8").read().split("\n---\n", 1)[-1]
    for m in ("👇", "💡 **Kindle", "🎁", "### この記事を書いた人", "### 参考情報"):
        o = re.sub(rf"{re.escape(m)}.*?(?=\n---\n|\Z)", "", o, flags=re.S)
    common = mine & set(sentences_of(o))
    dups += [(os.path.basename(other), s) for s in common]
print(f"■ 他記事とまったく同じ文：{len(dups)}文")
for f, s in dups[:8]:
    print(f"   {f}：{s[:40]}…")
if dups:
    warn += 1

# 6. 他記事と同じ見出し（定番見出しは除く）
STANDARD = {"はじめに", "まとめ", "よくある質問", "参考情報", "本の概要", "あらすじ", "この本の内容",
            "主な登場人物", "この本に登場するキーワード", "この記事を書いた人", "こんな人に読んでほしい"}
def heads(text):
    return {re.sub(r"^#+\s*", "", l).strip() for l in text.split("\n") if re.match(r"^#{2,3}\s", l)} - STANDARD
my_heads = heads(raw)
same_heads = []
for other in glob.glob(os.path.join(os.path.dirname(path), "*.md")):
    if os.path.abspath(other) != os.path.abspath(path):
        same_heads += [(os.path.basename(other), h) for h in my_heads & heads(open(other, encoding="utf-8").read())]
print(f"■ 他記事と同じ見出し：{len(same_heads)}件")
for f, h in same_heads[:8]:
    print(f"   {f}：{h}")
if same_heads:
    warn += 1

# 7. 書いた人・要確認
print("■ 「この記事を書いた人」：" + ("あり" if "この記事を書いた人" in raw else "なし（追加する）"))
if "この記事を書いた人" not in raw:
    warn += 1
print(f"■ 【要確認】の残り：{raw.count('【要確認')}件（公開前に本人が解消）")

print("STYLE OK" if warn == 0 else f"STYLE 要見直し {warn}項目")
