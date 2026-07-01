// Brand-agnostic study-guide renderer. Canonical source; vendored into client projects
// via `npm run sync`. Self-contained (own <head> + CSS), themed by the client's BRAND
// (logo + names + optional brand.guideAccent). No dependency on the real-estate _lib.js.
//
//   renderGuide(brand, guide, { section, basePath })  → full HTML page (overview or one section)
//   renderGate(brand, { error, action })              → brand-themed password screen
//   escapeHtml(s)                                      → exported for the route
//
// Routing model mirrors the dashboard: one route, `?s=<sectionId>` selects a section;
// no `?s` shows the overview/table of contents.

export function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ── client-side quiz engine ───────────────────────────────────────────────
// Runs one section's practice questions as a real quiz: pick a mode and how many
// questions, drawn at random and shown one at a time. Two modes:
//   coach — reveals the answer + explanation and a running score after each pick.
//   exam  — no answers or score until the very end; closer to the real test.
// Reads its questions from the #quiz-data JSON island on the page, so this string
// is static and reused verbatim by every section. Written without template literals
// / ${...} so it can live inside a server template literal. If JS is off, the
// <noscript> reveal-list fallback in renderSection() stands in.
const QUIZ_JS = `(function(){
  var pool = JSON.parse(document.getElementById('quiz-data').textContent);
  var root = document.getElementById('quiz-root');
  if(!pool.length || !root) return;
  var LTR = ['A','B','C','D','E'];
  var PASS = 73;
  var MODES = { coach: 'Shows the answer and your running score after each question.', exam: 'No answers or score until the end \\u2014 closer to the real thing.' };
  var order = [], answers = [], idx = 0, mode = 'coach';

  function esc(s){ var d=document.createElement('div'); d.textContent=(s==null?'':String(s)); return d.innerHTML; }
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function scored(){ var n=0; for(var i=0;i<answers.length;i++){ if(answers[i] && answers[i].correct) n++; } return n; }

  function setup(){
    var n = pool.length;
    var raw = [5,10,20,n], seen = {}, presets = [];
    for(var i=0;i<raw.length;i++){ var v=raw[i]; if(v>=1 && v<=n && !seen[v]){ seen[v]=1; presets.push(v); } }
    var def = presets.indexOf(10) > -1 ? 10 : n;
    var chips = '';
    for(var k=0;k<presets.length;k++){ var v=presets[k]; var lab=(v===n?('All '+n):String(v)); chips += '<button type="button" class="qz-chip'+(v===def?' on':'')+'" data-n="'+v+'">'+lab+'</button>'; }
    root.innerHTML =
      '<div class="qz-setup">'+
        '<div class="qz-field"><div class="qz-label">Mode</div>'+
          '<div class="qz-counts">'+
            '<button type="button" class="qz-chip'+(mode==='coach'?' on':'')+'" data-mode="coach">Coached</button>'+
            '<button type="button" class="qz-chip'+(mode==='exam'?' on':'')+'" data-mode="exam">Exam</button>'+
          '</div>'+
          '<p class="qz-hint" id="qz-hint">'+MODES[mode]+'</p>'+
        '</div>'+
        '<div class="qz-field"><div class="qz-label">Questions</div><div class="qz-counts" id="qz-counts">'+chips+'</div></div>'+
        '<div class="qz-actions center"><button type="button" class="qz-btn" id="qz-go">Start quiz \\u2192</button></div>'+
      '</div>';
    var modeEls = root.querySelectorAll('.qz-chip[data-mode]');
    for(var d=0;d<modeEls.length;d++){ (function(el){ el.addEventListener('click', function(){
      mode = el.getAttribute('data-mode');
      for(var m=0;m<modeEls.length;m++){ modeEls[m].classList.toggle('on', modeEls[m]===el); }
      document.getElementById('qz-hint').textContent = MODES[mode];
    }); })(modeEls[d]); }
    var countEls = root.querySelectorAll('#qz-counts .qz-chip');
    var chosen = def;
    for(var c=0;c<countEls.length;c++){ (function(el){ el.addEventListener('click', function(){
      chosen = parseInt(el.getAttribute('data-n'),10);
      for(var m=0;m<countEls.length;m++){ countEls[m].classList.toggle('on', countEls[m]===el); }
    }); })(countEls[c]); }
    document.getElementById('qz-go').addEventListener('click', function(){ start(chosen); });
  }

  function start(count){
    var ids = []; for(var i=0;i<pool.length;i++){ ids.push(i); }
    order = shuffle(ids).slice(0,count);
    answers = []; idx = 0; question();
  }

  function question(){
    var q = pool[order[idx]];
    var pct = Math.round(idx/order.length*100);
    var choices = '';
    for(var j=0;j<q.choices.length;j++){ choices += '<li><button type="button" class="qz-choice" data-i="'+j+'"><span class="ltr">'+LTR[j]+'</span><span>'+esc(q.choices[j])+'</span></button></li>'; }
    var right = mode==='coach' ? ('Score '+scored()+'/'+idx) : 'Exam mode';
    root.innerHTML =
      '<div class="qz-meta"><span>Question '+(idx+1)+' of '+order.length+'</span><span>'+right+'</span></div>'+
      '<div class="qz-bar"><span style="width:'+pct+'%"></span></div>'+
      '<div class="qz-q">'+esc(q.q)+'</div>'+
      '<ul class="qz-choices">'+choices+'</ul>'+
      '<div class="qz-after"></div>';
    var btns = root.querySelectorAll('.qz-choice');
    for(var b=0;b<btns.length;b++){ (function(el){ el.addEventListener('click', function(){
      var choice = parseInt(el.getAttribute('data-i'),10);
      if(mode==='coach') pickCoach(choice); else pickExam(choice);
    }); })(btns[b]); }
  }

  function advance(last){ if(last) results(); else { idx++; question(); } }

  function pickCoach(choice){
    var q = pool[order[idx]];
    var correct = choice === q.answer;
    answers[idx] = { i: order[idx], choice: choice, correct: correct };
    var btns = root.querySelectorAll('.qz-choice');
    for(var b=0;b<btns.length;b++){ var el=btns[b], j=parseInt(el.getAttribute('data-i'),10); el.disabled=true; if(j===q.answer) el.classList.add('correct'); else if(j===choice) el.classList.add('wrong'); }
    var last = idx === order.length-1;
    root.querySelector('.qz-after').innerHTML =
      '<div class="qz-fb '+(correct?'ok':'no')+'">'+(correct?'Correct.':('Not quite \\u2014 the answer is '+LTR[q.answer]+'.'))+'</div>'+
      '<div class="qz-explain">'+esc(q.explain)+'</div>'+
      '<div class="qz-actions"><button type="button" class="qz-btn" id="qz-next">'+(last?'See results \\u2192':'Next question \\u2192')+'</button></div>';
    document.getElementById('qz-next').addEventListener('click', function(){ advance(last); });
  }

  // Exam mode: record the pick with no reveal; the choice can be changed until Next.
  function pickExam(choice){
    var q = pool[order[idx]];
    answers[idx] = { i: order[idx], choice: choice, correct: choice === q.answer };
    var btns = root.querySelectorAll('.qz-choice');
    for(var b=0;b<btns.length;b++){ var el=btns[b]; el.classList.toggle('sel', parseInt(el.getAttribute('data-i'),10)===choice); }
    var last = idx === order.length-1;
    var after = root.querySelector('.qz-after');
    if(!document.getElementById('qz-next')){
      after.innerHTML = '<div class="qz-actions"><button type="button" class="qz-btn" id="qz-next">'+(last?'Finish \\u2192':'Next question \\u2192')+'</button></div>';
      document.getElementById('qz-next').addEventListener('click', function(){ advance(last); });
    }
  }

  function results(){
    var n = order.length, c = scored(), pct = Math.round(c/n*100), passed = pct>=PASS;
    var missed = []; for(var i=0;i<answers.length;i++){ if(!answers[i].correct) missed.push(answers[i]); }
    root.innerHTML =
      '<div class="qz-results">'+
        '<div class="qz-score">'+c+' / '+n+'</div>'+
        '<div class="qz-pct '+(passed?'ok':'no')+'">'+pct+'% '+(passed?'\\u2014 passing pace \\ud83d\\udc4d':'\\u2014 keep studying')+'</div>'+
        '<p class="qz-sub">Passing the real exam is roughly '+PASS+'%. '+(passed?'Nice work.':'Aim for ~75% before you book.')+'</p>'+
        '<div class="qz-actions center">'+(missed.length?'<button type="button" class="qz-btn ghost" id="qz-review">Review '+missed.length+' missed</button>':'')+'<button type="button" class="qz-btn" id="qz-again">Take another \\u2192</button></div>'+
        '<div class="qz-review"></div>'+
      '</div>';
    document.getElementById('qz-again').addEventListener('click', setup);
    if(missed.length){
      var rv = document.getElementById('qz-review');
      document.getElementById('qz-review').addEventListener('click', function(){
        var html = '';
        for(var i=0;i<missed.length;i++){ var a=missed[i], q=pool[a.i];
          html += '<div class="qz-rev"><div class="qz-q">'+esc(q.q)+'</div>'+
            '<div class="qz-fb no">You chose '+LTR[a.choice]+' \\u2014 '+esc(q.choices[a.choice])+'</div>'+
            '<div class="qz-fb ok">Answer: '+LTR[q.answer]+' \\u2014 '+esc(q.choices[q.answer])+'</div>'+
            '<div class="qz-explain">'+esc(q.explain)+'</div></div>';
        }
        rv.innerHTML = html; this.style.display='none';
      });
    }
  }

  document.addEventListener('keydown', function(e){
    if(/^[1-9]$/.test(e.key)){ var b=root.querySelector('.qz-choice[data-i="'+(parseInt(e.key,10)-1)+'"]'); if(b && !b.disabled) b.click(); }
    else if(e.key==='Enter'){ var btn=document.getElementById('qz-next')||document.getElementById('qz-go')||document.getElementById('qz-again'); if(btn){ e.preventDefault(); btn.click(); } }
  });

  setup();
})();`;

