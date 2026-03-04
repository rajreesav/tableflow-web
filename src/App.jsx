import "./App.css";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import TableFlowApp from "./TableFlow";

export default function App() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    if (view === "landing") {
      document.body.classList.remove("app-mode");
      window.scrollTo(0, 0);
    } else {
      document.body.classList.add("app-mode");
    }
  }, [view]);

  if (view === "guest") return <TableFlowApp initialMode="guest" onBack={() => setView("landing")} />;
  if (view === "owner") return <TableFlowApp initialMode="owner" onBack={() => setView("landing")} />;

  return (
    <LandingPage
      onGuest={() => setView("guest")}
      onOwner={() => setView("owner")}
    />
  );
}