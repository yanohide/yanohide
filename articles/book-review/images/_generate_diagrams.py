import math, os, random
ROOT = "/home/user/yanohide/articles/book-review/images"
INK="#24303d"; MUTED="#6b7685"; A1="#2d6a7a"; A2="#c0603a"; GRID="#e3e8ee"; BG="#ffffff"; SOFT="#eef4f6"; SOFT2="#fbefe9"
def svg(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" font-family="Noto Sans JP, sans-serif"><rect width="{w}" height="{h}" fill="{BG}"/>{body}</svg>'
def T(x,y,s,size=18,fill=INK,anchor="start",weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{s}</text>'
def save(slug,name,content):
    d=os.path.join(ROOT,slug); os.makedirs(d,exist_ok=True)
    open(os.path.join(d,name+".svg"),"w").write(content); print(slug,name)
def path(pts): return "M"+" L".join(f"{x:.1f},{y:.1f}" for x,y in pts)

# 1 禁断の市場: 正規分布 vs 裾の厚い分布
def fat():
    W,H=800,460; x0,x1,yb,yt=60,740,360,70
    def X(v): return x0+(v+5)/10*(x1-x0)
    def Yn(p,pk): return yb-(p/pk)*(yb-yt)
    n=[(v, math.exp(-v*v/2)/math.sqrt(2*math.pi)) for v in [i/20 for i in range(-100,101)]]
    c=[(v, 1/(math.pi*(1+v*v))) for v,_ in n]  # Cauchy as heavy-tail illustration
    pk=max(p for _,p in n)
    b=[f'<line x1="{x0}" y1="{yb}" x2="{x1}" y2="{yb}" stroke="{MUTED}" stroke-width="2"/>']
    b.append(f'<path d="{path([(X(v),Yn(p,pk)) for v,p in n])}" fill="none" stroke="{A1}" stroke-width="4"/>')
    b.append(f'<path d="{path([(X(v),Yn(p,pk)) for v,p in c])}" fill="none" stroke="{A2}" stroke-width="4" stroke-dasharray="10 6"/>')
    for side in (-1,1):
        cx=X(side*3.9); b.append(f'<ellipse cx="{cx:.0f}" cy="{yb-18}" rx="62" ry="30" fill="none" stroke="{A2}" stroke-width="2"/>')
    b.append(T(400,40,"相場の値動きの「ばらつき方」（※イメージ図）",22,INK,"middle",700))
    b.append(T(X(0)+70,Yn(0.33,pk)+10,"教科書の前提（正規分布）",17,A1))
    b.append(T(X(-4.6),yb-60,"大暴落",17,A2)); b.append(T(X(3.4),yb-60,"大暴騰",17,A2))
    b.append(T(400,400,"← 小さな値動き　　ふつう　　大きな値動き →",16,MUTED,"middle"))
    b.append(T(400,440,"点線：実際の市場に近い「裾の厚い」分布。めったに起きないはずの大変動が、思ったより起きる",16,A2,"middle"))
    save("mandelbrot-misbehavior-of-markets","fat-tail",svg(W,H,"".join(b)))
fat()

# 2a ブラック・スワン: 七面鳥の1000日
def turkey():
    W,H=800,440; x0,x1,yb,yt=80,720,350,80
    b=[f'<line x1="{x0}" y1="{yb}" x2="{x1}" y2="{yb}" stroke="{MUTED}" stroke-width="2"/>',f'<line x1="{x0}" y1="{yb}" x2="{x0}" y2="{yt-10}" stroke="{MUTED}" stroke-width="2"/>']
    pts=[]
    for d in range(0,1001,10):
        pts.append((x0+(x1-x0)*d/1000*0.92, yb-(yb-yt)*(1-math.exp(-d/260))))
    b.append(f'<path d="{path(pts)}" fill="none" stroke="{A1}" stroke-width="4"/>')
    lx,ly=pts[-1]; b.append(f'<line x1="{lx:.0f}" y1="{ly:.0f}" x2="{lx+18:.0f}" y2="{yb-4}" stroke="{A2}" stroke-width="5"/>')
    b.append(f'<circle cx="{lx+18:.0f}" cy="{yb-4}" r="7" fill="{A2}"/>')
    b.append(T(400,40,"七面鳥の「安心」は、毎日ふえていく（※イメージ図）",22,INK,"middle",700))
    b.append(T(x0-10,yt+4,"安心感",16,MUTED,"end")); b.append(T(x1,yb+30,"日数 →",16,MUTED,"end"))
    b.append(T(x0+250,yb-110,"毎日エサをもらうたびに",17,A1)); b.append(T(x0+250,yb-86,"「人間はやさしい」と確信が強まる",17,A1))
    b.append(T(lx-14,yb-30,"1001日目：感謝祭の前日",17,A2,"end",700))
    b.append(T(400,412,"過去のデータがどれだけ積み上がっても、一度の出来事ですべてがひっくり返ることがある",16,INK,"middle"))
    save("taleb-black-swan","turkey",svg(W,H,"".join(b)))
turkey()

# 2b 月並みの国と果ての国
def two_lands():
    W,H=800,440
    b=[T(400,40,"「月並みの国」と「果ての国」",22,INK,"middle",700)]
    for i,(x,title,col,soft,lines,bars) in enumerate([(60,"月並みの国",A1,SOFT,["例：身長・体重","一人がどれだけ極端でも","全体の平均はほとんど動かない"],[0.62,0.7,0.66,0.74,0.68,0.71,0.65]),
                                                      (420,"果ての国",A2,SOFT2,["例：資産・本の売上","たった一人が","全体をひっくり返す"],[0.05,0.07,0.04,0.06,0.05,0.95,0.06])]):
        b.append(f'<rect x="{x}" y="70" width="320" height="330" rx="14" fill="{soft}"/>')
        b.append(T(x+160,108,title,21,col,"middle",700))
        for j,v in enumerate(bars):
            bh=170*v; bx=x+40+j*36
            b.append(f'<rect x="{bx}" y="{300-bh:.0f}" width="24" height="{bh:.0f}" rx="4" fill="{col}"/>')
        for k,l in enumerate(lines): b.append(T(x+160,334+k*24,l,16,INK,"middle"))
    save("taleb-black-swan","two-lands",svg(W,H,"".join(b)))
two_lands()

# 3 コッホ曲線
def koch():
    W,H=800,470
    def k(p,q,n):
        if n==0: return [p]
        (x1,y1),(x2,y2)=p,q; dx,dy=(x2-x1)/3,(y2-y1)/3
        a=(x1+dx,y1+dy); c=(x1+2*dx,y1+2*dy)
        ang=-math.pi/3; bx=a[0]+dx*math.cos(ang)-dy*math.sin(ang); by=a[1]+dx*math.sin(ang)+dy*math.cos(ang)
        return k(p,a,n-1)+k(a,(bx,by),n-1)+k((bx,by),c,n-1)+k(c,q,n-1)
    b=[T(400,40,"コッホ曲線：拡大しても、同じ形があらわれる",22,INK,"middle",700)]
    for n in range(4):
        col=n%2; x=60+(n%2)*370; y=170+(n//2)*170
        pts=k((x,y),(x+310,y),n)+[(x+310,y)]
        b.append(f'<path d="{path(pts)}" fill="none" stroke="{A1 if n<3 else A2}" stroke-width="3"/>')
        b.append(T(x,y+34,["0回目：ただの線分","1回目：真ん中を三角に","2回目：さらに細かく","3回目：くり返すほど長くなる"][n],16,INK))
    b.append(T(400,450,"同じ手順をくり返すだけで、海岸線のように複雑な形ができる。くり返すたびに長さは4/3倍に",16,MUTED,"middle"))
    save("mandelbrot-fractal-geometry","koch",svg(W,H,"".join(b)))
koch()

# 4 ローレンツ：初期値の差
def lorenz():
    W,H=800,440
    def run(x,y,z):
        s,r,bb,dt=10,28,8/3,0.005; out=[]
        for i in range(8000):
            dx=s*(y-x); dy=x*(r-z)-y; dz=x*y-bb*z
            x,y,z=x+dx*dt,y+dy*dt,z+dz*dt
            if i%16==0: out.append(x)
        return out
    a=run(1.0,1.0,1.0); c=run(1.0001,1.0,1.0)
    x0,x1,ym=60,760,230; sc=7
    pa=[(x0+(x1-x0)*i/(len(a)-1), ym-v*sc) for i,v in enumerate(a)]
    pc=[(x0+(x1-x0)*i/(len(c)-1), ym-v*sc) for i,v in enumerate(c)]
    b=[T(400,40,"0.0001の差が、やがてまったく別の動きになる",22,INK,"middle",700),
       f'<line x1="{x0}" y1="{ym}" x2="{x1}" y2="{ym}" stroke="{GRID}" stroke-width="2"/>',
       f'<path d="{path(pa)}" fill="none" stroke="{A1}" stroke-width="2.5"/>',
       f'<path d="{path(pc)}" fill="none" stroke="{A2}" stroke-width="2.5" stroke-dasharray="7 5"/>',
       T(x0,400,"ローレンツ方程式で計算。実線と点線は、最初の値が0.0001だけ違う",16,MUTED),
       T(x0,424,"はじめはぴったり重なるのに、途中から別々の道を進む（バタフライ効果）",16,INK)]
    save("gleick-chaos","butterfly",svg(W,H,"".join(b)))
lorenz()

# 5 秩序とカオスの縁 + 創発
def edge():
    W,H=800,460
    b=[T(400,40,"「カオスの縁」と、下から生まれる秩序",22,INK,"middle",700)]
    grad='<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#2d6a7a"/><stop offset="0.5" stop-color="#e9c46a"/><stop offset="1" stop-color="#c0603a"/></linearGradient></defs>'
    b.insert(0,grad)
    b.append('<rect x="60" y="80" width="680" height="34" rx="17" fill="url(#g)"/>')
    for x,l1,l2 in [(110,"秩序","固まって動かない"),(400,"カオスの縁","変化と安定のあいだ"),(690,"カオス","ばらばらで続かない")]:
        b.append(T(x,150,l1,19,INK,"middle",700)); b.append(T(x,176,l2,16,MUTED,"middle"))
    b.append(f'<path d="M400,190 L400,214" stroke="{INK}" stroke-width="2"/>')
    b.append(T(400,238,"生命や経済、社会は、このあたりで「学び、変わり続ける」と考えられた",16,INK,"middle"))
    # emergence
    random.seed(3)
    for i in range(14):
        x=120+random.random()*200; y=300+random.random()*110
        b.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="7" fill="{A1}"/>')
    b.append(T(220,446,"一人ひとりは単純なルールで動く",16,INK,"middle"))
    b.append(f'<path d="M360,355 L440,355" stroke="{INK}" stroke-width="3"/><path d="M432,347 L444,355 L432,363" fill="none" stroke="{INK}" stroke-width="3"/>')
    b.append(T(400,342,"創発",17,A2,"middle",700))
    pts=[(500+i*9, 355+26*math.sin(i/2.2)) for i in range(26)]
    for x,y in pts: b.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="6" fill="{A2}"/>')
    b.append(T(615,446,"全体として、思いがけない形や流れが生まれる",16,INK,"middle"))
    save("waldrop-complexity","edge-of-chaos",svg(W,H,"".join(b)))
edge()

# 6 ランダム vs スケールフリー
def nets():
    W,H=800,460; random.seed(7)
    b=[T(400,40,"つながり方のちがい：みんな同じくらい か、ハブがある か",22,INK,"middle",700)]
    def draw(cx,cy,edges,nodes,col,hub=None):
        for i,j in edges: b.append(f'<line x1="{nodes[i][0]:.0f}" y1="{nodes[i][1]:.0f}" x2="{nodes[j][0]:.0f}" y2="{nodes[j][1]:.0f}" stroke="{GRID}" stroke-width="2.5"/>')
        deg=[0]*len(nodes)
        for i,j in edges: deg[i]+=1; deg[j]+=1
        for k,(x,y) in enumerate(nodes):
            r=6+deg[k]*1.6 if hub else 9
            b.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{min(r,22):.0f}" fill="{col}"/>')
    n=16
    nodes=[(200+120*math.cos(2*math.pi*i/n)+random.uniform(-25,25),250+120*math.sin(2*math.pi*i/n)+random.uniform(-20,20)) for i in range(n)]
    edges=[(i,(i+1)%n) for i in range(n)]+[(i,(i+5)%n) for i in range(0,n,3)]
    draw(200,250,edges,nodes,A1)
    hubs=[(600,250),(690,170)]
    nodes2=list(hubs); edges2=[(0,1)]
    for i in range(14):
        ang=2*math.pi*i/14; h=0 if i<10 else 1
        hx,hy=hubs[h]; d=110 if h==0 else 60
        nodes2.append((hx+d*math.cos(ang)+random.uniform(-10,10), hy+d*math.sin(ang)*0.9+random.uniform(-8,8)))
        edges2.append((h,len(nodes2)-1))
    draw(600,250,edges2,nodes2,A2,hub=True)
    b.append(T(200,420,"ランダムなネットワーク",18,A1,"middle",700)); b.append(T(200,444,"どの点も、つながりの数は同じくらい",16,INK,"middle"))
    b.append(T(600,420,"スケールフリー・ネットワーク",18,A2,"middle",700)); b.append(T(600,444,"少数の「ハブ」に、つながりが集中する",16,INK,"middle"))
    save("buchanan-nexus","networks",svg(W,H,"".join(b)))
nets()

# 7 後知恵：分かれ道
def hindsight():
    W,H=800,450
    b=[T(400,40,"結果を知ると、たどった道だけが「当然」に見える",22,INK,"middle",700)]
    start=(90,250); b.append(f'<circle cx="90" cy="250" r="10" fill="{INK}"/>'); b.append(T(90,285,"いま",16,INK,"middle"))
    ends=[]
    for i in range(6):
        y=90+i*58; mid=(330,250+(y-250)*0.5)
        chosen=(i==2)
        col=A2 if chosen else GRID; w=5 if chosen else 3
        b.append(f'<path d="M90,250 Q{mid[0]},{mid[1]} 540,{y}" fill="none" stroke="{col}" stroke-width="{w}"/>')
        b.append(f'<circle cx="540" cy="{y}" r="9" fill="{A2 if chosen else MUTED}"/>')
        b.append(T(560,y+6,"実際に起きたこと" if chosen else "ありえた別の未来",16,A2 if chosen else MUTED))
    b.append(T(400,436,"事前には、たくさんの未来がありえた。あとから振り返ると、1本の線しか見えなくなる",16,INK,"middle"))
    save("watts-everything-is-obvious","hindsight",svg(W,H,"".join(b)))
hindsight()

# 8 樹木 vs リゾーム
def rhizome():
    W,H=800,460; random.seed(11)
    b=[T(400,40,"「樹木」と「リゾーム（根茎）」",22,INK,"middle",700)]
    # tree
    lv=[[(200,90)],[(130,180),(270,180)],[(95,270),(165,270),(235,270),(305,270)]]
    for a,bl in ((0,1),(1,2)):
        for k,p in enumerate(lv[bl]):
            q=lv[a][k//2]; b.append(f'<line x1="{q[0]}" y1="{q[1]}" x2="{p[0]}" y2="{p[1]}" stroke="{A1}" stroke-width="3"/>')
    for l in lv:
        for x,y in l: b.append(f'<circle cx="{x}" cy="{y}" r="11" fill="{A1}"/>')
    b.append(T(200,330,"樹木",19,A1,"middle",700)); b.append(T(200,358,"ひとつの幹（中心）から",16,INK,"middle")); b.append(T(200,382,"上下の順に枝分かれする",16,INK,"middle"))
    pts=[(480+random.random()*240, 90+random.random()*190) for _ in range(12)]
    for i in range(len(pts)):
        for j in range(i+1,len(pts)):
            if math.dist(pts[i],pts[j])<110: b.append(f'<line x1="{pts[i][0]:.0f}" y1="{pts[i][1]:.0f}" x2="{pts[j][0]:.0f}" y2="{pts[j][1]:.0f}" stroke="{A2}" stroke-width="2.5"/>')
    for x,y in pts: b.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="9" fill="{A2}"/>')
    b.append(T(600,330,"リゾーム",19,A2,"middle",700)); b.append(T(600,358,"中心も始まりもなく",16,INK,"middle")); b.append(T(600,382,"どこからでも横につながる",16,INK,"middle"))
    b.append(T(400,436,"『千のプラトー』は、ものごとを「樹木」ではなく「リゾーム」として考えようと呼びかける",16,MUTED,"middle"))
    save("deleuze-guattari-mille-plateaux","tree-rhizome",svg(W,H,"".join(b)))
rhizome()

# 9 ソーカル事件の流れ
def sokal():
    W,H=800,400
    steps=[("1996年","でたらめ論文を","思想誌に投稿"),("掲載","そのまま","雑誌に載る"),("種明かし","別の雑誌で","パロディと公表"),("大論争","科学と人文学が","激しく対立"),("1997年","本書を出版","（仏語版）")]
    b=[T(400,40,"ソーカル事件から本書まで",22,INK,"middle",700)]
    for i,(h,l1,l2) in enumerate(steps):
        x=40+i*150
        col=A2 if i in (2,4) else A1
        b.append(f'<rect x="{x}" y="90" width="130" height="190" rx="14" fill="{SOFT2 if col==A2 else SOFT}"/>')
        b.append(T(x+65,130,h,19,col,"middle",700)); b.append(T(x+65,190,l1,16,INK,"middle")); b.append(T(x+65,216,l2,16,INK,"middle"))
        if i<4: b.append(f'<path d="M{x+134},185 L{x+146},185" stroke="{INK}" stroke-width="3"/><path d="M{x+140},178 L{x+148},185 L{x+140},192" fill="none" stroke="{INK}" stroke-width="2.5"/>')
    b.append(T(400,330,"「難しい言葉が並んでいれば、中身を確かめずに通ってしまうのでは？」",17,INK,"middle"))
    b.append(T(400,360,"その問いを、科学の言葉の使われ方から一つずつ検証したのが『「知」の欺瞞』",16,MUTED,"middle"))
    save("sokal-bricmont-fashionable-nonsense","sokal-affair",svg(W,H,"".join(b)))
sokal()

# 10 科学をめぐる二つの見方
def wars():
    W,H=800,450
    b=[T(400,40,"「サイエンス・ウォーズ」で向き合った二つの見方",22,INK,"middle",700)]
    for x,title,col,soft,lines in [(50,"科学者の側",A1,SOFT,["科学は、自然のしくみを","できるだけ正確に写しとる","（実在論）"]),(450,"科学論・社会学の側",A2,SOFT2,["科学の知識も、研究者の社会や","時代の影響を受けてつくられる","（社会構成主義）"])]:
        b.append(f'<rect x="{x}" y="80" width="300" height="200" rx="16" fill="{soft}"/>')
        b.append(T(x+150,122,title,20,col,"middle",700))
        for k,l in enumerate(lines): b.append(T(x+150,172+k*30,l,16,INK,"middle"))
    b.append(f'<path d="M355,180 L445,180" stroke="{MUTED}" stroke-width="3"/><path d="M365,172 L353,180 L365,188 M435,172 L447,180 L435,188" fill="none" stroke="{MUTED}" stroke-width="3"/>')
    b.append(T(400,168,"対立",16,MUTED,"middle"))
    b.append(f'<rect x="180" y="320" width="440" height="80" rx="16" fill="#f5f6f8"/>')
    b.append(T(400,354,"本書は、この論争の流れを日本語で整理し、",17,INK,"middle"))
    b.append(T(400,382,"科学と社会の関係をあらためて問い直す",17,INK,"middle"))
    save("kanamori-science-wars","two-views",svg(W,H,"".join(b)))
wars()

# 11 世界文学のアーキテクチャ：本の構成を建物に
def wl_building():
    W,H=800,500; slug="fukushima-ryota-world-literature-architecture"
    b=[T(400,40,"本の構成を「建物」にたとえると（三部構成）",22,INK,"middle",700)]
    # roof / part3
    b.append(f'<path d="M150,190 L400,80 L650,190 Z" fill="{SOFT2}" stroke="{A2}" stroke-width="3"/>')
    b.append(T(400,140,"第三部　思考のテーマ",18,A2,"middle",700))
    b.append(T(400,170,"環境・絶滅・主体・制作・可塑性・不確実性・時間",15,INK,"middle"))
    # part2 floors
    b.append(f'<rect x="170" y="200" width="460" height="150" fill="{SOFT}" stroke="{A1}" stroke-width="3"/>')
    b.append(T(400,240,"第二部　進化史",18,A1,"middle",700))
    b.append(T(400,272,"国や時代をこえて、小説がどう進化してきたか",15,INK,"middle"))
    b.append(T(400,300,"（中国の小説、日本の文学、海をめぐる物語 など）",15,MUTED,"middle"))
    for x in (230,300,500,570): b.append(f'<rect x="{x}" y="318" width="40" height="32" fill="#fff" stroke="{A1}" stroke-width="2"/>')
    # part1 foundation
    b.append(f'<rect x="120" y="360" width="560" height="70" fill="#eceff3" stroke="{MUTED}" stroke-width="3"/>')
    b.append(T(400,392,"第一部　地盤",18,INK,"middle",700))
    b.append(T(400,418,"ゲーテの「世界文学」と、小説の古い層",15,INK,"middle"))
    b.append(T(400,470,"土台の上に歴史の階が積まれ、その上で今の問いを考える。読む順番の目安にもなる",15,MUTED,"middle"))
    save(slug,"structure",svg(W,H,"".join(b)))
wl_building()

# 12 小説は「変換装置」
def wl_converter():
    W,H=800,440; slug="fukushima-ryota-world-literature-architecture"
    b=[T(400,40,"小説は、心や社会を「言葉」に変える装置（※イメージ図）",22,INK,"middle",700)]
    boxes=[(40,"心の動き","社会の出来事",SOFT,A1),(300,"小説","言葉に変換する",SOFT2,A2),(560,"商品として流通","世界中の読者へ",SOFT,A1)]
    for x,t1,t2,soft,col in boxes:
        b.append(f'<rect x="{x}" y="110" width="200" height="130" rx="16" fill="{soft}"/>')
        b.append(T(x+100,165,t1,19,col,"middle",700)); b.append(T(x+100,198,t2,16,INK,"middle"))
    for x in (248,508):
        b.append(f'<path d="M{x},175 L{x+44},175" stroke="{INK}" stroke-width="3"/><path d="M{x+36},167 L{x+46},175 L{x+36},183" fill="none" stroke="{INK}" stroke-width="3"/>')
    b.append(f'<path d="M660,250 C660,296 140,296 140,250" fill="none" stroke="{MUTED}" stroke-width="2.5" stroke-dasharray="7 6"/><path d="M132,262 L140,248 L148,262" fill="none" stroke="{MUTED}" stroke-width="2.5"/>')
    b.append(T(400,330,"読まれた小説が、また人の心や社会を変えていく",16,MUTED,"middle"))
    b.append(T(400,380,"本書は、この仕組みが資本主義とともにどう育ってきたかを、",16,INK,"middle"))
    b.append(T(400,406,"18世紀以降の「世界文学」の歴史としてたどっていく",16,INK,"middle"))
    save(slug,"converter",svg(W,H,"".join(b)))
wl_converter()
