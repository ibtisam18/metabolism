import { useState, useRef, useEffect } from "react";

const terms = [
  {
    id: "hexokinase",
    label: "Hexokinase",
    correct: 0,
  },
  {
    id: "atp1",
    label: "ATP",
    correct: 1,
  },
  {
    id: "g6p",
    label: "Glucose-6-phosphate",
    correct: 2,
  },
  {
    id: "phosphoglucoseIsomerase",
    label: "Phosphoglucose isomerase",
    correct: 3,
  },
  {
    id: "f6p",
    label: "Fructose-6-phosphate",
    correct: 4,
  },
  {
    id: "pfk1",
    label: "Phosphofructokinase-1 (PFK-1)",
    correct: 5,
  },
  {
    id: "atp2",
    label: "ATP",
    correct: 6,
  },
  {
    id: "f16bp",
    label: "Fructose-1,6-bisphosphate",
    correct: 7,
  },
];

const pathway = [
  {
    title: "Hexokinase",
    description:
      "Catalyzes phosphorylation of glucose at the beginning of glycolysis.",
  },
  {
    title: "ATP",
    description:
      "Provides the phosphate group for the first energy-investment reaction.",
  },
  {
    title: "Glucose-6-phosphate",
    description:
      "The product formed after glucose is phosphorylated.",
  },
  {
    title: "Phosphoglucose isomerase",
    description:
      "Catalyzes the rearrangement of glucose-6-phosphate to fructose-6-phosphate.",
  },
  {
    title: "Fructose-6-phosphate",
    description:
      "The six-carbon sugar phosphate that is phosphorylated in the next energy-investment step.",
  },
  {
    title: "Phosphofructokinase-1 (PFK-1)",
    description:
      "Catalyzes the second phosphorylation reaction of glycolysis.",
  },
  {
    title: "ATP",
    description:
      "Provides the phosphate group for the second energy-investment reaction.",
  },
  {
    title: "Fructose-1,6-bisphosphate",
    description:
      "The end product of this energy-investment stage and the molecule that will be split in the next stage.",
  },
];

const flashcards = [
  {
    question:
      "What is the starting molecule of glycolysis?",
    answer:
      "Glucose.",
  },
  {
    question:
      "Which enzyme catalyzes the first step of glycolysis?",
    answer:
      "Hexokinase phosphorylates glucose to form glucose-6-phosphate.",
  },
  {
    question:
      "What does ATP do in the first phosphorylation step?",
    answer:
      "ATP donates a phosphate group to glucose and is converted to ADP.",
  },
  {
    question:
      "What is glucose-6-phosphate converted into?",
    answer:
      "Glucose-6-phosphate is rearranged into fructose-6-phosphate by phosphoglucose isomerase.",
  },
  {
    question:
      "Which enzyme catalyzes the second phosphorylation step?",
    answer:
      "Phosphofructokinase-1 (PFK-1).",
  },
  {
    question:
      "What molecule provides the phosphate in the PFK-1 reaction?",
    answer:
      "ATP provides the phosphate group and is converted to ADP.",
  },
  {
    question:
      "What is the final product of the energy-investment phase?",
    answer:
      "Fructose-1,6-bisphosphate.",
  },
  {
    question:
      "How many ATP molecules are invested before fructose-1,6-bisphosphate is formed?",
    answer:
      "Two ATP molecules are invested: one during the hexokinase step and one during the PFK-1 step.",
  },
  {
    question:
      "What happens to fructose-1,6-bisphosphate next?",
    answer:
      "It is ready to be split into two three-carbon molecules in the next stage of glycolysis.",
  },
];

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

