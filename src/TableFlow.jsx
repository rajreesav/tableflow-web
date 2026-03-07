import { useState, useEffect, useRef } from "react";

const _style = document.createElement("style");
_style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  #root { width: 100%; height: 100%; overflow: hidden; }
  @keyframes tfPop    { 0%{transform:scale(0.82);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
  @keyframes tfFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes tfConfetti { 0%{transform:translateY(0) rotate(0deg) scale(1);opacity:1} 100%{transform:translateY(-140px) rotate(720deg) scale(0.5);opacity:0} }
  @keyframes tfGlow   { 0%,100%{box-shadow:0 0 0 0 rgba(217,72,15,0.35)} 50%{box-shadow:0 0 0 10px rgba(217,72,15,0)} }
  @keyframes tfSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes tfNotif  { 0%{transform:translateY(-60px);opacity:0} 15%{transform:translateY(0);opacity:1} 85%{transform:translateY(0);opacity:1} 100%{transform:translateY(-60px);opacity:0} }
`;
document.head.appendChild(_style);

const C = {
  bg:"#F8F5F0", card:"#FFFFFF", sage:"#84A98C", sageDark:"#6F8F7C",
  orange:"#D9480F", charcoal:"#2F3E46", sageTint:"#E8F0EA",
  border:"#E8E4DE", gray:"#9BA8AF", navyBg:"#1A1E21",
};

const IMG = {
  ribeye:    "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=85",
  pasta:     "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=85",
  tasting:   "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85",
  salad:     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=85",
  dessert:   "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=85",
  restaurant:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=85",
  profile:   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=85",
  kitchen:   "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=85",
};

const Img = ({ src, style={}, alt="" }) => {
  const [err, setErr] = useState(false);
  if (err) return <div style={{ background:`linear-gradient(135deg,${C.sageTint},${C.sageDark})`, ...style, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:24 }}>🍽️</span></div>;
  return <img src={src} alt={alt} style={{ objectFit:"cover", ...style }} onError={()=>setErr(true)} />;
};

let _b=180, _s=82, _c=0.22;
const getM = (b=_b,s=_s,c=_c) => {
  const gross=b*s, comm=Math.round(gross*c), nsSave=Math.round(gross*0.12);
  const monthly=comm+nsSave, annual=monthly*12, payback=(15000/monthly).toFixed(1);
  return { gross, comm, nsSave, monthly, annual, payback };
};

const Btn = ({ label, color=C.orange, textColor="#fff", onClick, style={} }) => (
  <div onClick={onClick} style={{ background:color, borderRadius:14, padding:"13px 0", textAlign:"center", color:textColor, fontWeight:700, fontSize:15, cursor:"pointer", ...style }}>{label}</div>
);
const OutlineBtn = ({ label, color=C.orange, onClick, style={} }) => (
  <div onClick={onClick} style={{ border:`2px solid ${color}`, borderRadius:14, padding:"12px 0", textAlign:"center", color, fontWeight:700, fontSize:14, cursor:"pointer", ...style }}>{label}</div>
);

/* GUEST SCREENS */
const GuestHome = ({ go }) => (
  <div style={{ background:C.bg, minHeight:812, paddingBottom:80 }}>
    <div style={{ padding:"60px 20px 0", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
      <div>
        <div style={{ fontSize:12, color:C.gray }}>Good evening,</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:700, color:C.charcoal }}>Sarah 👋</div>
        <div style={{ fontSize:12, color:C.sage, fontWeight:600, marginTop:2 }}>📍 Amsterdam Centrum</div>
      </div>
      <div style={{ width:46, height:46, borderRadius:"50%", overflow:"hidden", border:`2.5px solid ${C.orange}`, boxShadow:"0 2px 12px rgba(217,72,15,0.3)", flexShrink:0, cursor:"pointer" }}>
        <Img src={IMG.profile} style={{ width:46, height:46 }} />
      </div>
    </div>
    <div style={{ padding:"0 20px", marginBottom:18 }}>
      <div style={{ background:C.card, borderRadius:14, padding:"12px 16px", border:`1.5px solid ${C.border}`, display:"flex", gap:8, alignItems:"center" }}>
        <span>🔍</span><span style={{ color:C.gray, fontSize:14 }}>Search restaurants, cuisines...</span>
      </div>
    </div>
    <div style={{ padding:"0 20px", marginBottom:18 }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:1.2, textTransform:"uppercase", marginBottom:10 }}>Featured Tonight</div>
      <div onClick={()=>go("menu")} style={{ background:C.card, borderRadius:20, overflow:"hidden", boxShadow:"0 6px 24px rgba(0,0,0,0.1)", cursor:"pointer" }}>
        <div style={{ position:"relative", height:155 }}>
          <Img src={IMG.restaurant} style={{ width:"100%", height:155 }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 35%,rgba(0,0,0,0.65))" }}/>
          <div style={{ position:"absolute", bottom:10, left:14, right:14, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>De Gouden Tafel</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.82)" }}>Dutch Fine Dining · €€€€</div>
            </div>
            <div style={{ background:C.orange, borderRadius:8, padding:"4px 9px", fontSize:11, fontWeight:700, color:"#fff" }}>⚡ 2 spots</div>
          </div>
        </div>
        <div style={{ padding:"12px 14px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontSize:13, color:C.sage, fontWeight:600 }}>⭐ 4.9 · 248 reviews</span>
            <span style={{ fontSize:12, color:C.gray }}>~800m away</span>
          </div>
          <Btn label="Reserve in 10 seconds →" onClick={()=>go("booking")} />
        </div>
      </div>
    </div>
    <div style={{ padding:"0 20px" }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:1.2, textTransform:"uppercase", marginBottom:10 }}>Tonight's Menu</div>
      {[
        { img:IMG.ribeye,  name:"Dry-Aged Ribeye 300g", price:"€52", tag:"🔥 Most Ordered" },
        { img:IMG.pasta,   name:"Truffle Tagliatelle",  price:"€32", tag:"Chef's Pick" },
        { img:IMG.tasting, name:"7-Course Tasting Menu",price:"€89", tag:"Tonight Only" },
      ].map(({img,name,price,tag})=>(
        <div key={name} onClick={()=>go("menu")} style={{ background:C.card, borderRadius:14, overflow:"hidden", display:"flex", marginBottom:10, boxShadow:"0 2px 10px rgba(0,0,0,0.05)", cursor:"pointer" }}>
          <div style={{ width:74, height:72, flexShrink:0 }}><Img src={img} style={{ width:74, height:72 }} /></div>
          <div style={{ flex:1, padding:"10px 14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:14, fontWeight:700, color:C.charcoal }}>{name}</span>
              <span style={{ fontSize:14, fontWeight:700, color:C.orange }}>{price}</span>
            </div>
            <div style={{ fontSize:11, color:C.sage, marginTop:3, fontWeight:600 }}>{tag}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GuestMenu = ({ go }) => {
  const [cart, setCart] = useState({});
  const items = [
    { id:"s1", img:IMG.salad,   name:"Garden Salad",          price:18, cat:"Starter" },
    { id:"m1", img:IMG.ribeye,  name:"Dry-Aged Ribeye 300g",  price:52, cat:"Main" },
    { id:"m2", img:IMG.pasta,   name:"Truffle Tagliatelle",   price:32, cat:"Main" },
    { id:"m3", img:IMG.tasting, name:"7-Course Tasting Menu", price:89, cat:"Main" },
    { id:"d1", img:IMG.dessert, name:"Chocolate Fondant",     price:14, cat:"Dessert" },
  ];
  const total = Object.entries(cart).reduce((s,[id,q])=>s+(items.find(i=>i.id===id)?.price||0)*q,0);
  const count = Object.values(cart).reduce((s,q)=>s+q,0);
  const add = id => setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const rem = id => setCart(c=>{ const n={...c}; if(n[id]>1)n[id]--; else delete n[id]; return n; });
  return (
    <div style={{ background:C.bg, minHeight:812, paddingBottom:100 }}>
      <div style={{ position:"relative", height:150 }}>
        <Img src={IMG.restaurant} style={{ width:"100%", height:150 }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.6))" }}/>
        <div style={{ position:"absolute", top:56, left:20 }}>
          <div style={{ fontSize:18, fontWeight:700, color:"#fff" }}>De Gouden Tafel</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)" }}>Dutch Fine Dining · ⭐ 4.9</div>
        </div>
        <div onClick={()=>go("home")} style={{ position:"absolute", top:56, right:16, background:"rgba(0,0,0,0.45)", borderRadius:"50%", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", fontSize:14 }}>←</div>
      </div>
      <div style={{ padding:"14px 20px 0" }}>
        {["Starter","Main","Dessert"].map(cat=>(
          <div key={cat} style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:1.2, textTransform:"uppercase", marginBottom:10 }}>{cat}</div>
            {items.filter(i=>i.cat===cat).map(item=>(
              <div key={item.id} style={{ background:C.card, borderRadius:14, display:"flex", marginBottom:10, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ width:76, height:76, flexShrink:0 }}><Img src={item.img} style={{ width:76, height:76 }} /></div>
                <div style={{ flex:1, padding:"10px 12px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.charcoal }}>{item.name}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.orange, marginTop:2 }}>€{item.price}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"flex-end" }}>
                    {cart[item.id] ? <>
                      <div onClick={()=>rem(item.id)} style={{ width:26,height:26,borderRadius:7,background:C.sageTint,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:15,fontWeight:700,color:C.sageDark }}>−</div>
                      <span style={{ fontWeight:700,color:C.charcoal,minWidth:14,textAlign:"center" }}>{cart[item.id]}</span>
                    </> : null}
                    <div onClick={()=>add(item.id)} style={{ width:26,height:26,borderRadius:7,background:C.orange,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:15,fontWeight:700,color:"#fff" }}>+</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {count > 0 && (
        <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", zIndex:50, width:"75%" }}>
          <div onClick={()=>go("booking")} style={{ background:C.orange, borderRadius:14, padding:"13px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 8px 24px rgba(217,72,15,0.4)", cursor:"pointer" }}>
            <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:7, padding:"2px 8px", color:"#fff", fontWeight:700, fontSize:13 }}>{count}</span>
            <span style={{ color:"#fff", fontWeight:700, fontSize:14 }}>Book & Pre-order</span>
            <span style={{ color:"#fff", fontWeight:700, fontSize:13 }}>€{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const GuestBooking = ({ go }) => {
  const [sel, setSel] = useState(14);
  const [slot, setSlot] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const dates=[12,13,14,15,16,17,18], days=["Mo","Tu","We","Th","Fr","Sa","Su"], slots=["18:00","18:30","19:00","19:30","20:00","20:30"];
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div onClick={()=>go("menu")} style={{ fontSize:13, color:C.sage, fontWeight:600, marginBottom:16, cursor:"pointer" }}>← Back</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:4 }}>Choose Your Time</div>
      <div style={{ fontSize:13, color:C.gray, marginBottom:20 }}>De Gouden Tafel · Table guaranteed with deposit</div>
      <div style={{ background:C.card, borderRadius:18, padding:14, marginBottom:16 }}>
        <div style={{ display:"flex", gap:4 }}>
          {dates.map((d,i)=>(
            <div key={d} onClick={()=>setSel(d)} style={{ flex:1, textAlign:"center", padding:"9px 0", borderRadius:12, cursor:"pointer", background:d===sel?C.sage:"transparent", transition:"all 0.18s", transform:d===sel?"scale(1.06)":"scale(1)" }}>
              <div style={{ fontSize:10, color:d===sel?"#fff":C.gray }}>{days[i]}</div>
              <div style={{ fontSize:15, fontWeight:700, color:d===sel?"#fff":C.charcoal }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
        {slots.map(s=>(
          <div key={s} onClick={()=>setSlot(s)} style={{ padding:"12px 0", textAlign:"center", borderRadius:12, cursor:"pointer", background:s===slot?C.orange:C.card, color:s===slot?"#fff":C.charcoal, fontWeight:s===slot?700:500, fontSize:14, transition:"all 0.15s", transform:s===slot?"scale(1.04)":"scale(1)", boxShadow:s===slot?"0 4px 12px rgba(217,72,15,0.3)":"none" }}>{s}</div>
        ))}
      </div>
      <div style={{ background:C.card, borderRadius:14, padding:16, marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:15, fontWeight:600, color:C.charcoal }}>Party Size</span>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div onClick={()=>setGuests(Math.max(1,guests-1))} style={{ width:34,height:34,borderRadius:10,background:C.sageTint,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18,fontWeight:700,color:C.sageDark }}>−</div>
            <span style={{ fontSize:22, fontWeight:700, color:C.charcoal, minWidth:20, textAlign:"center" }}>{guests}</span>
            <div onClick={()=>setGuests(Math.min(12,guests+1))} style={{ width:34,height:34,borderRadius:10,background:C.sage,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18,fontWeight:700,color:"#fff" }}>+</div>
          </div>
        </div>
      </div>
      <div style={{ background:C.sageTint, borderRadius:12, padding:"10px 14px", textAlign:"center", marginBottom:16 }}>
        <span style={{ fontSize:13, fontWeight:600, color:C.sageDark }}>🔒 €5 deposit secures your table</span>
      </div>
      <Btn label={`Confirm: ${days[dates.indexOf(sel)]} ${sel} Mar · ${slot} · ${guests} guests →`} onClick={()=>go("payment")} />
    </div>
  );
};

const GuestPayment = ({ go }) => {
  const [method, setMethod] = useState(0);
  const [loading, setLoading] = useState(false);
  const methods=[{icon:"🏦",label:"iDEAL",sub:"ABN AMRO · ING · Rabobank"},{icon:"💳",label:"Credit Card",sub:"Visa · Mastercard"},{icon:"🍎",label:"Apple Pay",sub:"Touch ID or Face ID"}];
  const pay = () => { setLoading(true); setTimeout(()=>go("confirmed"),1600); };
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div onClick={()=>go("booking")} style={{ fontSize:13, color:C.sage, fontWeight:600, marginBottom:16, cursor:"pointer" }}>← Back</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:20 }}>Secure Checkout</div>
      <div style={{ background:C.card, borderRadius:18, padding:18, marginBottom:18 }}>
        <div style={{ fontSize:14, fontWeight:700, color:C.charcoal, marginBottom:12 }}>Booking Summary</div>
        {[["Restaurant","De Gouden Tafel"],["Date & Time","Fri 14 Mar · 19:30"],["Guests","2 people"],["Pre-ordered","Ribeye + Tagliatelle"]].map(([l,v],i)=>(
          <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontSize:13, color:C.gray }}>{l}</span>
            <span style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{v}</span>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12, paddingTop:12, borderTop:`2px solid ${C.border}` }}>
          <span style={{ fontSize:14, fontWeight:700, color:C.charcoal }}>Reservation Deposit</span>
          <span style={{ fontSize:20, fontWeight:700, color:C.orange }}>€5.00</span>
        </div>
      </div>
      {methods.map((m,i)=>(
        <div key={i} onClick={()=>setMethod(i)} style={{ display:"flex", alignItems:"center", gap:14, padding:14, marginBottom:10, background:C.card, borderRadius:14, cursor:"pointer", border:`2px solid ${i===method?C.sage:C.border}`, transition:"all 0.18s" }}>
          <span style={{ fontSize:26 }}>{m.icon}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.charcoal }}>{m.label}</div>
            <div style={{ fontSize:12, color:C.gray }}>{m.sub}</div>
          </div>
          <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${i===method?C.sage:C.border}`, background:i===method?C.sage:"transparent", transition:"all 0.18s" }}/>
        </div>
      ))}
      <div style={{ marginTop:20 }} onClick={!loading?pay:undefined}>
        <Btn label={loading?"Processing...": `Pay €5.00 with ${methods[method].label} →`} color={loading?"#aaa":C.orange} />
      </div>
    </div>
  );
};

