/* THE PLANT ROOM — interactions */
(function(){
  "use strict";
  /* live Tampa time + presence chip */
  var clock=document.getElementById("clock");
  function tick(){
    if(!clock) return;
    try{
      var t=new Date().toLocaleTimeString("en-US",{timeZone:"America/New_York",hour:"numeric",minute:"2-digit",hour12:true});
      var h=new Date(new Date().toLocaleString("en-US",{timeZone:"America/New_York"})).getHours();
      var open=h>=7&&h<19;
      clock.textContent="TAMPA "+t+" · "+(open?"OPEN NOW":"NEXT DISPATCH 7 AM");
    }catch(e){ clock.textContent="TAMPA · (813) 626-7717"; }
  }
  tick(); setInterval(tick,1000);

  /* hamburger */
  var burger=document.getElementById("burger"), mnav=document.getElementById("mobile-nav");
  if(burger){ burger.addEventListener("click",function(){
    var open=mnav.classList.toggle("open");
    burger.setAttribute("aria-expanded",open?"true":"false");
    burger.setAttribute("aria-label",open?"Close menu":"Open menu");
  });
  mnav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){mnav.classList.remove("open");});}); }

  /* stepper */
  var answers={type:null,sqft:null,age:null,when:null}, cur=1;
  var steps=Array.prototype.slice.call(document.querySelectorAll(".step"));
  var fill=document.getElementById("step-fill"), num=document.getElementById("step-num");
  var nextBtn=document.getElementById("step-next"), backBtn=document.getElementById("step-back");
  function show(n){
    cur=n;
    steps.forEach(function(s){ s.hidden = +s.dataset.step!==n; });
    fill.style.width=(n/5*100)+"%";
    num.textContent=Math.min(n,4);
    backBtn.hidden=(n===1||n===5);
    nextBtn.style.display=(n===5)?"none":"";
    nextBtn.disabled=!answers[["","type","sqft","age","when"][n]];
  }
  document.querySelectorAll(".step[data-step]").forEach(function(step){
    step.querySelectorAll(".chip").forEach(function(chip){
      chip.addEventListener("click",function(){
        step.querySelectorAll(".chip").forEach(function(c){c.classList.remove("sel");c.setAttribute("aria-pressed","false");});
        chip.classList.add("sel"); chip.setAttribute("aria-pressed","true");
        answers[["","type","sqft","age","when"][+step.dataset.step]]=chip.dataset.val;
        nextBtn.disabled=false;
      });
    });
  });
  nextBtn.addEventListener("click",function(){
    if(cur<4){ show(cur+1); return; }
    var sum="Building: "+answers.type+" · Roof: "+answers.sqft+" sq ft · Age: "+answers.age+" · Call me: "+answers.when;
    document.getElementById("step-summary").textContent=sum;
    document.getElementById("step-send").href="mailto:mlong@serviceworksroofing.com?subject="+encodeURIComponent("Roof walk-through request — "+answers.type)+
      "&body="+encodeURIComponent(sum+"\n\n— sent from the Service Works website");
    show(5);
  });
  backBtn.addEventListener("click",function(){ if(cur>1) show(cur-1); });
  show(1);

  /* layer explorer */
  var layers=[
    {k:"LAYER 01 — TRAFFIC SURFACE",t:"Walk pads + coating",d:"Sacrificial paths at the HVAC curbs take the foot traffic so the membrane doesn't. A silicone coat over dry bones buys 10–15 more years — no tear-off."},
    {k:"LAYER 02 — MEMBRANE",t:"60-mil TPO",d:"Heat-welded seams, stronger than the sheet itself. White surface cuts cooling load. 20-year NDL warranty available."},
    {k:"LAYER 03 — ARMOR",t:"Cover board",d:"High-density board that takes hail and foot traffic before the membrane ever feels it. Skipping it is how 20-year roofs die at 12."},
    {k:"LAYER 04 — DRAINAGE",t:"Tapered insulation",d:"¼″-per-foot taper pulls water to the drains. Standing water past 48 hours voids most warranties — the taper is what kills ponding."},
    {k:"LAYER 05 — STRUCTURE",t:"Steel deck",d:"We inspect it for rust and deflection before you spend a dollar. If the deck is compromised, you hear it from us first."},
    {k:"PENETRATIONS",t:"HVAC curbs",d:"Every curb gets a raised, flashed detail — this is where most leaks start. More curbs, more detail work, more line items in the quote."}
  ];
  var sk=document.getElementById("spec-k"),st=document.getElementById("spec-t"),sd=document.getElementById("spec-d");
  function setLayer(i){
    document.querySelectorAll(".lyr").forEach(function(g){g.classList.toggle("active",+g.dataset.layer===i);});
    sk.textContent=layers[i].k; st.textContent=layers[i].t; sd.textContent=layers[i].d;
  }
  document.querySelectorAll(".lyr").forEach(function(g){
    g.addEventListener("click",function(){setLayer(+g.dataset.layer);});
    g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();setLayer(+g.dataset.layer);}});
  });
  setLayer(1);

  /* TCO tool */
  var opts=[
    {name:"Silicone restoration",sub:"$2.90/sq ft · 12-yr life",rate:2.90,life:12},
    {name:"EPDM re-roof",sub:"$5.50/sq ft · 25-yr life",rate:5.50,life:25},
    {name:"TPO re-roof",sub:"$5.90/sq ft · 25-yr life",rate:5.90,life:25}
  ];
  var range=document.getElementById("tco-range"),area=document.getElementById("tco-area"),bars=document.getElementById("tco-bars");
  var fmt=function(n){return "$"+Math.round(n).toLocaleString("en-US");};
  function renderTCO(){
    var a=+range.value;
    area.textContent=a.toLocaleString("en-US");
    var rows=opts.map(function(o){var total=a*o.rate;return Object.assign({},o,{total:total,yr:total/o.life});})
      .sort(function(x,y){return x.yr-y.yr;});
    var max=rows[rows.length-1].yr;
    bars.innerHTML=rows.map(function(r,i){
      return '<div class="tco-row"><div class="tco-name">'+r.name+'<small>'+r.sub+'</small></div>'+
        '<div><div class="tco-barwrap"><div class="tco-bar'+(i===0?' best':'')+'" style="width:'+Math.max(8,Math.round(r.yr/max*100))+'%">'+
        '<span class="tco-yr">'+fmt(r.yr)+'/yr'+(i===0?' ★':'')+'</span></div></div>'+
        '<div class="tco-total">'+fmt(r.total)+' total over '+r.life+' years</div></div></div>';
    }).join("");
  }
  range.addEventListener("input",renderTCO); renderTCO();

  /* reveals: wipe/blur entrances, one-shot, with backstop */
  var rev=document.querySelectorAll("[data-reveal]");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
    rev.forEach(function(el){io.observe(el);});
  }
  setTimeout(function(){rev.forEach(function(el){el.classList.add("in");});},3500);

  /* mobile bar: show after hero, hide over final CTA */
  var bar=document.getElementById("mobile-bar"),hero=document.querySelector(".hero"),final=document.getElementById("final-cta");
  function barState(){
    var hy=hero.getBoundingClientRect().bottom<0;
    var fr=final.getBoundingClientRect();
    var overFinal=fr.top<innerHeight&&fr.bottom>0;
    bar.classList.toggle("show",hy&&!overFinal);
  }
  addEventListener("scroll",barState,{passive:true}); barState();
})();