function Level2({
  setScreen,
  setLevel2Passed,
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

  /*
  =========================================================
  DRAG AUTO-SCROLL
  =========================================================
  This is mainly useful on computers.
  Phones use tap-to-place instead.
  */

  const gameAreaRef = useRef(null);

  const dragScrollRef = useRef(null);

  const dragMouseYRef = useRef(null);

  useEffect(() => {
    const handleDragOver = (event) => {
      if (
        !gameAreaRef.current ||
        lives <= 0
      ) {
        return;
      }

      dragMouseYRef.current =
        event.clientY;

      const gameArea =
        gameAreaRef.current;

      const rect =
        gameArea.getBoundingClientRect();

      const edgeSize = 110;

      const scrollSpeed = 10;

      const distanceFromTop =
        event.clientY - rect.top;

      const distanceFromBottom =
        rect.bottom - event.clientY;

      let direction = 0;

      if (
        distanceFromTop >= 0 &&
        distanceFromTop < edgeSize
      ) {
        direction = -1;
      } else if (
        distanceFromBottom >= 0 &&
        distanceFromBottom < edgeSize
      ) {
        direction = 1;
      }

      if (
        direction !== 0 &&
        !dragScrollRef.current
      ) {
        const scroll = () => {
          if (
            !gameAreaRef.current ||
            dragMouseYRef.current === null
          ) {
            dragScrollRef.current =
              null;

            return;
          }

          const currentRect =
            gameAreaRef.current.getBoundingClientRect();

          const y =
            dragMouseYRef.current;

          const topDistance =
            y - currentRect.top;

          const bottomDistance =
            currentRect.bottom - y;

          let currentDirection = 0;

          if (
            topDistance >= 0 &&
            topDistance < edgeSize
          ) {
            currentDirection = -1;
          } else if (
            bottomDistance >= 0 &&
            bottomDistance < edgeSize
          ) {
            currentDirection = 1;
          }

          if (
            currentDirection !== 0
          ) {
            gameAreaRef.current.scrollTop +=
              currentDirection *
              scrollSpeed;

            dragScrollRef.current =
              requestAnimationFrame(
                scroll
              );
          } else {
            dragScrollRef.current =
              null;
          }
        };

        dragScrollRef.current =
          requestAnimationFrame(scroll);
      } else if (
        direction === 0 &&
        dragScrollRef.current
      ) {
        cancelAnimationFrame(
          dragScrollRef.current
        );

        dragScrollRef.current =
          null;
      }
    };

    const stopDragScroll = () => {
      dragMouseYRef.current =
        null;

      if (dragScrollRef.current) {
        cancelAnimationFrame(
          dragScrollRef.current
        );

        dragScrollRef.current =
          null;
      }
    };

    document.addEventListener(
      "dragover",
      handleDragOver
    );

    document.addEventListener(
      "dragend",
      stopDragScroll
    );

    document.addEventListener(
      "drop",
      stopDragScroll
    );

    return () => {
      document.removeEventListener(
        "dragover",
        handleDragOver
      );

      document.removeEventListener(
        "dragend",
        stopDragScroll
      );

      document.removeEventListener(
        "drop",
        stopDragScroll
      );

      stopDragScroll();
    };
  }, [lives]);

  /*
  =========================================================
  LESSON CONTENT
  =========================================================
  */

  const lessonSections = [
    {
      title:
        "Glucose Starts Glycolysis",

      content: (
        <>
          <p>
            Glycolysis begins with
            <strong> glucose</strong>, a
            six-carbon sugar.
          </p>

          <p>
            Before glucose can be broken down
            later in the pathway, the cell first
            invests energy to prepare it.
          </p>

          <div className="lesson-highlight">
            <strong>
              Glucose is the starting molecule
              of glycolysis.
            </strong>
          </div>
        </>
      ),
    },

    {
      title:
        "Hexokinase Acts on Glucose",

      content: (
        <>
          <p>
            The first reaction is catalyzed by
            the enzyme
            <strong> hexokinase</strong>.
          </p>

          <p>
            Hexokinase transfers a phosphate
            group to glucose. This is called
            phosphorylation.
          </p>

          <div className="lesson-flow">
            Glucose + ATP
            <br />
            ↓
            <br />
            Glucose-6-phosphate + ADP
          </div>

          <p>
            This first phosphorylation uses one
            ATP molecule.
          </p>
        </>
      ),
    },

    {
      title:
        "Glucose-6-phosphate Is Rearranged",

      content: (
        <>
          <p>
            Glucose-6-phosphate is then
            rearranged into
            <strong>
              {" "}
              fructose-6-phosphate
            </strong>
            .
          </p>

          <p>
            The enzyme responsible for this
            rearrangement is
            <strong>
              {" "}
              phosphoglucose isomerase
            </strong>
            .
          </p>

          <div className="lesson-flow">
            Glucose-6-phosphate
            <br />
            ↓
            <br />
            Fructose-6-phosphate
          </div>

          <div className="lesson-highlight">
            <strong>
              No second ATP is used during this
              rearrangement step.
            </strong>
          </div>
        </>
      ),
    },

    {
      title:
        "PFK-1 Acts on Fructose-6-phosphate",

      content: (
        <>
          <p>
            The next major energy-investment
            step is catalyzed by
            <strong>
              {" "}
              phosphofructokinase-1 (PFK-1)
            </strong>
            .
          </p>

          <p>
            PFK-1 transfers another phosphate
            group to fructose-6-phosphate.
          </p>

          <div className="lesson-flow">
            Fructose-6-phosphate + ATP
            <br />
            ↓
            <br />
            Fructose-1,6-bisphosphate + ADP
          </div>

          <p>
            This is the second ATP investment
            in glycolysis.
          </p>
        </>
      ),
    },

    {
      title:
        "Fructose-1,6-bisphosphate Is Formed",

      content: (
        <>
          <p>
            After the second phosphorylation,
            the pathway has formed
            <strong>
              {" "}
              fructose-1,6-bisphosphate
            </strong>
            .
          </p>

          <div className="lesson-highlight">
            <strong>
              Fructose-1,6-bisphosphate is the
              end product of this
              energy-investment stage.
            </strong>
          </div>

          <p>
            Two ATP molecules have been invested
            so far: one during the hexokinase
            reaction and one during the PFK-1
            reaction.
          </p>

          <p>
            The molecule is now prepared for
            the next stage, where it will be
            split into two three-carbon
            molecules.
          </p>
        </>
      ),
    },

    {
      title:
        "The Whole Energy-Investment Pathway",

      content: (
        <>
          <p>
            Put the main steps together:
          </p>

          <div className="lesson-flow">
            Glucose
            <br />
            ↓ Hexokinase + ATP
            <br />
            Glucose-6-phosphate
            <br />
            ↓ Phosphoglucose isomerase
            <br />
            Fructose-6-phosphate
            <br />
            ↓ PFK-1 + ATP
            <br />
            <strong>
              Fructose-1,6-bisphosphate
            </strong>
          </div>

          <div className="lesson-highlight">
            <strong>
              2 ATP are invested before
              fructose-1,6-bisphosphate is
              formed.
            </strong>
          </div>
        </>
      ),
    },
  ];

  /*
  =========================================================
  LESSON NAVIGATION
  =========================================================
  */

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

  /*
  =========================================================
  START RECALL
  =========================================================
  */

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

  /*
  =========================================================
  DESKTOP DRAG START
  =========================================================
  */

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

    setSelectedTerm(termId);
  }

  /*
  =========================================================
  MOBILE TAP SELECTION
  =========================================================
  */

  function handleTermClick(termId) {
    if (lives <= 0) {
      return;
    }

    const alreadyPlaced =
      Object.values(
        placedTerms
      ).includes(termId);

    if (alreadyPlaced) {
      return;
    }

    setSelectedTerm(termId);

    setDropFeedback({
      type: "correct",
      message:
        "Answer selected! Now tap the space where it belongs.",
    });

    setTimeout(() => {
      setDropFeedback(null);
    }, 1500);
  }

  /*
  =========================================================
  DRAG OVER
  =========================================================
  */

  function allowDrop(event) {
    event.preventDefault();

    if (lives <= 0) {
      return;
    }

    event.dataTransfer.dropEffect =
      "move";
  }

  /*
  =========================================================
  HANDLE ANSWER
  =========================================================
  */

  function placeTerm(
    termId,
    index
  ) {
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

    /*
    ===============================
    CORRECT
    ===============================
    */

    if (term.correct === index) {
      setPlacedTerms(
        (previous) => ({
          ...previous,
          [index]: termId,
        })
      );

      setScore(
        (previous) =>
          previous + 1
      );

      setSelectedTerm(null);

      setDropFeedback({
        type: "correct",
        message:
          "Correct! Keep going.",
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1200);
    }

    /*
    ===============================
    WRONG
    ===============================
    */

    else {
      const newLives =
        lives - 1;

      setLives(newLives);

      setSelectedTerm(null);

      setDropFeedback({
        type: "wrong",
        message:
          "Not quite. Think about the order of the energy-investment steps.",
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
  }

  /*
  =========================================================
  DESKTOP DROP
  =========================================================
  */

  function handleDrop(
    event,
    index
  ) {
    event.preventDefault();

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

  /*
  =========================================================
  MOBILE TAP DROP
  =========================================================
  */

  function handleTapDrop(index) {
    if (lives <= 0) {
      return;
    }

    if (placedTerms[index]) {
      return;
    }

    if (!selectedTerm) {
      setDropFeedback({
        type: "wrong",
        message:
          "Tap an answer first, then tap a space.",
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1500);

      return;
    }

    placeTerm(
      selectedTerm,
      index
    );
  }

  /*
  =========================================================
  CHECK PATHWAY
  =========================================================
  */

  function checkPathway() {
    if (
      score === terms.length
    ) {
      setStage("result");
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

  /*
  =========================================================
  RETRY
  =========================================================
  */

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

  /*
  =========================================================
  COMPLETE LEVEL
  =========================================================
  */

  function completeLevel() {
    if (setLevel2Passed) {
      setLevel2Passed(true);
    }

    setScreen("levels");
  }

  /*
  =========================================================
  FLASHCARDS
  =========================================================
  */

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

  /*
  =========================================================
  LESSON SCREEN
  =========================================================
  */

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
          overflowY: "auto",
          overflowX: "hidden",
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
            LEVEL 2
          </span>

          <h1>
            Glucose →
            Fructose-1,6-bisphosphate
          </h1>

          <p>
            Follow the energy-investment phase
            of glycolysis from glucose to
            fructose-1,6-bisphosphate.
          </p>

        </div>

        <div className="lesson-progress">

          <div
            className="lesson-progress-fill"
            style={{
              width:
                `${((lessonSection + 1) /
                  lessonSections.length) *
                  100}%`,
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

  /*
  =========================================================
  RECALL SCREEN
  =========================================================
  */

  if (stage === "recall") {

    return (
      <main
        className="recall-page"
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "80px",
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
            LEVEL 2 RECALL
          </span>

          <h1>
            Build the Energy-Investment Phase
          </h1>

          <p>
            <strong>
              📱 Phone:
            </strong>{" "}
            Tap an answer, then tap the space
            where it belongs.
            <br />
            <strong>
              💻 Computer:
            </strong>{" "}
            You can drag the answers.
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
            ENTIRE GAME AREA
        ================================================= */}

        <div
          ref={gameAreaRef}
          className="drag-game level2-drag-game"
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            alignItems: "flex-start",
            maxHeight: "75vh",
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling:
              "touch",
          }}
        >

          {/* =================================================
              TERM BANK
          ================================================= */}

          <section
            className="term-bank"
            style={{
              maxHeight: "none",
              overflowY: "visible",
              overflowX: "visible",
            }}
          >

            <h2>
              Choose an Answer
            </h2>

            <p>
              Tap an answer first, then tap
              the matching space.
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

                  return (
                    <div
                      key={term.id}

                      className={`draggable-term ${
                        alreadyPlaced
                          ? "term-used"
                          : ""
                      } ${
                        selectedTerm ===
                        term.id
                          ? "term-selected"
                          : ""
                      }`}

                      draggable={
                        !alreadyPlaced &&
                        lives > 0
                      }

                      onDragStart={(
                        event
                      ) =>
                        handleDragStart(
                          event,
                          term.id
                        )
                      }

                      onClick={() =>
                        handleTermClick(
                          term.id
                        )
                      }

                      role="button"

                      tabIndex={
                        alreadyPlaced
                          ? -1
                          : 0
                      }

                      aria-pressed={
                        selectedTerm ===
                        term.id
                      }
                    >

                      {term.label}

                    </div>
                  );
                }
              )}

            </div>

          </section>

          {/* =================================================
              PATHWAY
          ================================================= */}

          <section
            className="pathway-box"
            style={{
              maxHeight: "none",
              overflowY: "visible",
              overflowX: "visible",
            }}
          >

            <h2 className="pathway-title">
              Glycolysis — Energy Investment
            </h2>

            {/* FIXED STARTING MOLECULE */}

            <div className="pathway-start">
              GLUCOSE
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
                        selectedTerm &&
                        !placedTerm
                          ? "drop-zone-ready"
                          : ""
                      }`}

                      onDragOver={
                        allowDrop
                      }

                      onDrop={(event) =>
                        handleDrop(
                          event,
                          index
                        )
                      }

                      onClick={() =>
                        handleTapDrop(
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
                            ? "Tap here to place selected answer"
                            : "Tap an answer first"}

                        </span>

                      )}

                    </div>

                    <div className="pathway-description">

                      <strong>
                        {step.title}
                      </strong>

                      <br />

                      {step.description}

                    </div>

                  </div>
                );
              }
            )}

            <div className="pathway-arrow">
              ↓
            </div>

            {/* FIXED END PRODUCT */}

            <div className="pathway-finish">
              FRUCTOSE-1,6-BISPHOSPHATE
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
              💡 There are two ATP
              investments. Think about which
              enzyme acts before each one.
            </p>

          </section>

        </div>

      </main>
    );
  }

  /*
  =========================================================
  RESULT SCREEN
  =========================================================
  */

  if (stage === "result") {

    const passed =
      score === terms.length &&
      lives > 0;

    return (
      <main
        className="result-page"
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "80px",
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
                Energy Investment Mastered!
              </h1>

              <p>
                Excellent work. You followed
                glycolysis from glucose to
                fructose-1,6-bisphosphate.
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
                    Glucose starts glycolysis.
                  </li>

                  <li>
                    Hexokinase catalyzes the
                    first phosphorylation.
                  </li>

                  <li>
                    Glucose-6-phosphate is
                    rearranged to
                    fructose-6-phosphate.
                  </li>

                  <li>
                    PFK-1 catalyzes the second
                    phosphorylation.
                  </li>

                  <li>
                    Two ATP molecules are
                    invested.
                  </li>

                  <li>
                    Fructose-1,6-bisphosphate
                    is formed at the end of
                    this stage.
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

  /*
  =========================================================
  FLASHCARDS
  =========================================================
  */

  if (stage === "flashcards") {

    const card =
      flashcards[currentCard];

    return (
      <main
        className="flashcard-page"
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "80px",
        }}
      >

        <div className="flashcard-header">

          <span className="badge">
            LEVEL 2 REVIEW
          </span>

          <h1>
            Glucose →
            Fructose-1,6-bisphosphate
          </h1>

          <p>
            Review the energy-investment
            phase before continuing.
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
              ? "Complete Level 2 ✓"
              : "Next Flashcard →"}
          </button>

        )}

      </main>
    );
  }

  return null;
}

export default Level2;
