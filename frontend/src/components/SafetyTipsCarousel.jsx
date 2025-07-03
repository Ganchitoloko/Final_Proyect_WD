import { useState } from "react";
import "../styles/SafetyTipsCarousel.css"; 
const tips = [
  {
    title: "Wear Proper Safety Gear",
    description:
      "Always wear helmets, gloves, boots, and reflective vests when on site.",
    image: "/images/safety-gear.jpg",
  },
  {
    title: "Stay Hydrated",
    description:
      "Drink water regularly, especially when working outdoors in hot weather.",
    image: "/images/hydration.jpg",
  },
  {
    title: "Keep Your Workspace Clean",
    description:
      "A tidy area reduces the risk of tripping and falling.",
    image: "/images/clean-workspace.jpg",
  },
  {
    title: "Know the Location of Fire Extinguishers",
    description:
      "Be familiar with fire safety procedures and extinguisher locations.",
    image: "/images/fire-extinguisher.jpg",
  },
  {
    title: "Use the Right Tool for the Job",
    description:
      "Using improper tools can lead to injuries or accidents.",
    image: "/images/right-tool.jpg",
  },
];

function SafetyTipsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % tips.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-card">
        <img src={tips[current].image} alt={tips[current].title} className="carousel-img" />
        <div className="carousel-content">
          <h3>{tips[current].title}</h3>
          <p>{tips[current].description}</p>
        </div>
        <div className="carousel-controls">
          <button onClick={prev} className="carousel-btn">⬅️</button>
          <button onClick={next} className="carousel-btn">➡️</button>
        </div>
      </div>
    </div>
  );
}

export default SafetyTipsCarousel;
