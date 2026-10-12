'use strict';
const SOUND_DATA={
あ:['受け取る','自分の枠をゆるめ、届くものを受け取る'],い:['周りを思う','自然や周囲から受け取った思いを行動へ移す'],う:['生み出す','感じたことを形にして生み出す'],え:['愛を届ける','愛や思いをことばにして届ける'],お:['大らかさ','広い心で、人や出来事を受け止める'],
か:['可能性','自分や人の可能性に気づき、動き出す'],き:['気づきを行動へ','身近な気づきを尊重し、行動へ移す'],く:['創意工夫','創造する力を工夫によって伸ばす'],け:['恩をつなぐ','受け取った恵みを忘れず、次の創造につなぐ'],こ:['能力を育てる','受け取った思いを力に変え、可能性を広げる'],
さ:['役割を伝える','人や物事にある役割を見つけ、伝える'],し:['つながり','自分のルーツや自然とのつながりを伝える'],す:['自分を磨く','自分に備わった力を磨いて活かす'],せ:['思いを貫く','ことばと行動をそろえ、心にある思いを形にする'],そ:['ルーツを結ぶ','自分の根にあるつながりを大切にする'],
た:['恵みの循環','授かった命や知恵を育て、恵みを巡らせる'],ち:['世界と生きる','広い世界とのつながりを感じながら生きる'],つ:['核を深める','本物や物事の核心に向き合い、深める'],て:['手を差し伸べる','手を動かして人の助けになる'],と:['世のために','広い視点で、暮らしや社会に力を尽くす'],
な:['大切にする','大切なものを見つめ、守り育てる'],に:['役割を生きる','自分の役割に責任を持ち、日々を生きる'],ぬ:['内面を育む','受け継いだものを大切にし、内側を豊かにする'],ね:['見える形に','まだ見えないものを、見える形にする'],の:['力を引き出す','内にある力を伸ばし、大切なものを育てる'],
は:['学びを活かす','学んだことや気づきを、自分の成長に活かす'],ひ:['潜在力','内にある可能性を信じ、開いていく'],ふ:['流れの中に','時代の変化の中で、自分の存在を育てる'],へ:['公平さ','偏りを見つめ、公平であることを大切にする'],ほ:['力を込める','人や物事に思いを込め、本来の力を引き出す'],
ま:['真実を見る','うわべにとらわれず、真実を見つめる'],み:['多面的な視点','一つの見方にとどまらず、物事を多面的に見る'],む:['無心','余計な思いをゆるめ、無心で向き合う'],め:['愛を広げる','愛を通して、豊かさを広げる'],も:['澄んだ心','水のように、心の清らかさを大切にする'],
や:['行動で示す','人の手本となる姿を、行動で示す'],ゆ:['本質に目覚める','自分の自然な性質に気づき、意識を育てる'],よ:['自ら動く','受け取ったものを、自分の行動へつなげる'],
ら:['清らかさ','身近なものを整え、清らかな状態へ導く'],り:['良さを見つける','隠れている素晴らしさを見つける'],る:['心を留める','人の心に届くものを大切にする'],れ:['磨く','自分や物事にある力を磨く'],ろ:['表現する','優れた力を表に出し、届ける'],わ:['和をつくる','互いをつなぎ、調和を育てる'],を:['人生を生きる','自分の人生を、自分の歩みとして生きる'],ん:['全体を動かす','さまざまな音の意味を含み、力を動かす']
};
// User-specified reading: voiced and semi-voiced sounds strengthen the base sound meaning.
const VOICED_BASE={が:'か',ぎ:'き',ぐ:'く',げ:'け',ご:'こ',ざ:'さ',じ:'し',ず:'す',ぜ:'せ',ぞ:'そ',だ:'た',ぢ:'ち',づ:'つ',で:'て',ど:'と',ば:'は',び:'ひ',ぶ:'ふ',べ:'へ',ぼ:'ほ',ぱ:'は',ぴ:'ひ',ぷ:'ふ',ぺ:'へ',ぽ:'ほ',ゔ:'う'};
for(const [sound,base] of Object.entries(VOICED_BASE))SOUND_DATA[sound]=[SOUND_DATA[base][0],SOUND_DATA[base][1]+'。その意味を、より力強く表す響き'];
const KATAKAMUNA_DATA={"ひ": "根源から・出／入", "ふ": "増える・負・振動", "み": "実体・光", "よ": "新しい・陽", "い": "伝わるもの・陰", "ま": "受容・需要", "わ": "調和", "り": "離れる", "て": "発信・放射", "め": "指向・思考・芽", "く": "引き寄る", "る": "留まる・止まる", "む": "広がり", "な": "核・重要なもの", "や": "飽和する", "こ": "転がり・入／出", "と": "統合", "あ": "感じる・生命", "う": "生まれ出る", "の": "時間をかける", "す": "一方へ進む", "へ": "縁・外側", "し": "示し・現象・死", "れ": "消失する", "か": "チカラ（重力）", "た": "分かれる", "ち": "凝縮", "さ": "遮り・差", "き": "エネルギー・気", "そ": "外れる", "ら": "場", "に": "圧力", "も": "漂う", "ろ": "空間・抜ける", "け": "放出する", "せ": "引き受ける", "ゆ": "湧き出る", "ゑ": "届く", "ぬ": "突き抜く・貫く", "お": "奥深く", "ゐ": "奥に出現する", "は": "引き合う", "え": "うつる", "つ": "集まる", "ね": "充電する・充たす", "ほ": "引き離す", "ん": "掛かる音を強める", "井": "存在"} ;
function kataMeaning(c){return KATAKAMUNA_DATA[VOICED_BASE[c]||c];}
function closingReading(core,mission,cardName,cardTheme,known){
 const themes=[...new Set(known.filter(c=>SOUND_DATA[c]).map(c=>SOUND_DATA[c][0]))].slice(0,3);
 const kata=[...new Set(known.map(kataMeaning).filter(Boolean))].slice(0,3);
 const sounds=known.length?`名前の響きには「${themes.join('・')||'自分らしい音'}」というテーマが重なり、カタカムナでは「${kata.join('、')}」という動きを読みます。`:'名前の読み方を添えると、音の意味とカタカムナの視点も、この言葉に重ねられます。';
 return `あなたは、${core.symbol}のような本来の個性を持ち、「${core.theme}」を日々の力に変える人です。算命学が示す「${mission.theme}」を育て、タロット「${cardName}」の「${cardTheme}」を選択の灯りにすることが、あなたらしい使命の歩みになります。${sounds}人と比べて急ぐより、得意なことを丁寧に育て、心が動く出会いや役割を選ぶことが、あなたの持ち味を生かす道です。自分の自然な良さを信じ、心に響く言葉を小さな行動に移すたび、あなたにしか届けられない光が身近な人へ広がっていきます。`;}
