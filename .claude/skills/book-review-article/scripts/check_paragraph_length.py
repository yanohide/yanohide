"""書評記事の各段落（空行で区切られた1行）が120字未満かを確認する。

Usage: python3 check_paragraph_length.py articles/book-review/<slug>.md
表・見出し・HTMLコメントは対象外。リンクURLと太字記号は字数に含めない。
"""
import re
import sys

text = open(sys.argv[1], encoding="utf-8").read().split("\n---\n", 1)[-1]
over = 0
for line in text.split("\n"):
    s = line.strip()
    if not s or s.startswith(("|", "#", "<!--")):
        continue
    body = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)
    body = re.sub(r"^[-*>]\s*|\*\*", "", body)
    if len(body) >= 120:
        over += 1
        print(f"{len(body)}字: {body[:40]}…")
plain = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", re.sub(r"<!--.*?-->", "", text, flags=re.S))
plain = re.sub(r"^(#+|>|[-*]|\d+\.)\s*|\*\*|\||^-{3,}$", "", plain, flags=re.M)
plain = re.sub(r"^:?-{3,}:?$", "", plain.replace(":", ":"), flags=re.M)
total = len("".join(plain.split()))
m = re.search(r"## 感想.*?\n(.*?)\n---", text, flags=re.S)
impression = len("".join(re.sub(r"\*\*|\]\([^)]*\)|\[", "", m.group(1)).split())) if m else 0
print(f"記事全体：約{total}字（目安4,500〜5,500字）／感想：約{impression}字（目安800〜1,000字）")
print("OK" if over == 0 else f"{over}か所が120字以上")
sys.exit(1 if over else 0)