const GuestConfirmed = ({ go }) => {
  const [show, setShow] = useState(false);
  useEffect(()=>{ setTimeout(()=>setShow(true),150); },[]);
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      {show && ["🎉","✨","🎊","⭐","🥂","🎈"].map((e,i)=>(
        <div key={i} style={{ position:"fixed", left:`${10+i*14}%`, top:"35%", fontSize:18, animation:`tfConfetti 1.4s ease ${i*0.1}s both`, pointerEvents:"none", zIndex:99 }}>{e}</div>
      ))}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, paddingTop:16 }}>
        <div style={{ width:76, height:76, borderRadius:"50%", background:C.sageTint, display:"flex", alignItems:"center", justifyContent:"center", animation:"tfPop 0.5s ease both" }}>
          <svg width="38" height="38" viewBox="0 0 48 48" fill="none"><path d="M10 24L20 34L38 14" stroke={C.sageDark} strokeWidth="4" strokeLinecap="round"/></svg>
        </div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:700, color:C.charcoal, textAlign:"center" }}>Your evening is set ✨</div>
        <div style={{ background:C.card, borderRadius:18, padding:18, width:"100%" }}>
          {[["Restaurant","De Gouden Tafel"],["Date","Fri 14 Mar · 19:30"],["Guests","2 people"]].map(([l,v],i)=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:13, color:C.gray }}>{l}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{v}</span>
            </div>
          ))}
          <div style={{ textAlign:"center", marginTop:14 }}>
            <div style={{ fontSize:11, color:C.gray }}>Booking Reference</div>
            <div style={{ fontSize:28, fontWeight:700, color:C.charcoal, letterSpacing:4, marginTop:4 }}>TF-2847</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, width:"100%" }}>
          <OutlineBtn label="📅 Calendar" onClick={()=>{}} style={{ flex:1 }} />
          <OutlineBtn label="📍 Directions" onClick={()=>{}} style={{ flex:1 }} />
        </div>
        <div style={{ background:"#fff7ed", borderRadius:14, padding:14, width:"100%", textAlign:"center", border:`1px solid rgba(217,72,15,0.15)` }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.charcoal, marginBottom:3 }}>🎁 Earning loyalty points!</div>
          <div style={{ fontSize:12, color:C.gray }}>4 of 5 visits — 1 more for a free drink 🍷</div>
        </div>
        <Btn label="Track My Order Live →" onClick={()=>go("tracking")} style={{ width:"100%" }} />
      </div>
    </div>
  );
};

