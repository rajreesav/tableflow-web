import { useState, useEffect } from "react";

/* ── GLOBAL STYLES ─────────────────────────────────────── */
if (!document.getElementById("tf-global-style")) {
  const _s = document.createElement("style");
  _s.id = "tf-global-style";
  _s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #fff; font-family: 'Barlow', sans-serif; overflow-y: scroll !important; }
    #root { min-height: 100vh; overflow: visible !important; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #111; }
    ::-webkit-scrollbar-thumb { background: #3b7ff5; border-radius: 2px; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes glow      { 0%,100%{box-shadow:0 0 20px rgba(59,127,245,0.3)} 50%{box-shadow:0 0 40px rgba(59,127,245,0.6)} }
    @keyframes glowGreen { 0%,100%{box-shadow:0 0 16px rgba(74,222,128,0.2)} 50%{box-shadow:0 0 32px rgba(74,222,128,0.4)} }
    @keyframes glowOrange{ 0%,100%{box-shadow:0 0 20px rgba(217,72,15,0.3)} 50%{box-shadow:0 0 40px rgba(217,72,15,0.55)} }
    @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    .reveal        { opacity:0;transform:translateY(40px);transition:opacity 0.7s ease,transform 0.7s ease; }
    .reveal.visible{ opacity:1;transform:translateY(0); }
    .reveal-left   { opacity:0;transform:translateX(-40px);transition:opacity 0.7s ease,transform 0.7s ease; }
    .reveal-left.visible { opacity:1;transform:translateX(0); }
    .reveal-right  { opacity:0;transform:translateX(40px);transition:opacity 0.7s ease,transform 0.7s ease; }
    .reveal-right.visible{ opacity:1;transform:translateX(0); }
    .hover-card    { transition: all 0.2s ease; }
    .hover-card:hover { transform: translateY(-4px); }
  `;
  document.head.appendChild(_s);
}

const B      = "#3b7ff5";
const ORANGE = "#D9480F";
const SAGE   = "#84A98C";
const GREEN  = "#4ade80";
const RED    = "#e63946";
const GOLD   = "#f59e0b";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ── PHONE MOCKUP ─────────────────────────────────────── */
const PhoneMockup = () => (
  <div style={{ width:280,height:560,background:"linear-gradient(160deg,#1a1a1e,#0d0d0f)",borderRadius:40,boxShadow:`0 0 0 1.5px #333,0 40px 100px rgba(59,127,245,0.2),0 20px 60px rgba(0,0,0,0.8)`,position:"relative",overflow:"hidden",animation:"float 4s ease-in-out infinite" }}>
    <div style={{ position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",width:90,height:24,background:"#000",borderRadius:12,zIndex:10 }}/>
    <div style={{ position:"absolute",inset:3,borderRadius:37,background:"#F8F5F0",overflow:"hidden" }}>
      <div style={{ padding:"14px 18px 0",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <span style={{ fontSize:10,fontWeight:700,color:"#2F3E46" }}>9:41</span>
        <div style={{ display:"flex",gap:4 }}>
          {[4,6,8,10].map((h,i)=><div key={i} style={{ width:3,height:h,background:"#2F3E46",borderRadius:1,opacity:i<3?1:0.3 }}/>)}
        </div>
      </div>
      <div style={{ padding:"8px 14px" }}>
        <div style={{ fontSize:9,color:"#9BA8AF" }}>Good evening,</div>
        <div style={{ fontSize:16,fontWeight:700,color:"#2F3E46",fontFamily:"Georgia,serif" }}>Marco 👋</div>
        <div style={{ fontSize:9,color:SAGE,fontWeight:600,marginBottom:10 }}>📍 Amsterdam Centrum</div>
        <div style={{ background:"#fff",borderRadius:14,padding:"10px 12px",marginBottom:8,boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:8,color:"#9BA8AF",marginBottom:2 }}>Today's Revenue</div>
          <div style={{ fontSize:20,fontWeight:700,color:ORANGE }}>€1,842</div>
          <div style={{ fontSize:8,color:SAGE,fontWeight:600 }}>↑ 18% vs Yesterday</div>
        </div>
        <div style={{ display:"flex",gap:6,marginBottom:8 }}>
          {[["Bookings","24","#2F3E46"],["No-Show","3%",SAGE]].map(([l,v,c])=>(
            <div key={l} style={{ flex:1,background:"#fff",borderRadius:12,padding:"8px 10px",boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:7,color:"#9BA8AF" }}>{l}</div>
              <div style={{ fontSize:16,fontWeight:700,color:c }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff",borderRadius:12,padding:"8px 10px",boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:8,color:"#9BA8AF",marginBottom:6 }}>Last 7 Days</div>
          <div style={{ display:"flex",alignItems:"flex-end",gap:4,height:30 }}>
            {[42,58,45,62,78,82,65].map((v,i)=>(
              <div key={i} style={{ flex:1,height:`${v}%`,background:i===5?ORANGE:SAGE,borderRadius:"3px 3px 0 0",opacity:i===5?1:0.6 }}/>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div style={{ position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",width:80,height:4,background:"rgba(255,255,255,0.2)",borderRadius:2 }}/>
  </div>
);

/* ── TICKER ───────────────────────────────────────────── */
const Ticker = () => {
  const items = ["€28K+ SAVED PER RESTAURANT","0% BOOKING COMMISSION","3% NO-SHOW RATE","10 SEC RESERVATION","YOUR GUESTS. YOUR DATA.","DIRECT BOOKINGS ONLY","ZERO PLATFORM DEPENDENCY","FINE DINING · STEAKHOUSE · BRASSERIE"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"11px 0",background:"rgba(59,127,245,0.02)" }}>
      <div style={{ display:"flex",gap:48,whiteSpace:"nowrap",animation:"ticker 26s linear infinite" }}>
        {doubled.map((t,i)=>(
          <span key={i} style={{ fontSize:11,fontWeight:700,letterSpacing:2,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",flexShrink:0 }}>
            {t} <span style={{ color:B,margin:"0 12px" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── FLOATING CTA ─────────────────────────────────────── */
const FloatingCTA = () => (
  <div style={{ position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,alignItems:"center",background:"rgba(12,12,12,0.94)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:50,padding:"8px 12px",boxShadow:"0 8px 40px rgba(0,0,0,0.6)",zIndex:1000 }}>
    <a href="https://calendar.app.google/onNjzyBV1i8SKujv7" target="_blank" rel="noreferrer"
      style={{ display:"flex",alignItems:"center",gap:7,background:B,color:"#fff",padding:"9px 18px",borderRadius:40,fontSize:13,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap",animation:"glow 2s infinite" }}>
      📅 Book Free Call
    </a>
    <a href="https://wa.me/919153663735" target="_blank" rel="noreferrer"
      style={{ display:"flex",alignItems:"center",gap:7,background:"#25D366",color:"#fff",padding:"9px 18px",borderRadius:40,fontSize:13,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap" }}>
      💬 WhatsApp
    </a>
    <a href="mailto:connect.tableflow@gmail.com"
      style={{ display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)",padding:"9px 18px",borderRadius:40,fontSize:13,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap" }}>
      ✉ Email
    </a>
  </div>
);

/* ── NAVBAR ───────────────────────────────────────────── */
const Navbar = ({ onROI }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px",height:60,background:scrolled?"rgba(8,8,8,0.96)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.06)":"none",transition:"all 0.3s ease" }}>
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,letterSpacing:1 }}>
        TABLE<span style={{ color:ORANGE }}>FLOW</span>
      </div>
      <div style={{ display:"flex",gap:28,alignItems:"center" }}>
        {[["problem","Problem"],["solution","Solution"],["results","Results"],["pricing","Pricing"]].map(([id,label])=>(
          <span key={id} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
            style={{ color:"rgba(255,255,255,0.45)",fontSize:12,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:"color 0.2s" }}
            onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.45)"}>
            {label}
          </span>
        ))}
        <button onClick={onROI} style={{ background:"rgba(74,222,128,0.07)",border:"1px solid rgba(74,222,128,0.22)",color:GREEN,padding:"7px 16px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",letterSpacing:1,fontFamily:"'Barlow',sans-serif",textTransform:"uppercase" }}>
          💰 ROI Calc
        </button>
      </div>
      <a href="https://calendar.app.google/onNjzyBV1i8SKujv7" target="_blank" rel="noreferrer"
        style={{ background:B,color:"#fff",padding:"9px 22px",borderRadius:8,fontSize:13,fontWeight:700,textDecoration:"none",letterSpacing:0.5 }}>
        Book Strategy Call →
      </a>
    </nav>
  );
};

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function LandingPage({ onGuest, onOwner, onROI }) {
  useReveal();

  return (
    <div style={{ background:"#080808",minHeight:"100vh" }}>
      <Navbar onROI={onROI} />
      <FloatingCTA />

      {/* ══ 1. HERO ══════════════════════════════════════ */}
      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",padding:"80px 48px 60px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(59,127,245,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,127,245,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px",zIndex:0 }}/>
        <div style={{ position:"absolute",top:"20%",left:"30%",width:600,height:600,background:"radial-gradient(circle,rgba(59,127,245,0.06),transparent 70%)",zIndex:0,pointerEvents:"none" }}/>

        <div style={{ flex:1,position:"relative",zIndex:1,animation:"fadeUp 0.9s ease both" }}>
          {/* eyebrow */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(59,127,245,0.35)",borderRadius:4,padding:"6px 14px",marginBottom:28 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:B,animation:"pulse 1.5s infinite" }}/>
            <span style={{ fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:B }}>Restaurant Growth App</span>
          </div>

          {/* headline */}
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:0.92,marginBottom:28 }}>
            <div style={{ fontSize:"clamp(52px,6vw,88px)",textTransform:"uppercase",color:"#fff" }}>MORE BOOKINGS.</div>
            <div style={{ fontSize:"clamp(52px,6vw,88px)",textTransform:"uppercase",color:B }}>ZERO COMMISSION.</div>
            <div style={{ fontSize:"clamp(52px,6vw,88px)",textTransform:"uppercase",color:"rgba(255,255,255,0.12)" }}>GUESTS YOU OWN.</div>
          </div>

          <p style={{ fontSize:16,color:"rgba(255,255,255,0.5)",lineHeight:1.7,maxWidth:500,marginBottom:16 }}>
            TableFlow gives fine dining restaurants, steakhouses, and brasseries their own branded app — with <strong style={{ color:"#fff" }}>direct table booking, push marketing, loyalty rewards,</strong> and the customer database that's rightfully yours. No TheFork. No OpenTable cut.
          </p>

          {/* secondary hook — mid-size + delivery */}
          <div style={{ display:"flex",alignItems:"flex-start",gap:10,maxWidth:500,marginBottom:36,padding:"12px 16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8 }}>
            <span style={{ fontSize:13,flexShrink:0,marginTop:1 }}>💡</span>
            <p style={{ fontSize:12,color:"rgba(255,255,255,0.32)",lineHeight:1.6,margin:0 }}>
              Also works for <span style={{ color:"rgba(255,255,255,0.55)",fontWeight:600 }}>mid-size cafés, bistros & delivery-first restaurants</span> — start with an MVP booking + loyalty app from <span style={{ color:B,fontWeight:600 }}>€7K</span> and scale up as you grow.
            </p>
          </div>

          <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:44 }}>
            <button onClick={onGuest} style={{ background:ORANGE,color:"#fff",border:"none",padding:"14px 30px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5,animation:"glowOrange 2.5s infinite" }}>
              👤 See Guest Experience →
            </button>
            <button onClick={onOwner} style={{ background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.18)",padding:"14px 30px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5 }}>
              👨‍💼 See Owner Dashboard →
            </button>
            <button onClick={onROI} style={{ background:"rgba(74,222,128,0.06)",color:GREEN,border:"1px solid rgba(74,222,128,0.28)",padding:"14px 30px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5,animation:"glowGreen 2.5s infinite",fontFamily:"'Barlow',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(74,222,128,0.11)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(74,222,128,0.06)"}>
              💰 Calculate Your Savings →
            </button>
          </div>

          <div style={{ display:"flex",gap:36 }}>
            {[["€28K+","Saved per restaurant / year"],["↓ 32%","No-show reduction"],["0%","Commission to platforms"]].map(([n,l])=>(
              <div key={n}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:34,fontWeight:900,color:B }}>{n}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"relative",zIndex:1,animation:"fadeIn 1.2s ease both",paddingLeft:60 }}>
          <PhoneMockup />
          <div style={{ position:"absolute",top:40,left:-20,background:"#fff",borderRadius:12,padding:"10px 14px",boxShadow:"0 8px 30px rgba(0,0,0,0.3)",animation:"float 3s ease-in-out infinite 0.5s" }}>
            <div style={{ fontSize:10,color:"#9BA8AF" }}>Commission saved</div>
            <div style={{ fontSize:18,fontWeight:700,color:GREEN }}>€2,840/mo</div>
          </div>
          <div style={{ position:"absolute",bottom:80,right:-30,background:"#fff",borderRadius:12,padding:"10px 14px",boxShadow:"0 8px 30px rgba(0,0,0,0.3)",animation:"float 3.5s ease-in-out infinite 1s" }}>
            <div style={{ fontSize:10,color:"#9BA8AF" }}>No-show rate</div>
            <div style={{ fontSize:18,fontWeight:700,color:SAGE }}>↓ 3%</div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ══ 2. PROBLEM ═══════════════════════════════════ */}
      <section id="problem" style={{ padding:"120px 48px",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:72 }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:RED,textTransform:"uppercase",marginBottom:16,display:"flex",alignItems:"center",gap:12 }}>
            THE PROBLEM <div style={{ width:80,height:1,background:`linear-gradient(to right,${RED},transparent)` }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(44px,5vw,72px)",textTransform:"uppercase",lineHeight:0.92 }}>
            <div>BOOKING PLATFORMS</div>
            <div style={{ color:RED }}>DRAIN YOUR MARGIN.</div>
          </div>
          <p style={{ fontSize:15,color:"rgba(255,255,255,0.4)",marginTop:16,maxWidth:600,lineHeight:1.7 }}>
            For fine dining, steakhouses, and premium restaurants — where average spend is €60–€150 per cover — booking commission isn't a small fee. It's thousands of euros every month, quietly disappearing.
          </p>
        </div>

        {/* 3 pain cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginBottom:56 }}>
          {[
            {
              icon:"💸", head:"TheFork Takes 20–25%",
              body:"Every reservation made through TheFork or OpenTable costs you a cut. On a €120 table for two, that's €24–€30 gone before the guest sits down.",
              stat:"−€2,840", statLabel:"avg monthly loss — 180 bookings at €82 spend",
              color:RED,
            },
            {
              icon:"🚫", head:"No-Shows Kill Your Revenue.",
              body:"Platform bookings have 15–25% no-show rates. An empty table at Friday dinner = €150+ gone. No deposit, no accountability, no recourse.",
              stat:"15–25%", statLabel:"no-show rate on platform bookings",
              color:RED,
            },
            {
              icon:"👤", head:"You Don't Own Your Guests.",
              body:"TheFork owns the relationship. You can't email them, push them a Tuesday offer, or build loyalty. Every guest who books via platform is a stranger to you.",
              stat:"0", statLabel:"guest records you own after 5 years on TheFork",
              color:RED,
            },
          ].map(({icon,head,body,stat,statLabel,color})=>(
            <div key={head} className="hover-card reveal" style={{ padding:"40px 36px",background:"rgba(230,57,70,0.03)",border:"1px solid rgba(230,57,70,0.1)",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,right:0,width:80,height:80,background:"radial-gradient(circle at top right,rgba(230,57,70,0.07),transparent 70%)" }}/>
              <div style={{ fontSize:32,marginBottom:20 }}>{icon}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,textTransform:"uppercase",marginBottom:12,lineHeight:1.1 }}>{head}</div>
              <div style={{ fontSize:13,color:"rgba(255,255,255,0.38)",lineHeight:1.7,marginBottom:20 }}>{body}</div>
              <div style={{ borderTop:"1px solid rgba(230,57,70,0.12)",paddingTop:16 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:38,fontWeight:900,color }}>{stat}</div>
                <div style={{ fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:3,lineHeight:1.4 }}>{statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* revenue visual */}
        <div className="reveal" style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"40px 48px" }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",marginBottom:28 }}>
            WHAT €14,200 MONTHLY BOOKING REVENUE ACTUALLY LOOKS LIKE
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center" }}>
            <div>
              {[
                { label:"Gross booking revenue",         val:"€14,200", color:"rgba(255,255,255,0.8)", pct:100 },
                { label:"TheFork commission (20%)",      val:"−€2,840",  color:RED,   pct:20 },
                { label:"No-show empty tables (~18%)",   val:"−€890",    color:RED,   pct:6  },
                { label:"What actually hits your account",val:"€10,470", color:GREEN, pct:74 },
              ].map(({label,val,color,pct})=>(
                <div key={label} style={{ marginBottom:18 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                    <span style={{ fontSize:13,color:"rgba(255,255,255,0.45)" }}>{label}</span>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color }}>{val}</span>
                  </div>
                  <div style={{ background:"rgba(255,255,255,0.05)",borderRadius:3,height:5,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${pct}%`,background:color,borderRadius:3,opacity:0.75,transition:"width 0.5s" }}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:700,letterSpacing:2,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",marginBottom:6 }}>You keep only</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:96,fontWeight:900,color:RED,lineHeight:1 }}>74%</div>
              <div style={{ fontSize:13,color:"rgba(255,255,255,0.28)",marginTop:8 }}>of what your restaurant earns</div>
              <div style={{ marginTop:20,padding:"16px 20px",background:"rgba(74,222,128,0.05)",border:"1px solid rgba(74,222,128,0.15)",borderRadius:8 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:30,fontWeight:900,color:GREEN }}>With TableFlow: 100%</div>
                <div style={{ fontSize:12,color:"rgba(74,222,128,0.45)",marginTop:4 }}>Zero commission. Every booking.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. SOLUTION ══════════════════════════════════ */}
      <section id="solution" style={{ padding:"120px 48px",background:"rgba(255,255,255,0.015)",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:64 }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:B,textTransform:"uppercase",marginBottom:16,display:"flex",alignItems:"center",gap:12 }}>
            THE SOLUTION <div style={{ width:80,height:1,background:`linear-gradient(to right,${B},transparent)` }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(44px,5vw,72px)",textTransform:"uppercase",lineHeight:0.92 }}>
            <div>YOUR OWN BRANDED</div>
            <div style={{ color:B }}>RESTAURANT GROWTH APP.</div>
          </div>
          <p style={{ fontSize:15,color:"rgba(255,255,255,0.4)",marginTop:18,maxWidth:580,lineHeight:1.7 }}>
            We build a custom iOS + Android app under <em>your</em> restaurant's name. Guests see your brand, not ours. Direct bookings, zero commission, full guest ownership — built specifically for fine dining, steakhouses, and premium brasseries.
          </p>
        </div>

        {/* 4 solution pillars — primary: dine-in */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:2,marginBottom:48 }}>
          {[
            {
              icon:"🍽️", num:"01", title:"DIRECT TABLE BOOKING",
              body:"Guests reserve a table directly through YOUR app in 10 seconds — no platform, no commission. Prepaid deposit eliminates no-shows. Works for walk-ins, large groups, private dining.",
              tag:"Core Feature", tagColor:B, primary:true,
            },
            {
              icon:"🔔", num:"02", title:"PUSH NOTIFICATION MARKETING",
              body:"Send a Tuesday slow-night offer to your entire guest database in one tap. New seasonal menu? Birthday specials? Event nights? One campaign = €2K–€4K average extra revenue.",
              tag:"Re-engagement", tagColor:GREEN, primary:true,
            },
            {
              icon:"⭐", num:"03", title:"LOYALTY & REPEAT VISITS",
              body:"Guests earn points per visit. Free dessert after 5 visits, birthday bottle, exclusive member nights. Automated rewards that bring your best customers back — and make them spend more.",
              tag:"10–18% Revenue Lift", tagColor:GOLD, primary:true,
            },
            {
              icon:"📦", num:"04", title:"DELIVERY (OPTIONAL ADD-ON)",
              body:"For restaurants that also do delivery — integrate direct ordering with zero commission. Works alongside dine-in. Separate menus, separate flow. 100% of delivery revenue stays with you.",
              tag:"Optional", tagColor:"rgba(255,255,255,0.35)", primary:false,
            },
          ].map(({icon,num,title,body,tag,tagColor,primary})=>(
            <div key={num} className="hover-card reveal" style={{ padding:"40px 44px",background:primary?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.01)",border:`1px solid ${primary?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.05)"}`,position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,right:0,width:80,height:80,background:`radial-gradient(circle at top right,rgba(59,127,245,0.06),transparent 70%)` }}/>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
                <div style={{ fontSize:28 }}>{icon}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:700,letterSpacing:2,color:"rgba(255,255,255,0.22)" }}>STEP {num}</div>
                <div style={{ marginLeft:"auto",border:`1px solid ${tagColor}`,borderRadius:4,padding:"3px 10px",fontSize:11,fontWeight:600,color:tagColor,letterSpacing:0.5,opacity:0.85 }}>{tag}</div>
              </div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:900,textTransform:"uppercase",marginBottom:12,lineHeight:1,color:primary?"#fff":"rgba(255,255,255,0.6)" }}>{title}</div>
              <div style={{ fontSize:13,color:primary?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.28)",lineHeight:1.7 }}>{body}</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display:"flex",gap:14,justifyContent:"center" }}>
          <button onClick={onGuest} style={{ background:ORANGE,color:"#fff",border:"none",padding:"14px 36px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5 }}>👤 See Guest Experience →</button>
          <button onClick={onOwner} style={{ background:B,color:"#fff",border:"none",padding:"14px 36px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5 }}>👨‍💼 See Owner Dashboard →</button>
        </div>
      </section>

      {/* ══ 4. RESULTS ═══════════════════════════════════ */}
      <section id="results" style={{ padding:"120px 48px",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:64 }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:GREEN,textTransform:"uppercase",marginBottom:16,display:"flex",alignItems:"center",gap:12 }}>
            THE RESULTS <div style={{ width:80,height:1,background:`linear-gradient(to right,${GREEN},transparent)` }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(44px,5vw,72px)",textTransform:"uppercase",lineHeight:0.92 }}>
            <div>RESTAURANTS RECOVER</div>
            <div style={{ color:GREEN }}>€3K–€12K PER YEAR.</div>
          </div>
        </div>

        {/* before / after */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,marginBottom:48 }}>
          {[
            {
              label:"BEFORE TABLEFLOW", accent:RED, bg:"rgba(230,57,70,0.03)", border:"rgba(230,57,70,0.1)",
              rows:[
                ["Monthly bookings","180"],
                ["Platform commission","−€2,840 / mo"],
                ["No-show rate","~18%  (empty tables)"],
                ["No-show revenue lost","−€890 / mo"],
                ["Customer data owned","❌  None"],
                ["Repeat guest rate","~18%"],
                ["Monthly net","€10,470"],
              ],
              highlight:5,
            },
            {
              label:"AFTER TABLEFLOW", accent:GREEN, bg:"rgba(74,222,128,0.03)", border:"rgba(74,222,128,0.12)",
              rows:[
                ["Monthly bookings","180"],
                ["Platform commission","€0  (zero)"],
                ["No-show rate","~3%  (prepaid deposit)"],
                ["No-show revenue saved","+€730 / mo"],
                ["Customer data owned","✅  All of it — yours"],
                ["Repeat guest rate","~38%+"],
                ["Monthly net","€14,040"],
              ],
              highlight:6,
            },
          ].map(({label,accent,bg,border,rows,highlight})=>(
            <div key={label} className="reveal" style={{ background:bg,border:`1px solid ${border}`,padding:"40px 44px" }}>
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:2,color:accent,textTransform:"uppercase",marginBottom:24 }}>{label}</div>
              {rows.map(([l,v],i)=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"11px 0",borderBottom:`1px solid rgba(255,255,255,${i===rows.length-1?0:0.05})` }}>
                  <span style={{ fontSize:13,color:"rgba(255,255,255,0.5)" }}>{l}</span>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:i===highlight?24:18,fontWeight:900,color:i===highlight?accent:"#fff" }}>{v}</span>
                </div>
              ))}
              {label.includes("BEFORE") && (
                <div style={{ marginTop:20,padding:"14px 18px",background:"rgba(230,57,70,0.07)",border:"1px solid rgba(230,57,70,0.2)",borderRadius:8,textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:36,fontWeight:900,color:RED }}>−€3,730 / mo</div>
                  <div style={{ fontSize:12,color:"rgba(230,57,70,0.5)",marginTop:3 }}>lost to commission + no-shows</div>
                </div>
              )}
              {label.includes("AFTER") && (
                <div style={{ marginTop:20,padding:"14px 18px",background:"rgba(74,222,128,0.06)",border:"1px solid rgba(74,222,128,0.15)",borderRadius:8,textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:36,fontWeight:900,color:GREEN }}>+€3,570 / mo</div>
                  <div style={{ fontSize:12,color:"rgba(74,222,128,0.45)",marginTop:3 }}>extra revenue recovered</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ROI TEASER */}
        <div className="reveal" style={{ background:"rgba(74,222,128,0.02)",border:"1px solid rgba(74,222,128,0.1)",borderRadius:10,padding:"40px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:GREEN,textTransform:"uppercase",marginBottom:14 }}>CALCULATE YOUR EXACT NUMBER</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(28px,3vw,44px)",textTransform:"uppercase",lineHeight:1 }}>
              HOW MUCH IS <span style={{ color:GREEN }}>YOUR RESTAURANT</span> LOSING TODAY?
            </div>
            <p style={{ fontSize:14,color:"rgba(255,255,255,0.38)",marginTop:12,maxWidth:440,lineHeight:1.6 }}>
              Enter your monthly bookings and average table spend. See in real time exactly what TheFork is taking — and what you'd recover with TableFlow.
            </p>
          </div>
          <div>
            <div style={{ display:"flex",gap:28,marginBottom:20,justifyContent:"flex-end" }}>
              {[["€28K+","avg annual savings"],["~6 mo","payback period"],["0%","commission"]].map(([n,l])=>(
                <div key={n} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:GREEN }}>{n}</div>
                  <div style={{ fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={onROI} style={{ background:GREEN,color:"#080808",border:"none",padding:"16px 44px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5,display:"block",width:"100%",animation:"glowGreen 2.5s infinite",fontFamily:"'Barlow',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              💰 Calculate My Savings →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 5. WHAT YOU GET ══════════════════════════════ */}
      <section style={{ padding:"100px 48px",background:"rgba(255,255,255,0.015)",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:56 }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:B,textTransform:"uppercase",marginBottom:16,display:"flex",alignItems:"center",gap:12 }}>
            WHAT YOU GET <div style={{ width:80,height:1,background:`linear-gradient(to right,${B},transparent)` }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(40px,4vw,60px)",textTransform:"uppercase",lineHeight:0.92 }}>
            <div>EVERYTHING.</div><div style={{ color:B }}>OUT OF THE BOX.</div>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2 }}>
          {[
            { icon:"📱", title:"BRANDED iOS + ANDROID APP", desc:"Your restaurant's name, logo, colors. Guests see your brand. Deployed to App Store & Play Store." },
            { icon:"🗓️", title:"DIRECT TABLE RESERVATIONS", desc:"Commission-free bookings. 10-second flow. Prepaid deposit. iDEAL, Stripe, Apple Pay — all integrated." },
            { icon:"📊", title:"OWNER ANALYTICS DASHBOARD", desc:"Live revenue, bookings, no-show tracking. Commission savings shown in real time. Mobile-first." },
            { icon:"🔔", title:"PUSH CAMPAIGN ENGINE", desc:"Broadcast offers to your full guest base. Slow Tuesday? Send a campaign. Avg €2K–€4K per push." },
            { icon:"⭐", title:"LOYALTY ENGINE", desc:"Automated points per visit. Free drink after 5, birthday perks, member nights. 10–18% revenue lift." },
            { icon:"👥", title:"FULL GUEST DATABASE", desc:"Every guest's name, visit history, spend — yours forever. Export it, market to it, own it. Always." },
          ].map(({icon,title,desc})=>(
            <div key={title} className="hover-card reveal" style={{ padding:"36px 32px",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.06)",position:"relative",overflow:"hidden",transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(59,127,245,0.04)"; e.currentTarget.style.borderColor="rgba(59,127,245,0.18)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; }}>
              <div style={{ position:"absolute",top:0,right:0,width:60,height:60,background:"linear-gradient(135deg,rgba(59,127,245,0.07),transparent)",borderRadius:"0 0 0 60px" }}/>
              <div style={{ fontSize:32,marginBottom:18 }}>{icon}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,textTransform:"uppercase",marginBottom:10,letterSpacing:0.5 }}>{title}</div>
              <div style={{ fontSize:13,color:"rgba(255,255,255,0.38)",lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 6. PRICING + URGENCY ═════════════════════════ */}
      <section id="pricing" style={{ padding:"120px 48px",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:56 }}>
          <div style={{ fontSize:11,fontWeight:600,letterSpacing:2,color:B,textTransform:"uppercase",marginBottom:16,display:"flex",alignItems:"center",gap:12 }}>
            PRICING <div style={{ width:80,height:1,background:`linear-gradient(to right,${B},transparent)` }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(44px,5vw,64px)",textTransform:"uppercase",lineHeight:0.92 }}>
            <div>ONE INVESTMENT.</div>
            <div style={{ color:B }}>INFINITE RETURNS.</div>
          </div>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1.1fr 1fr",gap:2,alignItems:"start" }}>
          {[
            {
              tier:"STARTER", price:"€7K", sub:"One-time",
              note:"Pays back in ~24 months",
              features:["Branded iOS + Android app","Direct table booking system","Guest loyalty program","Payment integration","Basic analytics","30-day support"],
              cta:"GET STARTED →", highlight:false,
            },
            {
              tier:"GROWTH", price:"€15K", sub:"One-time",
              note:"⚡ Pays back in ~6 months",
              features:["Everything in Starter","Owner analytics dashboard","Push campaign engine","Full guest CRM database","Commission savings tracker","Advanced loyalty engine","60-day support","Priority response <4hrs"],
              cta:"BOOK STRATEGY CALL →", highlight:true,
            },
            {
              tier:"ENTERPRISE", price:"€30K+", sub:"Custom",
              note:"Full custom ROI analysis",
              features:["Custom architecture","Multi-location support","White-label ready","Complex integrations","Dedicated team","SLA guarantee","Ongoing retainer"],
              cta:"LET'S TALK →", highlight:false,
            },
          ].map(({tier,price,sub,note,features,cta,highlight})=>(
            <div key={tier} className="reveal" style={{ background:highlight?B:"rgba(255,255,255,0.02)",border:`1px solid ${highlight?B:"rgba(255,255,255,0.08)"}`,padding:"48px 36px",position:"relative",marginTop:highlight?-20:0 }}>
              {highlight && <div style={{ position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:B,color:"#fff",fontSize:10,fontWeight:700,letterSpacing:2,padding:"4px 16px",borderRadius:"0 0 8px 8px" }}>MOST POPULAR</div>}
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:2,color:highlight?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.28)",textTransform:"uppercase",marginBottom:16 }}>{tier}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:64,fontWeight:900,color:"#fff",lineHeight:1 }}>{price}</div>
              <div style={{ fontSize:13,color:highlight?"rgba(255,255,255,0.55)":"rgba(255,255,255,0.28)",marginBottom:8 }}>{sub}</div>
              <div style={{ fontSize:12,fontWeight:700,color:highlight?"rgba(255,255,255,0.9)":GREEN,marginBottom:28 }}>{note}</div>
              <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:36 }}>
                {features.map(f=>(
                  <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                    <span style={{ color:highlight?"#fff":B,marginTop:2,flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:13,color:highlight?"rgba(255,255,255,0.82)":"rgba(255,255,255,0.48)",lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://calendar.app.google/onNjzyBV1i8SKujv7" target="_blank" rel="noreferrer"
                style={{ display:"block",textAlign:"center",padding:"14px",background:highlight?"#fff":"transparent",color:highlight?B:"#fff",border:highlight?"none":"1px solid rgba(255,255,255,0.15)",borderRadius:6,fontSize:13,fontWeight:700,letterSpacing:1,textDecoration:"none" }}>
                {cta}
              </a>
            </div>
          ))}
        </div>

        {/* urgency strip */}
        <div className="reveal" style={{ marginTop:40,background:"rgba(217,72,15,0.05)",border:"1px solid rgba(217,72,15,0.18)",borderRadius:8,padding:"22px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap" }}>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ fontSize:28 }}>⏳</div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,textTransform:"uppercase" }}>EVERY MONTH YOU WAIT = €3,500+ LOST TO PLATFORMS</div>
              <div style={{ fontSize:13,color:"rgba(255,255,255,0.38)",marginTop:3 }}>Commission + no-show losses your restaurant will never recover.</div>
            </div>
          </div>
          <a href="https://calendar.app.google/onNjzyBV1i8SKujv7" target="_blank" rel="noreferrer"
            style={{ background:ORANGE,color:"#fff",padding:"14px 32px",borderRadius:8,fontSize:14,fontWeight:700,textDecoration:"none",letterSpacing:0.5,whiteSpace:"nowrap",animation:"glowOrange 2.5s infinite" }}>
            Book Free Strategy Call →
          </a>
        </div>
      </section>

      {/* ══ 7. FINAL CTA ═════════════════════════════════ */}
      <section style={{ padding:"140px 48px",borderTop:"1px solid rgba(255,255,255,0.06)",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,background:"radial-gradient(circle,rgba(59,127,245,0.07),transparent 70%)",zIndex:0,pointerEvents:"none" }}/>
        <div style={{ position:"relative",zIndex:1 }}>
          <div className="reveal" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(48px,6vw,80px)",textTransform:"uppercase",lineHeight:0.9,marginBottom:20 }}>
            <div>READY TO OWN</div>
            <div style={{ color:B }}>YOUR GUESTS</div>
            <div style={{ color:"rgba(255,255,255,0.12)" }}>AND YOUR REVENUE?</div>
          </div>
          <p className="reveal" style={{ fontSize:15,color:"rgba(255,255,255,0.4)",margin:"0 auto 48px",maxWidth:500,lineHeight:1.7 }}>
            30-minute strategy call. Zero obligation. We show you exactly what your restaurant's branded app would look like and how fast it pays back.
          </p>
          <div className="reveal" style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <a href="https://calendar.app.google/onNjzyBV1i8SKujv7" target="_blank" rel="noreferrer"
              style={{ background:B,color:"#fff",padding:"16px 44px",borderRadius:8,fontSize:15,fontWeight:700,textDecoration:"none",letterSpacing:0.5,animation:"glow 2s infinite" }}>
              📅 BOOK FREE STRATEGY CALL →
            </a>
            <button onClick={onROI} style={{ background:"transparent",border:"1px solid rgba(74,222,128,0.28)",color:GREEN,padding:"16px 44px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:0.5,fontFamily:"'Barlow',sans-serif" }}>
              💰 CALCULATE MY SAVINGS FIRST
            </button>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer style={{ padding:"32px 48px",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900 }}>TABLE<span style={{ color:ORANGE }}>FLOW</span></div>
        <div style={{ fontSize:12,color:"rgba(255,255,255,0.18)" }}>© 2025 TableFlow · Restaurant Growth App</div>
        <div style={{ fontSize:12,color:"rgba(255,255,255,0.18)" }}>reesavraj7761@gmail.com</div>
      </footer>
      <div style={{ height:80 }}/>
    </div>
  );
}