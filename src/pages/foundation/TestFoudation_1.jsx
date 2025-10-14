import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const Quiz_testfoudation1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

const questions = [
    {
      id: 1,
      level: "K1",
      section: "1.1.1",
      question: "Selon le Syllabus ISTQB, quel est l'objectif principal du test en relation avec la qualité du produit ?",
      options: [
        "A) Garantir l'absence de défauts dans le logiciel.",
        "B) Établir le coût total de propriété (TCO).",
        "C) Réduire le niveau de risque d’une qualité inadéquate et obtenir la confiance.",
        "D) Uniquement trouver des défauts pour améliorer la productivité du développeur."
      ],
      correct: 2,
      explanation: "Les objectifs principaux sont de trouver des défauts, de réduire les risques d’une qualité inadéquate et d’obtenir la confiance dans la qualité de l’objet de test.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.1.1 'Objectifs du test'"
    },
    {
      id: 2,
      level: "K2",
      section: "1.1.2",
      question: "Quelle activité est décrite comme étant le processus de diagnostic et de correction de la cause d'une défaillance dans le code ?",
      options: [
        "A) Test de confirmation.",
        "B) Test de régression.",
        "C) Débogage.",
        "D) Test d'intégration."
      ],
      correct: 2,
      explanation: "Le débogage est l'activité qui suit la découverte d'une défaillance (par le test) et qui consiste à analyser la cause (le défaut) et à la corriger.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.1.2 'Test et débogage'"
    },
    {
      id: 3,
      level: "K2",
      section: "1.2.1",
      question: "Laquelle des affirmations suivantes décrit le mieux une contribution directe du test à un développement logiciel réussi ?",
      options: [
        "A) Le test garantit que tous les problèmes de performances seront résolus avant la production.",
        "B) Le test réduit le risque d'impacts négatifs d'une défaillance sur l'entreprise ou les utilisateurs.",
        "C) Le test augmente l'indépendance des développeurs par rapport aux testeurs.",
        "D) Le test est l'activité la plus coûteuse du cycle de vie du logiciel."
      ],
      correct: 1,
      explanation: "Le test réduit le risque de défaillances après la mise en production, protégeant ainsi l'entreprise contre les conséquences négatives.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.1 'Contributions du test au succès'"
    },
    {
      id: 4,
      level: "K2",
      section: "1.2.2",
      question: "Quelle est la relation entre l'Assurance Qualité (AQ) et le Test ?",
      options: [
        "A) L'AQ et le Test sont des termes synonymes.",
        "B) L'AQ se concentre principalement sur la détection des défauts dans les produits finaux, tandis que le Test est axé sur le processus.",
        "C) Le Test est une activité de Contrôle Qualité qui contribue à l'objectif plus large de l'AQ en se concentrant sur le produit.",
        "D) L'AQ est toujours effectuée par des équipes externes ; le Test est toujours effectué en interne."
      ],
      correct: 2,
      explanation: "Le Test est une activité de Contrôle Qualité (CQ) qui cherche les défauts dans le produit, tandis que l'Assurance Qualité (AQ) est orientée processus et cherche à prévenir les défauts.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.2 'Test et assurance qualité'"
    },
    {
      id: 5,
      level: "K2",
      section: "1.2.3",
      question: "Un programmeur commet une erreur humaine (méprise) en écrivant le code. Quelle est la séquence correcte de la chaîne causale (ISTQB) résultant de cette erreur ?",
      options: [
        "A) Erreur → Défaut → Défaillance",
        "B) Défaillance → Défaut → Erreur",
        "C) Défaut → Erreur → Défaillance",
        "D) Défaillance → Erreur → Défaut"
      ],
      correct: 0,
      explanation: "Une personne fait une **Erreur** (faute humaine) → L'erreur crée un **Défaut** (bug) → L'exécution du défaut peut entraîner une **Défaillance** (résultat non conforme).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.3 'Erreurs, défauts, défaillances et causes racine'"
    },
    {
      id: 6,
      level: "K2",
      section: "1.2.3",
      question: "Qu'est-ce qu'un **Défaut** (ou 'Bug') dans la terminologie ISTQB ?",
      options: [
        "A) La manifestation visible d'un comportement non conforme (la Défaillance).",
        "B) L'erreur humaine (faute) commise par un membre de l'équipe.",
        "C) Un problème dans un composant ou un système qui peut amener le composant ou le système à échouer à exécuter sa fonction requise.",
        "D) La cause fondamentale du problème qui conduit à l'erreur."
      ],
      correct: 2,
      explanation: "Un Défaut est un problème statique dans un artefact (comme le code) qui peut, une fois exécuté, provoquer un échec (Défaillance).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.2.3 'Erreurs, défauts, défaillances et causes racine'"
    },
    {
      id: 7,
      level: "K2",
      section: "1.3.1",
      question: "Quel principe de test est le plus fortement soutenu par l'idée de l'Analyse des Valeurs Limites et du Partitionnement par Équivalence ?",
      options: [
        "A) Principe 3 : Les tests précoces font économiser du temps et de l’argent.",
        "B) Principe 4 : Les défauts se regroupent.",
        "C) Principe 7 : L’absence d’erreurs est une illusion.",
        "D) Principe 2 : Le test exhaustif est impossible."
      ],
      correct: 3,
      explanation: "Puisqu'il est impossible de tester exhaustivement (Principe 2), les techniques de conception de tests (comme l'analyse des valeurs limites) sont utilisées pour sélectionner un sous-ensemble efficace et suffisant de cas de test.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.3.1 'Principes du test'"
    },
    {
      id: 8,
      level: "K2",
      section: "1.3.1",
      question: "Lequel des principes du test est lié à l'idée que, même sans défauts, le système peut ne pas être utile au client s'il ne répond pas à ses besoins ?",
      options: [
        "A) Principe 1 : Le test montre la présence de défauts, pas leur absence.",
        "B) Principe 4 : Les défauts se regroupent.",
        "C) Principe 5 : Attention aux tests non pertinents.",
        "D) Principe 6 : Le test dépend du contexte."
      ],
      correct: 2,
      explanation: "Le 'Principe 7 : L’absence d’erreurs est une illusion' (ou 'falalcy of absence of errors') rappelle que trouver et corriger des défauts n'est pas utile si le système construit ne répond pas aux besoins (n'est pas utilisable ou pertinent).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.3.1 'Principes du test'"
    },
    {
      id: 9,
      level: "K1",
      section: "1.4.1",
      question: "Quelle est l'activité du processus de test de base où les cas de test détaillés sont écrits, l'environnement de test est mis en place et la suite de tests est organisée ?",
      options: [
        "A) Planification des tests.",
        "B) Conception des tests.",
        "C) Implémentation et exécution des tests.",
        "D) Clôture des tests."
      ],
      correct: 2,
      explanation: "L'Implémentation et l'exécution impliquent de finaliser le testware, d'établir l'environnement et d'exécuter les procédures de test.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.1 'Activités et tâches de test'"
    },
    {
      id: 10,
      level: "K2",
      section: "1.4.2",
      question: "Comment le contexte du projet (ex: un projet Agile avec des itérations courtes) est-il susceptible d'influencer le processus de test ?",
      options: [
        "A) Il exigera une augmentation de la documentation formelle pour les revues.",
        "B) Il nécessitera que les activités de test soient effectuées de manière séquentielle, à la fin de l'itération.",
        "C) Il promouvra des cycles de test plus courts, des boucles de feedback rapides et des tests intégrés au développement ('shift-left').",
        "D) Il éliminera le besoin de toute planification ou surveillance des tests."
      ],
      correct: 2,
      explanation: "Le contexte Agile met l'accent sur les cycles courts, les retours rapides, l'intégration continue et l'exécution précoce des tests ('shift-left').",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.2 'Le processus de test selon le contexte'"
    },
    {
      id: 11,
      level: "K2",
      section: "1.4.3",
      question: "Quel terme ISTQB désigne les éléments sur lesquels les tests sont basés, tels que les spécifications des exigences ou les modèles de conception ?",
      options: [
        "A) Les Objets de test.",
        "B) La Base de test.",
        "C) Le Testware.",
        "D) Les Données de test."
      ],
      correct: 1,
      explanation: "La Base de test est l'information requise pour planifier et concevoir les tests, comme les exigences, les spécifications ou le code.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.3 'Testware'"
    },
    {
      id: 12,
      level: "K2",
      section: "1.4.4",
      question: "Quelle est la raison principale du maintien de la **traçabilité** bidirectionnelle entre les cas de test et la base de test ?",
      options: [
        "A) Pour garantir qu'il n'y ait qu'un seul testeur par cas de test.",
        "B) Pour permettre de mesurer la couverture des tests et d'évaluer l'impact des changements.",
        "C) Pour automatiser l'exécution des tests sans intervention humaine.",
        "D) Pour remplacer la nécessité d'une gestion formelle des défauts."
      ],
      correct: 1,
      explanation: "La traçabilité aide à s'assurer que toutes les exigences sont couvertes par les tests et à identifier quels tests sont affectés par un changement dans les exigences.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.4 'Traçabilité entre base de test et testware'"
    },
    {
      id: 13,
      level: "K2",
      section: "1.4.5",
      question: "Quel rôle a pour principale responsabilité l'analyse de la base de test et la définition des conditions de test, ainsi que la conception des cas de test ?",
      options: [
        "A) Le Développeur.",
        "B) Le Test Manager (Chef de Test).",
        "C) L'Analyste de Test (ou Testeur).",
        "D) L'Analyste Affaires (Business Analyst)."
      ],
      correct: 2,
      explanation: "Le Testeur (ou l'Analyste de Test) est le rôle principalement responsable de l'analyse, de la conception des tests et de l'exécution des tests.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.5 'Rôles dans le test'"
    },
    {
      id: 14,
      level: "K2",
      section: "1.5.1",
      question: "Laquelle de ces compétences est la plus essentielle pour qu'un testeur puisse rédiger des rapports de défauts clairs et non conflictuels ?",
      options: [
        "A) Compétence en analyse statique du code.",
        "B) Compétence en communication écrite et interpersonnelle.",
        "C) Compétence en gestion de projet.",
        "D) Compétence en déploiement continu."
      ],
      correct: 1,
      explanation: "Une bonne communication (écrite/verbale) est fondamentale pour rapporter efficacement les défauts aux développeurs et autres parties prenantes.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.1 'Compétences génériques requises pour le test'"
    },
    {
      id: 15,
      level: "K2",
      section: "1.5.2",
      question: "L'approche 'équipe intégrée' (Integrated Team Approach) est favorisée pour le test. Quel est l'avantage principal de cette approche ?",
      options: [
        "A) Elle garantit un niveau d'indépendance très élevé pour le testeur.",
        "B) Elle favorise l'appropriation partagée de la qualité et une meilleure collaboration avec le développement.",
        "C) Elle élimine la nécessité d'outils de gestion des défauts.",
        "D) Elle réduit la nécessité de tests d'acceptation par les utilisateurs."
      ],
      correct: 1,
      explanation: "L'approche intégrée encourage les testeurs à travailler au sein de l'équipe de développement, partageant la responsabilité de la qualité.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.2 'Approche équipe intégrée'"
    },
    {
      id: 16,
      level: "K2",
      section: "1.5.3",
      question: "Un développeur est chargé de tester ses propres modules de code. Quel type d'inconvénient est le plus susceptible de se produire en raison du manque d'indépendance des tests ?",
      options: [
        "A) Un manque de connaissance approfondie du code.",
        "B) Le « biais de confirmation » qui conduit à tester ce qui fonctionne plutôt que ce qui est le plus risqué.",
        "C) Un coût élevé du test dû à l'utilisation de ressources externes.",
        "D) Des retards dus à l'absence de documentation de la base de test."
      ],
      correct: 1,
      explanation: "Le manque d'indépendance conduit souvent à un manque d'objectivité, où la personne testant son propre travail est plus susceptible d'exercer un 'biais de confirmation' (tester ce qu'elle pense qui fonctionne).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.3 'Indépendance du test'"
    },
    {
      id: 17,
      level: "K1",
      section: "1.3.1",
      question: "Selon les principes du test, à quel moment l'activité de test devrait-elle commencer ?",
      options: [
        "A) Seulement après que le codage soit terminé.",
        "B) Le plus tôt possible dans le cycle de vie du développement ('shift-left').",
        "C) Uniquement lorsque le Test Manager a rédigé le Plan de Test final.",
        "D) Immédiatement après que le premier défaut ait été corrigé."
      ],
      correct: 1,
      explanation: "Le 'Principe 3 : Les tests précoces font économiser du temps et de l’argent' est l'un des principes fondamentaux.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.3.1 'Principes du test'"
    },
    {
      id: 18,
      level: "K2",
      section: "1.3.1",
      question: "Lequel des principes suivants explique pourquoi les testeurs doivent constamment modifier leurs techniques de test pour rester efficaces ?",
      options: [
        "A) Principe 2 : Le test exhaustif est impossible.",
        "B) Principe 4 : Les défauts se regroupent.",
        "C) Principe 6 : Le test dépend du contexte.",
        "D) Principe 5 : Attention aux tests non pertinents (effet pesticide)."
      ],
      correct: 3,
      explanation: "L'effet pesticide (Principe 5) stipule que l'utilisation répétée des mêmes tests cesse d'être efficace pour trouver de nouveaux défauts, nécessitant une révision et une modification des tests.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.3.1 'Principes du test'"
    },
    {
      id: 19,
      level: "K2",
      section: "1.4.1",
      question: "Lors de quelle activité du processus de test de base doit-on évaluer les critères de sortie (exit criteria) et préparer le Rapport de Clôture du Test ?",
      options: [
        "A) Planification des tests.",
        "B) Surveillance et contrôle des tests.",
        "C) Clôture des tests.",
        "D) Conception des tests."
      ],
      correct: 2,
      explanation: "La Clôture des tests est l'activité qui a lieu à la fin du projet (ou de l'itération) et comprend l'évaluation des critères de sortie et la capitalisation (leçons apprises).",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.4.1 'Activités et tâches de test'"
    },
    {
      id: 20,
      level: "K2",
      section: "1.5.3",
      question: "Quel est l'avantage principal d'une indépendance de test accrue ?",
      options: [
        "A) Elle facilite la communication avec les développeurs.",
        "B) Elle augmente la familiarité avec le code source.",
        "C) Elle réduit la documentation de test.",
        "D) Elle augmente l'efficacité pour trouver de nouveaux défauts en raison d'une perspective objective."
      ],
      correct: 3,
      explanation: "L'indépendance permet d'éviter les préjugés et d'aborder le produit avec une perspective plus objective, ce qui est généralement plus efficace pour trouver de nouveaux types de défauts.",
      reference: "Syllabus ISTQB CTFL v4.0 - Section 1.5.3 'Indépendance du test'"
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

export default Quiz_testfoudation1;