import React, { useEffect, useState } from "react";
import "./App.css";

import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";

import BearCelebration from "./BearCelebration";

function App() {
  // =====================================================
  // SAVED PROGRESS
  // =====================================================

  const [savedProgress] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("metabolicQuestProgress") || "{}"
      );
    } catch {
      return {};
    }
  });

  // =====================================================
  // PLAYER NAME
  // =====================================================

  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem("metabolicQuestPlayerName") || "";
  });

  const [nameInput, setNameInput] = useState("");

  // =====================================================
  // CURRENT SCREEN
  // =====================================================

  const [screen, setScreen] = useState(
    localStorage.getItem("metabolicQuestPlayerName")
      ? "home"
      : "intro"
  );

  // =====================================================
  // CELEBRATION
  // =====================================================

  const [celebration, setCelebration] = useState(null);

  const celebrate = (message) => {
    setCelebration({
      message: message || "Congratulations!",
      id: Date.now(),
    });
  };

  const closeCelebration = () => {
    setCelebration(null);
  };

  // =====================================================
  // LEVEL PROGRESS
  // =====================================================

  const [level1Passed, setLevel1Passed] = useState(
    savedProgress.level1Passed || false
  );

  const [level2Passed, setLevel2Passed] = useState(
    savedProgress.level2Passed || false
  );

  const [level3Passed, setLevel3Passed] = useState(
    savedProgress.level3Passed || false
  );

  const [level4Passed, setLevel4Passed] = useState(
    savedProgress.level4Passed || false
  );

  // =====================================================
  // LEVEL COMPLETION HANDLERS
  // =====================================================

  const handleLevel1Passed = (passed) => {
    setLevel1Passed(passed);

    if (passed) {
      celebrate("Level 1 Complete!");
    }
  };

  const handleLevel2Passed = (passed) => {
    setLevel2Passed(passed);

    if (passed) {
      celebrate("Level 2 Complete!");
    }
  };

  const handleLevel3Passed = (passed) => {
    setLevel3Passed(passed);

    if (passed) {
      celebrate("Level 3 Complete!");
    }
  };

  const handleLevel4Passed = (passed) => {
    setLevel4Passed(passed);

    if (passed) {
      celebrate("You completed Glycolysis!");
    }
  };

  // =====================================================
  // SAVE PROGRESS
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "metabolicQuestProgress",
      JSON.stringify({
        level1Passed,
        level2Passed,
        level3Passed,
        level4Passed,
      })
    );
  }, [
    level1Passed,
    level2Passed,
    level3Passed,
    level4Passed,
  ]);

  // =====================================================
  // START JOURNEY
  // =====================================================

  const handleStartJourney = (event) => {
    event.preventDefault();

    const cleanedName = nameInput.trim();

    if (!cleanedName) {
      return;
    }

    localStorage.setItem(
      "metabolicQuestPlayerName",
      cleanedName
    );

    setPlayerName(cleanedName);
    setNameInput("");
    setScreen("home");
  };

  // =====================================================
  // OVERALL PROGRESS
  // =====================================================

  const completedLevels = [
    level1Passed,
    level2Passed,
    level3Passed,
    level4Passed,
  ].filter(Boolean).length;

  const progressPercentage = completedLevels * 25;

  // =====================================================
  // INTRO / NAME SCREEN
  // =====================================================

  if (screen === "intro") {
    return (
      <div className="app intro-page">
        <main className="intro-content">

          <div className="intro-bubble">
            🧬
          </div>

          <span className="badge">
            BIOCHEMISTRY LEARNING GAME
          </span>

          <h1>
            Welcome to
            <br />
            <span>Metabolic Quest!</span>
          </h1>

          <p className="intro-description">
            Your journey through glycolysis starts here.
            Learn, recall, play and master metabolism.
          </p>

          <form
            className="name-card"
            onSubmit={handleStartJourney}
          >
            <label htmlFor="player-name">
              What should we call you?
            </label>

            <input
              id="player-name"
              type="text"
              placeholder="Enter your name..."
              value={nameInput}
              onChange={(event) =>
                setNameInput(event.target.value)
              }
              autoFocus
              maxLength={30}
            />

            <button
              type="submit"
              className="primary-button large-button"
              disabled={!nameInput.trim()}
            >
              Start My Journey 🚀
            </button>
          </form>

          <div className="intro-bear">
            🐻
          </div>

          <p className="intro-small-text">
            Learn it. Recall it. Master it. 🧠✨
          </p>

        </main>
      </div>
    );
  }

  // =====================================================
  // HOME SCREEN
  // =====================================================

  if (screen === "home") {
    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            🧬
          </div>

          <div>
            <h1>Metabolic Quest</h1>

            <p>
              Learn metabolism. Master the pathways.
            </p>
          </div>

        </header>

        <main className="home">

          <section className="welcome">

            <span className="badge">
              BIOCHEMISTRY LEARNING GAME
            </span>

            <h2>
              Welcome,
              <br />

              <span>
                {playerName}!
              </span>
            </h2>

            <p>
              Your metabolism adventure is waiting.
              Learn glycolysis through interactive
              lessons, recall challenges and flashcards.
            </p>

            <button
              className="primary-button large-button"
              onClick={() => setScreen("levels")}
            >
              Continue Learning →
            </button>

          </section>

          <section className="progress-card">

            <div>
              <span>
                YOUR PROGRESS
              </span>

              <h3>
                Glycolysis
              </h3>
            </div>

            <div className="progress-number">
              {progressPercentage}%
            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`,
                }}
              ></div>

            </div>

            <p>
              {level4Passed
                ? `Amazing ${playerName}! Glycolysis complete! You have mastered all four levels.`
                : level3Passed
                ? `Great work, ${playerName}! Level 4 is unlocked. Finish the energy payoff.`
                : level2Passed
                ? `Nice job, ${playerName}! Level 3 is unlocked. Continue learning.`
                : level1Passed
                ? `Well done, ${playerName}! Level 2 is unlocked. Keep going.`
                : `Ready, ${playerName}? Start Level 1 to begin your journey.`}
            </p>

          </section>

        </main>

        {celebration && (
          <BearCelebration
            key={celebration.id}
            playerName={playerName}
            message={celebration.message}
            onDone={closeCelebration}
          />
        )}

      </div>
    );
  }

  // =====================================================
  // LEVEL MAP
  // =====================================================

  if (screen === "levels") {
    return (
      <>
        <LevelMap
          setScreen={setScreen}
          level1Passed={level1Passed}
          level2Passed={level2Passed}
          level3Passed={level3Passed}
          level4Passed={level4Passed}
          playerName={playerName}
        />

        {celebration && (
          <BearCelebration
            key={celebration.id}
            playerName={playerName}
            message={celebration.message}
            onDone={closeCelebration}
          />
        )}
      </>
    );
  }

  // =====================================================
  // LEVEL 1
  // =====================================================

  if (screen === "level1") {
    return (
      <>
        <Level1
          setScreen={setScreen}
          setLevel1Passed={handleLevel1Passed}
          playerName={playerName}
          onCelebrate={celebrate}
        />

        {celebration && (
          <BearCelebration
            key={celebration.id}
            playerName={playerName}
            message={celebration.message}
            onDone={closeCelebration}
          />
        )}
      </>
    );
  }

  // =====================================================
  // LEVEL 2
  // =====================================================

  if (screen === "level2") {
    return (
      <>
        <Level2
          setScreen={setScreen}
          setLevel2Passed={handleLevel2Passed}
          playerName={playerName}
          onCelebrate={celebrate}
        />

        {celebration && (
          <BearCelebration
            key={celebration.id}
            playerName={playerName}
            message={celebration.message}
            onDone={closeCelebration}
          />
        )}
      </>
    );
  }

  // =====================================================
  // LEVEL 3
  // =====================================================

  if (screen === "level3") {
    return (
      <>
        <Level3
          setScreen={setScreen}
          setLevel3Passed={handleLevel3Passed}
          playerName={playerName}
          onCelebrate={celebrate}
        />

        {celebration && (
          <BearCelebration
            key={celebration.id}
            playerName={playerName}
            message={celebration.message}
            onDone={closeCelebration}
          />
        )}
      </>
    );
  }

  // =====================================================
  // LEVEL 4
  // =====================================================

  if (screen === "level4") {
    return (
      <>
        <Level4
          setScreen={setScreen}
          setLevel4Passed={handleLevel4Passed}
          playerName={playerName}
          onCelebrate={celebrate}
        />

        {celebration && (
          <BearCelebration
            key={celebration.id}
            playerName={playerName}
            message={celebration.message}
            onDone={closeCelebration}
          />
        )}
      </>
    );
  }

  return null;
}

// =====================================================
// LEVEL MAP
// =====================================================

function LevelMap({
  setScreen,
  level1Passed,
  level2Passed,
  level3Passed,
  level4Passed,
  playerName,
}) {
  return (
    <main className="levels">

      {/* BACK */}

      <button
        className="back-button"
        onClick={() => setScreen("home")}
      >
        ← Back
      </button>

      {/* HEADING */}

      <section className="level-heading">

        <span className="badge">
          GLYCOLYSIS
        </span>

        <h2>
          {playerName}'s Learning Journey
        </h2>

        <p>
          Complete each level to unlock the next one.
        </p>

      </section>

      {/* LEVELS */}

      <section className="level-list">

        {/* =================================================
            LEVEL 1
        ================================================= */}

        <button
          className="level-card unlocked"
          onClick={() => setScreen("level1")}
        >

          <div className="level-icon">
            {level1Passed ? "✅" : "🔓"}
          </div>

          <div className="level-info">

            <span>
              LEVEL 1
            </span>

            <h3>
              Meet Glycolysis
            </h3>

            <p>
              Learn what glycolysis is, where it occurs
              and what it produces.
            </p>

            <small>
              {level1Passed
                ? "Level 1 complete!"
                : "Start Level 1"}
            </small>

          </div>

          <div className="level-status">
            {level1Passed ? "✓" : "▶"}
          </div>

        </button>

        {/* =================================================
            LEVEL 2
        ================================================= */}

        {level1Passed ? (

          <button
            className="level-card unlocked"
            onClick={() => setScreen("level2")}
          >

            <div className="level-icon">
              {level2Passed ? "✅" : "🔓"}
            </div>

            <div className="level-info">

              <span>
                LEVEL 2
              </span>

              <h3>
                Energy Investment
              </h3>

              <p>
                Follow glucose through the first half
                of glycolysis and understand ATP investment.
              </p>

              <small>
                {level2Passed
                  ? "Level 2 complete!"
                  : "Start Level 2"}
              </small>

            </div>

            <div className="level-status">
              {level2Passed ? "✓" : "▶"}
            </div>

          </button>

        ) : (

          <div className="level-card locked">

            <div className="level-icon">
              🔒
            </div>

            <div className="level-info">

              <span>
                LEVEL 2
              </span>

              <h3>
                Energy Investment
              </h3>

              <p>
                Pass Level 1 to unlock this level.
              </p>

            </div>

          </div>

        )}

        {/* =================================================
            LEVEL 3
        ================================================= */}

        {level2Passed ? (

          <button
            className="level-card unlocked"
            onClick={() => setScreen("level3")}
          >

            <div className="level-icon">
              {level3Passed ? "✅" : "🔓"}
            </div>

            <div className="level-info">

              <span>
                LEVEL 3
              </span>

              <h3>
                Split the Molecule
              </h3>

              <p>
                Learn how fructose-1,6-bisphosphate
                is split into three-carbon molecules.
              </p>

              <small>
                {level3Passed
                  ? "Level 3 complete!"
                  : "Start Level 3"}
              </small>

            </div>

            <div className="level-status">
              {level3Passed ? "✓" : "▶"}
            </div>

          </button>

        ) : (

          <div className="level-card locked">

            <div className="level-icon">
              🔒
            </div>

            <div className="level-info">

              <span>
                LEVEL 3
              </span>

              <h3>
                Split the Molecule
              </h3>

              <p>
                Pass Level 2 to unlock this level.
              </p>

            </div>

          </div>

        )}

        {/* =================================================
            LEVEL 4
        ================================================= */}

        {level3Passed ? (

          <button
            className="level-card unlocked"
            onClick={() => setScreen("level4")}
          >

            <div className="level-icon">
              {level4Passed ? "✅" : "🔓"}
            </div>

            <div className="level-info">

              <span>
                LEVEL 4
              </span>

              <h3>
                Energy Payoff
              </h3>

              <p>
                Learn how glycolysis produces NADH,
                ATP and pyruvate.
              </p>

              <small>
                {level4Passed
                  ? "Level 4 complete!"
                  : "Start Level 4"}
              </small>

            </div>

            <div className="level-status">
              {level4Passed ? "✓" : "▶"}
            </div>

          </button>

        ) : (

          <div className="level-card locked">

            <div className="level-icon">
              🔒
            </div>

            <div className="level-info">

              <span>
                LEVEL 4
              </span>

              <h3>
                Energy Payoff
              </h3>

              <p>
                Pass Level 3 to unlock this level.
              </p>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}

export default App;