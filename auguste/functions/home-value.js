// GET /home-value — the seller-lead magnet ("What's my Emeryville condo worth?").
// A real Auguste valuation request, not an automated AVM. Posts to /api/lead.
import { page, escapeHtml, html } from './_lib.js';
import { BRAND } from './_data.js';

export function onRequestGet() {
  const meta = {
    path: '/home-value',
    title: "What's My Emeryville Condo Worth? | Auguste Realtor",
    description: 'Get a real, building-specific valuation of your Emeryville or East Bay condo from Auguste Vende — the specialist who sells your building.'
  };
  return html(page(BRAND, meta, body()));
}

function body() {
  return `<section class="band"><div class="wrap" style="max-width:760px">
    <div class="section-head">
      <span class="label">Seller Valuation</span>
      <h1 class="display" style="font-size:clamp(34px,5.5vw,58px);margin:12px 0 16px">What's your condo<br>actually worth?</h1>
      <p class="lede">Automated estimates miss what makes your unit different — the building, the floor, the view, the HOA. I'll send you a real, comp-backed valuation based on what your building actually trades for. No obligation.</p>
    </div>
    <form class="lead" id="leadform" onsubmit="return submitLead(event)">
      <input class="hp" type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="source" value="home-value">
      <input type="text" name="address" placeholder="Property address (building + unit)" required>
      <div class="row">
        <input type="text" name="name" placeholder="Your name" required>
        <input type="tel" name="phone" placeholder="Phone">
      </div>
      <input type="email" name="email" placeholder="Email" required>
      <textarea name="message" placeholder="Anything about the unit I should know? (upgrades, timing, tenant-occupied…)"></textarea>
      <button class="btn gold lg" type="submit">Get my valuation</button>
      <div class="form-msg" id="leadmsg" role="status"></div>
    </form>
    <p style="color:var(--muted);font-size:13.5px;margin-top:18px">Prefer to talk? Call or text Auguste at <a href="tel:${BRAND.phoneHref}" style="color:var(--gold-dk);font-weight:600">${escapeHtml(BRAND.phone)}</a>.</p>
  </div>
  <script>
  async function submitLead(e){
    e.preventDefault();
    var f=e.target, msg=document.getElementById('leadmsg'), btn=f.querySelector('button');
    var data={}; new FormData(f).forEach(function(v,k){data[k]=v;});
    msg.className='form-msg'; msg.textContent='Sending…'; btn.disabled=true;
    try{
      var r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      var j=await r.json();
      if(j.success){ f.reset(); msg.className='form-msg ok'; msg.textContent='Got it — I’ll send your valuation shortly.'; }
      else { msg.className='form-msg err'; msg.textContent=j.message||'Something went wrong. Please call (510) 421-6994.'; }
    }catch(err){ msg.className='form-msg err'; msg.textContent='Something went wrong. Please call (510) 421-6994.'; }
    btn.disabled=false;
  }
  </script>
  </section>`;
}
