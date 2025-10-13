import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Processus2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [showUserForm, setShowUserForm] = useState(true);

  // Initialiser le temps de début
  useEffect(() => {
    if (!startTime && !showUserForm) {
      setStartTime(Date.now());
    }
  }, [showUserForm]);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;

    try {
      const response = await axios.post(`${API_URL}/users`, {
        username,
        email
      });
      setUserId(response.data.id);
      setUserName(username);
      setShowUserForm(false);
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.error);
      } else {
        alert('Erreur lors de la création de l\'utilisateur');
      }
    }
  };

  const saveQuizResults = async () => {
    if (!userId) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const percentage = Math.round((score / questions.length) * 100);

    const quizData = {
      user_id: userId,
      section: "1.1",
      score: score,
      total_questions: questions.length,
      percentage: percentage,
      time_spent: timeSpent,
      answers: answeredQuestions.map((answer, index) => ({
        question_id: questions[index].id,
        question_text: questions[index].question,
        selected_answer: answer.selectedAnswer || 0,
        correct_answer: questions[index].correct,
        is_correct: answer.correct,
        section: questions[index].section,
        level: questions[index].level
      }))
    };

    try {
      await axios.post(`${API_URL}/quiz-results`, quizData);
      console.log('Résultats sauvegardés avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    
    setAnsweredQuestions([...answeredQuestions, {
      questionId: questions[currentQuestion].id,
      correct: isCorrect,
      selectedAnswer: selectedAnswer
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
      saveQuizResults();
    }
  };

  // Formulaire utilisateur
  if (showUserForm) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Bienvenue au Quiz ISTQB</h2>
        <form onSubmit={handleUserSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="votre@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Commencer le Quiz
          </button>
        </form>
      </div>
    );
  }

  // Reste du code identique...
  // (garder tout le reste du composant tel quel)
};

export default Processus2;