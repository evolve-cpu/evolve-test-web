import React, { useState } from "react";
import PreloaderSequence from "./components/PreloaderSequence";
import LandingPage from "./components/LandingPage";

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <div className="min-h-screen">
      {showPreloader ? (
        <PreloaderSequence onComplete={handlePreloaderComplete} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;