const GuestTracking = ({ go }) => {
  const [step, setStep] = useState(1);
  useEffect(()=>{ const t=setInterval(()=>setStep(s=>s<4?s+1:4),2200); return()=>clearInterval(t); },[]);
  const steps=[
    {icon:"✅",label:"Order Confirmed",  sub:"Kitchen received your order"},
    {icon:"👨‍🍳",label:"Being Prepared",   sub:"Chef is working on your dishes"},
    {icon:"🔔",label:"Ready to Serve",   sub:"Your table will be called shortly"},
    {icon:"🍽️",label:"Enjoy Your Meal",  sub:"Bon appétit!"},
  ];
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:4 }}>Live Order Status</div>
      <div style={{ fontSize:13, color:step<4?C.orange:C.sage, fontWeight:600, marginBottom:20 }}>{step<4?"🔴 In Progress":"🟢 Ready"} · Table 7 · 19:30</div>
      <div style={{ background:C.card, borderRadius:18, padding:20, marginBottom:16 }}>
        {steps.map((s,i)=>(
          <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:i<3?16:0 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:step>i?C.orange:C.sageTint, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, transition:"background 0.5s" }}>{step>i?s.icon:"·"}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:step>i?700:500, color:step>i?C.charcoal:C.gray }}>{s.label}</div>
              {step>i && <div style={{ fontSize:12, color:C.sage, marginTop:1 }}>{s.sub}</div>}
            </div>
            {i===step-1 && step<4 && <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${C.orange}`, borderTopColor:"transparent", animation:"tfSpin 0.8s linear infinite", flexShrink:0, marginTop:8 }}/>}
          </div>
        ))}
      </div>
      <div style={{ background:C.card, borderRadius:18, padding:18, marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.charcoal, marginBottom:12 }}>Your Order</div>
        {[{img:IMG.ribeye,name:"Dry-Aged Ribeye 300g",price:"€52",status:step>=2?"Cooking 🔥":"Queued"},
          {img:IMG.pasta, name:"Truffle Tagliatelle", price:"€32",status:step>=3?"Ready ✅":step>=2?"Cooking 🔥":"Queued"}
        ].map(item=>(
          <div key={item.name} style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
            <div style={{ width:50, height:50, borderRadius:10, overflow:"hidden", flexShrink:0 }}><Img src={item.img} style={{ width:50, height:50 }} /></div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.charcoal }}>{item.name}</div>
              <div style={{ fontSize:12, color:C.orange, marginTop:1 }}>{item.status}</div>
            </div>
            <span style={{ fontSize:13, fontWeight:700, color:C.charcoal }}>{item.price}</span>
          </div>
        ))}
      </div>
      {step>=4 && <Btn label="Rate Your Experience →" onClick={()=>go("rating")} />}
    </div>
  );
};

const GuestRating = ({ go }) => {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [tags, setTags] = useState([]);
  const allTags=["Amazing food","Perfect service","Great ambience","Will return","Loved the wine","Quiet & intimate"];
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      {submitted ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, paddingTop:40, animation:"tfPop 0.4s ease both" }}>
          <div style={{ fontSize:52 }}>🌟</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, textAlign:"center" }}>Thank you, Sarah!</div>
          <div style={{ fontSize:14, color:C.gray, textAlign:"center" }}>Your review helps De Gouden Tafel improve.</div>
          <div style={{ background:C.sageTint, borderRadius:14, padding:16, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.sageDark }}>🎁 +50 loyalty points added!</div>
            <div style={{ fontSize:12, color:C.gray, marginTop:4 }}>You've now completed your loyalty card 🍷</div>
          </div>
          <Btn label="Back to Home" onClick={()=>go("home")} style={{ width:"100%" }} />
        </div>
      ) : (
        <>
          <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:4 }}>How was your evening?</div>
          <div style={{ fontSize:13, color:C.gray, marginBottom:24 }}>De Gouden Tafel · Fri 14 Mar</div>
          <div style={{ background:C.card, borderRadius:18, padding:20, marginBottom:16, textAlign:"center" }}>
            <div style={{ fontSize:12, color:C.gray, marginBottom:14 }}>Tap to rate</div>
            <div style={{ display:"flex", justifyContent:"center", gap:10, marginBottom:12 }}>
              {[1,2,3,4,5].map(i=>(
                <div key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)} onClick={()=>setStars(i)}
                  style={{ fontSize:34, cursor:"pointer", filter:i<=(hover||stars)?"none":"grayscale(1) opacity(0.3)", transition:"all 0.15s", transform:i<=(hover||stars)?"scale(1.15)":"scale(1)" }}>⭐</div>
              ))}
            </div>
            {stars>0 && <div style={{ fontSize:14, fontWeight:600, color:C.orange }}>{["","Poor","Fair","Good","Great","Outstanding!"][stars]}</div>}
          </div>
          <div style={{ background:C.card, borderRadius:18, padding:18, marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.charcoal, marginBottom:12 }}>What stood out?</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {allTags.map(t=>(
                <div key={t} onClick={()=>setTags(x=>x.includes(t)?x.filter(v=>v!==t):[...x,t])}
                  style={{ padding:"7px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer", background:tags.includes(t)?C.orange:C.sageTint, color:tags.includes(t)?"#fff":C.sageDark, transition:"all 0.15s" }}>{t}</div>
              ))}
            </div>
          </div>
          {stars>0 && <Btn label="Submit Review →" onClick={()=>setSubmitted(true)} />}
        </>
      )}
    </div>
  );
};

const GuestLoyalty = ({ go }) => {
  const [pushed, setPushed] = useState(false);
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:4 }}>Your Rewards 🎁</div>
      <div style={{ fontSize:13, color:C.gray, marginBottom:20 }}>1 visit away from Free Drink 🍷</div>
      <div style={{ background:C.card, borderRadius:18, padding:20, marginBottom:16 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:14 }}>
          {[1,2,3,4].map(i=><div key={i} style={{ aspectRatio:"1", borderRadius:"50%", background:C.orange, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⭐</div>)}
          <div style={{ aspectRatio:"1", borderRadius:"50%", background:C.sageTint, border:`2.5px dashed ${C.sage}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:C.gray }}>·</div>
        </div>
        <div style={{ height:8, background:C.sageTint, borderRadius:4, marginBottom:8 }}>
          <div style={{ width:"80%", height:8, background:C.orange, borderRadius:4 }}/>
        </div>
        <div style={{ fontSize:12, color:C.gray }}>4 of 5 · 1 more for 🍷 free drink</div>
      </div>
      {!pushed ? (
        <div style={{ background:C.card, borderRadius:18, padding:18 }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.charcoal, marginBottom:10 }}>Enable Push Notifications</div>
          <div style={{ fontSize:13, color:C.gray, marginBottom:14, lineHeight:1.7 }}>Get your birthday reward, exclusive offers, and know when your free drink is ready.</div>
          <Btn label="Enable & Start Earning →" onClick={()=>setPushed(true)} />
        </div>
      ) : (
        <div style={{ background:C.sageTint, borderRadius:18, padding:22, textAlign:"center", animation:"tfPop 0.4s ease both" }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🎉</div>
          <div style={{ fontSize:16, fontWeight:700, color:C.charcoal, marginBottom:6 }}>Push enabled!</div>
          <div style={{ fontSize:13, color:C.sageDark }}>Exclusive offers and loyalty rewards will come automatically.</div>
        </div>
      )}
    </div>
  );
};

