import React from 'react';
import { CheckCircle, XCircle, Circle, BookOpen, Award, BarChart3 } from 'lucide-react';

const Sidebar = ({
  questions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
  isOpen,
  onToggle,
  score,
  totalQuestions,
  onCompleteQuiz // Ajout de cette prop
}) => {
  const getQuestionStatus = (questionId) => {
    const answered = answeredQuestions.find(aq => aq.questionId === questionId);
    if (!answered) return 'unanswered';
    return answered.correct ? 'correct' : 'incorrect';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'incorrect':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'correct':
        return 'border-l-green-500 bg-green-50';
      case 'incorrect':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  const calculateProgress = () => {
    return (answeredQuestions.length / questions.length) * 100;
  };

  const getScorePercentage = () => {
    return totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  };

  const allQuestionsAnswered = answeredQuestions.length === questions.length;

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Barre latérale */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-white border-r border-gray-200 shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-screen
      `}>
        
        {/* En-tête de la sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Progression du Quiz
            </h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Statistiques */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progression:</span>
              <span className="text-sm font-semibold">
                {answeredQuestions.length}/{questions.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            {score > 0 && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-600">Score actuel:</span>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-black">
                    {score}/{totalQuestions} ({getScorePercentage()}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Liste des questions */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Liste des questions
            </h3>
            
            <div className="space-y-2">
              {questions.map((question, index) => {
                const status = getQuestionStatus(question.id);
                const isCurrent = currentQuestion === index;
                
                return (
                  <button
                    key={question.id}
                    onClick={() => onQuestionSelect(index)}
                    className={`
                      w-full text-left p-3 rounded-lg border transition-all
                      ${getStatusColor(status)}
                      ${isCurrent ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                      hover:bg-gray-50 active:bg-gray-100
                      flex items-center gap-3
                    `}
                  >
                    {getStatusIcon(status)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-medium ${
                          isCurrent ? 'text-blue-600' : 'text-gray-700'
                        }`}>
                          Q{index + 1}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                          {question.level}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 truncate">
                        {question.question.substring(0, 60)}...
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        

        {/* Légende */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Légende:</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-600">Réponse correcte</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-3 h-3 text-red-500" />
              <span className="text-xs text-gray-600">Réponse incorrecte</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">Non répondu</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;