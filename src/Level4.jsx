import { useState } from "react";

// =====================================================
// LEVEL 4 TERMS
// =====================================================

const terms = [
  {
    id: "g3p",
    label: "G3P",
    correct: 0,
  },
  {
    id: "nad",
    label: "NAD⁺",
    correct: 1,
  },
  {
    id: "nadh",
    label: "NADH",
    correct: 2,
  },
  {
    id: "bpg",
    label: "1,3-Bisphosphoglycerate",
    correct: 3,
  },
  {
    id: "atp1",
    label: "ATP",
    correct: 4,
  },
  {
    id: "threepg",
    label: "3-Phosphoglycerate",
    correct: 5,
  },
  {
    id: "twopg",
    label: "2-Phosphoglycerate",
    correct: 6,
  },
  {
    id: "pep",
    label: "Phosphoenolpyruvate (PEP)",
    correct: 7,
  },
  {
    id: "atp2",
    label: "ATP",
    correct: 8,
  },
  {
    id: "pyruvate",
    label: "Pyruvate",
    correct: 9,
  },
];

// =====================================================
// PATHWAY
// =====================================================

const pathway = [
  {
    title: "G3P",
    description:
      "A three-carbon molecule enters the payoff phase.",
  },
  {
    title: "NAD⁺",
    description:
      "Accepts electrons during oxidation of G3P.",
  },
  {
    title: "NADH",
    description:
      "Reduced electron carrier is produced.",
  },
  {
    title: "1,3-Bisphosphoglycerate",
    description:
      "A high-energy intermediate is formed.",
  },
  {
    title: "ATP",
    description:
      "ATP is formed by substrate-level phosphorylation.",
  },
  {
    title: "3-Phosphoglycerate",
    description:
      "The phosphate is transferred away from the high-energy intermediate.",
  },
  {
    title: "2-Phosphoglycerate",
    description:
      "The phosphate group changes position.",
  },
  {
    title: "Phosphoenolpyruvate (PEP)",
    description:
      "A very high-energy intermediate is produced.",
  },
  {
    title: "ATP",
    description:
      "Another ATP is produced by substrate-level phosphorylation.",
  },
  {
    title: "Pyruvate",
    description:
      "The final product of glycolysis is formed.",
  },
];

// =====================================================
// FLASHCARDS
// =====================================================

const flashcards = [
  {
    question:
      "What happens to G3P during the payoff phase?",
    answer:
      "G3P is oxidized and phosphorylated, producing 1,3-bisphosphoglycerate and NADH.",
  },
  {
    question:
      "What electron carrier is reduced during glycolysis?",
    answer:
      "NAD⁺ accepts electrons and is reduced to NADH.",
  },
  {
    question:
      "How is ATP produced during the payoff phase?",
    answer:
      "ATP is produced by substrate-level phosphorylation.",
  },
  {
    question:
      "What happens to 3-phosphoglycerate?",
    answer:
      "Its phosphate group is rearranged, producing 2-phosphoglycerate.",
  },
  {
    question:
      "Why is PEP important?",
    answer:
      "PEP contains a high-energy phosphate bond that can be used to produce ATP.",
  },
  {
    question:
      "What is the final product of glycolysis?",
    answer: "Pyruvate.",
  },
  {
    question:
      "What is the net ATP yield of glycolysis per glucose molecule?",
    answer:
      "Glycolysis produces 4 ATP but uses 2 ATP, giving a net gain of 2 ATP.",
  },
];

// =====================================================
// SHUFFLE
// =====================================================

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

// =====================================================
// LEVEL 4
// =====================================================

