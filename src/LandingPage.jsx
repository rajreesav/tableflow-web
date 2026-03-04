import { useState, useEffect, useRef } from "react";

/* ── GLOBAL RESET ─────────────────────────────────────── */
const _s = document.createElement("style");
_s.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #080808; color: #fff; font-family: 'Barlow', sans-serif; overflow-y: scroll !important; }
  #root { min-height: 100vh; overflow: visible !important; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #3b7ff5; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; } 50% { opacity: 0.5; }
  }
  @keyframes slideIn {
    from { transform: translateX(-30px); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(59,127,245,0.3); }
    50%      { box-shadow: 0 0 40px rgba(59,127,245,0.7); }
  }
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }
`;
document.head.appendChild(_s);

/* ── COLORS ───────────────────────────────────────────── */
const B = "#3b7ff5";       // blue accent (like ReachMVP)
const ORANGE = "#D9480F";  // TableFlow orange
const SAGE = "#84A98C";

/* ── SCROLL REVEAL HOOK ───────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ── PHONE MOCKUP ─────────────────────────────────────── */
const PhoneMockup = () => (
  <div style={{
    width: 280, height: 560,
    background: "linear-gradient(160deg,#1a1a1e,#0d0d0f)",
    borderRadius: 40,
    boxShadow: "0 0 0 1.5px #333, 0 40px 100px rgba(59,127,245,0.25), 0 20px 60px rgba(0,0,0,0.8)",
    position: "relative", overflow: "hidden",
    animation: "float 4s ease-in-out infinite",
  }}>
    {/* notch */}
    <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", width:90, height:24, background:"#000", borderRadius:12, zIndex:10 }}/>
    {/* screen */}
    <div style={{ position:"absolute", inset:3, borderRadius:37, background:"#F8F5F0", overflow:"hidden" }}>
      {/* status bar */}
      <div style={{ padding:"14px 18px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#2F3E46" }}>9:41</span>
        <div style={{ display:"flex", gap:4 }}>
          {[4,6,8,10].map((h,i)=><div key={i} style={{ width:3, height:h, background:"#2F3E46", borderRadius:1, opacity:i<3?1:0.3 }}/>)}
        </div>
      </div>
      {/* app content */}
      <div style={{ padding:"8px 14px" }}>
        <div style={{ fontSize:9, color:"#9BA8AF" }}>Good evening,</div>
        <div style={{ fontSize:16, fontWeight:700, color:"#2F3E46", fontFamily:"Georgia,serif" }}>Marco 👋</div>
        <div style={{ fontSize:9, color:SAGE, fontWeight:600, marginBottom:10 }}>📍 Amsterdam Centrum</div>
        {/* revenue card */}
        <div style={{ background:"#fff", borderRadius:14, padding:"10px 12px", marginBottom:8, boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:8, color:"#9BA8AF", marginBottom:2 }}>Today's Revenue</div>
          <div style={{ fontSize:20, fontWeight:700, color:ORANGE }}>€1,842</div>
          <div style={{ fontSize:8, color:SAGE, fontWeight:600 }}>↑ 18% vs Yesterday</div>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:8 }}>
          <div style={{ flex:1, background:"#fff", borderRadius:12, padding:"8px 10px", boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize:7, color:"#9BA8AF" }}>Bookings</div>
            <div style={{ fontSize:16, fontWeight:700, color:"#2F3E46" }}>24</div>
          </div>
          <div style={{ flex:1, background:"#fff", borderRadius:12, padding:"8px 10px", boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize:7, color:"#9BA8AF" }}>No-Show</div>
            <div style={{ fontSize:16, fontWeight:700, color:SAGE }}>3%</div>
          </div>
        </div>
        {/* mini chart */}
        <div style={{ background:"#fff", borderRadius:12, padding:"8px 10px", boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:8, color:"#9BA8AF", marginBottom:6 }}>Last 7 Days</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:30 }}>
            {[42,58,45,62,78,82,65].map((v,i)=>(
              <div key={i} style={{ flex:1, height:`${v}%`, background:i===5?ORANGE:SAGE, borderRadius:"3px 3px 0 0", opacity:i===5?1:0.6 }}/>
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* home bar */}
    <div style={{ position:"absolute", bottom:6, left:"50%", transform:"translateX(-50%)", width:80, height:4, background:"rgba(255,255,255,0.2)", borderRadius:2 }}/>
  </div>
);

/* ── FLOATING CTA BAR ─────────────────────────────────── */
const FloatingCTA = () => (
  <div style={{
    position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
    display:"flex", gap:8, alignItems:"center",
    background:"rgba(15,15,15,0.92)", backdropFilter:"blur(20px)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:50, padding:"8px 12px",
    boxShadow:"0 8px 40px rgba(0,0,0,0.6)",
    zIndex:1000,
  }}>
    <a href="https://calendly.com/reesavraj7761/30min" target="_blank" rel="noreferrer"
      style={{ display:"flex", alignItems:"center", gap:7, background:B, color:"#fff", padding:"9px 18px", borderRadius:40, fontSize:13, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap", animation:"glow 2s infinite" }}>
      📅 Book Free Call
    </a>
    <a href="https://wa.me/919153663735" target="_blank" rel="noreferrer"
      style={{ display:"flex", alignItems:"center", gap:7, background:"#25D366", color:"#fff", padding:"9px 18px", borderRadius:40, fontSize:13, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
      💬 WhatsApp
    </a>
    <a href="mailto:reesavraj7761@gmail.com"
      style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", padding:"9px 18px", borderRadius:40, fontSize:13, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
      ✉ Email
    </a>
  </div>
);

/* ── NAVBAR ───────────────────────────────────────────── */
const Navbar = ({ onGuest, onOwner }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:999,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 48px", height:60,
      background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition:"all 0.3s ease",
    }}>
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, letterSpacing:1 }}>
        TABLE<span style={{ color:ORANGE }}>FLOW</span>
      </div>
      <div style={{ display:"flex", gap:32, alignItems:"center" }}>
        {[["why","Why"],["how","How It Works"],["guest","Guest"],["owner","Owner"],["pricing","Pricing"]].map(([id,label]) => (
          <span key={id} onClick={()=>{ const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:"smooth"}); }} style={{ color:"rgba(255,255,255,0.55)", fontSize:12, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", textDecoration:"none", transition:"color 0.2s", cursor:"pointer" }}
            onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>
            {label}
          </span>
        ))}
      </div>
      <a href="https://calendly.com/reesavraj7761/30min" target="_blank" rel="noreferrer"
        style={{ background:B, color:"#fff", padding:"9px 22px", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none", letterSpacing:0.5 }}>
        Book Strategy Call →
      </a>
    </nav>
  );
};

/* ── MAIN LANDING ─────────────────────────────────────── */
export default function LandingPage({ onGuest, onOwner }) {
  useReveal();

  return (
    <div style={{ background:"#080808", minHeight:"100vh", overflowY:"visible" }}>
      <Navbar onGuest={onGuest} onOwner={onOwner} />
      <FloatingCTA />

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px 48px 60px", position:"relative", overflow:"hidden" }}>
        {/* bg grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(59,127,245,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,127,245,0.03) 1px,transparent 1px)", backgroundSize:"60px 60px", zIndex:0 }}/>
        {/* glow */}
        <div style={{ position:"absolute", top:"20%", left:"30%", width:600, height:600, background:"radial-gradient(circle,rgba(59,127,245,0.08),transparent 70%)", zIndex:0, pointerEvents:"none" }}/>

        <div style={{ flex:1, position:"relative", zIndex:1, animation:"fadeUp 0.9s ease both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(59,127,245,0.4)", borderRadius:4, padding:"6px 14px", marginBottom:32 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:B, animation:"pulse 1.5s infinite" }}/>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:B }}>Restaurant Revenue Platform</span>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, lineHeight:0.92, marginBottom:32 }}>
            <div style={{ fontSize:"clamp(60px,7vw,96px)", textTransform:"uppercase", color:"#fff" }}>YOUR RESTAURANT,</div>
            <div style={{ fontSize:"clamp(60px,7vw,96px)", textTransform:"uppercase", color:B }}>MORE REVENUE.</div>
            <div style={{ fontSize:"clamp(60px,7vw,96px)", textTransform:"uppercase", color:"rgba(255,255,255,0.12)" }}>ZERO COMMISSION.</div>
          </div>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.55)", lineHeight:1.7, maxWidth:480, marginBottom:40 }}>
            TableFlow helps restaurants <strong style={{ color:"#fff" }}>own their bookings, their customers, and their revenue</strong> — no third-party cuts, no dependency on platforms.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <button onClick={onGuest} style={{ background:ORANGE, color:"#fff", border:"none", padding:"14px 32px", borderRadius:8, fontSize:15, fontWeight:700, cursor:"pointer", letterSpacing:0.5 }}>
              👤 See Guest Experience →
            </button>
            <button onClick={onOwner} style={{ background:"transparent", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", padding:"14px 32px", borderRadius:8, fontSize:15, fontWeight:700, cursor:"pointer", letterSpacing:0.5 }}>
              👨‍💼 See Owner Dashboard →
            </button>
          </div>
          <div style={{ display:"flex", gap:32, marginTop:48 }}>
            {[["€28K+","Annual savings per restaurant"],["3%","Average no-show rate"],["10 sec","Table booking time"]].map(([n,l])=>(
              <div key={n}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:32, fontWeight:900, color:B }}>{n}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"relative", zIndex:1, animation:"fadeIn 1.2s ease both", display:"flex", alignItems:"center", justifyContent:"center", paddingLeft:60 }}>
          <PhoneMockup />
          {/* floating badges */}
          <div style={{ position:"absolute", top:40, left:-20, background:"#fff", borderRadius:12, padding:"10px 14px", boxShadow:"0 8px 30px rgba(0,0,0,0.3)", animation:"float 3s ease-in-out infinite 0.5s" }}>
            <div style={{ fontSize:10, color:"#9BA8AF" }}>No-show rate</div>
            <div style={{ fontSize:18, fontWeight:700, color:SAGE }}>↓ 32%</div>
          </div>
          <div style={{ position:"absolute", bottom:80, right:-30, background:"#fff", borderRadius:12, padding:"10px 14px", boxShadow:"0 8px 30px rgba(0,0,0,0.3)", animation:"float 3.5s ease-in-out infinite 1s" }}>
            <div style={{ fontSize:10, color:"#9BA8AF" }}>Commission saved</div>
            <div style={{ fontSize:18, fontWeight:700, color:ORANGE }}>€2,840/mo</div>
          </div>
        </div>
      </section>

      {/* ── WHY TABLEFLOW ── */}
      <section id="why" style={{ padding:"120px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:80 }}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
            WHY TABLEFLOW <div style={{ flex:1, height:1, background:`linear-gradient(to right,${B},transparent)`, maxWidth:120 }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(48px,5vw,72px)", textTransform:"uppercase", lineHeight:0.95 }}>
            <div>MOST PLATFORMS</div>
            <div style={{ color:"#e63946" }}>STEAL</div>
            <div>YOUR REVENUE.</div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
          <div className="reveal-left">
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:32 }}>
              20–30% commission every booking. Your own customers, rented back to you. Profit margins shrinking every year. We operate differently — <strong style={{ color:"#fff" }}>TableFlow puts the restaurant back in control.</strong>
            </p>
            <div style={{ background:"rgba(59,127,245,0.06)", border:"1px solid rgba(59,127,245,0.15)", borderRadius:12, padding:"20px 24px" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:48, fontWeight:900, color:B }}>7-DAY</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase" }}>ROI visibility guaranteed — or we fix it free</div>
            </div>
          </div>
          <div className="reveal-right" style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              ["01","Direct Bookings Only","No platform dependency. Guests book directly through your system."],
              ["02","You Own Your Customers","Email, mobile, behavior data — yours forever."],
              ["03","Prepaid Reservations","Eliminate no-shows with secured bookings."],
              ["04","Loyalty Built-In","Automated rewards that bring guests back."],
            ].map(([n,t,d])=>(
              <div key={n} style={{ display:"flex", gap:24, padding:"24px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:36, fontWeight:900, color:B, opacity:0.5, lineHeight:1, flexShrink:0 }}>{n}</div>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{t}</div>
                  <div style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding:"120px 48px", background:"rgba(255,255,255,0.015)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:80 }}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
            THE PROCESS <div style={{ flex:1, height:1, background:`linear-gradient(to right,${B},transparent)`, maxWidth:120 }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(48px,5vw,72px)", textTransform:"uppercase", lineHeight:0.95 }}>
            <div>TWO SIDES.</div>
            <div style={{ color:B }}>ONE PLATFORM.</div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
          {[
            { day:"GUEST FLOW", num:"01", title:"DISCOVER & RESERVE", desc:"Guest finds restaurant, books a table in 10 seconds. Instant confirmation. No phone calls, no waiting." },
            { day:"GUEST FLOW", num:"02", title:"SECURE PAYMENT", desc:"Small prepayment secures the booking. iDEAL, card, Apple Pay — fully integrated checkout." },
            { day:"GUEST FLOW", num:"03", title:"EARN LOYALTY", desc:"Every visit earns rewards. Free drinks, exclusive offers, birthday treats. Automated." },
            { day:"OWNER FLOW", num:"04", title:"REAL-TIME DASHBOARD", desc:"Live revenue, confirmed bookings, no-show rate — full performance snapshot on your phone." },
            { day:"OWNER FLOW", num:"05", title:"COMMISSION-FREE", desc:"Zero platform fees. Direct bookings mean €25K–€40K saved annually per restaurant." },
            { day:"OWNER FLOW", num:"06", title:"PUSH & RETAIN", desc:"Smart campaigns re-engage inactive guests. One campaign = €2K–€4K extra revenue." },
          ].map(({ day, num, title, desc })=>(
            <div key={num} className="reveal" style={{ padding:"40px 48px", borderBottom:"1px solid rgba(255,255,255,0.06)", borderRight: parseInt(num)%2===1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:20 }}>
                <span style={{ fontSize:10, color:B, fontWeight:700, letterSpacing:1.5 }}>{day}</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.2)" }}>—</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:1.5 }}>STEP {num}</span>
              </div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(28px,2.5vw,36px)", fontWeight:900, textTransform:"uppercase", marginBottom:14, lineHeight:1 }}>{title}</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GUEST SECTION ── */}
      <section id="guest" style={{ padding:"120px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div className="reveal-left">
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:ORANGE, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
              FOR GUESTS <div style={{ flex:1, height:1, background:`linear-gradient(to right,${ORANGE},transparent)`, maxWidth:120 }}/>
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(40px,4vw,60px)", textTransform:"uppercase", lineHeight:0.95, marginBottom:24 }}>
              <div>RESERVE IN</div>
              <div style={{ color:ORANGE }}>10 SECONDS.</div>
              <div style={{ color:"rgba(255,255,255,0.2)" }}>EARN EVERY VISIT.</div>
            </div>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:32 }}>
              Guests get instant confirmation, zero waiting calls, and a loyalty program that rewards every visit. The dining experience starts before they even walk in.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:40 }}>
              {["Reserve a table in 10 seconds — instant confirmation","Secure payment locks the booking","Earn loyalty points every visit","Free drink after 5 visits — automated","Push notifications for exclusive offers"].map(f=>(
                <div key={f} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:ORANGE, flexShrink:0 }}/>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,0.65)" }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={onGuest} style={{ background:ORANGE, color:"#fff", border:"none", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", letterSpacing:0.5 }}>
              See Full Guest Flow →
            </button>
          </div>
          <div className="reveal-right" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { icon:"⚡", title:"10-Second Booking", desc:"From search to confirmed table — faster than calling." },
              { icon:"🔒", title:"Prepaid & Secure", desc:"Small deposit eliminates no-shows for restaurants." },
              { icon:"⭐", title:"Loyalty Rewards", desc:"Every visit earns points towards free drinks & perks." },
              { icon:"📱", title:"Instant Confirmation", desc:"No waiting. Booking confirmed immediately on phone." },
            ].map(({ icon, title, desc })=>(
              <div key={title} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:24 }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{icon}</div>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OWNER SECTION ── */}
      <section id="owner" style={{ padding:"120px 48px", background:"rgba(255,255,255,0.015)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div className="reveal-left" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { val:"€1,842", label:"Today's Revenue", color:ORANGE },
              { val:"↓ 3%", label:"No-Show Rate", color:SAGE },
              { val:"€28K+", label:"Annual Savings", color:B },
              { val:"42%", label:"Repeat Rate", color:ORANGE },
            ].map(({ val, label, color })=>(
              <div key={label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"24px 20px" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:36, fontWeight:900, color }}>{val}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="reveal-right">
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
              FOR OWNERS <div style={{ flex:1, height:1, background:`linear-gradient(to right,${B},transparent)`, maxWidth:120 }}/>
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(40px,4vw,60px)", textTransform:"uppercase", lineHeight:0.95, marginBottom:24 }}>
              <div>EVERYTHING</div>
              <div style={{ color:B }}>YOU NEED.</div>
              <div style={{ color:"rgba(255,255,255,0.2)" }}>NOTHING EXTRA.</div>
            </div>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:32 }}>
              Real-time revenue tracking, commission-free direct bookings, customer database you own, and push campaigns that bring guests back automatically.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:40 }}>
              {["Real-time revenue & booking dashboard","Commission-free direct booking system","Full customer database — yours to keep","Smart push campaigns — set & forget","Loyalty engine with automated rewards"].map(f=>(
                <div key={f} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:B, flexShrink:0 }}/>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,0.65)" }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={onOwner} style={{ background:B, color:"#fff", border:"none", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", letterSpacing:0.5 }}>
              See Full Owner Dashboard →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ padding:"120px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:80 }}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
            WHAT YOU GET <div style={{ flex:1, height:1, background:`linear-gradient(to right,${B},transparent)`, maxWidth:120 }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(48px,5vw,72px)", textTransform:"uppercase", lineHeight:0.95 }}>
              <div>EVERYTHING</div>
              <div style={{ color:B }}>YOU NEED.</div>
            </div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
          {[
            { icon:"📱", title:"DIRECT BOOKING SYSTEM", desc:"Commission-free table reservations. Guests book in 10 seconds. Instant confirmation. No phone calls." },
            { icon:"⚡", title:"PREPAID RESERVATIONS", desc:"Secure bookings with small deposit. No-show rate drops 20–35%. Predictable daily revenue." },
            { icon:"💳", title:"INTEGRATED PAYMENTS", desc:"iDEAL, Stripe, Apple Pay — fully configured. Reservation fees processed automatically." },
            { icon:"📊", title:"REAL-TIME ANALYTICS", desc:"Revenue, bookings, no-show rate — live on your dashboard. Every decision data-backed." },
            { icon:"🔔", title:"PUSH CAMPAIGNS", desc:"OneSignal integrated. Re-engage inactive guests. One campaign = €2K–€4K extra revenue." },
            { icon:"🏆", title:"LOYALTY ENGINE", desc:"Automated rewards. Visit tracking. Member campaigns. 10–18% revenue boost from loyalty members." },
          ].map(({ icon, title, desc }, i)=>(
            <div key={title} className="reveal" style={{ padding:"40px 36px", background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.06)", position:"relative", overflow:"hidden" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(59,127,245,0.05)"; e.currentTarget.style.borderColor="rgba(59,127,245,0.2)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; }}>
              <div style={{ position:"absolute", top:0, right:0, width:60, height:60, background:`linear-gradient(135deg,rgba(59,127,245,0.1),transparent)`, borderRadius:"0 0 0 60px" }}/>
              <div style={{ fontSize:36, marginBottom:20 }}>{icon}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:900, textTransform:"uppercase", marginBottom:12, letterSpacing:0.5 }}>{title}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding:"120px 48px", background:"rgba(255,255,255,0.015)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="reveal" style={{ marginBottom:80 }}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
            PRICING <div style={{ flex:1, height:1, background:`linear-gradient(to right,${B},transparent)`, maxWidth:120 }}/>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(48px,5vw,72px)", textTransform:"uppercase", lineHeight:0.95 }}>
            <div>SIMPLE.</div>
            <div style={{ color:B }}>TRANSPARENT.</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.1fr 1fr", gap:2, alignItems:"start" }}>
          {[
            {
              tier:"STARTER", price:"€7K", sub:"One-time",
              features:["Direct booking system","iOS + Android app","Guest loyalty program","Payment integration","Basic analytics dashboard","30-day support"],
              cta:"GET STARTED →", highlight:false,
            },
            {
              tier:"GROWTH", price:"€15K", sub:"One-time",
              features:["Everything in Starter","Owner analytics dashboard","Push campaign engine","Customer database & CRM","Commission savings tracker","Advanced loyalty engine","60-day support","Priority response"],
              cta:"BOOK STRATEGY CALL →", highlight:true,
            },
            {
              tier:"ENTERPRISE", price:"€30K+", sub:"Custom",
              features:["Custom architecture","Multi-location support","White-label ready","Complex integrations","Dedicated team","SLA guarantee","Ongoing retainer"],
              cta:"LET'S TALK →", highlight:false,
            },
          ].map(({ tier, price, sub, features, cta, highlight })=>(
            <div key={tier} className="reveal" style={{
              background: highlight ? B : "rgba(255,255,255,0.02)",
              border: `1px solid ${highlight ? B : "rgba(255,255,255,0.08)"}`,
              padding:"48px 36px",
              position:"relative",
              marginTop: highlight ? -20 : 0,
            }}>
              {highlight && <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:B, color:"#fff", fontSize:10, fontWeight:700, letterSpacing:2, padding:"4px 16px", borderRadius:"0 0 8px 8px" }}>MOST POPULAR</div>}
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color: highlight?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.35)", textTransform:"uppercase", marginBottom:16 }}>{tier}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:64, fontWeight:900, color:"#fff", lineHeight:1 }}>{price}</div>
              <div style={{ fontSize:13, color: highlight?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.3)", marginBottom:32 }}>{sub}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:40 }}>
                {features.map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                    <span style={{ color: highlight?"#fff":B, marginTop:2, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:14, color: highlight?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)", lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://calendly.com/reesavraj7761/30min" target="_blank" rel="noreferrer"
                style={{
                  display:"block", textAlign:"center", padding:"14px",
                  background: highlight?"#fff":"transparent",
                  color: highlight?B:"#fff",
                  border: highlight?"none":"1px solid rgba(255,255,255,0.2)",
                  borderRadius:6, fontSize:13, fontWeight:700,
                  letterSpacing:1, textDecoration:"none", cursor:"pointer",
                }}>
                {cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:"140px 48px", borderTop:"1px solid rgba(255,255,255,0.06)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, background:"radial-gradient(circle,rgba(59,127,245,0.1),transparent 70%)", zIndex:0, pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="reveal" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(52px,6vw,88px)", textTransform:"uppercase", lineHeight:0.9, marginBottom:24 }}>
            <div>READY TO</div>
            <div style={{ color:B }}>OWN YOUR</div>
            <div style={{ color:"rgba(255,255,255,0.15)" }}>REVENUE?</div>
          </div>
          <p className="reveal" style={{ fontSize:16, color:"rgba(255,255,255,0.45)", marginBottom:48, maxWidth:480, margin:"0 auto 48px" }}>
            30-minute strategy call. Zero obligation. We map out your entire TableFlow setup — completely free.
          </p>
          <div className="reveal" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="https://calendly.com/reesavraj7761/30min" target="_blank" rel="noreferrer"
              style={{ background:B, color:"#fff", padding:"16px 40px", borderRadius:8, fontSize:16, fontWeight:700, textDecoration:"none", letterSpacing:0.5, animation:"glow 2s infinite" }}>
              📅 BOOK STRATEGY CALL →
            </a>
            <a href="https://wa.me/919153663735" target="_blank" rel="noreferrer"
              style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"16px 40px", borderRadius:8, fontSize:16, fontWeight:700, textDecoration:"none", letterSpacing:0.5 }}>
              💬 CHAT ON WHATSAPP
            </a>
          </div>
          <div className="reveal" style={{ display:"flex", justifyContent:"center", gap:48, marginTop:80 }}>
            {[["📅","Book Strategy Call","Free 30-min on Calendly"],["💬","Chat on WhatsApp","+91 91536 63735"],["✉","Send an Email","reesavraj7761@gmail.com"]].map(([ic,t,s])=>(
              <div key={t} style={{ textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{ic}</div>
                <div style={{ fontSize:13, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>{t}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"32px 48px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900 }}>
          TABLE<span style={{ color:ORANGE }}>FLOW</span>
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.25)" }}>
          © 2025 TableFlow · Premium Restaurant Revenue Platform
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.25)" }}>reesavraj7761@gmail.com</div>
      </footer>

      {/* bottom padding for floating CTA */}
      <div style={{ height:80 }}/>
    </div>
  );
}