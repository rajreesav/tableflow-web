import { useState, useEffect } from "react";

// Global CSS reset — fixes Vite's default #root styles
const _style = document.createElement("style");
_style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  #root { width: 100%; height: 100%; overflow: hidden; }
`;
document.head.appendChild(_style);


const C = {
  bg: "#F8F5F0",
  card: "#FFFFFF",
  sage: "#84A98C",
  sageDark: "#6F8F7C",
  orange: "#D9480F",
  charcoal: "#2F3E46",
  sageTint: "#E8F0EA",
  border: "#E8E4DE",
  gray: "#9BA8AF",
  navyBg: "#1A1E21",
};

const GuestHomeScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontSize: 13, color: C.gray, marginBottom: 2 }}>Good evening,</div>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 26, fontWeight: 700, color: C.charcoal }}>Sarah 👋</div>
    <div style={{ fontSize: 14, color: C.sage, fontWeight: 600, marginTop: 4 }}>📍 Amsterdam Centrum</div>
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <div style={{ background: C.card, borderRadius: 16, padding: "14px 16px", border: `1.5px solid ${C.border}` }}>
        <span style={{ color: C.gray }}>🔍 Search restaurants...</span>
      </div>
    </div>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 18, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>Featured Tonight</div>
    <div style={{ background: C.card, borderRadius: 20, overflow: "hidden", boxShadow: "0px 8px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ height: 140, background: `linear-gradient(135deg,${C.sageTint},${C.sageDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 40 }}>🍽️</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>De Gouden Tafel</div>
          <div style={{ background: C.orange, borderRadius: 10, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#fff" }}>⚡ 2 spots</div>
        </div>
        <div style={{ fontSize: 14, color: C.gray, marginBottom: 8 }}>Dutch Fine Dining · €€€€</div>
        <div style={{ fontSize: 13, color: C.sage, fontWeight: 600 }}>⭐ 4.9 (248 reviews)</div>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: C.charcoal }}>Reserve in 10 seconds →</div>
      </div>
    </div>
    <div style={{ marginTop: 20, padding: 12, background: C.sageTint, borderRadius: 12, textAlign: "center" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.sageDark }}>⚡ Instant confirmation. No waiting calls.</span>
    </div>
  </div>
);

const GuestBookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [selectedSlot, setSelectedSlot] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const dates = [12,13,14,15,16,17,18];
  const days = ["Mo","Tu","We","Th","Fr","Sa","Su"];
  const slots = ["18:00","18:30","19:00","19:30","20:00","20:30"];
  return (
    <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
      <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>Choose Your Time</div>
      <div style={{ fontSize: 14, color: C.gray, marginBottom: 24 }}>De Gouden Tafel · Your table is guaranteed</div>
      <div style={{ background: C.card, borderRadius: 20, padding: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {dates.map((d,i) => (
            <div key={d} onClick={() => setSelectedDate(d)} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 14, cursor: "pointer", background: d === selectedDate ? C.sage : "transparent" }}>
              <div style={{ fontSize: 11, color: d === selectedDate ? "#fff" : C.gray }}>{days[i]}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: d === selectedDate ? "#fff" : C.charcoal }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
        {slots.map(s => (
          <div key={s} onClick={() => setSelectedSlot(s)} style={{ padding: "12px 0", textAlign: "center", borderRadius: 14, cursor: "pointer", background: s === selectedSlot ? C.orange : C.card, color: s === selectedSlot ? "#fff" : C.charcoal, fontWeight: s === selectedSlot ? 700 : 500 }}>{s}</div>
        ))}
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.charcoal }}>Party Size</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div onClick={() => setGuests(Math.max(1,guests-1))} style={{ width: 36, height: 36, borderRadius: 12, background: C.sageTint, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>−</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: C.charcoal }}>{guests}</span>
            <div onClick={() => setGuests(Math.min(12,guests+1))} style={{ width: 36, height: 36, borderRadius: 12, background: C.sage, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>+</div>
          </div>
        </div>
      </div>
      <div style={{ padding: 12, background: C.sageTint, borderRadius: 12, textAlign: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.sageDark }}>🔒 Secure booking with small prepayment</span>
      </div>
    </div>
  );
};

const GuestPaymentScreen = () => {
  const [method, setMethod] = useState(0);
  const methods = [
    { icon: "🏦", label: "iDEAL", sub: "ABN AMRO · ING · Rabobank" },
    { icon: "💳", label: "Credit Card", sub: "Visa · Mastercard" },
    { icon: "🍎", label: "Apple Pay", sub: "Touch ID or Face ID" },
  ];
  return (
    <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
      <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 20 }}>Secure Checkout</div>
      <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>Booking Summary</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: C.gray }}>Restaurant</span><span style={{ fontWeight: 600, color: C.charcoal }}>De Gouden Tafel</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: C.gray }}>Date & Time</span><span style={{ fontWeight: 600, color: C.charcoal }}>Fri 14 Mar · 19:30</span></div>
        <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, color: C.charcoal }}>Reservation Fee</span>
          <span style={{ fontWeight: 700, color: C.orange }}>€5.00</span>
        </div>
      </div>
      {methods.map((m,i) => (
        <div key={i} onClick={() => setMethod(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, marginBottom: 10, background: C.card, borderRadius: 16, cursor: "pointer", border: `2px solid ${i === method ? C.sage : C.border}` }}>
          <span style={{ fontSize: 28 }}>{m.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>{m.label}</div>
            <div style={{ fontSize: 13, color: C.gray }}>{m.sub}</div>
          </div>
          <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${i === method ? C.sage : C.border}`, background: i === method ? C.sage : "transparent" }} />
        </div>
      ))}
      <div style={{ marginTop: 20, padding: 12, background: C.sageTint, borderRadius: 12, textAlign: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.sageDark }}>✓ Confirmed booking = zero uncertainty</span>
      </div>
    </div>
  );
};

const GuestConfirmationScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px", display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.sageTint, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><path d="M10 24L20 34L38 14" stroke={C.sageDark} strokeWidth="4" strokeLinecap="round"/></svg>
      </div>
      <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 26, fontWeight: 700, color: C.charcoal }}>Your evening is planned</div>
      <div style={{ background: C.card, borderRadius: 20, padding: 20, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 14, color: C.gray, marginBottom: 8 }}>Booking Reference</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: C.charcoal, letterSpacing: 4 }}>TF-2847</div>
      </div>
      <div style={{ display: "flex", gap: 12, width: "100%" }}>
        <div style={{ flex: 1, background: C.orange, borderRadius: 16, padding: "14px 0", textAlign: "center", color: "#fff", fontWeight: 700, cursor: "pointer" }}>📅 Add to Calendar</div>
        <div style={{ flex: 1, border: `2px solid ${C.orange}`, borderRadius: 16, padding: "14px 0", textAlign: "center", color: C.orange, fontWeight: 700, cursor: "pointer" }}>📍 Directions</div>
      </div>
    </div>
  </div>
);

const GuestLoyaltyJoinScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 26, fontWeight: 700, color: C.charcoal, marginBottom: 8 }}>Earn Rewards 🎁</div>
    <div style={{ fontSize: 15, color: C.gray, marginBottom: 24 }}>Free drink after 5 visits</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 24, marginBottom: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 16 }}>
        {[1,2,3].map(i => <div key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⭐</div>)}
        {[4,5].map(i => <div key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: C.sageTint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>·</div>)}
      </div>
      <div style={{ fontSize: 14, color: C.gray }}>3/5 visits - 2 more for free drink 🍷</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.charcoal, marginBottom: 16 }}>Enter to start earning</div>
      <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 12, background: C.bg }}><span style={{ color: C.gray }}>📧 your@email.com</span></div>
      <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, background: C.bg }}><span style={{ color: C.gray }}>📱 +31 6 12345678</span></div>
      <div style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>✓ Get birthday reward · Exclusive offers · Early access</div>
      <div style={{ background: C.orange, borderRadius: 16, padding: "16px 0", textAlign: "center", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Join Loyalty Program →</div>
    </div>
  </div>
);

const GuestLoyaltyProgressScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 26, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>Your Rewards</div>
    <div style={{ fontSize: 14, color: C.gray, marginBottom: 20 }}>2 visits away from Free Drink 🍷</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 24, marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontWeight: 600, color: C.charcoal }}>Progress to Free Drink</span>
        <span style={{ fontWeight: 700, color: C.orange }}>60%</span>
      </div>
      <div style={{ height: 10, background: C.sageTint, borderRadius: 5 }}>
        <div style={{ width: "60%", height: 10, background: C.orange, borderRadius: 5 }} />
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[1,2,3].map(i => <span key={i} style={{ background: C.orange, color: "#fff", borderRadius: 12, padding: "6px 12px", fontSize: 12 }}>✓ Visit {i}</span>)}
        {[4,5].map(i => <span key={i} style={{ background: C.sageTint, color: C.gray, borderRadius: 12, padding: "6px 12px", fontSize: 12 }}>○ Visit {i}</span>)}
      </div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>🔔 Get Push Reminders</div>
      <div style={{ fontSize: 14, color: C.gray, marginBottom: 16 }}>Exclusive offers · Visit reminders · Birthday treats</div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: C.sage, borderRadius: 12, padding: "12px 0", textAlign: "center", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Enable Push</div>
        <div style={{ flex: 1, border: `1.5px solid ${C.sage}`, borderRadius: 12, padding: "12px 0", textAlign: "center", color: C.sage, fontWeight: 600, cursor: "pointer" }}>Maybe Later</div>
      </div>
    </div>
  </div>
);

const OwnerDashboardScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontSize: 13, color: C.gray, marginBottom: 2 }}>Good Evening,</div>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 16 }}>Marco 👋</div>
    <div style={{ fontSize: 14, color: C.sage, fontWeight: 600, marginBottom: 20 }}>Today's Performance Snapshot</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 14, color: C.gray, marginBottom: 4 }}>Today's Revenue</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.orange }}>€1,842</span>
        <span style={{ fontSize: 14, color: C.sage, fontWeight: 600 }}>↑ 18% vs Yesterday</span>
      </div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 14, color: C.gray, marginBottom: 4 }}>Confirmed Bookings</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: C.charcoal }}>24</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 20 }}>
      <div style={{ fontSize: 14, color: C.gray, marginBottom: 4 }}>No-Show Rate</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: C.charcoal }}>3%</span>
        <span style={{ fontSize: 14, color: C.sage, fontWeight: 600 }}>↓ 32%</span>
      </div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal, marginBottom: 12 }}>Last 7 Days Revenue</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
        {[42, 58, 45, 62, 78, 82, 65].map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", height: `${v}%`, background: C.sage, borderRadius: "6px 6px 0 0" }} />
            <span style={{ fontSize: 10, color: C.gray, marginTop: 4 }}>{["M","T","W","T","F","S","S"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OwnerCommissionScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 20 }}>Platform vs Direct</div>
    <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, background: C.card, borderRadius: 20, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gray, marginBottom: 12 }}>PLATFORM</div>
        <div style={{ fontSize: 14, color: C.gray, marginBottom: 8 }}>Revenue: €14,200</div>
        <div style={{ fontSize: 14, color: C.orange, marginBottom: 8 }}>Commission (20%): -€2,840</div>
        <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.charcoal }}>Net: €11,360</div>
        </div>
      </div>
      <div style={{ flex: 1, background: C.sageTint, borderRadius: 20, padding: 16, border: `2px solid ${C.sage}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.sageDark, marginBottom: 12 }}>DIRECT</div>
        <div style={{ fontSize: 14, color: C.charcoal, marginBottom: 8 }}>Revenue: €14,200</div>
        <div style={{ fontSize: 14, color: C.sageDark, marginBottom: 8 }}>Commission: €0</div>
        <div style={{ borderTop: `1px solid ${C.sage}`, marginTop: 8, paddingTop: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.sageDark }}>Net: €14,200</div>
        </div>
      </div>
    </div>
    <div style={{ background: C.orange, borderRadius: 20, padding: 20, textAlign: "center", marginBottom: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>You Saved: €2,840 This Month</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>€28,000+</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>Annual Projection</div>
    </div>
  </div>
);

const OwnerRetentionScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 20 }}>Retention & Repeat</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 15, color: C.gray }}>Repeat Customer Rate</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: C.orange }}>42%</span>
      </div>
      <div style={{ fontSize: 14, color: C.sage, fontWeight: 600 }}>↑ 9% vs last quarter</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 15, color: C.gray }}>Retention</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>68%</span>
      </div>
      <div style={{ height: 10, background: C.sageTint, borderRadius: 5 }}>
        <div style={{ width: "68%", height: 10, background: C.sage, borderRadius: 5 }} />
      </div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 15, color: C.gray, marginBottom: 8 }}>Avg Visits per Customer</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.charcoal }}>3.4 per year</div>
    </div>
    <div style={{ background: C.sageTint, borderRadius: 16, padding: 16, textAlign: "center" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.sageDark }}>Each 10% increase = ~€4,200 yearly gain</span>
    </div>
  </div>
);

const OwnerLoyaltyImpactScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 20 }}>Loyalty Engine Impact</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 15, color: C.gray, marginBottom: 4 }}>Active Members</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: C.orange }}>1,240</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 15, color: C.gray, marginBottom: 4 }}>Revenue Influenced</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: C.charcoal }}>€18,600</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 20 }}>
      <div style={{ fontSize: 15, color: C.gray, marginBottom: 4 }}>Reward Redemption Rate</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: C.orange }}>63%</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal, marginBottom: 12 }}>Members vs Non-Members</div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.orange }}>€86</div>
          <div style={{ fontSize: 12, color: C.gray }}>Avg Spend</div>
          <div style={{ fontSize: 11, color: C.sage }}>Members</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.gray }}>€52</div>
          <div style={{ fontSize: 12, color: C.gray }}>Avg Spend</div>
          <div style={{ fontSize: 11, color: C.gray }}>Non-Members</div>
        </div>
      </div>
    </div>
  </div>
);

const OwnerCustomerDatabaseScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>Your Customer Database</div>
    <div style={{ fontSize: 14, color: C.gray, marginBottom: 20 }}>First-party data power</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: C.gray }}>Total Customers</span><span style={{ fontSize: 20, fontWeight: 700, color: C.charcoal }}>3,420</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: C.gray }}>Emails Collected</span><span style={{ fontWeight: 700, color: C.sageDark }}>3,420</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: C.gray }}>Mobile Numbers</span><span style={{ fontWeight: 700, color: C.sageDark }}>2,870</span></div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>Top 10% Customers</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.orange, marginBottom: 4 }}>38%</div>
      <div style={{ fontSize: 14, color: C.gray }}>of total revenue</div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal, marginBottom: 12 }}>Customer Segments</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ background: C.sage, color: "#fff", borderRadius: 12, padding: "6px 12px", fontSize: 12 }}>VIP · 124</span>
        <span style={{ background: C.orange, color: "#fff", borderRadius: 12, padding: "6px 12px", fontSize: 12 }}>Frequent · 412</span>
        <span style={{ background: C.gray, color: "#fff", borderRadius: 12, padding: "6px 12px", fontSize: 12 }}>At-Risk · 286</span>
      </div>
    </div>
  </div>
);

const OwnerROIScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 20 }}>ROI Summary</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: C.gray }}>Annual Commission Saved</span><span style={{ fontWeight: 700, color: C.orange }}>€28,000</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: C.gray }}>Retention Gain</span><span style={{ fontWeight: 700, color: C.orange }}>€12,000</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><span style={{ color: C.gray }}>Push Campaign Boost</span><span style={{ fontWeight: 700, color: C.orange }}>€8,000</span></div>
      <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 16, fontWeight: 700, color: C.charcoal }}>Total Gain</span><span style={{ fontSize: 24, fontWeight: 700, color: C.orange }}>€48,000+</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 16, fontWeight: 700, color: C.charcoal }}>Investment</span><span style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>€15,000</span></div>
      </div>
    </div>
    <div style={{ background: C.sage, borderRadius: 20, padding: 24, textAlign: "center", marginBottom: 16 }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 4 }}>4–6 Months</div>
      <div style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>ROI Payback Period</div>
    </div>
    <div style={{ background: C.card, borderRadius: 16, padding: 20, textAlign: "center" }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: C.charcoal }}>"You stop renting customers. You start owning revenue."</span>
    </div>
  </div>
);

const OwnerPushScreen = () => (
  <div style={{ background: C.bg, minHeight: 812, padding: "60px 24px 80px" }}>
    <div style={{ fontFamily: "'Playfair Display','Georgia',serif", fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>Push Campaign Engine 🚀</div>
    <div style={{ fontSize: 14, color: C.gray, marginBottom: 20 }}>Automated Customer Re-Engagement</div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>Last Campaign</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: C.gray }}>Customers Reached</span><span style={{ fontWeight: 600, color: C.charcoal }}>1,240</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: C.gray }}>Open Rate</span><span style={{ fontWeight: 600, color: C.sage }}>68%</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: C.gray }}>Bookings Generated</span><span style={{ fontWeight: 600, color: C.orange }}>96</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}><span style={{ fontWeight: 700, color: C.charcoal }}>Revenue Generated</span><span style={{ fontWeight: 700, color: C.orange }}>€2,880</span></div>
    </div>
    <div style={{ background: C.card, borderRadius: 20, padding: 20, marginBottom: 12 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>Smart Segments</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.gray }}>VIP Customers (Top 10%)</span><span style={{ fontWeight: 600, color: C.orange }}>124</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.gray }}>No Visit in 30 Days</span><span style={{ fontWeight: 600, color: C.sageDark }}>412</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.gray }}>Birthday This Week 🎉</span><span style={{ fontWeight: 600, color: C.orange }}>18</span></div>
      </div>
    </div>
    <div style={{ background: C.sageTint, borderRadius: 16, padding: 16, textAlign: "center" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.sageDark }}>Automated reminders increase repeat visits by 18–25%</span>
    </div>
  </div>
);

