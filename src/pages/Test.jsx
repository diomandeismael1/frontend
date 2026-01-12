import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

// Importer le fichier JSON
import questionsData from './questions.json';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { width } = useWindowSize();

  // Fermer la sidebar automatiquement sur mobile quand on sélectionne une question
  useEffect(() => {
    if (width < 1024) {
      setSidebarOpen(false);
    }
  }, [currentQuestion, width]);

  // Charger les questions
  useEffect(() => {
    try {
      setQuestions(questionsData.questions || questionsData);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des questions');
      setLoading(false);
    }
  }, []);

  const handleAnswerSelect = (index) => {
    if (showExplanation || loading || questions.length === 0) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || questions.length === 0) return;     
    
    setShowExplanation(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    
    setAnsweredQuestions([...answeredQuestions, {
      questionId: questions[currentQuestion].id,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleFinishedQuiz = () => {
    setQuizCompleted(true);
  }

  const handleQuestionSelect = (index) => {
    // Permettre de changer de question seulement si:
    // 1. Le quiz n'est pas complété
    // 2. La question a déjà été répondue OU on est en mode révision
    const questionAlreadyAnswered = answeredQuestions.find(
      aq => aq.questionId === questions[index].id
    );
    
    if (!quizCompleted || questionAlreadyAnswered) {
      setCurrentQuestion(index);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent ! Vous maîtrisez la stratégie de test 🎯";
    if (percentage >= 60) return "Bien ! Revoyez quelques concepts clés";
    return "Relisez la section 1.1 du syllabus attentivement";
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="mt-4 text-gray-600">Chargement des questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <p className="text-gray-600">Aucune question disponible</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar
          questions={questions}
          currentQuestion={currentQuestion}
          answeredQuestions={answeredQuestions}
          onQuestionSelect={handleQuestionSelect}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          score={score}
          totalQuestions={questions.length}
        />
        
        <div className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-8">
              <Award className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-2">Quiz Terminé !</h2>
              <div className={`text-5xl font-bold mb-4 ${getScoreColor()}`}>
                {score} / {questions.length}
              </div>
              <p className="text-xl text-gray-600 mb-2">
                Score : {Math.round((score / questions.length) * 100)}%
              </p>
              <p className="text-lg text-gray-700 font-semibold">
                {getScoreMessage()}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Recommencer le Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrectAnswer = selectedAnswer === question.correct;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Barre latérale */}
      <Sidebar
        questions={questions}
        currentQuestion={currentQuestion}
        answeredQuestions={answeredQuestions}
        onQuestionSelect={handleQuestionSelect}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        score={score}
        totalQuestions={questions.length}
      />
      
      {/* Contenu principal */}
      <div className="flex-1 lg:ml-0">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          {/* Bouton menu mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  Niveau {question.level}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                  Section {question.section}
                </span>
              </div>
              <span className="text-gray-600 font-semibold">
                Question {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Score actuel : {score} / {currentQuestion + (showExplanation ? 1 : 0)}</span>
              {currentQuestion > 0 && (
                <span>
                  Taux de réussite : {Math.round((score / answeredQuestions.length) * 100)}%
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showExplanation
                      ? index === question.correct
                        ? "border-green-500 bg-green-50"
                        : selectedAnswer === index
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                      : selectedAnswer === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                  } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">{option}</span>
                    {showExplanation && (
                      index === question.correct ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 ml-2" />
                      ) : null
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className={`mb-6 p-6 rounded-lg ${isCorrectAnswer ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"}`}>
              <div className="flex items-start gap-3 mb-4">
                {isCorrectAnswer ? (
                  <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" /> 
                ) : (
                  <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${isCorrectAnswer ? "text-green-800" : "text-red-800"}`}>
                    {isCorrectAnswer ? "✓ Bonne réponse !" : "✗ Mauvaise réponse"}
                  </h3>
                  <p className="text-gray-700 mb-4">{question.explanation}</p>
                  
                  <div className="flex items-start gap-2 bg-white p-4 rounded border-l-4 border-blue-500">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Référence :</p>
                      <p className="text-sm text-gray-600">{question.reference}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {!showExplanation ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  selectedAnswer === null
                    ? "bg-green-300 text-black cursor-not-allowed"
                    : "bg-blue-600 text-black hover:bg-blue-700"
                }`}
              >
                Valider la réponse
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-green-600 text-black py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {currentQuestion < questions.length - 1 ? "Question suivante →" : "Voir les résultats"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;