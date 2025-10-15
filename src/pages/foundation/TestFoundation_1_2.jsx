import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const Quiz_testfoudation2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

const questions = [
    {
      id: 21,
      level: "K2",
      section: "1.3.1",
      question: "Lequel des principes de test ISTQB stipule que les tests ne peuvent que réduire la probabilité de défauts non découverts, mais jamais la garantir totalement ?",
      options: [
        "A) Principe 2 : Le test exhaustif est impossible.",
        "B) Principe 7 : L'absence d'erreurs est une illusion.",
        "C) Principe 4 : Les défauts se regroupent.",
        "D) Principe 1 : Le test montre la présence de défauts, pas leur absence."
      ],
      correct: 3,
      explanation: "Le 'Principe 1 : Le test montre la présence de défauts, pas leur absence' rappelle que même après des tests intensifs, on ne peut garantir que le logiciel est parfait.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.3.1 'Principes du test'"
    },
    {
      id: 22,
      level: "K2",
      section: "1.4.1",
      question: "Quelle activité du processus de test de base se concentre sur la définition des objectifs de test, la détermination de l'effort et l'établissement des critères de fin de test ?",
      options: [
        "A) Analyse des tests.",
        "B) Conception des tests.",
        "C) Planification des tests.",
        "D) Clôture des tests."
      ],
      correct: 2,
      explanation: "La Planification des tests est la première activité qui définit l'approche, les objectifs, les ressources, l'échéancier et les critères d'achèvement.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.1 'Activités et tâches de test'"
    },
    {
      id: 23,
      level: "K1",
      section: "1.2.3",
      question: "Comment appelle-t-on le résultat visible et non souhaité d'un défaut en exécution, c'est-à-dire le comportement non conforme du système ?",
      options: [
        "A) L'Erreur.",
        "B) Le Défaut.",
        "C) La Défaillance (Failure).",
        "D) La Cause Racine."
      ],
      correct: 2,
      explanation: "Une Défaillance est la manifestation d'un Défaut en exécution, où le composant ou le système ne parvient pas à exécuter sa fonction requise.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.3 'Erreurs, défauts, défaillances et causes racine'"
    },
    {
      id: 24,
      level: "K2",
      section: "1.2.1",
      question: "Quel terme est utilisé pour désigner la capacité du logiciel à fonctionner sans erreur dans des conditions spécifiées pendant une période de temps spécifiée ?",
      options: [
        "A) Maintenabilité.",
        "B) Fiabilité.",
        "C) Sécurité.",
        "D) Efficacité des performances."
      ],
      correct: 1,
      explanation: "La Fiabilité est l'une des caractéristiques de qualité du produit (ISO 25010) et se rapporte à la capacité de fonctionner sans défaillance sur une période donnée.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.1 'Contributions du test au succès' et 'Qualité'"
    },
    {
      id: 25,
      level: "K2",
      section: "1.4.4",
      question: "Un testeur découvre un défaut dans le code source lors de l'exécution d'un cas de test. Quelle traçabilité est la plus critique à établir pour le rapport de défaut ?",
      options: [
        "A) Traçabilité du rapport de défaut au Plan de Test.",
        "B) Traçabilité du rapport de défaut au Risque produit associé.",
        "C) Traçabilité du rapport de défaut aux Données de Test utilisées.",
        "D) Traçabilité du rapport de défaut à l'Environnement de Test."
      ],
      correct: 1,
      explanation: "La traçabilité des défauts au risque est essentielle pour la gestion des risques et la priorisation des corrections.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.4 'Traçabilité entre base de test et testware'"
    },
    {
      id: 26,
      level: "K1",
      section: "1.5.3",
      question: "Lequel des niveaux d'indépendance des tests est le plus faible ?",
      options: [
        "A) Test par un testeur de l'équipe (mais pas celui qui a développé le composant).",
        "B) Test par un développeur qui a écrit le code testé.",
        "C) Test par une équipe de test séparée (externe au projet).",
        "D) Test par une organisation de test externe (tierce partie)."
      ],
      correct: 1,
      explanation: "Le niveau le plus faible est lorsque le développeur teste son propre travail, car l'objectivité est minimale.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.3 'Indépendance du test'"
    },
    {
      id: 27,
      level: "K2",
      section: "1.4.1",
      question: "Lors de l'activité de **Surveillance et Contrôle des Tests**, quel est l'objectif principal du contrôle ?",
      options: [
        "A) Définir les conditions de test.",
        "B) Prendre des mesures correctives pour s'assurer que le projet atteint ses objectifs de test.",
        "C) Préparer l'environnement de test.",
        "D) Rédiger le rapport de clôture du test."
      ],
      correct: 1,
      explanation: "La Surveillance (Monitoring) des tests consiste à évaluer la progression par rapport au plan, tandis que le Contrôle (Control) consiste à prendre des mesures correctives (ajuster, réallouer, etc.) si l'on s'écarte du plan.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.1 'Activités et tâches de test'"
    },
    {
      id: 28,
      level: "K2",
      section: "1.3.1",
      question: "Le système A est un système de contrôle de vol critique, tandis que le système B est un site web d'entreprise standard. Quel principe de test justifie que le système A ait des tests de régression beaucoup plus rigoureux que le système B ?",
      options: [
        "A) Principe 3 : Les tests précoces font économiser du temps et de l’argent.",
        "B) Principe 6 : Le test dépend du contexte.",
        "C) Principe 5 : Attention aux tests non pertinents.",
        "D) Principe 4 : Les défauts se regroupent."
      ],
      correct: 1,
      explanation: "Le 'Principe 6 : Le test dépend du contexte' signifie que le processus, les techniques et le degré de rigueur doivent être adaptés aux caractéristiques du système (domaine, criticité, cycle de vie, etc.).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.3.1 'Principes du test'"
    },
    {
      id: 29,
      level: "K2",
      section: "1.4.3",
      question: "Laquelle des entités suivantes est classée comme **Testware** ?",
      options: [
        "A) Le code source de l'application.",
        "B) Le système d'exploitation de l'environnement de production.",
        "C) Le journal d'exécution des tests (Test Log).",
        "D) L'Analyste Affaires."
      ],
      correct: 2,
      explanation: "Le Testware comprend tous les artefacts créés pour le test : plans, spécifications de cas de test, données de test, procédures, environnements et journaux d'exécution.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.3 'Testware'"
    },
    {
      id: 30,
      level: "K2",
      section: "1.4.4",
      question: "Que se passe-t-il lorsque la traçabilité entre les exigences et les cas de test est faible ?",
      options: [
        "A) Le processus de débogage est plus rapide pour les développeurs.",
        "B) L'évaluation de l'exhaustivité de la couverture des exigences est difficile.",
        "C) Le nombre de défauts par unité de code diminue.",
        "D) Le coût du test est toujours réduit."
      ],
      correct: 1,
      explanation: "Sans traçabilité, il est difficile de savoir si toutes les exigences ont été couvertes par les tests, ce qui complique l'évaluation de la couverture et l'impact des changements.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.4 'Traçabilité entre base de test et testware'"
    },
    {
      id: 31,
      level: "K2",
      section: "1.2.3",
      question: "Un testeur ne parvient pas à reproduire une défaillance qui a été signalée par l'utilisateur. Qu'est-ce qui est vrai concernant le défaut sous-jacent ?",
      options: [
        "A) Le défaut n'existe pas, car la défaillance n'est pas reproductible.",
        "B) Le défaut est toujours présent dans le code, mais la défaillance ne se manifeste que sous certaines conditions de données ou d'environnement.",
        "C) La défaillance s'est produite en raison d'une erreur de configuration de l'utilisateur qui ne sera jamais reproduite.",
        "D) Le défaut a été corrigé automatiquement par le système."
      ],
      correct: 1,
      explanation: "Le défaut est la cause statique dans le code. Une défaillance est l'effet dynamique qui ne se produit que lorsque le défaut est exécuté sous un ensemble spécifique de conditions (temps, données, environnement). Le défaut peut exister sans que la défaillance ne se manifeste à nouveau.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.3 'Erreurs, défauts, défaillances et causes racine'"
    },
    {
      id: 32,
      level: "K2",
      section: "1.4.5",
      question: "Qui est le rôle le plus apte à déterminer l'étendue de l'automatisation des tests et à allouer les ressources humaines pour le test ?",
      options: [
        "A) Le Testeur (Tester).",
        "B) Le Chef de Projet.",
        "C) Le Test Manager (ou Chef de Test).",
        "D) L'Analyste Affaires."
      ],
      correct: 2,
      explanation: "Le Test Manager est responsable de la planification, de la gestion du budget, des ressources et de la définition de la stratégie (y compris l'automatisation).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.5 'Rôles dans le test'"
    },
    {
      id: 33,
      level: "K1",
      section: "1.4.3",
      question: "Quel terme désigne l'entité que l'on teste, par exemple un composant logiciel, un système ou un manuel d'utilisation ?",
      options: [
        "A) Base de test.",
        "B) Environnement de test.",
        "C) Objet de test (Test Object).",
        "D) Résultat de test."
      ],
      correct: 2,
      explanation: "L'Objet de test est l'élément qui est soumis à l'activité de test.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.3 'Testware'"
    },
    {
      id: 34,
      level: "K2",
      section: "1.5.2",
      question: "Quel est l'un des avantages de l'approche **'équipe intégrée'** par rapport à l'indépendance de test élevée ?",
      options: [
        "A) Le testeur évite tout contact avec le développeur pour conserver son impartialité.",
        "B) Le testeur peut participer plus tôt et plus facilement aux revues et à la prévention des défauts.",
        "C) Le testeur est uniquement responsable des tests de performance.",
        "D) Le testeur n'a pas besoin de compétences en communication."
      ],
      correct: 1,
      explanation: "L'approche intégrée est conçue pour faciliter le 'shift-left' (tests précoces) et la collaboration (comme les revues) pour la prévention des défauts.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.2 'Approche équipe intégrée'"
    },
    {
      id: 35,
      level: "K2",
      section: "1.4.1",
      question: "Quelle activité de test doit se dérouler en parallèle de la planification et de l'exécution, pour évaluer l'état du projet de test et guider la prise de décision ?",
      options: [
        "A) Analyse des tests.",
        "B) Conception des tests.",
        "C) Clôture des tests.",
        "D) Surveillance et contrôle des tests."
      ],
      correct: 3,
      explanation: "La Surveillance et le Contrôle est une activité continue qui se déroule tout au long du processus de test, en parallèle des autres activités.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.1 'Activités et tâches de test'"
    },
    {
      id: 36,
      level: "K2",
      section: "1.5.3",
      question: "Pour maximiser l'objectivité et l'efficacité dans la découverte de défauts, le testeur devrait se concentrer principalement sur :",
      options: [
        "A) La validation que le système fonctionne comme prévu selon le plan de test.",
        "B) La mise en place de tests qui correspondent aux attentes du développeur.",
        "C) L'adoption d'une perspective de critique constructive et d'une attitude professionnelle.",
        "D) L'utilisation uniquement de tests fonctionnels boîte noire."
      ],
      correct: 2,
      explanation: "Un testeur doit adopter une attitude professionnelle, une curiosité et une approche critique (mais constructive) pour trouver des défauts en étant objectif, sans chercher à blâmer ou à confirmer les attentes.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.3 'Indépendance du test'"
    },
    {
      id: 37,
      level: "K2",
      section: "1.2.1",
      question: "Laquelle des affirmations suivantes est un objectif de test axé sur la **validation** ?",
      options: [
        "A) Vérifier la conformité du code aux normes de codage.",
        "B) Déterminer si l'objet de test est complet et fonctionne comme prévu (Vérification).",
        "C) Établir la confiance dans la qualité de l'objet de test (Validation).",
        "D) Détecter la présence de défauts dans l'architecture."
      ],
      correct: 2,
      explanation: "La Validation (se sentir en confiance) vise à s'assurer que 'nous construisons le bon produit' et est axée sur l'utilisateur, par opposition à la Vérification ('nous construisons le produit correctement') qui est axée sur les spécifications.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.1 'Contributions du test au succès'"
    },
    {
      id: 38,
      level: "K2",
      section: "1.4.1",
      question: "À quel moment du processus de test de base doit-on vérifier la **couverture des tests** (par rapport aux exigences) et documenter la leçon apprise ?",
      options: [
        "A) Planification des tests.",
        "B) Analyse des tests.",
        "C) Implémentation et exécution des tests.",
        "D) Clôture des tests."
      ],
      correct: 3,
      explanation: "La Clôture des tests est l'activité d'archivage des résultats, de vérification des critères de sortie, de capitalisation des leçons apprises et de finalisation du rapport de clôture.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.1 'Activités et tâches de test'"
    },
    {
      id: 39,
      level: "K2",
      section: "1.1.1",
      question: "Un objectif clé du test est de **réduire le niveau de risque** d’une qualité inadéquate. Quel est l'effet de la réalisation de tests au niveau du composant (tests unitaires) sur le risque produit ?",
      options: [
        "A) Le risque produit reste inchangé, car ce niveau de test est trop bas.",
        "B) Le risque produit est réduit en éliminant les défauts au niveau de l'unité, rendant les tests d'intégration et système plus fluides.",
        "C) Le risque produit augmente en raison du temps passé sur les tests de composants.",
        "D) Le risque produit est transféré à l'équipe de développement."
      ],
      correct: 1,
      explanation: "Les tests précoces (comme les tests de composants) réduisent la probabilité de défauts qui pourraient s'échapper aux niveaux supérieurs, réduisant ainsi le risque produit global.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.1.1 'Objectifs du test'"
    },
    {
      id: 40,
      level: "K2",
      section: "1.5.1",
      question: "Pourquoi les compétences interpersonnelles et la pensée critique sont-elles cruciales pour un testeur dans une 'équipe intégrée' ?",
      options: [
        "A) Elles garantissent que le testeur sera promu rapidement au poste de Test Manager.",
        "B) Elles permettent la collaboration sur les revues et la prise de décision sur la gravité des défauts.",
        "C) Elles sont nécessaires uniquement si l'équipe utilise une approche séquentielle.",
        "D) Elles éliminent le besoin de documentation des cas de test."
      ],
      correct: 1,
      explanation: "La pensée critique est utilisée pour évaluer et prendre des décisions (priorité/gravité des défauts) et les compétences interpersonnelles sont vitales pour la collaboration (revues, '3 Amigos', communication de défauts) dans l'équipe intégrée.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.1 'Compétences génériques requises pour le test' et Section 1.5.2"
    }
];

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
        
    
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
    return "Relisez la section 1.4 du syllabus attentivement";
  };



  if (quizCompleted) {
    return (
      
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        
        <div className="text-center mb-8">
          <Award className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-2">Quiz Section 1.4 Terminé !</h2>
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

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Récapitulatif par niveau :</h3>
          <div className="grid grid-cols-1 gap-3">
            {answeredQuestions.map((answer, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                {answer.correct ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <span className="text-sm">
                  Question {index + 1} - Niveau {questions[index].level}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="font-bold text-blue-900 mb-2">📚 Concepts clés de la section 1.4 :</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Politique de test (organisationnelle) vs Stratégie de test (projet)</li>
            <li>• Approches de test : analytique, réactive, consultative, méthodique, standard, modèle</li>
            <li>• Shift-left : tester plus tôt dans le cycle</li>
            <li>• Shift-right : tester en production (monitoring, A/B testing)</li>
            <li>• Critères d'entrée et de sortie des tests</li>
          </ul>
        </div>

        <button
          onClick={handleRestart}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Recommencer le Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrectAnswer = selectedAnswer === question.correct;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
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
  );
};

export default Quiz_testfoudation2;


