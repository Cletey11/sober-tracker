const app=document.getElementById("app");
async function data(){const r=await fetch("/api/leaderboard");return r.json()}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
async function render(){
 try{
  const d=await data();
  app.innerHTML=`<section class="hero"><div class="badge">SOBER STREAK</div><h1>Keep the streak going.</h1><p>Six guys. One goal: <strong>more sober days.</strong></p></section>
  <section class="summary"><div><span>Group total</span><strong>${d.total}</strong><small>sober days</small></div><div><span>Group average</span><strong>${d.average}</strong><small>days per person</small></div></section>
  <section class="leaderboard"><span class="eyebrow">THE LEADERBOARD</span><h2>Who's leading the way?</h2>
  ${d.members.map((m,i)=>`<div class="row ${i===0?"first":""}"><div class="rank">${i===0?"🏆":i===1?"🥈":i===2?"🥉":i+1}</div><div class="name">${esc(m.name)}</div><div class="days"><strong>${m.sober_days}</strong><span>days sober</span></div><button onclick="openUpdate(${m.id},'${esc(m.name)}')">Add days</button></div>`).join("")}</section>
  <section class="how"><h2>Keep it simple.</h2><p>Select a name and add the number of sober days earned. The leaderboard does the rest.</p></section><div id="modal" class="modal hidden"></div>`;
 }catch(e){app.innerHTML=`<div class="error-card"><h1>Oops.</h1><p>Could not load the leaderboard.</p><button onclick="render()">Try again</button></div>`}
}
window.openUpdate=(id,name)=>{const m=document.getElementById("modal");m.className="modal";m.innerHTML=`<div class="modal-box"><button class="close" onclick="closeModal()">×</button><span class="eyebrow">UPDATE STREAK</span><h2>${esc(name)}</h2><p>How many additional sober days?</p><input id="amount" type="number" min="1" max="3650" value="1"><button class="save" onclick="saveDays(${id})">Add sober days</button><p id="err"></p></div>`};
window.closeModal=()=>document.getElementById("modal").className="modal hidden";
window.saveDays=async id=>{const amount=Number(document.getElementById("amount").value),err=document.getElementById("err");if(!Number.isInteger(amount)||amount<1||amount>3650){err.textContent="Enter a whole number from 1 to 3650.";return}try{const r=await fetch("/api/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,amount})});const d=await r.json();if(!r.ok)throw Error(d.error);closeModal();render()}catch(e){err.textContent=e.message}};
render();
