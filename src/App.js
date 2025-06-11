import React from "react";
import LoginForm from "./components/LoginForm";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import TranslateDemo from "./components/TranslateDemo";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>SiteBuddy App</h1>
      <LoginForm />
      <ReportForm />
      <ReportList />
         <h1>SiteBuddy Translate Test</h1>
      <TranslateDemo />
    </div>
  );
}

export default App;
