import { useState, useRef, useEffect } from "react";

// =====================================================
// LEVEL 3
// SPLIT THE MOLECULE
// =====================================================

function Level3({ setScreen, setLevel3Passed }) {
  // =====================================================
  // LEVEL 3 STAGES
  // =====================================================

  const [stage, setStage] = useState("lesson");

  const [lessonStep, setLessonStep] =
    useState(0);

  const [lives, setLives] =
    useState(3);

  const [flashcardNumber, setFlashcardNumber] =
    useState(0);

  const [showAnswer, setShowAnswer] =
    useState(false);

  // =====================================================
  // RECALL STATE
  // =====================================================

  const [draggedTerm, setDraggedTerm] =
    useState(null);

  const [selectedTerm, setSelectedTerm] =
    useState(null);

  const [placedTerms, setPlacedTerms] =
    useState({
      f16bp: null,
      aldolase: null,
      dhap: null,
      g3pFirst: null,
      trioseIsomerase: null,
      g3pSecond: null,
      twoG3P: null,
    });

  const [recallScore, setRecallScore] =
    useState(0);

  const [wrongDrops, setWrongDrops] =
    useState(0);

  const [dropFeedback, setDropFeedback] =
    useState(null);

  // =====================================================
  // LEVEL 3 GAME CARD AUTO-SCROLL
  // =====================================================

  const gameAreaRef = useRef(null);

  const dragScrollRef = useRef(null);

  const dragMouseYRef = useRef(null);

  useEffect(() => {
    const game = gameAreaRef.current;

    if (game) {
      game.style.setProperty(
        "height",
        "75vh",
        "important"
      );

      game.style.setProperty(
        "max-height",
        "75vh",
        "important"
      );

      game.style.setProperty(
        "overflow-y",
        "auto",
        "important"
      );

      game.style.setProperty(
        "overflow-x",
        "hidden",
        "important"
      );
    }

    const stopDragScroll = () => {
      if (dragScrollRef.current) {
        cancelAnimationFrame(
          dragScrollRef.current
        );

        dragScrollRef.current = null;
      }
    };

    const scrollGameCard = () => {
      const game =
        gameAreaRef.current;

      if (
        !game ||
        lives <= 0 ||
        dragMouseYRef.current === null
      ) {
        dragScrollRef.current = null;
        return;
      }

      const rect =
        game.getBoundingClientRect();

      const mouseY =
        dragMouseYRef.current;

      const edge = 140;

      const speed = 12;

      let direction = 0;

      if (
        mouseY >= rect.top &&
        mouseY <= rect.top + edge
      ) {
        direction = -1;
      } else if (
        mouseY >=
          rect.bottom - edge &&
        mouseY <= rect.bottom
      ) {
        direction = 1;
      }

      if (direction === 0) {
        dragScrollRef.current = null;
        return;
      }

      const maxScroll = Math.max(
        0,
        game.scrollHeight -
          game.clientHeight
      );

      const nextScrollTop =
        Math.max(
          0,
          Math.min(
            maxScroll,
            game.scrollTop +
              direction * speed
          )
        );

      game.scrollTop =
        nextScrollTop;

      if (
        (direction < 0 &&
          game.scrollTop > 0) ||
        (direction > 0 &&
          game.scrollTop < maxScroll)
      ) {
        dragScrollRef.current =
          requestAnimationFrame(
            scrollGameCard
          );
      } else {
        dragScrollRef.current = null;
      }
    };

    const handleDragOverPage = (
      event
    ) => {
      if (
        !gameAreaRef.current ||
        lives <= 0
      ) {
        return;
      }

      const rect =
        gameAreaRef.current.getBoundingClientRect();

      if (
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        stopDragScroll();

        dragMouseYRef.current =
          null;

        return;
      }

      dragMouseYRef.current =
        event.clientY;

      if (!dragScrollRef.current) {
        dragScrollRef.current =
          requestAnimationFrame(
            scrollGameCard
          );
      }
    };

    const stopDrag = () => {
      dragMouseYRef.current =
        null;

      stopDragScroll();
    };

    document.addEventListener(
      "dragover",
      handleDragOverPage
    );

    document.addEventListener(
      "dragend",
      stopDrag
    );

    document.addEventListener(
      "drop",
      stopDrag
    );

    return () => {
      document.removeEventListener(
        "dragover",
        handleDragOverPage
      );

      document.removeEventListener(
        "dragend",
        stopDrag
      );

      document.removeEventListener(
        "drop",
        stopDrag
      );

      stopDrag();
    };
  }, [lives]);

  // =====================================================
  // LESSON CONTENT
  // =====================================================

  const lessons = [
    {
      title:
        "The Six-Carbon Molecule Is Ready",

      icon: "🍬",

      text:
        "After the energy investment phase, fructose-1,6-bisphosphate contains six carbon atoms and two phosphate groups. The molecule is now ready to be split into smaller molecules.",

      keyPoint:
        "Fructose-1,6-bisphosphate is the six-carbon molecule that is split in this stage.",
    },

    {
      title:
        "Aldolase Splits the Molecule",

      icon: "✂️",

      text:
        "Aldolase catalyzes the cleavage of fructose-1,6-bisphosphate into two different three-carbon phosphate molecules: dihydroxyacetone phosphate (DHAP) and glyceraldehyde-3-phosphate (G3P).",

      keyPoint:
        "Aldolase splits one six-carbon molecule into two three-carbon molecules.",
    },

    {
      title:
        "DHAP and G3P",

      icon: "🧩",

      text:
        "The two products of aldolase are DHAP and G3P. Only G3P can continue directly through the payoff phase of glycolysis.",

      keyPoint:
        "G3P can continue directly, while DHAP must first be converted.",
    },

    {
      title:
        "Triose Phosphate Isomerase",

      icon: "🔄",

      text:
        "Triose phosphate isomerase converts DHAP into G3P. This allows both three-carbon products from the cleavage step to continue through glycolysis as G3P.",

      keyPoint:
        "DHAP → G3P",
    },

    {
      title:
        "Two G3P Molecules Continue",

      icon: "🚀",

      text:
        "Because one glucose molecule produced two three-carbon molecules, and DHAP is converted to G3P, two G3P molecules continue into the energy payoff phase.",

      keyPoint:
        "One glucose ultimately produces two G3P molecules for the payoff phase.",
    },

    {
      title:
        "Why This Step Matters",

      icon: "⚡",

      text:
        "The splitting of the six-carbon molecule creates the two three-carbon molecules that will later generate ATP and NADH during the payoff phase.",

      keyPoint:
        "The pathway changes from one six-carbon molecule to two three-carbon molecules.",
    },
  ];

  // =====================================================
  // RECALL TERMS
  // =====================================================

  const terms = [
    {
      id: "f16bp",
      label:
        "Fructose-1,6-bisphosphate",
    },

    {
      id: "aldolase",
      label: "Aldolase",
    },

    {
      id: "dhap",
      label: "DHAP",
    },

    {
      id: "g3pFirst",
      label: "G3P",
    },

    {
      id: "trioseIsomerase",
      label:
        "Triose phosphate isomerase",
    },

    {
      id: "g3pSecond",
      label: "G3P",
    },

    {
      id: "twoG3P",
      label: "2 G3P",
    },
  ];

  // =====================================================
  // SHUFFLE TERMS
  // =====================================================

  function shuffleArray(array) {
    const shuffled = [...array];

    for (
      let i = shuffled.length - 1;
      i > 0;
      i--
    ) {
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

  const [
    shuffledTerms,
    setShuffledTerms,
  ] = useState(() =>
    shuffleArray(terms)
  );

  // =====================================================
  // CORRECT ANSWERS
  // =====================================================

  const correctAnswers = {
    f16bp: "f16bp",

    aldolase:
      "aldolase",

    dhap:
      "dhap",

    g3pFirst:
      "g3pFirst",

    trioseIsomerase:
      "trioseIsomerase",

    g3pSecond:
      "g3pSecond",

    twoG3P:
      "twoG3P",
  };

  // =====================================================
  // LESSON NAVIGATION
  // =====================================================

  function nextLesson() {
    if (
      lessonStep <
      lessons.length - 1
    ) {
      setLessonStep(
        lessonStep + 1
      );
    } else {
      setStage("recall");
    }
  }

  function previousLesson() {
    if (lessonStep > 0) {
      setLessonStep(
        lessonStep - 1
      );
    }
  }

  // =====================================================
  // DESKTOP DRAG START
  // =====================================================

  function handleDragStart(
    event,
    termId
  ) {
    if (lives <= 0) {
      return;
    }

    setDraggedTerm(termId);

    setSelectedTerm(termId);

    event.dataTransfer.setData(
      "text/plain",
      termId
    );

    event.dataTransfer.effectAllowed =
      "move";
  }

  // =====================================================
  // MOBILE TAP SELECTION
  // =====================================================

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

  // =====================================================
  // DRAG OVER
  // =====================================================

  function handleDragOver(event) {
    event.preventDefault();

    if (lives <= 0) {
      return;
    }

    event.dataTransfer.dropEffect =
      "move";
  }

  // =====================================================
  // PLACE TERM
  // =====================================================

  function placeTerm(
    termId,
    slotId
  ) {
    if (lives <= 0) {
      return;
    }

    if (placedTerms[slotId]) {
      setDropFeedback({
        type: "wrong",
        message:
          "⚠️ This space is already filled.",
      });

      return;
    }

    const selectedTerm =
      terms.find(
        (term) =>
          term.id === termId
      );

    if (!selectedTerm) {
      return;
    }

    // =================================================
    // G3P TERMS
    // =================================================

    const isG3PSlot =
      slotId === "g3pFirst" ||
      slotId === "g3pSecond";

    const isG3PTerm =
      termId === "g3pFirst" ||
      termId === "g3pSecond";

    const isCorrectPlacement =
      (isG3PSlot &&
        isG3PTerm) ||
      correctAnswers[slotId] ===
        termId;

    // =================================================
    // CORRECT
    // =================================================

    if (isCorrectPlacement) {
      setPlacedTerms(
        (previous) => ({
          ...previous,
          [slotId]: termId,
        })
      );

      setRecallScore(
        (previous) =>
          previous + 1
      );

      setSelectedTerm(null);

      setDraggedTerm(null);

      setDropFeedback({
        type: "correct",
        message:
          `✅ Correct! ${selectedTerm.label} belongs here.`,
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1200);

      return;
    }

    // =================================================
    // WRONG
    // =================================================

    const newLives =
      lives - 1;

    setLives(newLives);

    setWrongDrops(
      (previous) =>
        previous + 1
    );

    setSelectedTerm(null);

    setDraggedTerm(null);

    setDropFeedback({
      type: "wrong",
      message:
        `❌ Wrong! ${selectedTerm.label} does not belong in this space.`,
    });

    setTimeout(() => {
      setDropFeedback(null);
    }, 1500);

    // =================================================
    // GAME OVER
    // =================================================

    if (newLives <= 0) {
      setTimeout(() => {
        setStage("result");
      }, 1000);
    }
  }

  // =====================================================
  // DESKTOP DROP
  // =====================================================

  function handleDrop(
    event,
    slotId
  ) {
    event.preventDefault();

    const termId =
      event.dataTransfer.getData(
        "text/plain"
      ) || draggedTerm;

    if (!termId) {
      return;
    }

    placeTerm(
      termId,
      slotId
    );
  }

  // =====================================================
  // MOBILE TAP DROP
  // =====================================================

  function handleTapDrop(slotId) {
    if (lives <= 0) {
      return;
    }

    if (placedTerms[slotId]) {
      setDropFeedback({
        type: "wrong",
        message:
          "⚠️ This space is already filled.",
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1200);

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
      slotId
    );
  }

  // =====================================================
  // RESET RECALL
  // =====================================================

  function resetRecall() {
    setPlacedTerms({
      f16bp: null,
      aldolase: null,
      dhap: null,
      g3pFirst: null,
      trioseIsomerase: null,
      g3pSecond: null,
      twoG3P: null,
    });

    setRecallScore(0);

    setWrongDrops(0);

    setLives(3);

    setDraggedTerm(null);

    setSelectedTerm(null);

    setDropFeedback(null);

    setShuffledTerms(
      shuffleArray(terms)
    );
  }

  // =====================================================
  // CHECK PATHWAY
  // =====================================================

  function checkRecall() {
    if (lives <= 0) {
      return;
    }

    const completed =
      Object.values(
        placedTerms
      ).filter(Boolean).length;

    if (
      completed < terms.length
    ) {
      setDropFeedback({
        type: "wrong",
        message:
          "⚠️ Complete every space before checking the pathway.",
      });

      setTimeout(() => {
        setDropFeedback(null);
      }, 1800);

      return;
    }

    setStage("result");
  }

  // =====================================================
  // COMPLETE LEVEL
  // =====================================================

  function completeLevel() {
    setLevel3Passed(true);

    setScreen("levels");
  }

  // =====================================================
  // RETRY LEVEL
  // =====================================================

  function retryLevel() {
    setStage("lesson");

    setLessonStep(0);

    setLives(3);

    setFlashcardNumber(0);

    setShowAnswer(false);

    resetRecall();
  }

  // =====================================================
  // FLASHCARDS
  // =====================================================

  const flashcards = [
    {
      question:
        "Which enzyme splits fructose-1,6-bisphosphate?",

      answer:
        "Aldolase.",
    },

    {
      question:
        "What two molecules are produced when fructose-1,6-bisphosphate is split?",

      answer:
        "DHAP and glyceraldehyde-3-phosphate (G3P).",
    },

    {
      question:
        "Which three-carbon molecule can continue directly through the payoff phase?",

      answer:
        "Glyceraldehyde-3-phosphate (G3P).",
    },

    {
      question:
        "What happens to DHAP?",

      answer:
        "DHAP is converted into G3P by triose phosphate isomerase.",
    },

    {
      question:
        "How many G3P molecules continue into the payoff phase per glucose?",

      answer:
        "Two G3P molecules.",
    },

    {
      question:
        "Why does glycolysis produce two G3P molecules from one glucose?",

      answer:
        "One six-carbon molecule is split into two three-carbon molecules, and DHAP is converted into G3P.",
    },
  ];

  function nextFlashcard() {
    if (
      flashcardNumber <
      flashcards.length - 1
    ) {
      setFlashcardNumber(
        flashcardNumber + 1
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
    const lesson =
      lessons[lessonStep];

    return (
      <main
        className="level-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
        }}
      >

        <div className="level-top">

          <button
            className="back-button"
            onClick={() =>
              setScreen("levels")
            }
          >
            ← Back to Levels
          </button>

          <span className="badge">
            LEVEL 3 • SPLIT THE MOLECULE
          </span>

          <span className="lesson-counter">
            {lessonStep + 1} /{" "}
            {lessons.length}
          </span>

        </div>

        <section className="learning-card big-card">

          <div className="big-icon">
            {lesson.icon}
          </div>

          <h2>
            {lesson.title}
          </h2>

          <p>
            {lesson.text}
          </p>

          <div className="key-point">

            <strong>
              KEY POINT
            </strong>

            <p>
              {lesson.keyPoint}
            </p>

          </div>

        </section>

        <div className="lesson-progress">

          <div
            className="lesson-progress-fill"
            style={{
              width:
                `${
                  ((lessonStep + 1) /
                    lessons.length) *
                  100
                }%`,
            }}
          ></div>

        </div>

        <div className="lesson-buttons">

          {lessonStep > 0 && (
            <button
              className="secondary-button"
              onClick={
                previousLesson
              }
            >
              ← Previous
            </button>
          )}

          <button
            className="primary-button"
            onClick={
              nextLesson
            }
          >
            {lessonStep ===
            lessons.length - 1
              ? "Start Recall Challenge →"
              : "Next →"}
          </button>

        </div>

      </main>
    );
  }

  // =====================================================
  // RECALL SCREEN
  // =====================================================

  if (stage === "recall") {

    const completedSlots =
      Object.values(
        placedTerms
      ).filter(Boolean).length;

    return (
      <main
        className="recall-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
          paddingBottom: "50px",
        }}
      >

        {/* HEADER */}

        <div className="recall-header">

          <button
            className="back-button"
            onClick={() =>
              setStage("lesson")
            }
          >
            ← Back to Lesson
          </button>

          <span className="badge">
            LEVEL 3 • RECALL CHALLENGE
          </span>

          <h2>
            Split the Molecule
          </h2>

          <p>
            <strong>
              📱 Phone:
            </strong>{" "}
            Tap an answer, then tap the
            space where it belongs.
            <br />
            <strong>
              💻 Computer:
            </strong>{" "}
            You can drag the answers.
          </p>

        </div>

        {/* STATS */}

        <div className="recall-stats">

          <div className="recall-stat">

            <span>
              ❤️ Lives
            </span>

            <strong>
              {lives}
            </strong>

          </div>

          <div className="recall-stat">

            <span>
              🧠 Correct
            </span>

            <strong>
              {recallScore} /{" "}
              {terms.length}
            </strong>

          </div>

          <div className="recall-stat">

            <span>
              📊 Progress
            </span>

            <strong>
              {completedSlots} /{" "}
              {terms.length}
            </strong>

          </div>

        </div>

        {/* FEEDBACK */}

        {dropFeedback && (
          <div
            className={`drop-feedback ${
              dropFeedback.type ===
              "correct"
                ? "feedback-correct"
                : "feedback-wrong"
            }`}
          >
            {dropFeedback.message}
          </div>
        )}

        {/* GAME */}

        <div
          ref={gameAreaRef}
          className="drag-game level3-drag-game"
          style={{
            width: "100%",
            alignItems:
              "flex-start",
            height: "75vh",
            maxHeight: "75vh",
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling:
              "touch",
          }}
        >

          {/* TERM BANK */}

          <section
            className="term-bank"
            style={{
              height: "auto",
              maxHeight: "none",
              overflow: "visible",
            }}
          >

            <h3>
              CHOOSE AN ANSWER
            </h3>

            <p className="drag-instruction">
              <strong>
                📱 Tap
              </strong>{" "}
              an answer first, then tap
              the matching space.
              <br />
              <strong>
                💻 Drag
              </strong>{" "}
              on a computer.
            </p>

            {shuffledTerms.map(
              (term) => {

                const alreadyPlaced =
                  Object.values(
                    placedTerms
                  ).includes(
                    term.id
                  );

                if (
                  alreadyPlaced
                ) {
                  return null;
                }

                return (
                  <button
                    key={term.id}
                    type="button"
                    className={`draggable-term ${
                      selectedTerm ===
                      term.id
                        ? "term-selected"
                        : ""
                    }`}
                    draggable={
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
                    onDragEnd={() =>
                      setDraggedTerm(
                        null
                      )
                    }
                    onClick={() =>
                      handleTermClick(
                        term.id
                      )
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

          </section>

          {/* PATHWAY */}

          <section
            className="pathway-box"
            style={{
              height: "auto",
              maxHeight: "none",
              overflow: "visible",
            }}
          >

            <h3 className="pathway-title">
              SPLIT THE MOLECULE
            </h3>

            {/* START */}

            <div className="pathway-start">
              START
            </div>

            {/* F16BP */}

            <DropZone
              slotId="f16bp"
              value={
                placedTerms.f16bp
              }
              label="Six-carbon sugar with two phosphate groups"
              terms={terms}
              onDrop={
                handleDrop
              }
              onDragOver={
                handleDragOver
              }
              onTap={
                handleTapDrop
              }
              selectedTerm={
                selectedTerm
              }
            />

            <div className="pathway-arrow">
              ↓
            </div>

            {/* ALDOLASE */}

            <DropZone
              slotId="aldolase"
              value={
                placedTerms.aldolase
              }
              label="Enzyme that cleaves the six-carbon sugar"
              terms={terms}
              onDrop={
                handleDrop
              }
              onDragOver={
                handleDragOver
              }
              onTap={
                handleTapDrop
              }
              selectedTerm={
                selectedTerm
              }
            />

            {/* SPLIT */}

            <div className="split-arrow">

              <div className="split-line">
                ↓
              </div>

              <span>
                MOLECULE SPLITS
              </span>

            </div>

            {/* BRANCHES */}

            <div className="branch-container">

              {/* LEFT BRANCH */}

              <div className="branch">

                <DropZone
                  slotId="dhap"
                  value={
                    placedTerms.dhap
                  }
                  label="Three-carbon phosphate"
                  terms={terms}
                  onDrop={
                    handleDrop
                  }
                  onDragOver={
                    handleDragOver
                  }
                  onTap={
                    handleTapDrop
                  }
                  selectedTerm={
                    selectedTerm
                  }
                />

                <div className="pathway-arrow">
                  ↓
                </div>

                <DropZone
                  slotId="trioseIsomerase"
                  value={
                    placedTerms.trioseIsomerase
                  }
                  label="Enzyme that converts DHAP"
                  terms={terms}
                  onDrop={
                    handleDrop
                  }
                  onDragOver={
                    handleDragOver
                  }
                  onTap={
                    handleTapDrop
                  }
                  selectedTerm={
                    selectedTerm
                  }
                />

                <div className="pathway-arrow">
                  ↓
                </div>

                <DropZone
                  slotId="g3pSecond"
                  value={
                    placedTerms.g3pSecond
                  }
                  label="Product formed from DHAP"
                  terms={terms}
                  onDrop={
                    handleDrop
                  }
                  onDragOver={
                    handleDragOver
                  }
                  onTap={
                    handleTapDrop
                  }
                  selectedTerm={
                    selectedTerm
                  }
                />

              </div>

              {/* RIGHT BRANCH */}

              <div className="branch">

                <DropZone
                  slotId="g3pFirst"
                  value={
                    placedTerms.g3pFirst
                  }
                  label="Three-carbon molecule produced directly"
                  terms={terms}
                  onDrop={
                    handleDrop
                  }
                  onDragOver={
                    handleDragOver
                  }
                  onTap={
                    handleTapDrop
                  }
                  selectedTerm={
                    selectedTerm
                  }
                />

              </div>

            </div>

            {/* JOIN */}

            <div className="join-arrow">
              ↓
            </div>

            {/* TWO G3P */}

            <DropZone
              slotId="twoG3P"
              value={
                placedTerms.twoG3P
              }
              label="Two three-carbon molecules enter the payoff phase"
              terms={terms}
              onDrop={
                handleDrop
              }
              onDragOver={
                handleDragOver
              }
              onTap={
                handleTapDrop
              }
              selectedTerm={
                selectedTerm
              }
            />

            {/* FINISH */}

            <div className="pathway-finish">
              READY FOR ENERGY PAYOFF
            </div>

            {/* CONTROLS */}

            <div className="recall-controls">

              <button
                className="secondary-button"
                onClick={
                  resetRecall
                }
              >
                ↻ Reset
              </button>

              <button
                className="primary-button"
                onClick={
                  checkRecall
                }
                disabled={
                  lives <= 0
                }
              >
                Check Pathway ✓
              </button>

            </div>

          </section>

        </div>

        {/* TIP */}

        <div className="recall-tip">

          💡{" "}
          <strong>
            Tip:
          </strong>{" "}
          Remember: one six-carbon
          molecule becomes two
          three-carbon molecules.

        </div>

      </main>
    );
  }

  // =====================================================
  // RESULT SCREEN
  // =====================================================

  if (stage === "result") {

    const passed =
      recallScore ===
        terms.length &&
      lives > 0;

    return (
      <main
        className="result-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
        }}
      >

        {passed ? (

          <section className="success-card">

            <div className="result-icon">
              🎉
            </div>

            <h2>
              Molecule Successfully Split!
            </h2>

            <p>
              Excellent! You correctly
              rebuilt the pathway from
              fructose-1,6-bisphosphate
              to two G3P molecules.
            </p>

            <div className="final-score">

              <strong>
                {recallScore} /{" "}
                {terms.length}
              </strong>

              <span>
                Correct placements
              </span>

            </div>

            <button
              className="primary-button"
              onClick={() =>
                setStage(
                  "flashcards"
                )
              }
            >
              Review Flashcards →
            </button>

          </section>

        ) : (

          <section className="success-card failed">

            <div className="result-icon">
              💪
            </div>

            <h2>
              Keep Practicing
            </h2>

            <p>
              You ran out of lives before
              completing the pathway.
              <br />
              <br />
              Try again and strengthen
              your recall.
            </p>

            <div className="final-score">

              <strong>
                {recallScore} /{" "}
                {terms.length}
              </strong>

              <span>
                Correct placements
              </span>

            </div>

            <div className="result-buttons">

              <button
                className="secondary-button"
                onClick={
                  retryLevel
                }
              >
                ↻ Retry Level
              </button>

            </div>

          </section>

        )}

      </main>
    );
  }

  // =====================================================
  // FLASHCARDS
  // =====================================================

  if (stage === "flashcards") {

    const card =
      flashcards[
        flashcardNumber
      ];

    return (
      <main
        className="flashcards-page"
        style={{
          minHeight: "100vh",
          overflow: "visible",
          paddingBottom: "60px",
        }}
      >

        <div className="flashcards-header">

          <span className="badge">
            LEVEL 3 • FLASHCARDS
          </span>

          <h2>
            Lock It Into Memory
          </h2>

          <p>
            Review the key ideas before
            moving to the energy payoff
            phase.
          </p>

        </div>

        <div className="flashcard-progress">
          Card {flashcardNumber + 1} /{" "}
          {flashcards.length}
        </div>

        <section
          className="flashcard"
          onClick={() =>
            setShowAnswer(
              !showAnswer
            )
          }
        >

          <span className="flashcard-label">

            {showAnswer
              ? "ANSWER"
              : "QUESTION"}

          </span>

          <h2>

            {showAnswer
              ? card.answer
              : card.question}

          </h2>

          <p>

            {showAnswer
              ? "Tap to see the question"
              : "Tap to reveal the answer"}

          </p>

        </section>

        <button
          className="primary-button"
          onClick={() => {

            if (showAnswer) {

              nextFlashcard();

            } else {

              setShowAnswer(
                true
              );

            }

          }}
        >

          {showAnswer
            ? flashcardNumber ===
              flashcards.length - 1
              ? "Complete Level 3 ✓"
              : "Next Flashcard →"
            : "Reveal Answer"}

        </button>

      </main>
    );
  }

  return null;
}

// =====================================================
// DROP ZONE
// =====================================================

function DropZone({
  slotId,
  value,
  label,
  terms,
  onDrop,
  onDragOver,
  onTap,
  selectedTerm,
}) {
  const placedTerm =
    terms.find(
      (term) =>
        term.id === value
    );

  return (
    <div className="pathway-row">

      <div
        className={`drop-zone ${
          value
            ? "drop-zone-filled"
            : ""
        } ${
          selectedTerm &&
          !value
            ? "drop-zone-ready"
            : ""
        }`}

        onDrop={(event) =>
          onDrop(
            event,
            slotId
          )
        }

        onDragOver={
          onDragOver
        }

        onClick={() =>
          onTap(slotId)
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

        {label}

      </div>

    </div>
  );
}

export default Level3;
