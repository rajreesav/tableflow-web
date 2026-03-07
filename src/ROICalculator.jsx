import { useState, useCallback } from "react";

const B      = "#3b7ff5";
const ORANGE = "#D9480F";
const SAGE   = "#84A98C";
const GREEN  = "#4ade80";

const COMM_OPTIONS = [
  { label: "20%", platform: "TheFork",   rate: 0.20 },
  { label: "25%", platform: "OpenTable", rate: 0.25 },
  { label: "15%", platform: "Resy",      rate: 0.15 },
  { label: "30%", platform: "Custom",    rate: 0.30 },
];

function fmt(n) {
  return "€" + Math.round(Math.max(n, 0)).toLocaleString("nl-NL");
}

export default function ROICalculator({ onBack }) {
  const [bookings, setBookings] = useState(180);
  const [spend,    setSpend]    = useState(82);
  const [covers,   setCovers]   = useState(2.8);
  const [noshow,   setNoshow]   = useState(18);
  const [commIdx,  setCommIdx]  = useState(0);

  const commRate = COMM_OPTIONS[commIdx].rate;

  const r = (() => {
    const grossRev    = bookings * spend;
    const commission  = grossRev * commRate;
    const noshowPct   = noshow / 100;
    const noshowLost  = bookings * noshowPct * spend;
    const tafNS       = 0.03;
    const noshowSave  = (noshowPct - tafNS) * bookings * spend;
    const retention   = grossRev * 0.12 * 0.08;
    const monthlySave = commission + noshowSave + retention * 0.5;
    const annual      = monthlySave * 12;
    const payback     = 15000 / monthlySave;
    const roi         = Math.max(((annual - 15000) / 15000 * 100).toFixed(0), 10);
    const platNet     = grossRev - commission;
    const dirNet      = grossRev + retention * 0.3;
    const maxNet      = Math.max(platNet, dirNet);
    return { grossRev, commission, noshowLost, retention, monthlySave, annual, payback, roi, platNet, dirNet, platPct: Math.round(platNet / maxNet * 100) };
  })();

  const sliders = [
    { label: "Monthly bookings via platforms", val: bookings, set: setBookings, min: 20,  max: 600, step: 10,  lo: "20",  hi: "600+", display: `${bookings}`,        unit: "bookings/mo" },
    { label: "Average spend per table",        val: spend,    set: setSpend,    min: 25,  max: 250, step: 5,   lo: "€25", hi: "€250", display: `€${spend}`,          unit: "per visit"   },
    { label: "Average covers per booking",     val: covers,   set: setCovers,   min: 1,   max: 8,   step: 0.1, lo: "1",   hi: "8",    display: covers.toFixed(1),    unit: "guests"      },
    { label: "No-show rate (current)",         val: noshow,   set: setNoshow,   min: 2,   max: 40,  step: 1,   lo: "2%",  hi: "40%",  display: `${noshow}`,          unit: "%"           },
  ];

  if (!document.getElementById("roi-slider-style")) {
    const s = document.createElement("style");
    s.id = "roi-slider-style";
    s.textContent = `
      .roi-sl { -webkit-appearance:none; appearance:none; width:100%; height:3px; background:rgba(255,255,255,0.1); border-radius:10px; outline:none; cursor:pointer; }
      .roi-sl::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; background:${GREEN}; border-radius:50%; box-shadow:0 0 0 4px rgba(74,222,128,0.15); transition:box-shadow 0.2s,transform 0.15s; cursor:pointer; }
      .roi-sl::-webkit-slider-thumb:hover { box-shadow:0 0 0 7px rgba(74,222,128,0.2); transform:scale(1.15); }
      @keyframes roiPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    `;
    document.head.appendChild(s);
  }

  return (
    <div style={{ background:"#080808", minHeight:"100vh", color:"#fff", fontFamily:"'Barlow',sans-serif", overflowX:"hidden", overflowY:"auto", paddingBottom:80 }}>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px", height:60, background:"rgba(8,8,8,0.95)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, letterSpacing:1 }}>
          TABLE<span style={{ color:ORANGE }}>FLOW</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(74,222,128,0.3)", borderRadius:4, padding:"5px 12px" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:GREEN, animation:"roiPulse 1.5s infinite" }}/>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:GREEN }}>ROI Calculator</span>
          </div>
          {onBack && (
            <button onClick={onBack} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.5)", padding:"7px 18px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", letterSpacing:1, fontFamily:"'Barlow',sans-serif", textTransform:"uppercase" }}>
              ✕ Back
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ padding:"72px 48px 48px", borderBottom:"1px solid rgba(255,255,255,0.06)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"40%", transform:"translate(-50%,-50%)", width:500, height:500, background:"radial-gradient(circle,rgba(74,222,128,0.05),transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:GREEN, textTransform:"uppercase", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
          FOR RESTAURANT OWNERS
          <div style={{ width:80, height:1, background:`linear-gradient(to right,${GREEN},transparent)` }}/>
        </div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, lineHeight:0.92, marginBottom:16 }}>
          <div style={{ fontSize:"clamp(48px,5vw,80px)", textTransform:"uppercase", color:"#fff" }}>SEE EXACTLY HOW MUCH</div>
          <div style={{ fontSize:"clamp(48px,5vw,80px)", textTransform:"uppercase", color:GREEN }}>YOU'RE LOSING.</div>
        </div>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", maxWidth:520, lineHeight:1.7 }}>
          Vul uw gegevens in en ontdek uw werkelijke jaarlijkse besparing met TableFlow.
        </p>
      </div>

      {/* ── GRID ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"start" }}>

        {/* ── LEFT ── */}
        <div style={{ borderRight:"1px solid rgba(255,255,255,0.06)" }}>

          {/* SLIDERS */}
          <div style={{ padding:"40px 48px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:28, display:"flex", alignItems:"center", gap:12 }}>
              YOUR RESTAURANT <div style={{ width:60, height:1, background:`linear-gradient(to right,${B},transparent)` }}/>
            </div>
            {sliders.map(f => (
              <div key={f.label} style={{ marginBottom:30 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontWeight:500 }}>{f.label}</span>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:26, color:"#fff", lineHeight:1 }}>
                    {f.display}
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.28)", fontFamily:"'Barlow',sans-serif", fontWeight:400, marginLeft:5 }}>{f.unit}</span>
                  </span>
                </div>
                <input type="range" className="roi-sl" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(parseFloat(e.target.value))} />
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.18)" }}>{f.lo}</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.18)" }}>{f.hi}</span>
                </div>
              </div>
            ))}
          </div>

          {/* PLATFORM */}
          <div style={{ padding:"40px 48px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:"#e63946", textTransform:"uppercase", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              YOUR CURRENT PLATFORM <div style={{ width:60, height:1, background:"linear-gradient(to right,#e63946,transparent)" }}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:20 }}>
              {COMM_OPTIONS.map((o, i) => (
                <button key={o.platform} onClick={() => setCommIdx(i)} style={{
                  background: commIdx === i ? "rgba(74,222,128,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${commIdx === i ? GREEN : "rgba(255,255,255,0.07)"}`,
                  borderRadius:6, padding:"12px 4px", textAlign:"center", cursor:"pointer",
                  color: commIdx === i ? GREEN : "rgba(255,255,255,0.4)",
                  transition:"all 0.18s", fontFamily:"'Barlow',sans-serif",
                }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:900 }}>{o.label}</div>
                  <div style={{ fontSize:11, marginTop:2 }}>{o.platform}</div>
                </button>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[
                { p:"TheFork NL",   r:"20–25%", d:"Per covered diner + listing fee", bad:true  },
                { p:"OpenTable EU", r:"23–28%", d:"Reservation + marketing cut",     bad:true  },
                { p:"No-shows avg", r:"15–25%", d:"Industry average on platforms",   bad:true  },
                { p:"TableFlow",    r:"0%",     d:"Zero commission, ever",            bad:false },
              ].map(item => (
                <div key={item.p} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:4 }}>{item.p}</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:30, fontWeight:900, color: item.bad ? "#e63946" : GREEN }}>{item.r}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{item.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTIONS */}
          <div style={{ padding:"40px 48px" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:B, textTransform:"uppercase", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              GROWTH PROJECTIONS <div style={{ width:60, height:1, background:`linear-gradient(to right,${B},transparent)` }}/>
            </div>
            {[
              { period:"Month 1 savings",      val: fmt(r.monthlySave),       big:false },
              { period:"Year 1 total savings",  val: fmt(r.annual),            big:true  },
              { period:"Year 2 (+10% growth)",  val: fmt(r.annual * 1.1),      big:true  },
              { period:"Year 3 (+10% growth)",  val: fmt(r.annual * 1.21),     big:true  },
            ].map(p => (
              <div key={p.period} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>{p.period}</span>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26, fontWeight:900, color: p.big ? GREEN : "#fff" }}>{p.val}</span>
              </div>
            ))}
            <div style={{ marginTop:20, padding:"20px 24px", background:"rgba(74,222,128,0.03)", border:"1px solid rgba(74,222,128,0.1)", borderRadius:8 }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>3-YEAR TOTAL SAVINGS</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(40px,4vw,56px)", color:GREEN, lineHeight:1 }}>
                {fmt(r.annual + r.annual * 1.1 + r.annual * 1.21)}
              </div>
              <div style={{ fontSize:12, color:"rgba(74,222,128,0.3)", marginTop:6 }}>vs. staying on platforms</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — RESULTS ── */}
        <div style={{ position:"sticky", top:60 }}>

          {/* BIG NUMBER */}
          <div style={{ padding:"40px 48px", background:"linear-gradient(135deg,#0a1a0b,#0c180d)", borderBottom:"1px solid rgba(74,222,128,0.08)" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, color:"rgba(74,222,128,0.45)", textTransform:"uppercase", marginBottom:12 }}>ANNUAL SAVINGS WITH TABLEFLOW</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(52px,6vw,88px)", lineHeight:0.88, color:GREEN, letterSpacing:-2 }}>
              {fmt(r.annual)}
            </div>
            <div style={{ fontSize:13, color:"rgba(74,222,128,0.35)", marginTop:10 }}>terug in uw zak — elk jaar</div>
          </div>

          {/* METRICS */}
          <div style={{ padding:"0 48px" }}>
            {[
              { icon:"💸", label:"Monthly commission lost",  hint:"To TheFork / OpenTable / Resy", val:"−" + fmt(r.commission),               sub:`${Math.round(commRate*100)}% rate`,   color:"#e63946" },
              { icon:"🚫", label:"No-show revenue lost",     hint:"Empty tables every month",       val:"−" + fmt(r.noshowLost),               sub:"vs 3% with TableFlow",                 color:"#e63946" },
              { icon:"✅", label:"Monthly revenue (direct)", hint:"With TableFlow, 0% commission",  val:"+" + fmt(r.grossRev),                 sub:"100% yours",                           color:GREEN     },
              { icon:"📲", label:"Repeat customer value",    hint:"Push notifications + loyalty",   val:"+" + fmt(r.retention + 890) + "/mo", sub:"avg. 12% retention lift",              color:"#fff"    },
            ].map(m => (
              <div key={m.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ fontSize:18, width:36, height:36, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{m.icon}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.7)" }}>{m.label}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:1 }}>{m.hint}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:900, color:m.color }}>{m.val}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.22)", marginTop:1 }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* BAR COMPARE */}
          <div style={{ padding:"28px 48px", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:1.5, color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:16 }}>MONTHLY NET — PLATFORM VS DIRECT</div>
            {[
              { label:"Platform booking", val: fmt(r.platNet), pct: r.platPct, color:"#e63946" },
              { label:"TableFlow direct", val: fmt(r.dirNet),  pct: 100,       color:GREEN     },
            ].map(bar => (
              <div key={bar.label} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                  <span style={{ fontSize:12, color:bar.color, fontWeight:600 }}>{bar.label}</span>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:900, color:bar.color }}>{bar.val}</span>
                </div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:3, height:5, overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:3, width:`${bar.pct}%`, background:bar.color, transition:"width 0.5s cubic-bezier(0.34,1.56,0.64,1)", opacity:0.85 }}/>
                </div>
              </div>
            ))}
          </div>

          {/* PAYBACK */}
          <div style={{ margin:"24px 48px", background:"rgba(217,72,15,0.06)", border:"1px solid rgba(217,72,15,0.14)", borderRadius:8, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:48, fontWeight:900, color:ORANGE, lineHeight:1 }}>{Math.max(r.payback, 0.5).toFixed(1)}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:2 }}>months payback period</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ background:"rgba(217,72,15,0.1)", color:"#ffa07a", fontSize:11, fontWeight:700, padding:"5px 12px", borderRadius:4, letterSpacing:1, display:"inline-block", textTransform:"uppercase" }}>
                💰 ROI {r.roi}% YEAR 1
              </div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.22)", marginTop:6 }}>at €15,000 investment</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding:"0 48px 48px" }}>
            <a href="https://calendly.com/reesavraj7761/30min" target="_blank" rel="noreferrer"
              style={{ display:"block", textAlign:"center", background:B, color:"#fff", padding:"16px", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none", letterSpacing:1, textTransform:"uppercase" }}>
              📅 BOOK STRATEGY CALL →
            </a>
            <div style={{ textAlign:"center", marginTop:10, fontSize:12, color:"rgba(255,255,255,0.22)" }}>Vrijblijvend · Resultaat gegarandeerd</div>
          </div>

        </div>
      </div>
    </div>
  );
}