/* OWNER SCREENS */
const OwnerInput = ({ onUpdate }) => {
  const [b,setB]=useState(180),[s,setS]=useState(82),[c,setC]=useState(22);
  const m=getM(b,s,c/100);
  useEffect(()=>{ _b=b;_s=s;_c=c/100; onUpdate&&onUpdate(); },[b,s,c]);
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:4 }}>Your Numbers 🎯</div>
      <div style={{ fontSize:13, color:C.gray, marginBottom:20 }}>Drag to match your restaurant</div>
      {[
        {label:"Monthly Bookings",      val:b,set:setB,min:20, max:600,step:10,fmt:v=>`${v}`},
        {label:"Avg Table Spend",       val:s,set:setS,min:25, max:250,step:5, fmt:v=>`€${v}`},
        {label:"Platform Commission %", val:c,set:setC,min:10, max:30, step:1, fmt:v=>`${v}%`},
      ].map(({label,val,set,min,max,step,fmt})=>(
        <div key={label} style={{ background:C.card, borderRadius:14, padding:"14px 16px", marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{label}</span>
            <span style={{ fontSize:18, fontWeight:700, color:C.orange }}>{fmt(val)}</span>
          </div>
          <input type="range" min={min} max={max} step={step} value={val} onChange={e=>set(+e.target.value)} style={{ width:"100%", accentColor:C.orange, cursor:"pointer" }}/>
        </div>
      ))}
      <div style={{ background:"#fff0eb", borderRadius:16, padding:20, border:`2px solid ${C.orange}`, textAlign:"center" }}>
        <div style={{ fontSize:12, color:C.gray, marginBottom:4 }}>You lose to platform every month</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:40, fontWeight:700, color:C.orange }}>−€{m.comm.toLocaleString()}</div>
        <div style={{ fontSize:13, color:"#b91c1c", marginTop:6, fontWeight:700 }}>= €{m.annual.toLocaleString()} / year to TheFork 😶</div>
      </div>
    </div>
  );
};

const OwnerCommission = () => {
  const m=getM();
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:20 }}>Platform vs Direct 💸</div>
      <div style={{ display:"flex", gap:10, marginBottom:18 }}>
        {[
          {t:"❌ WITH PLATFORM",bg:C.card,    border:C.border, tc:"#ef4444", rows:[["Gross",`€${m.gross.toLocaleString()}`,""],["Commission",`−€${m.comm.toLocaleString()}`,"#ef4444"],["Net",`€${(m.gross-m.comm).toLocaleString()}`,"#ef4444"]]},
          {t:"✅ TABLEFLOW",    bg:C.sageTint,border:C.sage,   tc:C.sageDark,rows:[["Gross",`€${m.gross.toLocaleString()}`,""],["Commission","€0",C.sageDark],      ["Net",`€${m.gross.toLocaleString()}`,C.sageDark]]},
        ].map(({t,bg,border,tc,rows})=>(
          <div key={t} style={{ flex:1,background:bg,borderRadius:16,padding:16,border:`2px solid ${border}` }}>
            <div style={{ fontSize:11,fontWeight:700,color:tc,marginBottom:12,letterSpacing:0.8 }}>{t}</div>
            {rows.map(([l,v,vc],i)=>(
              <div key={l} style={{ marginBottom:i<2?12:0 }}>
                <div style={{ fontSize:11,color:C.gray }}>{l}</div>
                <div style={{ fontSize:i===2?20:15,fontWeight:700,color:vc||C.charcoal,marginTop:2 }}>{v}</div>
                {i<2&&<div style={{ height:1,background:border,marginTop:10 }}/>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background:C.orange,borderRadius:16,padding:20,textAlign:"center",marginBottom:12,animation:"tfGlow 2.5s infinite" }}>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.8)",marginBottom:4 }}>Extra every month</div>
        <div style={{ fontFamily:"Georgia,serif",fontSize:38,fontWeight:700,color:"#fff" }}>+€{m.comm.toLocaleString()}</div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:6 }}>€{m.annual.toLocaleString()} / year · Payback: {m.payback} months</div>
      </div>
    </div>
  );
};