const GUEST_SCREENS = [
  { name: "Home / Reserve", component: GuestHomeScreen, desc: "Reserve your table in 10 seconds. Instant confirmation. No waiting calls." },
  { name: "Booking", component: GuestBookingScreen, desc: "Choose your perfect time. Your table is guaranteed. Secure booking with small prepayment." },
  { name: "Payment", component: GuestPaymentScreen, desc: "Secure & trusted checkout. Confirmed booking = zero uncertainty." },
  { name: "Confirmation", component: GuestConfirmationScreen, desc: "Your evening is planned. Add to calendar & get reminders." },
  { name: "Join Loyalty", component: GuestLoyaltyJoinScreen, desc: "Earn rewards every visit. Free drink after 5 visits." },
  { name: "Loyalty Progress", component: GuestLoyaltyProgressScreen, desc: "2 visits away from Free Drink. Get exclusive offers & reminders via push." },
];

const OWNER_SCREENS = [
  { name: "Overview Dashboard", component: OwnerDashboardScreen, desc: "🔴 Problem Before: Revenue unpredictable tha. No-show se daily loss hota tha. Owner ko real-time clarity nahi milti thi.\n\n🟢 How TableFlow Solves It: Real-time confirmed bookings track karta hai. Prepaid reservations no-show risk reduce karte hain. Daily performance snapshot instantly visible hota hai.\n\n💰 Direct Impact: Predictable daily cash flow. 20–35% no-show reduction. Better staff & inventory planning." },
  { name: "Commission Savings", component: OwnerCommissionScreen, desc: "🔴 Problem Before: 20–30% commission platforms le jaate the. Owner apne hi customers pe rent de raha tha. Profit margin shrink ho raha tha.\n\n🟢 How TableFlow Solves It: Direct booking system without third-party dependency. Integrated secure payments. Customer data owner ke paas rehta hai.\n\n💰 Direct Impact: €25k–€40k annual savings. Higher net profit per table. Long-term financial control." },
  { name: "Retention & Repeat", component: OwnerRetentionScreen, desc: "🔴 Problem Before: First-time visitors wapas nahi aate. No structured retention strategy. Marketing random aur expensive tha.\n\n🟢 How TableFlow Solves It: Automated loyalty tracking. Visit-based rewards system. Customer behavior analytics.\n\n💰 Direct Impact: 8–15% repeat rate increase. Compounding yearly revenue growth. Lower customer acquisition cost." },
  { name: "Loyalty Engine", component: OwnerLoyaltyImpactScreen, desc: "🔴 Problem Before: Offers sabko same bheje jaate the. No measurable ROI from discounts. Reward campaigns manual & messy the.\n\n🟢 How TableFlow Solves It: Smart reward triggers. Data-driven member engagement. Automated reward redemption tracking.\n\n💰 Direct Impact: Higher redemption-to-revenue ratio. 10–18% revenue boost from members. Better customer lifetime value." },
  { name: "Customer Database", component: OwnerCustomerDatabaseScreen, desc: "🔴 Problem Before: Platform ke paas customer data tha. Direct communication possible nahi tha. Marketing dependency high thi.\n\n🟢 How TableFlow Solves It: Email & mobile capture at booking. Centralized customer database. Segmented marketing capability.\n\n💰 Direct Impact: Zero ad dependency. Personalized campaigns. Higher spend from top 10% customers." },
  { name: "ROI Summary", component: OwnerROIScreen, desc: "🔴 Problem Before: Tech investment risky lagta tha. Return unclear hota tha. Owners hesitation mein rehte the.\n\n🟢 How TableFlow Solves It: Clear savings breakdown. Retention-based revenue projection. Commission elimination model.\n\n💰 Direct Impact: 4–6 month ROI. Predictable financial growth. Scalable long-term revenue engine." },
  { name: "Push Engine", component: OwnerPushScreen, desc: "🔴 Problem Before: Restaurants depend on customers remembering them. No structured way to bring inactive guests back. Marketing agencies cost €500–€1,500/month with unclear ROI.\n\n🟢 How TableFlow Solves It: Collects customer email or mobile at booking automatically. Segments guests by behavior (VIP, inactive, frequent). Sends targeted push notifications at the perfect time.\n\n💰 Direct Impact: One campaign can generate €2,000–€4,000 extra revenue. 18–25% increase in repeat visits. Marketing runs automatically — zero extra staff effort." },
];

