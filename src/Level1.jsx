import { useState } from "react";

function Level1({ setScreen, setLevel1Passed }) {
  /* =====================================================
     LEVEL 1 DATA
  ===================================================== */

  const lessons = [
    {
      icon: "🍬",
      title: "What is Glycolysis?",
      text:
        "Glycolysis is a metabolic pathway that breaks down one molecule of glucose into two molecules of pyruvate. During this process, energy is captured in the form of ATP and NADH.",
      fact:
        "Think of glycolysis as the first stage of extracting useful energy from glucose."
    },

    {
      icon: "📍",
      title: "Where Does Glycolysis Occur?",
      text:
        "Glycolysis takes place in the cytosol of the cell. Because the pathway occurs in the cytosol, glucose can be broken down without first entering the mitochondrion.",
      fact:
        "Remember: Glycolysis = cytosol."
    },

    {
      icon: "🧬",
      title: "What Does Glycolysis Start With?",
      text:
        "Glycolysis begins with one molecule of glucose. Glucose is a six-carbon molecule, and the pathway eventually produces two three-carbon pyruvate molecules.",
      fact:
        "6 carbons in glucose → 2 × 3-carbon pyruvate."
    },

    {
      icon: "⚡",
      title: "What Does Glycolysis Produce?",
      text:
        "For each molecule of glucose, glycolysis produces two molecules of pyruvate, two NADH, and a net gain of two ATP.",
      fact:
        "Net result: 2 pyruvate + 2 NADH + 2 ATP."
    }
  ];


  const questions = [
    {
      question: "Where does glycolysis take place?",
      options: [
        "Mitochondrial matrix",
        "Cytosol",
        "Nucleus",
        "Lysosome"
      ],
      answer: 1,
      explanation:
        "Glycolysis takes place in the cytosol of the cell."
    },

    {
      question: "What molecule begins glycolysis?",
      options: [
        "Pyruvate",
        "Acetyl-CoA",
        "Glucose",
        "Lactate"
      ],
      answer: 2,
      explanation:
        "Glycolysis begins with one molecule of glucose."
    },

    {
      question:
        "How many pyruvate molecules are produced from one glucose molecule?",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      answer: 1,
      explanation:
        "One six-carbon glucose molecule is converted into two three-carbon pyruvate molecules."
    },

    {
      question:
        "What is the net ATP gain from glycolysis per glucose molecule?",
      options: [
        "1 ATP",
        "2 ATP",
        "4 ATP",
        "6 ATP"
      ],
      answer: 1,
      explanation:
        "Glycolysis uses 2 ATP and produces 4 ATP, giving a net gain of 2 ATP."
    }
  ];


  const flashcards = [
    {
      icon: "📍",
      question: "Where does glycolysis occur?",
      answer:
        "Glycolysis occurs in the cytosol of the cell."
    },

    {
      icon: "🍬",
      question: "What molecule starts glycolysis?",
      answer:
        "Glycolysis starts with one molecule of glucose."
    },

    {
      icon: "⚡",
      question: "What are the main products of glycolysis?",
      answer:
        "The pathway produces 2 pyruvate, 2 NADH and a net gain of 2 ATP per glucose."
    },

    {
      icon: "🧬",
      question: "What is the overall purpose of glycolysis?",
      answer:
        "Glycolysis breaks glucose down into pyruvate while capturing some of its energy as ATP and NADH."
    }
  ];


  /* =====================================================
     GAME STATE
  ===================================================== */

  const [stage, setStage] = useState("lesson");

  const [lessonStep, setLessonStep] = useState(0);

  const [questionNumber, setQuestionNumber] = useState(0);

  const [lives, setLives] = useState(3);

  const [score, setScore] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [answered, setAnswered] = useState(false);

  const [flashcardNumber, setFlashcardNumber] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false);


  const currentLesson = lessons[lessonStep];

  const currentQuestion = questions[questionNumber];

  const currentFlashcard = flashcards[flashcardNumber];


  /* =====================================================
     LESSON FUNCTIONS
  ===================================================== */

  function nextLesson() {
    if (lessonStep < lessons.length - 1) {
      setLessonStep((previous) => previous + 1);
    } else {
      setStage("recall");
    }
  }


  function previousLesson() {
    if (lessonStep > 0) {
      setLessonStep((previous) => previous - 1);
    }
  }


  /* =====================================================
     RECALL FUNCTIONS
  ===================================================== */

  function chooseAnswer(index) {
    if (answered || lives === 0) {
      return;
    }

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === currentQuestion.answer) {
      setScore((previousScore) => previousScore + 100);
    } else {
      setLives((previousLives) => previousLives - 1);
    }
  }


  function nextQuestion() {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber((previous) => previous + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setStage("result");
    }
  }


  function restartRecall() {
    setQuestionNumber(0);
    setLives(3);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setStage("recall");
  }


  function reviewLesson() {
    setLessonStep(0);
    setQuestionNumber(0);
    setLives(3);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setStage("lesson");
  }


  /* =====================================================
     FLASHCARD FUNCTIONS
  ===================================================== */

  function nextFlashcard() {
    if (flashcardNumber < flashcards.length - 1) {
      setFlashcardNumber((previous) => previous + 1);
      setShowAnswer(false);
    } else {
      completeLevel();
    }
  }


  function previousFlashcard() {
    if (flashcardNumber > 0) {
      setFlashcardNumber((previous) => previous - 1);
      setShowAnswer(false);
    }
  }


  function completeLevel() {
    setLevel1Passed(true);
    setScreen("levels");
  }


  /* =====================================================
     LESSON SCREEN
  ===================================================== */

  if (stage === "lesson") {
    return (
      <main className="level-page">

        {/* BACK */}

        <button
          className="back-button"
          onClick={() => setScreen("levels")}
        >
          ← Level Map
        </button>


        {/* TOP */}

        <div className="level-top">

          <span className="badge">
            LEVEL 1
          </span>

          <span className="lesson-counter">
            {lessonStep + 1} / {lessons.length}
          </span>

        </div>


        <h2>
          Meet Glycolysis 🧬
        </h2>

        <p className="level-intro">
          Learn the big picture before entering the pathway.
        </p>


        {/* LESSON CARD */}

        <div className="learning-card big-card">

          <div className="big-icon">
            {currentLesson.icon}
          </div>

          <h3>
            {currentLesson.title}
          </h3>

          <p>
            {currentLesson.text}
          </p>


          {/* KEY FACT */}

          <div className="feedback correct">

            <h3>
              💡 Remember
            </h3>

            <p>
              {currentLesson.fact}
            </p>

          </div>

        </div>


        {/* LESSON PROGRESS */}

        <div className="lesson-progress">

          {lessons.map((_, index) => (
            <div
              key={index}
              className={
                index === lessonStep
                  ? "lesson-dot active"
                  : "lesson-dot"
              }
            />
          ))}

        </div>


        {/* NAVIGATION */}

        <div className="result-buttons">

          {lessonStep > 0 && (
            <button
              className="secondary-button"
              onClick={previousLesson}
            >
              ← Previous
            </button>
          )}

          <button
            className="primary-button"
            onClick={nextLesson}
          >
            {lessonStep === lessons.length - 1
              ? "🧠 Start Recall Challenge"
              : "Continue →"}
          </button>

        </div>

      </main>
    );
  }


  /* =====================================================
     RECALL SCREEN
  ===================================================== */

  if (stage === "recall") {
    return (
      <main className="quiz-page">

        {/* HEADER */}

        <div className="recall-header">

          <button
            className="back-button"
            onClick={() => setStage("lesson")}
          >
            ← Review Lesson
          </button>

          <div className="level-top">

            <span className="badge">
              LEVEL 1 RECALL
            </span>

            <div className="recall-stats">

              <span>
                ❤️ {lives}
              </span>

              <span>
                ⭐ {score}
              </span>

            </div>

          </div>

          <p>
            Question {questionNumber + 1} / {questions.length}
          </p>

        </div>


        {/* QUESTION */}

        <div className="question-card">

          <h2 className="question-text">
            {currentQuestion.question}
          </h2>


          {/* ANSWERS */}

          <div className="answers">

            {currentQuestion.options.map(
              (option, index) => {

                let className = "";

                if (answered) {

                  if (
                    index === currentQuestion.answer
                  ) {
                    className = "correct-answer";
                  }

                  else if (
                    index === selectedAnswer
                  ) {
                    className = "wrong-answer";
                  }
                }


                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => chooseAnswer(index)}
                    disabled={answered}
                  >
                    <strong>
                      {String.fromCharCode(65 + index)}.
                    </strong>{" "}
                    {option}
                  </button>
                );
              }
            )}

          </div>


          {/* FEEDBACK */}

          {answered && (

            <div
              className={
                selectedAnswer === currentQuestion.answer
                  ? "feedback correct"
                  : "feedback wrong"
              }
            >

              {selectedAnswer === currentQuestion.answer ? (

                <>
                  <h3>
                    ✅ Correct!
                  </h3>

                  <p>
                    +100 points
                  </p>
                </>

              ) : (

                <>
                  <h3>
                    ❌ Incorrect
                  </h3>

                  <p>
                    {currentQuestion.explanation}
                  </p>

                  <p>
                    ❤️ {lives} lives remaining.
                  </p>
                </>

              )}

            </div>

          )}


          {/* NEXT */}

          {answered && (

            <button
              className="primary-button"
              onClick={nextQuestion}
            >
              {questionNumber === questions.length - 1
                ? "🏆 Finish Recall"
                : "Next Question →"}
            </button>

          )}

        </div>

      </main>
    );
  }


  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  if (stage === "result") {

    const passed = score >= 300;


    /* ================= PASSED ================= */

    if (passed) {

      return (
        <main className="quiz-page">

          <div className="success-card">

            <div className="big-result-icon">
              🏆
            </div>

            <span className="badge">
              LEVEL COMPLETE
            </span>

            <h2>
              Glycolysis Basics Mastered!
            </h2>

            <p>
              Excellent work! You successfully passed
              the Level 1 recall challenge.
            </p>


            <div className="final-score">
              {score} / 400
            </div>


            <p>
              Before moving forward, review the key
              concepts using your flashcards.
            </p>


            <div className="result-buttons">

              <button
                className="primary-button"
                onClick={() => {
                  setFlashcardNumber(0);
                  setShowAnswer(false);
                  setStage("flashcards");
                }}
              >
                🃏 Review Flashcards
              </button>

            </div>

          </div>

        </main>
      );
    }


    /* ================= FAILED ================= */

    return (
      <main className="quiz-page">

        <div className="failed">

          <div className="big-result-icon">
            📚
          </div>

          <span className="badge">
            KEEP PRACTICING
          </span>

          <h2>
            Not Quite Yet!
          </h2>

          <p>
            You scored {score} out of 400.
          </p>

          <p>
            You need at least 300 points to pass Level 1.
          </p>


          <div className="final-score">
            {score} / 400
          </div>


          <div className="result-buttons">

            <button
              className="primary-button"
              onClick={restartRecall}
            >
              🔄 Try Recall Again
            </button>

            <button
              className="secondary-button"
              onClick={reviewLesson}
            >
              📖 Review Lesson
            </button>

          </div>

        </div>

      </main>
    );
  }


  /* =====================================================
     FLASHCARDS
  ===================================================== */

  if (stage === "flashcards") {

    return (
      <main className="flashcards-page">

        {/* HEADER */}

        <div className="flashcards-header">

          <button
            className="back-button"
            onClick={() => setStage("result")}
          >
            ← Results
          </button>

          <div>

            <span className="badge">
              LEVEL 1
            </span>

            <h1>
              Flashcards 🃏
            </h1>

          </div>

        </div>


        {/* PROGRESS */}

        <p className="flashcard-progress">
          Card {flashcardNumber + 1} of {flashcards.length}
        </p>


        {/* FLASHCARD */}

        <div
          className="flashcard"
          onClick={() => setShowAnswer(!showAnswer)}
        >

          {!showAnswer ? (

            <>
              <div className="big-icon">
                {currentFlashcard.icon}
              </div>

              <span className="flashcard-label">
                QUESTION
              </span>

              <h2>
                {currentFlashcard.question}
              </h2>

              <p>
                👆 Tap the card to reveal the answer
              </p>
            </>

          ) : (

            <>
              <div className="big-icon">
                💡
              </div>

              <span className="flashcard-label">
                ANSWER
              </span>

              <h2>
                {currentFlashcard.answer}
              </h2>

              <p>
                👆 Tap the card to hide the answer
              </p>
            </>

          )}

        </div>


        {/* FLASHCARD NAVIGATION */}

        <div className="result-buttons">

          {flashcardNumber > 0 && (

            <button
              className="secondary-button"
              onClick={previousFlashcard}
            >
              ← Previous
            </button>

          )}


          <button
            className="primary-button"
            onClick={nextFlashcard}
          >
            {flashcardNumber === flashcards.length - 1
              ? "✅ Complete Level 1"
              : "Next Card →"}
          </button>

        </div>

      </main>
    );
  }


  return null;
}


export default Level1;