const OwnerROI = () => {
  const m=getM();
  const ret=Math.round(m.annual*0.43),push=Math.round(m.annual*0.29),total=m.annual+ret+push;
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:20 }}>Full ROI Breakdown 📈</div>
      <div style={{ background:C.card, borderRadius:18, padding:18, marginBottom:14 }}>
        {[["Commission Saved (annual)",`€${m.annual.toLocaleString()}`,C.orange],["Retention Revenue",`€${ret.toLocaleString()}`,C.sage],["Push Campaign Boost",`€${push.toLocaleString()}`,C.sageDark]].map(([l,v,c],i)=>(
          <div key={l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontSize:13,color:C.gray }}>{l}</span>
            <span style={{ fontSize:18,fontWeight:700,color:c }}>{v}</span>
          </div>
        ))}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,paddingTop:12,borderTop:`2px solid ${C.border}` }}>
          <span style={{ fontSize:15,fontWeight:700,color:C.charcoal }}>Total Year 1</span>
          <span style={{ fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:C.orange }}>€{total.toLocaleString()}</span>
        </div>
      </div>
      <div style={{ background:C.sage,borderRadius:16,padding:20,textAlign:"center",marginBottom:12 }}>
        <div style={{ fontSize:12,color:"rgba(255,255,255,0.8)",marginBottom:4 }}>Payback Period</div>
        <div style={{ fontFamily:"Georgia,serif",fontSize:44,fontWeight:700,color:"#fff" }}>{m.payback} months</div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.85)",marginTop:4 }}>Then pure profit. Forever.</div>
      </div>
      <div style={{ background:"#fff7ed",borderRadius:14,padding:16,textAlign:"center",border:`1px solid ${C.orange}` }}>
        <div style={{ fontSize:12,color:C.gray }}>3-Year Total</div>
        <div style={{ fontFamily:"Georgia,serif",fontSize:30,fontWeight:700,color:C.orange }}>€{(total*3).toLocaleString()}</div>
        <div style={{ fontSize:12,color:C.gray,marginTop:4 }}>vs €15,000 one-time investment</div>
      </div>
    </div>
  );
};