const PhoneFrame = ({ children }) => {
  const H = 620, W = Math.round(620 * 393/852), sc = W/393, R = Math.round(52*sc);
  return (
    <div style={{ width: W + Math.round(8*sc), height: H, position: "relative", flexShrink: 0 }}>
      <div style={{ position:"absolute", left:0, top:Math.round(120*sc), width:Math.round(4*sc), height:Math.round(32*sc), background:"#333", borderRadius:`${R}px 0 0 ${R}px` }}/>
      <div style={{ position:"absolute", left:0, top:Math.round(170*sc), width:Math.round(4*sc), height:Math.round(58*sc), background:"#333", borderRadius:`${R}px 0 0 ${R}px` }}/>
      <div style={{ position:"absolute", left:0, top:Math.round(244*sc), width:Math.round(4*sc), height:Math.round(58*sc), background:"#333", borderRadius:`${R}px 0 0 ${R}px` }}/>
      <div style={{ position:"absolute", right:0, top:Math.round(190*sc), width:Math.round(4*sc), height:Math.round(76*sc), background:"#333", borderRadius:`0 ${R}px ${R}px 0` }}/>
      <div style={{ position:"absolute", left:Math.round(4*sc), right:Math.round(4*sc), top:0, bottom:0, borderRadius:R, background:"linear-gradient(160deg,#2c2c2e,#1c1c1e)", boxShadow:`0 0 0 ${Math.round(1*sc)}px #444,0 32px 80px rgba(0,0,0,.65)`, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:Math.round(4*sc), borderRadius:R-Math.round(4*sc), background:C.bg, overflow:"hidden" }}>
          <div style={{ position:"absolute", top:Math.round(14*sc), left:"50%", transform:"translateX(-50%)", width:Math.round(118*sc), height:Math.round(34*sc), background:"#000", borderRadius:Math.round(17*sc), zIndex:20 }}/>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:Math.round(56*sc), zIndex:19, display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:`0 ${Math.round(26*sc)}px ${Math.round(8*sc)}px` }}>
            <span style={{ fontSize:Math.round(14*sc), fontWeight:700, color:C.charcoal }}>9:41</span>
            <div style={{ display:"flex", alignItems:"center", gap:Math.round(6*sc) }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:Math.round(2*sc) }}>
                {[5,7,9,11].map((h,i)=><div key={i} style={{ width:Math.round(3*sc), height:Math.round(h*sc), background:C.charcoal, borderRadius:1, opacity:i<3?1:0.4 }}/>)}
              </div>
              <svg width={Math.round(15*sc)} height={Math.round(11*sc)} viewBox="0 0 15 11" fill="none">
                <circle cx="7.5" cy="9.5" r="1.2" fill={C.charcoal}/>
                <path d="M4 6.5C5 5.3 6.2 4.7 7.5 4.7s2.5.6 3.5 1.8" stroke={C.charcoal} strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M1 3.5C2.8 1.4 5 0.5 7.5 0.5S12.2 1.4 14 3.5" stroke={C.charcoal} strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <div style={{ display:"flex", alignItems:"center" }}>
                <div style={{ width:Math.round(24*sc), height:Math.round(12*sc), border:`${Math.round(1.5*sc)}px solid ${C.charcoal}`, borderRadius:Math.round(3*sc), position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", left:Math.round(1.5*sc), top:Math.round(1.5*sc), bottom:Math.round(1.5*sc), width:"78%", background:C.charcoal, borderRadius:Math.round(1.5*sc) }}/>
                </div>
                <div style={{ width:Math.round(2*sc), height:Math.round(5*sc), background:C.charcoal, borderRadius:1, marginLeft:Math.round(1*sc) }}/>
              </div>
            </div>
          </div>
          <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, overflow:"hidden" }}>
            <div style={{ transform:`scale(${sc})`, transformOrigin:"top left", width:`${(100/sc).toFixed(1)}%`, minHeight:`${(100/sc).toFixed(1)}%`, overflowY:"auto", overflowX:"hidden" }}>
              {children}
            </div>
          </div>
          <div style={{ position:"absolute", bottom:Math.round(8*sc), left:"50%", transform:"translateX(-50%)", width:Math.round(130*sc), height:Math.round(5*sc), background:"rgba(47,62,70,.28)", borderRadius:Math.round(3*sc), zIndex:20 }}/>
        </div>
      </div>
    </div>
  );
};