// ── shared chrome ───────────────────────────────────────────────────────
function chrome(brand, title, inner) {
  const accent = brand.guideAccent || '#1b1e22';
  const accentDk = brand.guideAccentDk || '#000000';
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#191c20">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --paper:#f4f2ee;--white:#fff;--ink:#1b1e22;--graphite:#191c20;--muted:#6b7178;
    --line:#e2ded6;--line-2:#d2cdc2;--accent:${accent};--accent-dk:${accentDk};
    --sans:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:15.5px;line-height:1.65;-webkit-font-smoothing:antialiased;padding:clamp(18px,4vw,40px)}
  a{color:var(--accent-dk);text-decoration:none}a:hover{color:var(--accent)}
  .wrap{max-width:860px;margin:0 auto}
  .brand{display:inline-flex;align-items:center;gap:11px;color:var(--graphite)}
  .brand-logo,.brand img{height:40px;width:auto;display:block}
  .topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px}
  .topbar .back{font-size:13px;color:var(--muted);font-weight:600}
  .topbar .back:hover{color:var(--graphite)}
  .eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--accent-dk)}
  h1{color:var(--graphite);font-weight:800;font-size:clamp(26px,4.5vw,38px);line-height:1.07;letter-spacing:-.8px;margin-top:6px}
  .lede{color:var(--ink);font-size:16px;max-width:64ch;margin-top:12px}
  .panel{background:var(--white);border:1px solid var(--line);border-radius:11px;padding:clamp(16px,3vw,26px);margin-top:18px}
  .panel h2{color:var(--graphite);font-weight:800;font-size:20px;letter-spacing:-.3px;margin-bottom:12px}
  .panel h3{color:var(--graphite);font-weight:700;font-size:14px;letter-spacing:.4px;text-transform:uppercase;margin:18px 0 9px;color:var(--accent-dk)}

  /* exam facts */
  .facts{list-style:none;display:grid;gap:8px}
  .facts li{padding-left:22px;position:relative;font-size:14.5px}
  .facts li::before{content:"";position:absolute;left:2px;top:9px;width:7px;height:7px;border-radius:50%;background:var(--accent)}

  /* TOC */
  .toc{list-style:none;display:flex;flex-direction:column;gap:10px}
  .toc a{display:flex;align-items:center;gap:14px;border:1px solid var(--line);border-radius:10px;padding:14px 16px;background:var(--paper);color:var(--ink)}
  .toc a:hover{border-color:var(--accent);background:#fff}
  .toc .wt{flex:none;width:54px;text-align:center;font-weight:800;color:var(--accent-dk);font-size:17px}
  .toc .wt small{display:block;font-size:9.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted)}
  .toc .tt{font-weight:700;color:var(--graphite);font-size:15.5px}
  .toc .tt small{display:block;font-weight:500;color:var(--muted);font-size:12.5px;margin-top:1px}
  .toc .go{margin-left:auto;color:var(--muted)}

  /* concept list */
  .key{list-style:none;display:grid;gap:11px}
  .key li{padding-left:22px;position:relative;font-size:15px}
  .key li::before{content:"\\2713";position:absolute;left:0;top:0;color:var(--accent);font-weight:800}

  /* numbers table */
  .nums{width:100%;border-collapse:collapse;font-size:14.5px;margin-top:4px}
  .nums td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
  .nums tr:last-child td{border-bottom:none}
  .nums .lab{color:var(--graphite);font-weight:600;width:46%}
  .nums .val{color:var(--ink);font-weight:700}
  .nums .src{display:block;color:var(--muted);font-weight:500;font-size:12px;margin-top:2px}

  /* math */
  .math{border:1px solid var(--line);border-radius:9px;padding:13px 15px;background:var(--paper);margin-top:10px}
  .math .mq{font-weight:700;color:var(--graphite)}
  .math .w{color:var(--ink);font-size:14px;margin-top:5px}
  .math .a{margin-top:6px;font-weight:700;color:var(--accent-dk)}

  /* practice questions — options visible, answer reveals on click */
  .q{border:1px solid var(--line);border-radius:10px;padding:15px 16px;margin-top:12px;background:#fff}
  .qq{font-weight:700;color:var(--graphite);font-size:15px}
  .q .choices{list-style:none;display:grid;gap:7px;margin:11px 0 6px}
  .q .choices li{font-size:14.5px;color:var(--ink);padding:8px 11px 8px 34px;position:relative;border:1px solid var(--line);border-radius:7px;background:var(--paper)}
  .q .choices li .ltr{position:absolute;left:12px;top:8px;font-weight:800;color:var(--accent-dk)}
  details.ans{margin-top:4px}
  details.ans>summary{list-style:none;cursor:pointer;display:inline-block;font-size:13px;font-weight:700;color:var(--accent-dk);border:1.5px solid var(--line-2);border-radius:7px;padding:7px 14px;background:var(--paper)}
  details.ans>summary::-webkit-details-marker{display:none}
  details.ans>summary:hover{border-color:var(--accent)}
  details.ans[open]>summary{margin-bottom:9px}
  .ansbody{padding:11px 13px;border-radius:8px;background:#f1f6ec;border:1px solid #cfe0bf;font-size:14px;color:var(--ink)}
  .ansbody b{display:block;color:#3a5a2a;margin-bottom:3px}
  .reveal{font-size:12.5px;color:var(--muted);font-weight:600;margin-top:2px}

  /* section nav */
  .pager{display:flex;justify-content:space-between;gap:12px;margin-top:22px}
  .pager a{flex:1;border:1px solid var(--line);border-radius:9px;padding:13px 15px;background:#fff}
  .pager a:hover{border-color:var(--accent)}
  .pager .dir{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);font-weight:700}
  .pager .nm{font-weight:700;color:var(--graphite);font-size:14.5px}
  .pager .next{text-align:right}
  .pager .ph{flex:1}

  .note{color:var(--muted);font-size:12.5px;margin-top:18px;font-style:italic;max-width:70ch}
  .srclist{list-style:none;display:grid;gap:6px;margin-top:4px}
  .srclist a{font-size:13.5px;color:var(--accent-dk)}
  .srclist li{padding-left:16px;position:relative}
  .srclist li::before{content:"\\2197";position:absolute;left:0;top:0;color:var(--muted)}
  .cta{display:inline-block;margin-top:16px;font-weight:700;font-size:15px;color:#fff;background:var(--accent);border:2px solid var(--accent);border-radius:8px;padding:12px 22px}
  .cta:hover{background:var(--accent-dk);border-color:var(--accent-dk);color:#fff}
  .badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.5px;color:var(--accent-dk);background:var(--paper);border:1px solid var(--line-2);border-radius:999px;padding:3px 10px;vertical-align:middle}

  /* reusable "?" help icon — hover on desktop, tap/click (focus) on touch.
     Rendered by the qmark() helper below. No JS. */
  .qmark{position:relative;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:6px;border-radius:50%;background:var(--accent);color:#fff;font-size:11px;font-weight:800;line-height:1;cursor:help;vertical-align:middle;user-select:none;-webkit-tap-highlight-color:transparent}
  .qmark:hover,.qmark:focus{background:var(--accent-dk);outline:none}
  .qmark-pop{position:absolute;left:50%;bottom:calc(100% + 9px);transform:translateX(-50%);width:max-content;max-width:min(300px,72vw);background:var(--graphite);color:#f4f2ee;font-size:13px;font-weight:500;line-height:1.5;text-align:left;padding:11px 13px;border-radius:9px;box-shadow:0 10px 28px rgba(0,0,0,.24);opacity:0;visibility:hidden;transition:opacity .12s ease;z-index:30}
  .qmark-pop::after{content:"";position:absolute;left:50%;top:100%;transform:translateX(-50%);border:6px solid transparent;border-top-color:var(--graphite)}
  .qmark:hover .qmark-pop,.qmark:focus .qmark-pop,.qmark:focus-within .qmark-pop{opacity:1;visibility:visible}

  /* quiz */
  #quiz-root{min-height:96px}
  .qz-setup{text-align:center;padding:4px 0}
  .qz-sub{color:var(--muted);font-size:14.5px;max-width:58ch;margin:0 auto}
  .qz-field{margin:18px 0}
  .qz-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:2px}
  .qz-hint{font-size:13px;color:var(--muted);margin-top:6px;min-height:1.2em}
  .qz-counts{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin:10px 0 0}
  .qz-chip{font-weight:700;font-size:15px;border:1.5px solid var(--line-2);background:var(--paper);color:var(--graphite);border-radius:8px;padding:10px 18px;cursor:pointer;font-family:inherit}
  .qz-chip:hover{border-color:var(--accent)}
  .qz-chip.on{background:var(--accent);border-color:var(--accent);color:#fff}
  .qz-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:18px;flex-wrap:wrap}
  .qz-actions.center{justify-content:center}
  .qz-btn{font-weight:700;font-size:15px;color:#fff;background:var(--accent);border:2px solid var(--accent);border-radius:8px;padding:12px 22px;cursor:pointer;font-family:inherit}
  .qz-btn:hover{background:var(--accent-dk);border-color:var(--accent-dk)}
  .qz-btn.ghost{background:var(--paper);color:var(--accent-dk);border-color:var(--line-2)}
  .qz-btn.ghost:hover{background:#fff;border-color:var(--accent)}
  .qz-meta{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px}
  .qz-bar{height:6px;border-radius:999px;background:var(--line);overflow:hidden;margin:9px 0 18px}
  .qz-bar span{display:block;height:100%;background:var(--accent);transition:width .25s ease}
  .qz-q{font-weight:700;color:var(--graphite);font-size:17px;line-height:1.4}
  .qz-choices{list-style:none;display:grid;gap:10px;margin:16px 0 0}
  .qz-choice{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;font-size:15px;color:var(--ink);border:1.5px solid var(--line);border-radius:9px;padding:13px 15px;background:#fff;cursor:pointer;font-family:inherit;line-height:1.5}
  .qz-choice:hover:not(:disabled){border-color:var(--accent);background:var(--paper)}
  .qz-choice .ltr{font-weight:800;color:var(--accent-dk);flex:none}
  .qz-choice:disabled{cursor:default}
  .qz-choice.sel{border-color:var(--accent);background:var(--paper);box-shadow:inset 0 0 0 1px var(--accent)}
  .qz-choice.correct{background:#f1f6ec;border-color:#7fae5a}
  .qz-choice.correct .ltr{color:#3a5a2a}
  .qz-choice.wrong{background:#fbecea;border-color:#d68b7d}
  .qz-choice.wrong .ltr{color:#b3402a}
  .qz-fb{font-weight:700;font-size:14.5px;margin-top:16px}
  .qz-fb.ok{color:#3a5a2a}.qz-fb.no{color:#b3402a}
  .qz-explain{font-size:14px;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-top:9px}
  .qz-results{text-align:center;padding:8px 0}
  .qz-score{font-size:clamp(44px,9vw,60px);font-weight:800;color:var(--graphite);line-height:1}
  .qz-pct{font-size:18px;font-weight:800;margin-top:8px}
  .qz-pct.ok{color:#3a5a2a}.qz-pct.no{color:#b3402a}
  .qz-review{margin-top:22px;text-align:left;display:grid;gap:14px}
  .qz-rev{border:1px solid var(--line);border-radius:10px;padding:14px 15px;background:#fff}
  .qz-rev .qz-q{font-size:15px;margin-bottom:9px}
  .qz-rev .qz-fb{margin-top:6px}
  .qz-fallback{margin-top:6px}

  /* gate */
  .gate{min-height:78vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:15px}
  .gate h2{font-size:23px;color:var(--graphite);font-weight:800}
  .gate p{color:var(--muted);max-width:38ch}
  .gate form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:4px}
  .gate input{font-size:15px;color:var(--ink);background:#fff;border:1.5px solid var(--line-2);border-radius:7px;padding:13px 15px;min-width:230px}
  .gate input:focus{outline:none;border-color:var(--accent)}
  .gate button{font-weight:700;font-size:15px;border:2px solid var(--accent);background:var(--accent);color:#fff;border-radius:7px;padding:13px 24px;cursor:pointer}
  .gate button:hover{background:var(--accent-dk);border-color:var(--accent-dk)}
  .err{color:#b3402a;font-size:13px;min-height:1em}
  @media(max-width:560px){.pager{flex-direction:column}}
</style>
</head><body><main class="wrap">${inner}</main></body></html>`;
}

const logo = (brand) => brand.brandHtml || `<span class="brand-logo">${escapeHtml(brand.legalName || brand.name || '')}</span>`;

// Reusable "?" help icon with a hover/tap popup. Pass the plain-english note; returns
// '' when there's nothing to explain, so callers can inline it unconditionally.
const qmark = (why) => !why ? '' :
  `<span class="qmark" tabindex="0" role="button" aria-label="Why this rule?">?<span class="qmark-pop">${escapeHtml(why)}</span></span>`;

// ── overview / table of contents ────────────────────────────────────────
function renderOverview(brand, guide, basePath) {
  const facts = (guide.examFacts || []).map((f) => `<li>${escapeHtml(f)}</li>`).join('');
  const toc = guide.sections.map((s) => `
    <a href="${basePath}?s=${encodeURIComponent(s.id)}">
      <span class="wt">${s.weight}%<small>of exam</small></span>
      <span class="tt">${escapeHtml(s.title)}<small>${(s.key && s.key.length) || 0} key points · ${(s.questions && s.questions.length) || 0}-question quiz</small></span>
      <span class="go">→</span>
    </a>`).join('');
  const sources = (guide.sources || []).map((s) =>
    `<li><a href="${escapeHtml(s.href)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`).join('');
  const inner = `
  <div class="topbar"><a class="brand" href="/">${logo(brand)}</a><a class="back" href="/dashboard?view=resources">← Back to resources</a></div>
  <span class="eyebrow">Study guide · built for you</span>
  <h1>${escapeHtml(guide.title)}</h1>
  <p class="lede">${escapeHtml(guide.subtitle || '')}</p>
  <section class="panel">
    <h2>What the exam is</h2>
    <ul class="facts">${facts}</ul>
  </section>
  <section class="panel">
    <h2>The seven sections <span class="badge">heaviest first</span></h2>
    <p class="note">The CSLB doesn't release its real exam questions, so these aren't the official ones. We know the material cold and engineered every question from the same verified law and sources the exam draws on. Treat it as strong practice built to teach the material, not a copy of the test.</p>
    <div class="toc">${toc}</div>
  </section>
  <section class="panel">
    <h2>Where this comes from</h2>
    <ul class="srclist">${sources}</ul>
    <p class="note">Grounded in the official sources above; figures verified as of ${escapeHtml(guide.verifiedAsOf || '')}. Tax, wage, and safety numbers change — confirm the current figure against the cited source before you rely on it. This guide is a study aid, not legal advice.</p>
  </section>`;
  return chrome(brand, guide.title, inner);
}

// ── one section ─────────────────────────────────────────────────────────
function renderSection(brand, guide, section, basePath) {
  const idx = guide.sections.findIndex((s) => s.id === section.id);
  const prev = guide.sections[idx - 1];
  const next = guide.sections[idx + 1];

  // A key item is either a plain string or { t: text, why: "explain the madness" }.
  const key = (section.key || []).map((k) => {
    const text = typeof k === 'string' ? k : k.t;
    const why = typeof k === 'string' ? '' : k.why;
    return `<li>${escapeHtml(text)}${qmark(why)}</li>`;
  }).join('');
  const nums = (section.numbers || []).map((n) =>
    `<tr><td class="lab">${escapeHtml(n.label)}</td><td class="val">${escapeHtml(n.value)}<span class="src">${escapeHtml(n.src)}</span></td></tr>`).join('');
  const math = (section.math || []).map((m) => `
    <div class="math">
      <div class="mq">${escapeHtml(m.prompt)}${qmark(m.why)}</div>
      <details class="ans">
        <summary>Reveal answer</summary>
        <div class="w">${escapeHtml(m.work)}</div>
        <div class="a">Answer: ${escapeHtml(m.answer)}</div>
      </details>
    </div>`).join('');
  const ltr = ['A', 'B', 'C', 'D', 'E'];
  // Question bank for the interactive quiz (answer index stays client-side — fine for a study aid).
  const quizPool = (section.questions || []).map((q) =>
    ({ q: q.q, choices: q.choices, answer: q.answer, explain: q.explain }));
  const quizJson = JSON.stringify(quizPool).replace(/</g, '\\u003c'); // keep </script> from closing the tag
  // Static reveal-list, shown only as the no-JS fallback below.
  const qs = (section.questions || []).map((q, i) => {
    const choices = q.choices.map((c, j) =>
      `<li><span class="ltr">${ltr[j]}</span>${escapeHtml(c)}</li>`).join('');
    return `<div class="q">
      <div class="qq">${i + 1}. ${escapeHtml(q.q)}${qmark(q.why)}</div>
      <ul class="choices">${choices}</ul>
      <details class="ans">
        <summary>Reveal answer</summary>
        <div class="ansbody"><b>${ltr[q.answer]} — ${escapeHtml(q.choices[q.answer])}</b>${escapeHtml(q.explain)}</div>
      </details>
    </div>`;
  }).join('');

  const pager = `
  <div class="pager">
    ${prev ? `<a href="${basePath}?s=${encodeURIComponent(prev.id)}"><div class="dir">← Previous</div><div class="nm">${escapeHtml(prev.title)}</div></a>` : `<span class="ph"></span>`}
    ${next ? `<a class="next" href="${basePath}?s=${encodeURIComponent(next.id)}"><div class="dir">Next →</div><div class="nm">${escapeHtml(next.title)}</div></a>` : `<a class="next" href="${basePath}"><div class="dir">Done →</div><div class="nm">Back to contents</div></a>`}
  </div>`;

  const inner = `
  <div class="topbar"><a class="brand" href="/">${logo(brand)}</a><a class="back" href="${basePath}">← All sections</a></div>
  <span class="eyebrow">${section.weight}% of the exam</span>
  <h1>${escapeHtml(section.title)}</h1>
  <p class="lede">${escapeHtml(section.intro || '')}</p>
  <section class="panel">
    <h2>What to know</h2>
    <ul class="key">${key}</ul>
    ${nums ? `<h3>Numbers to memorize</h3><table class="nums">${nums}</table>` : ''}
    ${math ? `<h3>Worked examples</h3>${math}` : ''}
  </section>
  ${quizPool.length ? `<section class="panel">
    <h2>Quiz yourself</h2>
    <div id="quiz-root"></div>
    <noscript>
      <p class="reveal">Turn on JavaScript for the interactive quiz. Meanwhile: read the options, pick your answer, then hit “Reveal answer” to check it.</p>
      <div class="qz-fallback">${qs}</div>
    </noscript>
  </section>` : ''}
  ${pager}
  <p class="note">Section ${idx + 1} of ${guide.sections.length}. Figures verified as of ${escapeHtml(guide.verifiedAsOf || '')}; confirm time-sensitive numbers against the cited source. Study aid, not legal advice.</p>
  ${quizPool.length ? `<script id="quiz-data" type="application/json">${quizJson}</script>
  <script>${QUIZ_JS}</script>` : ''}`;
  return chrome(brand, `${section.title} · ${guide.title}`, inner);
}

// ── public entry points ─────────────────────────────────────────────────
export function renderGuide(brand, guide, { section, basePath = '/guide/law-business' } = {}) {
  const sec = section && guide.sections.find((s) => s.id === section);
  return sec ? renderSection(brand, guide, sec, basePath) : renderOverview(brand, guide, basePath);
}

export function renderGate(brand, { error = false, action = '' } = {}) {
  const inner = `
  <div class="gate">
    <a class="brand" href="/">${logo(brand)}</a>
    <h2>Your study guide</h2>
    <p>Enter your dashboard password to open the Law &amp; Business study guide we built for you.</p>
    <form method="post" action="${escapeHtml(action)}">
      <input type="password" name="pw" placeholder="Password" autofocus autocomplete="current-password" aria-label="Password">
      <button type="submit">Open the guide →</button>
    </form>
    <div class="err">${error ? 'Wrong password. Try again.' : ''}</div>
  </div>`;
  return chrome(brand, 'Study guide · ' + (brand.legalName || ''), inner);
}