const OwnerDashboard = () => {
  const m=getM();
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontSize:12,color:C.gray,marginBottom:2 }}>Good Evening,</div>
      <div style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.charcoal,marginBottom:16 }}>Marco 👋</div>
      <div style={{ background:C.card,borderRadius:16,padding:18,marginBottom:10 }}>
        <div style={{ fontSize:12,color:C.gray,marginBottom:4 }}>Today's Revenue</div>
        <div style={{ display:"flex",alignItems:"baseline",gap:8 }}>
          <span style={{ fontFamily:"Georgia,serif",fontSize:34,fontWeight:700,color:C.orange }}>€{Math.round(m.gross/30).toLocaleString()}</span>
          <span style={{ fontSize:13,color:C.sage,fontWeight:600 }}>↑ 18%</span>
        </div>
      </div>
      <div style={{ display:"flex",gap:10,marginBottom:10 }}>
        {[["Bookings",Math.round(_b/30),C.charcoal],["No-Show","3%",C.sage],["Commission","€0",C.sageDark]].map(([l,v,c])=>(
          <div key={l} style={{ flex:1,background:C.card,borderRadius:14,padding:14 }}>
            <div style={{ fontSize:10,color:C.gray,marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:20,fontWeight:700,color:c }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.card,borderRadius:14,padding:16,marginBottom:10 }}>
        <div style={{ fontSize:12,fontWeight:600,color:C.charcoal,marginBottom:12 }}>Last 7 Days Revenue</div>
        <div style={{ display:"flex",alignItems:"flex-end",gap:5,height:56 }}>
          {[42,58,45,62,78,82,65].map((v,i)=>(
            <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center" }}>
              <div style={{ width:"100%",height:`${v}%`,background:i===5?C.orange:C.sage,borderRadius:"4px 4px 0 0",opacity:i===5?1:0.65 }}/>
              <span style={{ fontSize:9,color:C.gray,marginTop:3 }}>{["M","T","W","T","F","S","S"][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:"#fff0eb",borderRadius:14,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center",border:`1px solid rgba(217,72,15,0.2)` }}>
        <div>
          <div style={{ fontSize:11,color:C.gray }}>Saved vs TheFork this month</div>
          <div style={{ fontSize:22,fontWeight:700,color:C.orange }}>+€{m.comm.toLocaleString()}</div>
        </div>
        <div style={{ fontSize:28 }}>💰</div>
      </div>
    </div>
  );
};

const OwnerRetention = () => {
  const m=getM();
  const retGain=Math.round(m.gross*0.08);
  return (
    <div style={{ background:C.bg, minHeight:812, padding:"60px 20px 80px" }}>
      <div style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.charcoal,marginBottom:4 }}>Retention Engine 🔄</div>
      <div style={{ fontSize:13,color:C.gray,marginBottom:18 }}>Real-time data on who's coming back</div>
      <div style={{ display:"flex",gap:10,marginBottom:14 }}>
        {[["Repeat Rate","42%","↑ from 18%",C.orange],["Avg Visits/yr","3.4x","↑ from 1.8x",C.sage]].map(([l,v,sub,c])=>(
          <div key={l} style={{ flex:1,background:C.card,borderRadius:16,padding:16 }}>
            <div style={{ fontSize:11,color:C.gray,marginBottom:6 }}>{l}</div>
            <div style={{ fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,color:c }}>{v}</div>
            <div style={{ fontSize:11,color:c,fontWeight:600,marginTop:4 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.card,borderRadius:16,padding:18,marginBottom:14 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
          <span style={{ fontSize:13,fontWeight:600,color:C.charcoal }}>Guest Retention Rate</span>
          <span style={{ fontSize:18,fontWeight:700,color:C.orange }}>68%</span>
        </div>
        <div style={{ height:10,background:C.sageTint,borderRadius:5,marginBottom:6 }}>
          <div style={{ width:"68%",height:10,background:C.orange,borderRadius:5 }}/>
        </div>
        <div style={{ fontSize:11,color:C.gray }}>Was 31% before TableFlow</div>
      </div>
      <div style={{ background:C.card,borderRadius:16,padding:18,marginBottom:14 }}>
        <div style={{ fontSize:13,fontWeight:700,color:C.charcoal,marginBottom:12 }}>Real-Time This Month</div>
        {[["New guests who returned","47 guests"],["Repeat guest avg spend","€94 (↑38%)"],["Loyalty member vs non","€86 vs €52"],["Revenue from repeat guests",`+€${retGain.toLocaleString()}`]].map(([l,v],i)=>(
          <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontSize:12,color:C.gray }}>{l}</span>
            <span style={{ fontSize:13,fontWeight:700,color:i===3?C.orange:C.charcoal }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background:C.sageTint,borderRadius:14,padding:14,textAlign:"center" }}>
        <div style={{ fontSize:13,fontWeight:700,color:C.sageDark }}>+10% retention = +€{Math.round(m.gross*0.042).toLocaleString()} / year</div>
        <div style={{ fontSize:12,color:C.gray,marginTop:4 }}>Tracked automatically. No guesswork.</div>
      </div>
    </div>
  );
};

const OwnerPush = () => {
  const [sent,setSent]=useState(false),[notif,setNotif]=useState(false);
  const fire=()=>{ setSent(true); setNotif(true); setTimeout(()=>setNotif(false),4000); };
  return (
    <div style={{ background:C.bg,minHeight:812,padding:"60px 20px 80px",position:"relative" }}>
      {notif && (
        <div style={{ position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",zIndex:100,width:"78%",background:"rgba(28,28,28,0.97)",borderRadius:16,padding:"12px 14px",boxShadow:"0 8px 32px rgba(0,0,0,0.45)",animation:"tfNotif 4s ease both",display:"flex",gap:12,alignItems:"center" }}>
          <div style={{ width:36,height:36,borderRadius:10,background:C.orange,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18 }}>🍽️</div>
          <div>
            <div style={{ fontSize:12,fontWeight:700,color:"#fff" }}>De Gouden Tafel</div>
            <div style={{ fontSize:11,color:"rgba(255,255,255,0.75)" }}>🔥 3 tables left tonight! 20% off dessert. Book now →</div>
          </div>
        </div>
      )}
      <div style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.charcoal,marginBottom:4 }}>Push Campaign Engine 🚀</div>
      <div style={{ fontSize:13,color:C.gray,marginBottom:18 }}>Empty Tuesday? One tap. Full house.</div>
      <div style={{ background:C.card,borderRadius:16,padding:18,marginBottom:14 }}>
        <div style={{ fontSize:13,fontWeight:700,color:C.charcoal,marginBottom:12 }}>Last Campaign</div>
        {[["Guests Reached","1,240",""],["Open Rate","68% 🔥",C.sage],["Bookings Generated","96",C.orange],["Revenue","€2,880 💰",C.orange]].map(([l,v,c],i)=>(
          <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontSize:13,color:C.gray }}>{l}</span>
            <span style={{ fontSize:i===3?18:14,fontWeight:700,color:c||C.charcoal }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background:C.card,borderRadius:16,padding:18,marginBottom:14 }}>
        <div style={{ fontSize:13,fontWeight:700,color:C.charcoal,marginBottom:12 }}>Smart Segments</div>
        {[["VIP Guests (Top 10%)","124","#f59e0b"],["No Visit 30+ Days","412",C.sageDark],["Birthdays This Week 🎉","18",C.orange],["Loyalty Card Complete","86",C.sage]].map(([l,v,c])=>(
          <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
            <span style={{ fontSize:12,color:C.gray }}>{l}</span>
            <span style={{ fontSize:14,fontWeight:700,color:c }}>{v}</span>
          </div>
        ))}
      </div>
      <div onClick={!sent?fire:undefined} style={{ background:sent?"#22c55e":C.orange,borderRadius:16,padding:"16px 0",textAlign:"center",color:"#fff",fontWeight:700,fontSize:16,cursor:sent?"default":"pointer",animation:!sent?"tfGlow 2s infinite":"none",transition:"background 0.3s" }}>
        {sent?"✅ Campaign Sent to 1,240 Guests!":"🚀 Send Campaign Now"}
      </div>
      {sent && <div style={{ marginTop:12,background:C.sageTint,borderRadius:12,padding:12,textAlign:"center" }}>
        <div style={{ fontSize:13,fontWeight:600,color:C.sageDark }}>Expected: ~96 bookings · ~€2,880 revenue</div>
      </div>}
    </div>
  );
};

const OwnerDatabase = () => (
  <div style={{ background:C.bg,minHeight:812,padding:"60px 20px 80px" }}>
    <div style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.charcoal,marginBottom:4 }}>Guest Database 👥</div>
    <div style={{ fontSize:13,color:C.gray,marginBottom:18 }}>TheFork owns their data. You own yours.</div>
    <div style={{ background:C.card,borderRadius:16,padding:18,marginBottom:14 }}>
      {[["Total Guests","3,420"],["Emails Captured","3,420 ✅"],["Mobile Numbers","2,870 ✅"],["Owned by YOU","100% ✅"]].map(([l,v],i)=>(
        <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
          <span style={{ fontSize:13,color:C.gray }}>{l}</span>
          <span style={{ fontSize:i===3?16:14,fontWeight:700,color:i===3?C.sage:C.charcoal }}>{v}</span>
        </div>
      ))}
    </div>
    <div style={{ display:"flex",gap:10,marginBottom:14 }}>
      {[["VIP","124",C.sage],["Frequent","412",C.orange],["At-Risk","286",C.gray]].map(([l,v,c])=>(
        <div key={l} style={{ flex:1,background:C.card,borderRadius:14,padding:14,textAlign:"center" }}>
          <div style={{ fontSize:22,fontWeight:700,color:c }}>{v}</div>
          <div style={{ fontSize:11,color:C.gray,marginTop:4 }}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{ background:"#fff0eb",borderRadius:14,padding:16,border:`1px solid ${C.orange}` }}>
      <div style={{ fontSize:13,fontWeight:700,color:C.charcoal,marginBottom:6 }}>⚠️ What TheFork doesn't tell you</div>
      <div style={{ fontSize:13,color:C.gray,lineHeight:1.7 }}>Every guest who books via TheFork is <span style={{ fontWeight:700,color:"#b91c1c" }}>their customer</span> — not yours. They can raise your commission tomorrow. You have zero recourse. With TableFlow: every guest, every euro, yours forever.</div>
    </div>
  </div>
);

const OwnerClose = () => {
  const m=getM();
  const total=m.annual+Math.round(m.annual*0.43)+Math.round(m.annual*0.29);
  return (
    <div style={{ background:C.charcoal,minHeight:812,padding:"60px 20px 80px" }}>
      <div style={{ textAlign:"center",marginBottom:24 }}>
        <div style={{ fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:6 }}>Stop renting your guests.</div>
        <div style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.orange }}>Start owning your revenue.</div>
      </div>
      <div style={{ background:"rgba(255,255,255,0.06)",borderRadius:18,padding:20,marginBottom:18 }}>
        {[[`€${m.annual.toLocaleString()}`,"commission saved · year 1"],[`${m.payback} months`,"to full payback"],[`€${(total*3).toLocaleString()}`,"3-year total gain"],["€0","commission. Ever again."]].map(([big,small])=>(
          <div key={big} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ fontSize:13,color:"rgba(255,255,255,0.5)" }}>{small}</span>
            <span style={{ fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.orange }}>{big}</span>
          </div>
        ))}
      </div>
      <div style={{ background:C.orange,borderRadius:18,padding:22,textAlign:"center",marginBottom:16,animation:"tfGlow 2s infinite" }}>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.85)",marginBottom:6 }}>One-time investment</div>
        <div style={{ fontFamily:"Georgia,serif",fontSize:44,fontWeight:700,color:"#fff" }}>€15,000</div>
        <div style={{ fontSize:14,color:"rgba(255,255,255,0.85)",marginTop:6 }}>Custom app · Your brand · Live in 2 weeks</div>
      </div>
      <div style={{ background:"rgba(255,255,255,0.05)",borderRadius:14,padding:18,textAlign:"center",border:"1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ fontSize:15,fontWeight:700,color:"#fff",marginBottom:4 }}>Ready to start?</div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)" }}>50% advance · Build starts in 48 hours · App live in 2 weeks.</div>
      </div>
    </div>
  );
};

/* SCREEN LISTS */
const GUEST_SCREENS = [
  {name:"Home",         Component:GuestHome,     keys:["home"],      desc:"Before: Guests call or use TheFork — 20–25% commission per cover.\n\nWith TableFlow: Your branded app, real food photos, your name. Guest books in 10 seconds.\n\nDirect Impact: Zero commission from first booking. Guest data stays with you, not the platform."},
  {name:"Menu & Cart",  Component:GuestMenu,     keys:["menu"],      desc:"Before: No direct order flow. Guests rely on waitstaff or third-party apps.\n\nWith TableFlow: Real dish photos, add-to-cart, pre-order before arrival.\n\nDirect Impact: Avg spend increases 15–22% — guests see the food and pre-commit."},
  {name:"Booking",      Component:GuestBooking,  keys:["booking"],   desc:"Before: No-show rate 15–25%. No skin in the game.\n\nWith TableFlow: €5 prepaid deposit secures the table. Guest is committed.\n\nDirect Impact: No-show drops to under 3%. Every table filled. Every slot protected."},
  {name:"Payment",      Component:GuestPayment,  keys:["payment"],   desc:"Before: Payment on arrival — cancellations cost a full table.\n\nWith TableFlow: iDEAL, Apple Pay, Mastercard — integrated, instant, secure.\n\nDirect Impact: 100% of payment goes directly to you. No middleman fee."},
  {name:"Confirmed ✨", Component:GuestConfirmed,keys:["confirmed"], desc:"Before: Generic TheFork email. No brand touch.\n\nWith TableFlow: YOUR confirmation, YOUR reference, YOUR calendar invite.\n\nDirect Impact: Premium feel from first touch. Guest remembers your restaurant, not TheFork."},
  {name:"Live Tracking",Component:GuestTracking, keys:["tracking"],  desc:"Before: Guest arrives and waits. No visibility, no engagement.\n\nWith TableFlow: Real-time kitchen status — queued → cooking → ready. Auto-advances.\n\nDirect Impact: Reduces staff interruptions. Increases satisfaction and review scores."},
  {name:"Rate & Review",Component:GuestRating,   keys:["rating"],    desc:"Before: Reviews go to Google/TheFork days later. You find out too late.\n\nWith TableFlow: Instant in-app rating right after the meal. Loyalty points for reviewing.\n\nDirect Impact: Higher review velocity. Real-time problem visibility. More 5-star ratings."},
  {name:"Loyalty",      Component:GuestLoyalty,  keys:["loyalty"],   desc:"Before: No loyalty program. Guest has no reason to return vs competitors.\n\nWith TableFlow: Automatic points per visit. Push notifications. Free drink after 5 visits.\n\nDirect Impact: Repeat rate increases from ~18% to 42%+. Each returning guest = zero acquisition cost."},
];

const OWNER_SCREENS = [
  {name:"Your Numbers 🎯",   Component:OwnerInput,     desc:"Before: Owner guesses what TheFork costs them. No clarity.\n\nWith TableFlow: Enter real numbers — see real monthly commission loss instantly.\n\nDirect Impact: The number they see = money they get back. Let them drag the slider themselves."},
  {name:"Commission Loss 💸", Component:OwnerCommission,desc:"Before: 20–25% of every booking goes to the platform.\n\nWith TableFlow: Direct booking = 0% commission. Full revenue stays in the restaurant.\n\nDirect Impact: €2,800–€4,500/month recovered on average. Payback in 4–6 months."},
  {name:"ROI Breakdown 📈",  Component:OwnerROI,       desc:"Before: Tech investment feels risky — unclear return.\n\nWith TableFlow: Commission savings + retention + push revenue = full year 1 projection.\n\nDirect Impact: Year 1 gain typically 3–4x the investment. 3-year return: €80K–€120K."},
  {name:"Live Dashboard",    Component:OwnerDashboard, desc:"Before: Revenue unpredictable. No-shows hit without warning. No clarity.\n\nWith TableFlow: Real-time revenue, bookings, no-show rate, commission saved — live every day.\n\nDirect Impact: Owner sees the business clearly for the first time. Full control."},
  {name:"Retention 🔄",      Component:OwnerRetention, desc:"Before: First-time guests rarely return. No tracking, no strategy, no data.\n\nWith TableFlow: Loyalty points, push reminders, visit tracking — all automated.\n\nDirect Impact: Repeat rate doubles. Returning guests spend 38% more. Zero extra effort."},
  {name:"Push Campaigns 🚀", Component:OwnerPush,      desc:"Before: Slow Tuesday = empty tables. No way to reach past guests fast.\n\nWith TableFlow: One tap → campaign to 1,240 segmented guests → 96 bookings → €2,880 revenue.\n\nDirect Impact: One campaign per week = €10K–€15K extra monthly. Fully automated."},
  {name:"Guest Database 👥", Component:OwnerDatabase,  desc:"Before: TheFork owns every guest's data. Owner has no direct line.\n\nWith TableFlow: Every booking captures email + mobile. 100% your data. Forever.\n\nDirect Impact: Zero ad spend dependency. Direct marketing to 3,000+ guests. VIP / At-Risk segments."},
  {name:"Let's Start 🤝",   Component:OwnerClose,     desc:"The close. Every number here is based on what they entered.\n\nPayback period. Annual gain. 3-year projection. All their numbers.\n\nSay: 'Should I send bank details now, or do you prefer a payment link?' Then stop talking."},
];

/* PHONE FRAME */
const PhoneFrame = ({ children }) => {
  const H=620,W=Math.round(620*393/852),sc=W/393,R=Math.round(52*sc);
  return (
    <div style={{ width:W+Math.round(8*sc),height:H,position:"relative",flexShrink:0 }}>
      {[{t:120,h:32},{t:170,h:58},{t:244,h:58}].map((b,i)=>(
        <div key={i} style={{ position:"absolute",left:0,top:Math.round(b.t*sc),width:Math.round(4*sc),height:Math.round(b.h*sc),background:"#333",borderRadius:`${R}px 0 0 ${R}px` }}/>
      ))}
      <div style={{ position:"absolute",right:0,top:Math.round(190*sc),width:Math.round(4*sc),height:Math.round(76*sc),background:"#333",borderRadius:`0 ${R}px ${R}px 0` }}/>
      <div style={{ position:"absolute",left:Math.round(4*sc),right:Math.round(4*sc),top:0,bottom:0,borderRadius:R,background:"linear-gradient(160deg,#2c2c2e,#1c1c1e)",boxShadow:`0 0 0 ${Math.round(1*sc)}px #444,0 32px 80px rgba(0,0,0,.65)`,overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:Math.round(4*sc),borderRadius:R-4,background:C.bg,overflow:"hidden" }}>
          <div style={{ position:"absolute",top:Math.round(14*sc),left:"50%",transform:"translateX(-50%)",width:Math.round(118*sc),height:Math.round(34*sc),background:"#000",borderRadius:Math.round(17*sc),zIndex:20 }}/>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:Math.round(56*sc),zIndex:19,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:`0 ${Math.round(26*sc)}px ${Math.round(8*sc)}px` }}>
            <span style={{ fontSize:Math.round(14*sc),fontWeight:700,color:C.charcoal }}>9:41</span>
            <div style={{ display:"flex",alignItems:"center",gap:Math.round(6*sc) }}>
              <div style={{ display:"flex",alignItems:"flex-end",gap:Math.round(2*sc) }}>
                {[5,7,9,11].map((h,i)=><div key={i} style={{ width:Math.round(3*sc),height:Math.round(h*sc),background:C.charcoal,borderRadius:1,opacity:i<3?1:0.4 }}/>)}
              </div>
              <div style={{ width:Math.round(24*sc),height:Math.round(12*sc),border:`${Math.round(1.5*sc)}px solid ${C.charcoal}`,borderRadius:Math.round(3*sc),position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",left:Math.round(1.5*sc),top:Math.round(1.5*sc),bottom:Math.round(1.5*sc),width:"78%",background:C.charcoal,borderRadius:Math.round(1.5*sc) }}/>
              </div>
            </div>
          </div>
          <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden" }}>
            <div style={{ transform:`scale(${sc})`,transformOrigin:"top left",width:`${(100/sc).toFixed(1)}%`,minHeight:`${(100/sc).toFixed(1)}%`,overflowY:"auto",overflowX:"hidden" }}>
              {children}
            </div>
          </div>
          <div style={{ position:"absolute",bottom:Math.round(8*sc),left:"50%",transform:"translateX(-50%)",width:Math.round(130*sc),height:Math.round(5*sc),background:"rgba(47,62,70,.28)",borderRadius:Math.round(3*sc),zIndex:20 }}/>
        </div>
      </div>
    </div>
  );
};

/* MAIN */
export default function TableFlowApp({ initialMode=null, onBack=null }) {
  const [mode,setMode]=useState(initialMode);
  const [idx,setIdx]=useState(0);
  const [gKey,setGKey]=useState("home");
  const [,forceUpdate]=useState(0);

  const screens=mode==="guest"?GUEST_SCREENS:mode==="owner"?OWNER_SCREENS:[];
  const safe=Math.min(idx,Math.max(0,screens.length-1));
  const gKeys=["home","menu","booking","payment","confirmed","tracking","rating","loyalty"];
  const gMap={home:0,menu:1,booking:2,payment:3,confirmed:4,tracking:5,rating:6,loyalty:7};

  const goG=key=>{ setGKey(key); setIdx(gMap[key]??0); };
  const switchMode=m=>{ setIdx(0); setGKey("home"); setMode(m); };
  useEffect(()=>{ setIdx(0); setGKey("home"); },[mode]);

  const CurScreen=screens[safe]?.Component;

  if(!mode) return (
    <div style={{ width:"100vw",height:"100vh",background:C.navyBg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif" }}>
      <div style={{ textAlign:"center",marginBottom:48 }}>
        <div style={{ width:80,height:80,borderRadius:24,background:`linear-gradient(135deg,${C.sage},${C.sageDark})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",boxShadow:"0 12px 32px rgba(132,169,140,.4)" }}>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M8 34V18C8 14 10 10 21 10C32 10 34 14 34 18V34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M14 18V26M21 18V26M28 18V26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M6 34H36" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </div>
        <div style={{ fontFamily:"Georgia,serif",fontSize:48,fontWeight:700,color:"#fff" }}>TableFlow</div>
        <div style={{ fontSize:14,fontWeight:600,color:C.sage,letterSpacing:2,textTransform:"uppercase",marginTop:8 }}>Reserve · Dine · Earn</div>
      </div>
      <div style={{ display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",padding:"0 24px" }}>
        <div onClick={()=>switchMode("guest")} style={{ background:C.orange,padding:"20px 48px",borderRadius:20,cursor:"pointer",textAlign:"center",boxShadow:"0 8px 24px rgba(217,72,15,.35)",animation:"tfGlow 2.5s infinite" }}>
          <div style={{ fontSize:28,marginBottom:8 }}>👤</div>
          <div style={{ fontSize:20,fontWeight:700,color:"#fff" }}>Guest</div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,.8)",marginTop:4 }}>Book · Dine · Earn</div>
        </div>
        <div onClick={()=>switchMode("owner")} style={{ background:"transparent",border:`3px solid ${C.orange}`,padding:"20px 48px",borderRadius:20,cursor:"pointer",textAlign:"center" }}>
          <div style={{ fontSize:28,marginBottom:8 }}>👨‍💼</div>
          <div style={{ fontSize:20,fontWeight:700,color:C.orange }}>Owner</div>
          <div style={{ fontSize:13,color:C.sage,marginTop:4 }}>Manage · Grow · Profit</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100vh",background:C.navyBg,fontFamily:"sans-serif",display:"flex",flexDirection:"column",overflow:"hidden" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 24px",borderBottom:"1px solid rgba(255,255,255,.08)",flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:30,height:30,borderRadius:9,background:`linear-gradient(135deg,${C.sage},${C.sageDark})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 42 42" fill="none"><path d="M8 34V18C8 14 10 10 21 10C32 10 34 14 34 18V34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M14 18V26M21 18V26M28 18V26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M6 34H36" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"#fff" }}>TableFlow</span>
          <span style={{ fontSize:11,color:C.gray }}>· {mode==="guest"?"Guest":"Owner"}</span>
        </div>
        <div style={{ display:"flex",gap:6 }}>
          {["guest","owner"].map(m=>(
            <div key={m} onClick={()=>switchMode(m)} style={{ padding:"6px 13px",borderRadius:9,cursor:"pointer",background:mode===m?C.orange:"rgba(255,255,255,.06)",color:mode===m?"#fff":"rgba(255,255,255,.5)",fontWeight:mode===m?700:400,fontSize:12 }}>
              {m==="guest"?"👤 Guest":"👨‍💼 Owner"}
            </div>
          ))}
          <div onClick={()=>onBack?onBack():switchMode(null)} style={{ padding:"6px 11px",borderRadius:9,cursor:"pointer",background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.4)",fontSize:12 }}>✕</div>
        </div>
      </div>
      <div style={{ display:"flex",gap:4,padding:"6px 20px",overflowX:"auto",borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0 }}>
        {screens.map((s,i)=>(
          <div key={i} onClick={()=>{ setIdx(i); if(mode==="guest")setGKey(gKeys[i]||"home"); }} style={{ padding:"5px 11px",borderRadius:8,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,background:i===safe?C.orange:"rgba(255,255,255,.05)",color:i===safe?"#fff":"rgba(255,255,255,.4)",fontWeight:i===safe?700:400,fontSize:11 }}>
            {i+1}. {s.name}
          </div>
        ))}
      </div>
      <div style={{ flex:1,display:"flex",overflow:"hidden",minHeight:0 }}>
        <div style={{ flex:"0 0 50%",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 16px",borderRight:"1px solid rgba(255,255,255,.06)",overflow:"hidden" }}>
          <PhoneFrame>
            {CurScreen && <CurScreen go={goG} onUpdate={()=>forceUpdate(n=>n+1)} />}
          </PhoneFrame>
        </div>
        <div style={{ flex:"0 0 50%",minWidth:0,overflowY:"auto",padding:"22px 28px",display:"flex",flexDirection:"column",gap:14 }}>
          <div>
            <div style={{ display:"inline-block",padding:"3px 11px",borderRadius:20,background:C.orange,color:"#fff",fontSize:11,fontWeight:700,marginBottom:10 }}>Screen {safe+1} of {screens.length}</div>
            <div style={{ fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,color:"#fff",lineHeight:1.25 }}>{screens[safe]?.name}</div>
          </div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,.78)",lineHeight:1.85,background:"rgba(255,255,255,.04)",padding:"16px 18px",borderRadius:14,borderLeft:`3px solid ${C.orange}`,whiteSpace:"pre-line" }}>
            {screens[safe]?.desc}
          </div>
          <div style={{ marginTop:"auto",display:"flex",gap:10,paddingTop:8 }}>
            <div onClick={()=>{ const ni=Math.max(0,safe-1); setIdx(ni); if(mode==="guest")setGKey(gKeys[ni]||"home"); }} style={{ padding:"10px 18px",borderRadius:11,cursor:"pointer",background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.35)",fontWeight:600,fontSize:13,opacity:safe===0?0.3:1 }}>← Prev</div>
            <div onClick={()=>{ const ni=Math.min(screens.length-1,safe+1); setIdx(ni); if(mode==="guest")setGKey(gKeys[ni]||"home"); }} style={{ padding:"10px 18px",borderRadius:11,cursor:"pointer",background:C.orange,color:"#fff",fontWeight:700,fontSize:13,flex:1,textAlign:"center",opacity:safe===screens.length-1?0.4:1 }}>
              {safe===screens.length-1?"✓ End of Demo":"Next →"}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display:"flex",justifyContent:"center",gap:5,padding:"7px 0",borderTop:"1px solid rgba(255,255,255,.05)",flexShrink:0 }}>
        {screens.map((_,i)=>(
          <div key={i} onClick={()=>{ setIdx(i); if(mode==="guest")setGKey(gKeys[i]||"home"); }} style={{ width:i===safe?18:5,height:5,borderRadius:3,cursor:"pointer",background:i===safe?C.orange:"rgba(255,255,255,.12)",transition:"width .25s" }}/>
        ))}
      </div>
    </div>
  );
}