function normalizeReading(s){return s.normalize('NFKC').replace(/[\s\u3000・]/g,'').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));}
function readSounds(s){const chars=[...normalizeReading(s)];return {known:[...new Set(chars.filter(c=>SOUND_DATA[c]||kataMeaning(c)))],unknown:[...new Set(chars.filter(c=>!SOUND_DATA[c]&&!kataMeaning(c)))]};}
function isValidBirth(s,today=new Date()){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const [y,m,d]=s.split('-').map(Number),dt=new Date(y,m-1,d);const now=new Date(today.getFullYear(),today.getMonth(),today.getDate());return y>=1800&&dt.getFullYear()===y&&dt.getMonth()===m-1&&dt.getDate()===d&&dt<=now;}
const $=id=>document.getElementById(id);
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
// Additional reading prompts are editorial suggestions, distinct from source interpretations.
const STAR_PRACTICE={
貫索星:{place:'自分で順序や方法を決められ、集中を守れる場所',action:'大切にしたい価値を一つ選び、毎日十分だけ続けられる習慣を決める',ask:'私は何を守りたいのか。それは今の自分にも必要か',care:'予定のない時間を確保し、自分のペースを取り戻す',talk:'譲れないことと相談できることを分け、理由と一緒に伝える'},
石門星:{place:'立場を越えて相談でき、協力を喜び合える場所',action:'力を借りたい人に具体的な相談をし、受け取った助けに感謝を伝える',ask:'一緒に進みたい人は誰か。その輪の中で私は何を望むか',care:'人と会う時間と一人になる時間を、両方予定に入れる',talk:'共通の目的を確かめたうえで、自分の希望も一つ言葉にする'},
鳳閣星:{place:'無理な緊張が少なく、観察や発信を自然に続けられる場所',action:'身近で見つけた楽しさや役立つ情報を、分かりやすい言葉で一人に届ける',ask:'自然体の私は何を楽しみ、何を伝えたいのか',care:'食事や散歩など、感覚を味わえる時間を大切にする',talk:'見たことと感じたことを分け、穏やかに具体例を伝える'},
調舒星:{place:'細かな感覚を尊重され、自分の表現に向き合える場所',action:'心が動いた場面を短い文章や絵にし、安心できる相手にだけ見せてみる',ask:'まだ言葉にしていない気持ちは何か。どんな形なら届けられるか',care:'刺激を減らし、誰にも評価されない創作の時間を持つ',talk:'すぐに結論を出さず、書いて整理してから気持ちを伝える'},
禄存星:{place:'思いやりが届き、与える側も支えられる場所',action:'無理なくできる手助けを一つ選び、時間と範囲を決めて実行する',ask:'私は喜んで与えているか。自分にも同じ温かさを向けられるか',care:'助ける役割からいったん離れ、受け取る時間をつくる',talk:'相手が求める助けを聞き、自分ができる範囲を正直に伝える'},
司禄星:{place:'積み重ねが認められ、安心と継続を育てられる場所',action:'暮らしや仕事の小さな記録をつけ、続いたことを週末に確認する',ask:'これまで何を蓄えてきたか。それを誰の安心に生かせるか',care:'今日できたことを三つ書き、準備を終える時刻を決める',talk:'予定や約束を具体的に共有し、変わる時は早めに相談する'},
車騎星:{place:'実際に動いて試せ、成果や改善をすぐ確かめられる場所',action:'後回しにしていることを一つ選び、十五分だけ実際に取りかかる',ask:'今動くべきことは何か。速さと丁寧さをどう両立するか',care:'活動の合間に休む時間を決め、体力の余白を残す',talk:'行動を始める前に目的を伝え、相手の返事を待つ'},
牽牛星:{place:'責任の範囲が明確で、誠実さと専門性を生かせる場所',action:'担う役割と達成条件を整理し、必要な知識を一つ学び直す',ask:'引き受けたい責任と、抱えすぎている責任は何か',care:'役割や評価から離れて過ごし、失敗にも余地を与える',talk:'基準を共有すると同時に、難しい点や助けが必要な点も伝える'},
竜高星:{place:'未知に触れられ、試行錯誤や異なる視点を歓迎される場所',action:'気になる分野を小さく体験し、学んだことを今の課題に一つ取り入れる',ask:'私は何を実際に試したいのか。その体験をどう形にするか',care:'情報を集める手を止め、体験を整理する時間を持つ',talk:'新しい提案の理由と、まず小さく試す方法をセットで伝える'},
玉堂星:{place:'学びを深められ、知恵を整理して分かち合える場所',action:'学んだ内容を自分の言葉で三行にまとめ、具体例と一緒に誰かへ伝える',ask:'今深めたい問いは何か。知識をどんな実践に結びたいか',care:'考え続ける時間を区切り、知識から離れた体験を楽しむ',talk:'説明の前に相手の疑問を聞き、必要なことから順に伝える'}
};
function block(page,title,...paragraphs){const sec=el('section',undefined,'reading-block');sec.append(el('h3',title));paragraphs.forEach(p=>sec.append(el('p',p)));page.querySelector('.page-body').append(sec);return sec;}
function highlight(page,label,value,description){const h=el('div',undefined,'reading-highlight');h.append(el('p',label,'eyebrow'),el('h3',value),el('p',description));page.querySelector('.page-body').append(h);return h;}
function addChart(page,r){const chart=el('div',undefined,'destiny-chart');[['使命',r.stars.mission],['目上・学び',r.stars.north],['初年の象徴',r.stages.early],['家庭・親密さ',r.stars.west],['心の働き・中央',r.stars.center],['社会・仕事',r.stars.east],['晩年の象徴',r.stages.late],['目下・心の満足',r.stars.south],['中年の象徴',r.stages.middle]].forEach(([label,star],i)=>{const c=el('div',undefined,i===4?'center-cell':'');c.append(el('span',label),el('b',star));chart.append(c)});page.querySelector('.page-body').append(chart);}
const STEM_KEYWORDS={"甲": "芯の強さ・正直・継続・独立・成長・信頼", "乙": "柔軟・協調・粘り強さ・調整・気配り・しなやかさ", "丙": "明るさ・情熱・開放感・公平・率直・人を励ます", "丁": "繊細・集中・洞察・創造・温かさ・内なる情熱", "戊": "安定・包容・存在感・信頼・守る力・責任", "己": "育成・実務・受容・積み重ね・奉仕・現実感", "庚": "決断・行動・改革・正義感・突破・磨く力", "辛": "美意識・品格・精密・感受性・自尊心・完成度", "壬": "自由・探究・広い視野・変化・知恵・柔軟", "癸": "思慮・学習・忍耐・観察・静かな支援・潤い"};
const STAR_KEYWORDS={"貫索星": "自立・意志・守る力・一貫性・自分の軸", "石門星": "仲間・協力・調整・社交・人の輪", "鳳閣星": "自然体・伝達・楽しむ・穏やかさ・表現", "調舒星": "繊細な感性・独創・美意識・内省・個別の表現", "禄存星": "愛情・包容・人を支える・引きつける・循環", "司禄星": "蓄積・準備・生活力・継続・安心", "車騎星": "実行・挑戦・速さ・勇気・現場の力", "牽牛星": "責任・規律・誇り・信頼・役割", "竜高星": "探究・体験・変化・発想・改革", "玉堂星": "学び・伝統・理解・知識・丁寧な継承"};
function buildLetter({name,reading,birth,message,known,unknown}){
 const r=sanmei(birth),tarot=personalCard(birth),[cardName,cardTheme,cardMission,cardGood,cardChallenge,cardWork]=tarot.card;
 const td=TAROT_DEPTH[tarot.number];
 const core=DAY_STEM_INFO[r.dayStem],center=STAR_INFO[r.stars.center],mission=STAR_INFO[r.stars.mission],cp=core,mp=STAR_PRACTICE[r.stars.mission];
 const east=STAR_INFO[r.stars.east],west=STAR_INFO[r.stars.west],north=STAR_INFO[r.stars.north],south=STAR_INFO[r.stars.south];
 const letter=$('letter');letter.replaceChildren();
 const titles=['あなたという、ひとつの宇宙','日干から知る、本来のあなた','人とのつながりを、やさしく育てる','才能が生きる仕事と環境','算命学で読む、あなたの使命','タロットで読む、あなたの使命','二つの使命を、毎日の光に'];
 function page(i,kicker){const p=el('section',undefined,'report-page');p.id='report-page-'+i;p.setAttribute('aria-label',`${i}ページ目 ${titles[i-1]}`);const head=el('div',undefined,'page-head');head.append(el('p',`KNOW YOURSELF · PERSONAL READING / ${String(i).padStart(2,'0')}`,'eyebrow'),el('p',kicker,'page-kicker'),el('h2',titles[i-1]),el('p',`${name} 様`,'person'),el('p',`${birth.replaceAll('-','.')} 生まれ${reading?' ／ '+reading:''}`,'meta'));p.append(head,el('div',undefined,'page-body'));const foot=el('div',undefined,'page-foot');foot.append(el('span','本来の自分を知る · 個性と使命の鑑定書'),el('span',`${i} / 7`));p.append(foot);letter.append(p);return p;}
 function words(p,text){const row=el('div',undefined,'personal-keywords');[...new Set(text.split('・').filter(Boolean))].forEach(t=>row.append(el('span',t)));p.querySelector('.page-body').append(row);}
 function tidy(t){return t.replace(/。+/g,'。').replace(/力という力/g,'力').replace(/力という才能/g,'才能').replace(/場所こと/g,'場所').replace(/。$/,'');}
 function readingBlock(p,title,reason,strong,caution,advice){const rs=tidy(reason).replace(/個性$/,'人です').replace(/個性。/g,'個性を持っています。');const strength=tidy(strong);const ending=/力$/.test(strength)?'が強みです':'ことに強みがあります';block(p,title,`あなたは、${rs}。だから、${strength}${ending}。でも、${tidy(caution)}ことには注意が必要です。`, `あなたへのアドバイス：${tidy(advice)}。`);} 
 const sk=STEM_KEYWORDS[r.dayStem],mk=STAR_KEYWORDS[r.stars.mission];
 let p=page(1,'OVERVIEW · あなたの全体像');
 const identity=el('div',undefined,'stem-portrait');const art=el('img');art.src=`assets/stems/${core.image}.jpg`;art.alt=`日干${r.dayStem}の象徴、${core.symbol}の絵`;art.width=512;art.height=512;const intro=el('div');intro.append(el('p','あなた本来の個性 · 日干','eyebrow'),el('h3',`${r.dayStem} — ${core.symbol}`),el('p',core.reading,'stem-reading'),el('p',core.theme,'stem-theme'));identity.append(art,intro);p.querySelector('.page-body').append(identity);
 words(p,sk+'・'+mk+'・'+cardTheme);
 const duo=el('div',undefined,'summary-trio mission-duo');[[r.stars.mission,'算命学の使命',mission.theme],[cardName,'タロットの使命',cardTheme]].forEach(([v,l,t])=>{const d=el('div');d.append(el('p',l,'eyebrow'),el('h3',v),el('p',t,'personal-emphasis'));duo.append(d)});p.querySelector('.page-body').append(duo);
 readingBlock(p,'あなたの個性と使命',`${core.symbol}のような個性を持ち、${core.theme}人です`,core.good.replace(/。$/,''),`興味や役割を広げすぎて、自分に必要な時間を後回しにする` ,`${mission.theme}という使命に、${cardTheme}という心の方向を重ねる`);
 addChart(p,r);
 p=page(2,'DAY STEM · 本来の個性');highlight(p,'あなたの個性',`${r.dayStem} — ${core.symbol}`,core.theme);words(p,sk+'・'+STAR_KEYWORDS[r.stars.center]);
 readingBlock(p,'あなたの本質',`${core.nature}`,core.good.replace(/。$/,''),'自分の自然な良さを、周囲の期待に合わせて無理に変えてしまう',`${cp.place}を選び、自分の持ち味が自然に出る時間を確保する`);
 readingBlock(p,'あなたの心の軸',`${center.nature}`,center.good.replace(/。$/,''),'得意な反応だけを続け、他のやり方を試す余地をなくす',center.challenge.replace(/。$/,''));
 readingBlock(p,'強みを育てる方法',`${core.theme}という持ち味があり、「${center.theme}」を大切にする人です`,`${core.symbol}の自然な力を、自分が納得した取り組みへ注ぐ`,'他の人の速度や評価を基準にして、自分のペースを見失う',`${cp.action}。あなたに合う環境は、${cp.place}であり、${core.environment}`);
 readingBlock(p,'疲れた時のあなた',`持ち味を大切にする分、${core.challenge.replace(/。$/,'')}という調整が必要な人です`,'自分の状態を知り、働き方や人との距離を整える','余裕がないまま、いつもの力を出そうとし続ける',`${cp.care}。また、${cp.talk}`);
 p=page(3,'RELATIONSHIPS · 人との関わり');words(p,STAR_KEYWORDS[r.stars.west]+'・'+STAR_KEYWORDS[r.stars.east]);
 [[west,r.stars.west,'親しい人とのあなた'],[east,r.stars.east,'仕事仲間とのあなた'],[north,r.stars.north,'学びの場のあなた'],[south,r.stars.south,'人を支えるあなた']].forEach(([v,n,t])=>{const sp=STAR_PRACTICE[n];readingBlock(p,`${({'親しい人とのあなた':'親友・配偶者とあなた','学びの場のあなた':'親・先輩とあなた','人を支えるあなた':'子・後輩とあなた'})[t]||t.replace('とのあなた','とあなた')}（${n} × ${r.stars.center}）`,`${v.nature}`,v.good.replace(/。$/,''),t==='親しい人とのあなた'?'親しさに甘えて、相談せずに新しいことを進める':t==='仕事仲間とのあなた'?'新しい案を急いで出し、仲間が理解する時間を置かない':t==='学びの場のあなた'?'興味の対象を次々に変え、学びを深める時間を失う':'自分の感覚を相手も同じように感じると思い込む',`${v.challenge}。関係を育てるために、${sp.talk}。あなたが安心して関われるのは、${sp.place}`);});
 p=page(4,'WORK & GIFTS · あなたの才能');highlight(p,'あなたの仕事の強み',east.theme,south.theme);words(p,STAR_KEYWORDS[r.stars.east]+'・'+STAR_KEYWORDS[r.stars.south]+'・'+sk);
 readingBlock(p,'社会へ届ける才能',`${east.nature}`,east.good.replace(/。$/,''),'外から評価される役割だけを選び、心の満足を後回しにする',`${east.east}に関わる役割の中で、${STAR_PRACTICE[r.stars.east].action}`);
 readingBlock(p,'あなたが充実する役割',`「${south.theme}」に心の満足を感じやすい人です`,south.good.replace(/。$/,''),'できることをすべて引き受け、好きなことに使う時間を失う',`${south.south}の要素がある取り組みを持つ。${south.challenge}`);
 readingBlock(p,'力が生きる働き方',`${core.symbol}の個性と、${east.theme}の社会的な力を持つ人です`,`${core.good.replace(/。$/,'')}という才能を、自分に合う環境で発揮する`,'環境が合わないまま、努力の量だけを増やす',`${cp.place}を働く条件として大切にする。${core.environment}。人と協力する時は、${STAR_PRACTICE[r.stars.east].talk}`);
 readingBlock(p,'仕事と使命を結ぶ',`${mission.theme}という使命と、${cardTheme}という方向を持つ人です`,`${cardWork}で、自分の感性や意志を人へ届ける`,'誰かに必要とされることだけで、自分の選択を決める',`${mp.action}。その際に、${cardChallenge}。自分の力を守るため、${mp.care}`);
 p=page(5,'SANMEIGAKU MISSION · あなたの使命');highlight(p,'あなたが育てる使命',mission.theme,r.stars.mission);words(p,mk+'・'+sk);
 readingBlock(p,'あなたの特筆すべき使命',`${mission.nature}`,mission.good.replace(/。$/,''),'役割を果たすことに気持ちが傾き、自分の内面を置き去りにする',`${mission.mission}。あなたの土台にある、${core.theme}という持ち味を生かす`);
 readingBlock(p,'使命を支えるあなたの力',`${core.nature}`,`${core.good.replace(/。$/,'')}という力を、${mission.theme}という方向へ使う`,'使命のために、自分の自然な性質を抑え込む',`${cp.action}という取り組みを、${mp.action}という使命の行動へ結びつける`);
 readingBlock(p,'使命が偏った時の注意',`「${mission.theme}」を大切にする人です`,'その価値を必要とする人や場へ、力を注ぐ','期待を引き受けすぎて、使命が自分を追い込む義務になる',`${mission.challenge}。${mp.care}。自分の軸を取り戻すために、${cp.care}`);
 readingBlock(p,'あなたらしい使命の歩み',`${core.symbol}の個性を持ち、「${mission.theme}」を育てる人です`,`${mission.good.replace(/。$/,'')}という持ち味を、あなたに合った形で続ける`,'大きな役割を急いで探し、自分に合う小さな表現を見過ごす',`${mp.action}。人へ伝える時には、${mp.talk}。あなたが取り組みやすいのは、${mp.place}`);
 p=page(6,'TAROT MISSION · あなたのもう一つの使命');
 const tc=el('div',undefined,'tarot-panel');const cardArt=el('img');cardArt.src=`assets/tarot/${String(tarot.number).padStart(2,'0')}.jpg`;cardArt.alt=`${cardName}のタロットカード`;cardArt.className='tarot-card-art';cardArt.width=300;cardArt.height=520;tc.append(cardArt);const cc=el('div');cc.append(el('p','あなたのパーソナルカード','eyebrow'),el('h3',cardName),el('p',cardTheme,'personal-emphasis'));tc.append(cc);p.querySelector('.page-body').append(tc);words(p,cardTheme+'・'+cardGood+'・'+mission.theme);
 readingBlock(p,'カードに映るあなたの持ち味',`「${cardTheme}」を大切にする人です`,`${td.gift}を通して、${cardGood}を発揮する` ,td.shadow,`${cardMission}。${cardChallenge}`);
 readingBlock(p,'あなたが人へ届けるもの',`${core.theme}という個性と、${cardTheme}という使命の方向を持つ人です`,`${cardWork}で、${cardGood}を生かす`,'人の期待や目先の心地よさだけで、選択を決めてしまう',`${cardChallenge}。あなたが守りたい価値を言葉にしてから、人との関わり方を選ぶ`);
 readingBlock(p,'二つの使命から見えるあなた',`「${mission.theme}」と「${cardTheme}」を、生き方の方向に持つ人です`,`${mission.good.replace(/。$/,'')}という力を、${td.gift}へつなぐ`,'片方の力だけを強めて、自分の心の納得を失う',`${mp.action}。その場面で、${cardChallenge}。人と話す時は、${mp.talk}`);
 p=page(7,'INTEGRATION · 名前の響きと、あなたの全体像');words(p,sk+'・'+mk+'・'+cardTheme);
 const soundSection=block(p,'あなたの名前に重なるキーワード');
 if(known.length){const sg=el('div',undefined,'report-sound-grid');known.forEach(c=>{const d=el('div');const meanings=el('div',undefined,'sound-meanings');meanings.append(el('span',`響き：${SOUND_DATA[c]?.[0]||'未収録'}${VOICED_BASE[c]?'（強調）':''}`),el('span',`カタカムナ：${kataMeaning(c)||'未収録'}${VOICED_BASE[c]?'（強調）':''}`));d.append(el('b',c),meanings);sg.append(d)});soundSection.append(sg);const themes=[...new Set(known.filter(c=>SOUND_DATA[c]).map(c=>SOUND_DATA[c][0]))];block(p,'名前の響きから見るあなた',`あなたの名前には、${themes.join('・')}というテーマが重なります。${core.symbol}の個性を土台に、「${mission.theme}」と「${cardTheme}」を育てる時の、あなたらしい言葉です。`);}
 else block(p,'名前の響き','読み方を入力すると、ここに名前の音のキーワードが入ります。');
 if(message.trim())p.querySelector('.page-body').append(el('p',message.trim(),'gift-message'));
 const soundThemes=[...new Set(known.filter(c=>SOUND_DATA[c]).map(c=>SOUND_DATA[c][0]))].slice(0,4);
 const kataThemes=[...new Set(known.map(kataMeaning).filter(Boolean))].slice(0,3);
 let closing=`あなたは、${core.symbol}のように「${core.theme}」という個性を持つ人です。だから、${core.good.replace(/。$/,'').replace(/力$/,'')}ことに強く、周囲へ自分ならではの良さを届けられます。心の軸には「${center.theme}」があり、人に合わせるだけでなく、自分が納得できる選択を大切にする人です。算命学の使命は「${mission.theme}」。タロット「${cardName}」の「${cardTheme}」という方向と重なり、${cardGood}を育てていくことが、あなたらしい歩みになります。でも、${td.shadow}ことには注意が必要です。あなたへのアドバイスは、${cardChallenge}こと。そして、${mp.action}ことです。`;
 closing+=known.length?`名前の響きには「${soundThemes.join('・')}」、カタカムナには「${kataThemes.join('・')}」という言葉が重なります。内にある力を見つめ、あなたが大切にする思いを行動へ移す手がかりです。`:'名前の読み方を添えると、響きとカタカムナの意味も、あなたらしさを表す言葉として重なります。';
 const ending='自分の良さを無理に大きく見せる必要はありません。得意なことを丁寧に育て、必要な時には人の力を借りながら、あなたにしか届けられない光を、身近な関係と毎日の仕事へ広げてください。';
 if([...closing+ending].length<470)closing+='うまく進まない時は、自分を責めるより、場所や伝え方を変えてみましょう。';
 block(p,'あなたのことを改めて表現すると',closing+ending);

 const calc=$('calculation');calc.replaceChildren(el('h3','７ページの鑑定書を、ゆっくり読む'));const nav=el('nav',undefined,'page-nav');nav.setAttribute('aria-label','鑑定書の目次');titles.forEach((t,i)=>{const a=el('a',`${i+1}. ${t}`);a.href='#report-page-'+(i+1);nav.append(a)});calc.append(nav);if(r.boundary)calc.append(el('p','この誕生日は暦の境界付近です。日付単位の参考結果としてお読みください。出生時刻と採用する流派による確認が必要です。','boundary-note'));
 $('result').hidden=false;
}
if(typeof document!=='undefined'){
 let readingTimer=null;
 const submitButton=$('form').querySelector('[type=submit]');
 function endCeremony(){clearTimeout(readingTimer);readingTimer=null;$('reading-veil').hidden=true;document.body.classList.remove('is-reading');submitButton.disabled=false;$('form').removeAttribute('aria-busy');}
 function cleanReading(value){return normalizeReading(value).replace(/[^ぁ-ゖ]/g,'');}
 function normalizeBirth(value){const t=value.normalize('NFKC').trim();const m=t.match(/^(\d{4})[\/・.-](\d{1,2})[\/・.-](\d{1,2})$/)||t.match(/^(\d{4})(\d{2})(\d{2})$/);return m?`${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`:t;}
 let composing=false;
 $('reading').addEventListener('compositionstart',()=>{composing=true;});
 $('reading').addEventListener('compositionend',()=>{composing=false;$('reading').value=cleanReading($('reading').value);});
 $('reading').addEventListener('input',()=>{if(!composing)$('reading').value=cleanReading($('reading').value);});
 $('reading').addEventListener('blur',()=>{$('reading').value=cleanReading($('reading').value);});
 $('birth').addEventListener('blur',()=>{const value=normalizeBirth($('birth').value);if(isValidBirth(value))$('birth').value=value.replaceAll('-','/');});
 const now=new Date();$('birth').dataset.max=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
 $('form').addEventListener('submit',e=>{e.preventDefault();if(readingTimer!==null)return;$('error').textContent='';const name=$('name').value.trim(),reading=cleanReading($('reading').value),birth=normalizeBirth($('birth').value);if(!name){$('error').textContent='お名前を入力してください。';return}if(!isValidBirth(birth)||Number(birth.slice(0,4))<1900){$('error').textContent='1900年以降、今日以前の実在する生年月日を入力してください。';return}const input={name,reading,birth,message:'',...readSounds(reading)};$('result').hidden=true;submitButton.disabled=true;$('form').setAttribute('aria-busy','true');$('reading-veil').hidden=false;document.body.classList.add('is-reading');readingTimer=setTimeout(()=>{try{buildLetter(input);endCeremony();$('result').scrollIntoView({behavior:'smooth'});const heading=$('result').querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}catch(err){endCeremony();$('error').textContent='鑑定の計算に失敗しました。生年月日をご確認ください。';console.error(err);}},7000);});
 $('form').addEventListener('reset',()=>{endCeremony();['letter','calculation'].forEach(id=>$(id).replaceChildren());$('result').hidden=true;$('error').textContent='';});$('print').addEventListener('click',()=>window.print());
}
if(typeof module!=='undefined')module.exports={KATAKAMUNA_DATA,kataMeaning,closingReading,SOUND_DATA,normalizeReading,readSounds,isValidBirth,STAR_PRACTICE,VOICED_BASE};
