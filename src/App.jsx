import "./App.css";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import TableFlowApp from "./TableFlow";
import ROICalculator from "./ROICalculator";

export default function App() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (view === "guest" || view === "owner") {
      document.body.classList.add("app-mode");
    } else {
      document.body.classList.remove("app-mode");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [view]);

  if (view === "guest") return <TableFlowApp initialMode="guest" onBack={() => setView("landing")} />;
  if (view === "owner") return <TableFlowApp initialMode="owner" onBack={() => setView("landing")} />;
  if (view === "roi")   return <ROICalculator onBack={() => setView("landing")} />;

  return (
    <LandingPage
      onGuest={() => setView("guest")}
      onOwner={() => setView("owner")}
      onROI={()   => setView("roi")}
    />
  );
}