function Level4({
  setScreen,
  setLevel4Passed,
}) {
  const [stage, setStage] = useState("lesson");

  const [lessonSection, setLessonSection] =
    useState(0);

  const [lives, setLives] = useState(3);

  const [score, setScore] = useState(0);

  const [dropFeedback, setDropFeedback] =
    useState(null);

  const [placedTerms, setPlacedTerms] =
    useState({});

  const [selectedTerm, setSelectedTerm] =
    useState(null);

  const [shuffledTerms, setShuffledTerms] =
    useState(() => shuffleArray(terms));

  const [currentCard, setCurrentCard] =
    useState(0);

  const [showAnswer, setShowAnswer] =
    useState(false);

  // =====================================================
  // LESSON CONTENT
  // =====================================================

  const lessonSections = [
    {
      title: "The Energy Payoff Begins",

      content: (
        <>
          <p>
            The first half of glycolysis used ATP
            to prepare glucose for breakdown.
          </p>

          <p>
            Now the second half begins. This is
            called the{" "}
            <strong>energy payoff phase</strong>.
          </p>

          <p>
            Remember that the original glucose
            molecule was split into two
            three-carbon molecules.
          </p>

          <div className="lesson-highlight">
            <strong>
              From this point onward, every reaction
              happens twice for every glucose
              molecule.
            </strong>
          </div>
        </>
      ),
    },

    {
      title: "G3P Is Oxidized",

      content: (
        <>
          <p>
            Each glyceraldehyde-3-phosphate (G3P)
            molecule is oxidized.
          </p>

          <p>
            During this reaction,
            <strong> NAD⁺</strong> accepts
            electrons and hydrogen.
          </p>

          <p>
            NAD⁺ is therefore reduced to
            <strong> NADH</strong>.
          </p>

          <div className="lesson-flow">
            G3P → NADH +
            1,3-Bisphosphoglycerate
          </div>

          <p>
            This is an important oxidation-reduction
            step because the electrons captured by
            NADH can later contribute to ATP
            production.
          </p>
        </>
      ),
    },

    {
      title: "The First ATP Is Made",

      content: (
        <>
          <p>
            1,3-Bisphosphoglycerate contains a
            high-energy phosphate group.
          </p>

          <p>
            That phosphate can be transferred to
            ADP to produce ATP.
          </p>

          <div className="lesson-highlight">
            <strong>
              This is called substrate-level
              phosphorylation.
            </strong>
          </div>

          <p>
            The product is
            <strong> 3-phosphoglycerate</strong>.
          </p>

          <div className="lesson-flow">
            1,3-BPG → 3-Phosphoglycerate + ATP
          </div>
        </>
      ),
    },

    {
      title: "The Phosphate Changes Position",

      content: (
        <>
          <p>
            3-phosphoglycerate is converted into
            <strong> 2-phosphoglycerate</strong>.
          </p>

          <p>
            The phosphate group changes position
            within the three-carbon molecule.
          </p>

          <div className="lesson-flow">
            3-Phosphoglycerate
            <br />
            ↓
            <br />
            2-Phosphoglycerate
          </div>
        </>
      ),
    },

    {
      title: "PEP Is Formed",

      content: (
        <>
          <p>
            2-phosphoglycerate is converted into
            <strong>
              {" "}
              phosphoenolpyruvate (PEP)
            </strong>.
          </p>

          <p>
            This reaction removes water and
            produces a very high-energy phosphate
            compound.
          </p>

          <div className="lesson-highlight">
            <strong>
              PEP has a very high
              phosphoryl-transfer potential.
            </strong>
          </div>
        </>
      ),
    },

    {
      title: "The Second ATP and Pyruvate",

      content: (
        <>
          <p>
            PEP transfers its phosphate group to
            ADP.
          </p>

          <p>
            This produces another ATP and forms
            <strong> pyruvate</strong>.
          </p>

          <div className="lesson-flow">
            PEP → Pyruvate + ATP
          </div>

          <p>
            Because two molecules of G3P entered
            this phase, these reactions occur
            twice.
          </p>
        </>
      ),
    },

    {
      title: "The Overall Payoff",

      content: (
        <>
          <p>
            The payoff phase produces ATP and NADH
            while converting the two three-carbon
            molecules into pyruvate.
          </p>

          <div className="lesson-highlight">
            <p>Per glucose:</p>

            <strong>2 NADH</strong>

            <br />

            <strong>4 ATP produced</strong>

            <br />

            <strong>2 Pyruvate</strong>
          </div>

          <p>
            Since 2 ATP were already invested
            during the first phase, glycolysis
            gives a{" "}
            <strong>
              net gain of 2 ATP
            </strong>{" "}
            per glucose.
          </p>
        </>
      ),
    },
  ];

  // =====================================================
  // LESSON NAVIGATION
  // =====================================================

  function nextLesson() {
    if (
      lessonSection <
      lessonSections.length - 1
    ) {
      setLessonSection(
        lessonSection + 1
      );
    } else {
      startRecall();
    }
  }

  function previousLesson() {
    if (lessonSection > 0) {
      setLessonSection(
        lessonSection - 1
      );
    }
  }

  // =====================================================
  // START RECALL
  // =====================================================

  function startRecall() {
    setStage("recall");
    setLives(3);
    setScore(0);
    setPlacedTerms({});
    setSelectedTerm(null);
    setDropFeedback(null);

    setShuffledTerms(
      shuffleArray(terms)
    );
  }

  // =====================================================
  // SELECT TERM — PHONE FRIENDLY
  // =====================================================

  function handleTermClick(termId) {
    if (lives <= 0) {
      return;
    }

    const alreadyPlaced =
      Object.values(placedTerms).includes(
        termId
      );

    if (alreadyPlaced) {
      return;
    }

    setSelectedTerm(termId);
  }

  // =====================================================
  // PLACE TERM
  // =====================================================

  function placeTerm(termId, index) {
    if (lives <= 0) {
      return;
    }

    if (placedTerms[index]) {
      return;
    }

    const term = terms.find(
      (item) =>
        item.id === termId
    );

    if (!term) {
      return;
    }

    // =================================================
    // CORRECT
    // =================================================

    if (term.correct === index) {
      setPlacedTerms(
        (previous) => ({
          ...previous,
          [index]: termId,
        })
      );

      const newScore = score + 1;

      setScore(newScore);
      setSelectedTerm(null);

      setDropFeedback({
        type: "correct",
        message:
          "Correct! Keep going.",
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1200);

      return;
    }

    // =================================================
    // WRONG
    // =================================================

    const newLives = lives - 1;

    setLives(newLives);
    setSelectedTerm(null);

    setDropFeedback({
      type: "wrong",
      message:
        "Wrong! That step does not belong here.",
    });

    setTimeout(() => {
      setDropFeedback(null);
    }, 1500);

    if (newLives <= 0) {
      setTimeout(() => {
        setStage("result");
      }, 1000);
    }
  }

  // =====================================================
  // TAP DROP — PHONE
  // =====================================================

  function handleTapDrop(index) {
    if (!selectedTerm) {
      return;
    }

    placeTerm(
      selectedTerm,
      index
    );
  }

  // =====================================================
  // DRAG START — DESKTOP
  // =====================================================

  function handleDragStart(
    event,
    termId
  ) {
    if (lives <= 0) {
      return;
    }

    event.dataTransfer.setData(
      "termId",
      termId
    );

    event.dataTransfer.effectAllowed =
      "move";
  }

  // =====================================================
  // DROP — DESKTOP
  // =====================================================

  function handleDrop(
    event,
    index
  ) {
    event.preventDefault();

    if (lives <= 0) {
      return;
    }

    const termId =
      event.dataTransfer.getData(
        "termId"
      );

    if (!termId) {
      return;
    }

    placeTerm(
      termId,
      index
    );
  }

  // =====================================================
  // ALLOW DROP
  // =====================================================

  function allowDrop(event) {
    event.preventDefault();
  }

  // =====================================================
  // CHECK PATHWAY
  // =====================================================

  function checkPathway() {
    if (score === terms.length) {
      setStage("result");

      if (setLevel4Passed) {
        setLevel4Passed(true);
      }
    } else {
      setDropFeedback({
        type: "wrong",
        message:
          "Complete the entire pathway before finishing.",
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1800);
    }
  }

  // =====================================================
  // RETRY
  // =====================================================

  function retryLevel() {
    setStage("lesson");
    setLessonSection(0);
    setLives(3);
    setScore(0);
    setPlacedTerms({});
    setSelectedTerm(null);
    setDropFeedback(null);

    setShuffledTerms(
      shuffleArray(terms)
    );

    setCurrentCard(0);
    setShowAnswer(false);
  }

  // =====================================================
  // COMPLETE LEVEL
  // =====================================================

  function completeLevel() {
    if (setLevel4Passed) {
      setLevel4Passed(true);
    }

    setScreen("levels");
  }

  // =====================================================
  // NEXT FLASHCARD
  // =====================================================

  function nextCard() {
    if (
      currentCard <
      flashcards.length - 1
    ) {
      setCurrentCard(
        currentCard + 1
      );

      setShowAnswer(false);
    } else {
      completeLevel();
    }
  }

  // =====================================================
  // LESSON SCREEN
  // =====================================================

  if (stage === "lesson") {
    const section =
      lessonSections[
        lessonSection
      ];

    return (
      <main
        className="lesson-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
        }}
      >
        <button
          className="back-button"
          onClick={() =>
            setScreen("levels")
          }
        >
          ← Back to Levels
        </button>

        <div className="lesson-header">
          <span className="badge">
            LEVEL 4
          </span>

          <h1>
            Energy Payoff
          </h1>

          <p>
            Turn the energy stored in glucose
            into ATP.
          </p>
        </div>

        <div className="lesson-progress">
          <div
            className="lesson-progress-fill"
            style={{
              width: `${
                ((lessonSection + 1) /
                  lessonSections.length) *
                100
              }%`,
            }}
          ></div>
        </div>

        <div className="lesson-card">
          <span className="lesson-number">
            STEP {lessonSection + 1} OF{" "}
            {lessonSections.length}
          </span>

          <h2>
            {section.title}
          </h2>

          <div className="lesson-content">
            {section.content}
          </div>

          <div className="lesson-navigation">
            <button
              className="secondary-button"
              onClick={
                previousLesson
              }
              disabled={
                lessonSection === 0
              }
            >
              ← Previous
            </button>

            <button
              className="primary-button"
              onClick={nextLesson}
            >
              {lessonSection ===
              lessonSections.length - 1
                ? "Start Recall Challenge →"
                : "Next →"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // RECALL SCREEN
  // =====================================================

  if (stage === "recall") {
    return (
      <main
        className="recall-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
        }}
      >
        <button
          className="back-button"
          onClick={() =>
            setScreen("levels")
          }
        >
          ← Exit Level
        </button>

        <div className="recall-header">
          <span className="badge">
            LEVEL 4 RECALL
          </span>

          <h1>
            Build the Energy Payoff
          </h1>

          <p>
            <span className="desktop-only">
              Drag each item into its correct
              position.
            </span>

            <span className="mobile-only">
              Tap an answer, then tap the
              position where it belongs.
            </span>
          </p>

          <div className="recall-stats">
            <div className="stat-box">
              <span>
                LIVES
              </span>

              <strong>
                {"❤️".repeat(lives)}
              </strong>
            </div>

            <div className="stat-box">
              <span>
                SCORE
              </span>

              <strong>
                {score}/{terms.length}
              </strong>
            </div>
          </div>
        </div>

        {dropFeedback && (
          <div
            className={`drop-feedback ${
              dropFeedback.type ===
              "correct"
                ? "feedback-correct"
                : "feedback-wrong"
            }`}
          >
            {dropFeedback.type ===
            "correct"
              ? "✓ "
              : "✕ "}

            {dropFeedback.message}
          </div>
        )}

        {/* =================================================
            GAME
        ================================================= */}

        <div
          className="drag-game level4-drag-game"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "none",
            overflow: "visible",
            alignItems: "flex-start",
          }}
        >
          {/* =================================================
              TERM BANK
          ================================================= */}

          <div
            className="term-bank"
            style={{
              height: "auto",
              maxHeight: "none",
              overflow: "visible",
            }}
          >
            <h3>
              Choose an Answer
            </h3>

            <p className="drag-instruction">
              <span className="desktop-only">
                Drag the terms into the pathway.
              </span>

              <span className="mobile-only">
                Tap an answer to select it.
              </span>
            </p>

            <div className="terms">
              {shuffledTerms.map(
                (term) => {
                  const alreadyPlaced =
                    Object.values(
                      placedTerms
                    ).includes(
                      term.id
                    );

                  const isSelected =
                    selectedTerm ===
                    term.id;

                  return (
                    <button
                      key={term.id}
                      type="button"
                      className={`draggable-term ${
                        alreadyPlaced
                          ? "term-used"
                          : ""
                      } ${
                        isSelected
                          ? "term-selected"
                          : ""
                      }`}
                      draggable={
                        !alreadyPlaced &&
                        lives > 0
                      }
                      onClick={() =>
                        handleTermClick(
                          term.id
                        )
                      }
                      onDragStart={(
                        event
                      ) =>
                        handleDragStart(
                          event,
                          term.id
                        )
                      }
                      disabled={
                        alreadyPlaced ||
                        lives <= 0
                      }
                    >
                      <span className="drag-handle">
                        ⋮⋮
                      </span>

                      {term.label}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              PATHWAY
          ================================================= */}

          <div
            className="pathway-box"
            style={{
              height: "auto",
              maxHeight: "none",
              overflow: "visible",
            }}
          >
            <h2 className="pathway-title">
              Glycolysis Energy Payoff
            </h2>

            <div className="pathway-start">
              TWO G3P MOLECULES
            </div>

            {pathway.map(
              (step, index) => {
                const placedId =
                  placedTerms[index];

                const placedTerm =
                  terms.find(
                    (term) =>
                      term.id ===
                      placedId
                  );

                const readyForTap =
                  selectedTerm &&
                  !placedTerm &&
                  lives > 0;

                return (
                  <div
                    className="pathway-row"
                    key={index}
                  >
                    <div className="pathway-arrow">
                      ↓
                    </div>

                    <div
                      className={`drop-zone ${
                        placedTerm
                          ? "drop-zone-filled"
                          : ""
                      } ${
                        readyForTap
                          ? "drop-zone-ready"
                          : ""
                      }`}
                      onClick={() =>
                        handleTapDrop(
                          index
                        )
                      }
                      onDragOver={
                        allowDrop
                      }
                      onDrop={(event) =>
                        handleDrop(
                          event,
                          index
                        )
                      }
                      role="button"
                      tabIndex={0}
                    >
                      {placedTerm ? (
                        <span className="placed-term">
                          {placedTerm.label}
                        </span>
                      ) : (
                        <span className="drop-placeholder">
                          {selectedTerm
                            ? "Tap here to place"
                            : "Drop answer here"}
                        </span>
                      )}
                    </div>

                    <div className="pathway-description">
                      {step.description}
                    </div>
                  </div>
                );
              }
            )}

            <div className="pathway-arrow">
              ↓
            </div>

            <div className="pathway-finish">
              2 PYRUVATE
            </div>

            <div className="recall-controls">
              <button
                className="primary-button"
                onClick={
                  checkPathway
                }
                disabled={
                  lives <= 0
                }
              >
                Check Pathway
              </button>
            </div>

            <p className="recall-tip">
              💡 Tip: Think about oxidation,
              phosphorylation and
              substrate-level phosphorylation.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // RESULT SCREEN
  // =====================================================

  if (stage === "result") {
    const passed =
      score === terms.length &&
      lives > 0;

    return (
      <main
        className="result-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
        }}
      >
        <div className="result-card">
          {passed ? (
            <>
              <div className="result-icon">
                🏆
              </div>

              <span className="badge">
                LEVEL COMPLETE
              </span>

              <h1>
                Energy Payoff Mastered!
              </h1>

              <p>
                Excellent work. You successfully
                built the payoff phase of
                glycolysis.
              </p>

              <div className="result-stats">
                <div>
                  <strong>
                    {score}/{terms.length}
                  </strong>

                  <span>
                    Pathway
                  </span>
                </div>

                <div>
                  <strong>
                    {"❤️".repeat(lives)}
                  </strong>

                  <span>
                    Lives Remaining
                  </span>
                </div>
              </div>

              <div className="result-summary">
                <h3>
                  What you should remember
                </h3>

                <ul>
                  <li>
                    G3P is oxidized.
                  </li>

                  <li>
                    NAD⁺ is reduced to NADH.
                  </li>

                  <li>
                    ATP is produced by
                    substrate-level
                    phosphorylation.
                  </li>

                  <li>
                    PEP is a high-energy
                    intermediate.
                  </li>

                  <li>
                    Glycolysis ends with
                    pyruvate.
                  </li>

                  <li>
                    The net gain is 2 ATP
                    per glucose.
                  </li>
                </ul>
              </div>

              <button
                className="primary-button large-button"
                onClick={() =>
                  setStage("flashcards")
                }
              >
                Review Flashcards →
              </button>
            </>
          ) : (
            <>
              <div className="result-icon">
                💔
              </div>

              <span className="badge">
                TRY AGAIN
              </span>

              <h1>
                The Pathway Was Not Completed
              </h1>

              <p>
                Don't worry. Go back through
                the lesson and try the recall
                challenge again.
              </p>

              <div className="result-stats">
                <div>
                  <strong>
                    {score}/{terms.length}
                  </strong>

                  <span>
                    Correct
                  </span>
                </div>

                <div>
                  <strong>
                    0
                  </strong>

                  <span>
                    Lives Remaining
                  </span>
                </div>
              </div>

              <button
                className="primary-button large-button"
                onClick={
                  retryLevel
                }
              >
                ↻ Try Level Again
              </button>
            </>
          )}
        </div>
      </main>
    );
  }

  // =====================================================
  // FLASHCARDS
  // =====================================================

  if (stage === "flashcards") {
    const card =
      flashcards[currentCard];

    return (
      <main
        className="flashcard-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
        }}
      >
        <div className="flashcard-header">
          <span className="badge">
            LEVEL 4 REVIEW
          </span>

          <h1>
            Energy Payoff Flashcards
          </h1>

          <p>
            Strengthen your memory before
            continuing.
          </p>
        </div>

        <div className="flashcard-progress">
          Card {currentCard + 1} of{" "}
          {flashcards.length}
        </div>

        <div className="flashcard">
          <span className="flashcard-label">
            QUESTION
          </span>

          <h2>
            {card.question}
          </h2>

          {showAnswer ? (
            <div className="flashcard-answer">
              <span>
                ANSWER
              </span>

              <p>
                {card.answer}
              </p>
            </div>
          ) : (
            <button
              className="primary-button"
              onClick={() =>
                setShowAnswer(true)
              }
            >
              Reveal Answer
            </button>
          )}
        </div>

        {showAnswer && (
          <button
            className="primary-button large-button"
            onClick={nextCard}
          >
            {currentCard ===
            flashcards.length - 1
              ? "Complete Level 4 ✓"
              : "Next Flashcard →"}
          </button>
        )}
      </main>
    );
  }

  return null;
}

export default Level4;
