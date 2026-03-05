import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.homePage}>
        <PageNav />
        <HeroSection />
        {/* <FeatureSection /> */}
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.heading}>Study</h1>
          <h3>
            Stop wasting hours searching YouTube for the best videos. We bring
            you AI-ranked videos, expert-suggestions best courses, and
            high-quality study notes — all in one place.
          </h3>
          <h3>
            Whether you’re an engineer building skills or a student preparing
            for exams, we help you learn faster, smarter, and with confidence.
          </h3>
          <div className={styles.btns}>
            <Button>Analyze Video</Button>
            <Button>Find Docs</Button>
          </div>
        </div>

        <div className={styles.right}>
          <h3 style={{ marginTop: "4rem" }}>Efficiently</h3>
          <h3>Smarter</h3>
          <div>
            <img src="public/assets/imag1.png" alt="image of studying boy" />
          </div>
        </div>
      </div>
    </div>
  );
}

// function HeroSection() {
//   return (
//     <div className="hero-section">
//       <div className="hero-container">
//         <div className="hero-left">
//           <h1 className="hero-title">Analyze YouTube Videos Instantly</h1>
//           <p className="hero-subtitle">
//             Get AI-powered insights from any YouTube video. Extract stats,
//             analyze comments, and understand your content better.
//           </p>
//           <div className="hero-buttons">
//             <button className="btn btn-primary">Get Started</button>
//             <button className="btn btn-secondary">Learn More</button>
//           </div>
//         </div>
//         <div className="hero-right">
//           <div className="hero-image">
//             <img
//               src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=400&fit=crop"
//               alt="YouTube Analytics"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FeatureSection() {
//   const features = [
//     {
//       icon: "📊",
//       title: "Video Analytics",
//       description: "Get detailed stats including views, likes, and comments",
//     },
//     {
//       icon: "🤖",
//       title: "AI Analysis",
//       description: "Leverage Google Gemini AI for intelligent content insights",
//     },
//     {
//       icon: "💬",
//       title: "Comment Mining",
//       description: "Extract and analyze viewer comments and sentiment",
//     },
//     {
//       icon: "⚡",
//       title: "Fast & Easy",
//       description: "Simple interface to get results in seconds",
//     },
//   ];

//   return (
//     <div className="feature-section">
//       <div className="feature-container">
//         <h2 className="feature-title">Why Choose MindStack?</h2>
//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div key={index} className="feature-card">
//               <div className="feature-icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
