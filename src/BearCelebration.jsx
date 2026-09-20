import { useEffect } from "react";
import Confetti from "./Confetti";

function BearCelebration({ playerName, message, onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="celebration-overlay">
      <Confetti />

      <div className="celebration-card">
        <div className="celebration-bear">
          🐻
        </div>

        <div className="celebration-sparkles">
          ✨ ⭐ ✨
        </div>

        <h2>{message || "Congratulations!"}</h2>

        {playerName && (
          <p>
            Amazing job, <strong>{playerName}</strong>! 🎉
          </p>
        )}

        <div className="celebration-hearts">
          💛 💚 🧡
        </div>
      </div>
    </div>
  );
}

export default BearCelebration;