export default function TableFlowApp() {
  const [mode, setMode] = useState(null);
  const [activeScreen, setActiveScreen] = useState(0);

  const currentScreens = mode === 'guest' ? GUEST_SCREENS : mode === 'owner' ? OWNER_SCREENS : [];
  const safeIndex = currentScreens.length > 0 ? Math.min(activeScreen, currentScreens.length - 1) : 0;
  const CurrentScreenComponent = mode && currentScreens[safeIndex] ? currentScreens[safeIndex].component : null;

  const switchMode = (m) => { setActiveScreen(0); setMode(m); };
  useEffect(() => { setActiveScreen(0); }, [mode]);

  if (!mode) return (
    <div style={{ width:"100vw", height:"100vh", background:C.navyBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans','Helvetica Neue',sans-serif" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div style={{ width:80, height:80, borderRadius:24, background:`linear-gradient(135deg,${C.sage},${C.sageDark})`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:`0 12px 32px rgba(132,169,140,.4)` }}>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M8 34V18C8 14 10 10 21 10C32 10 34 14 34 18V34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M14 18V26M21 18V26M28 18V26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M6 34H36" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </div>
        <div style={{ fontFamily:"'Playfair Display','Georgia',serif", fontSize:48, fontWeight:700, color:"#fff" }}>TableFlow</div>
        <div style={{ fontSize:14, fontWeight:600, color:C.sage, letterSpacing:2, textTransform:"uppercase", marginTop:8 }}>Reserve · Dine · Earn</div>
      </div>
      <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", padding:"0 24px" }}>
        <div onClick={()=>switchMode('guest')} style={{ background:C.orange, padding:"20px 48px", borderRadius:20, cursor:"pointer", textAlign:"center", boxShadow:"0 8px 24px rgba(217,72,15,.3)" }}>
          <div style={{ fontSize:28, marginBottom:8 }}>👤</div>
          <div style={{ fontSize:20, fontWeight:700, color:"#fff" }}>Guest</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", marginTop:4 }}>Book · Dine · Earn</div>
        </div>
        <div onClick={()=>switchMode('owner')} style={{ background:"transparent", border:`3px solid ${C.orange}`, padding:"20px 48px", borderRadius:20, cursor:"pointer", textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:8 }}>👨‍💼</div>
          <div style={{ fontSize:20, fontWeight:700, color:C.orange }}>Owner</div>
          <div style={{ fontSize:13, color:C.sage, marginTop:4 }}>Manage · Grow · Profit</div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:24, fontSize:13, color:"rgba(255,255,255,.25)" }}>Premium Restaurant Management Platform</div>
    </div>
  );

  return (
    <div style={{ height:"100vh", background:C.navyBg, fontFamily:"'DM Sans','Helvetica Neue',sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 24px", borderBottom:"1px solid rgba(255,255,255,.08)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,${C.sage},${C.sageDark})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 42 42" fill="none"><path d="M8 34V18C8 14 10 10 21 10C32 10 34 14 34 18V34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M14 18V26M21 18V26M28 18V26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><path d="M6 34H36" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontFamily:"'Playfair Display','Georgia',serif", fontSize:17, fontWeight:700, color:"#fff" }}>TableFlow</span>
          <span style={{ fontSize:11, color:C.gray }}>· {mode === 'guest' ? 'Guest' : 'Owner'}</span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {['guest','owner'].map(m=>(
            <div key={m} onClick={()=>switchMode(m)} style={{ padding:"6px 14px", borderRadius:10, cursor:"pointer", background:mode===m?C.orange:"rgba(255,255,255,.06)", color:mode===m?"#fff":"rgba(255,255,255,.5)", fontWeight:mode===m?700:400, fontSize:12 }}>
              {m==='guest'?'👤 Guest':'👨‍💼 Owner'}
            </div>
          ))}
          <div onClick={()=>switchMode(null)} style={{ padding:"6px 12px", borderRadius:10, cursor:"pointer", background:"rgba(255,255,255,.05)", color:"rgba(255,255,255,.4)", fontSize:12 }}>✕</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:5, padding:"6px 24px", overflowX:"auto", borderBottom:"1px solid rgba(255,255,255,.06)", flexShrink:0 }}>
        {currentScreens.map((s,i)=>(
          <div key={i} onClick={()=>setActiveScreen(i)} style={{ padding:"6px 12px", borderRadius:9, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, background:i===safeIndex?C.orange:"rgba(255,255,255,.05)", color:i===safeIndex?"#fff":"rgba(255,255,255,.45)", fontWeight:i===safeIndex?700:400, fontSize:11 }}>
            {i+1}. {s.name}
          </div>
        ))}
      </div>

      {/* Body: phone + info side by side, NO blank space */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", minHeight:0 }}>

        {/* Phone — centered in its half */}
        <div style={{ flex:"0 0 50%", display:"flex", alignItems:"center", justifyContent:"center", padding:"12px 20px", borderRight:"1px solid rgba(255,255,255,.06)", overflow:"hidden" }}>
          <PhoneFrame><CurrentScreenComponent /></PhoneFrame>
        </div>

        {/* Info — takes the other 50% */}
        <div style={{ flex:"0 0 50%", minWidth:0, overflowY:"auto", padding:"24px 32px", display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <div style={{ display:"inline-block", padding:"3px 12px", borderRadius:20, background:C.orange, color:"#fff", fontSize:11, fontWeight:700, marginBottom:10 }}>
              Screen {safeIndex+1} of {currentScreens.length}
            </div>
            <div style={{ fontFamily:"'Playfair Display','Georgia',serif", fontSize:28, fontWeight:700, color:"#fff", lineHeight:1.2 }}>
              {currentScreens[safeIndex].name}
            </div>
          </div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.75)", lineHeight:1.8, whiteSpace:"pre-line", background:"rgba(255,255,255,.04)", padding:"16px 18px", borderRadius:14, borderLeft:`3px solid ${C.orange}` }}>
            {currentScreens[safeIndex].desc}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", paddingTop:16 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.3)", textTransform:"uppercase", letterSpacing:1.2, marginBottom:10 }}>Design Tokens</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {[{color:"#F8F5F0",name:"Cream"},{color:"#84A98C",name:"Sage"},{color:"#D9480F",name:"Orange"},{color:"#2F3E46",name:"Charcoal"}].map(t=>(
                <div key={t.name} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,.05)", borderRadius:8, padding:"5px 9px" }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:t.color, flexShrink:0 }}/>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,.45)" }}>{t.color} {t.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:"auto", paddingTop:8 }}>
            <div onClick={()=>setActiveScreen(Math.max(0,safeIndex-1))} style={{ padding:"10px 20px", borderRadius:12, cursor:"pointer", background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.35)", fontWeight:600, fontSize:13, opacity:safeIndex===0?0.3:1 }}>← Prev</div>
            <div onClick={()=>setActiveScreen(Math.min(currentScreens.length-1,safeIndex+1))} style={{ padding:"10px 20px", borderRadius:12, cursor:"pointer", background:C.orange, color:"#fff", fontWeight:700, fontSize:13, opacity:safeIndex===currentScreens.length-1?0.3:1 }}>Next →</div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:5, padding:"8px 0", borderTop:"1px solid rgba(255,255,255,.05)", flexShrink:0 }}>
        {currentScreens.map((_,i)=>(
          <div key={i} onClick={()=>setActiveScreen(i)} style={{ width:i===safeIndex?20:6, height:6, borderRadius:3, cursor:"pointer", background:i===safeIndex?C.orange:"rgba(255,255,255,.12)", transition:"width .3s" }}/>
        ))}
      </div>

    </div>
  );
}