import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const Processus = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

const questions = [
    {
      id: 1,
      level: "K2",
      section: "1.1.1",
      question: "Quel est l'objectif de test qui met l'accent sur la prévention et la détection précoce des défauts ?",
      options: [
        "A) Gagner confiance dans la qualité du produit",
        "B) Réduire le risque de défaillance pendant l'exploitation",
        "C) Aider à la prise de décision sur la publication du logiciel",
        "D) Valider que les exigences métiers sont satisfaites"
      ],
      correct: 1,
      explanation: "Bien que tous ces objectifs soient valables, la réduction du risque de défaillance se concentre sur l'idée de trouver les défauts tôt et de s'assurer qu'ils ne se manifestent pas en production, ce qui est une approche de prévention des défaillances.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.1 'Objectifs de test' - Page 17"
    },
    {
      id: 2,
      level: "K4",
      section: "1.1.2",
      question: "Mise en situation : En tant que Test Manager, vous recevez une spécification de conception architecturale. Quelle est la PREMIÈRE tâche que vous devriez entreprendre dans le processus de test ?",
      options: [
        "A) Implémenter et exécuter les cas de test pour cette spécification",
        "B) Commencer la planification détaillée du niveau de test d'intégration",
        "C) Analyser la spécification et concevoir des conditions de test de haut niveau",
        "D) Clôturer les activités de la phase précédente pour archivage"
      ],
      correct: 2,
      explanation: "La réception d'un élément de base de test (comme une spécification architecturale) déclenche l'activité d'Analyse et de Conception des tests, qui comprend l'analyse des spécifications et la conception de cas de test de haut niveau.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Analyse et Conception des tests - Page 19"
    },
    {
      id: 3,
      level: "K4",
      section: "1.1.2",
      question: "Mise en situation : Votre équipe de test est à 50% d'exécution après deux semaines de travail. Les indicateurs de pilotage montrent que 80% des tests critiques sont bloqués par un défaut majeur non corrigé. Quelle est l'action de **Contrôle** la plus appropriée ?",
      options: [
        "A) Réaffecter tous les testeurs à des tests non-critiques",
        "B) Reporter le défaut majeur et continuer l'exécution des tests bloqués",
        "C) Signaler l'écart de progression et négocier une résolution immédiate du défaut avec l'équipe de développement",
        "D) Augmenter la fréquence des rapports d'état de test"
      ],
      correct: 2,
      explanation: "Le contrôle des tests implique des actions correctives. La résolution du défaut bloquant est essentielle pour le déblocage et le respect du calendrier. Une action de contrôle doit adresser la cause de la déviation, ici la résolution du défaut majeur.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Pilotage et Contrôle des tests - Page 19"
    },
    {
      id: 4,
      level: "K2",
      section: "1.1.2",
      question: "La définition des conventions de nommage des cas de test et la sélection des outils de gestion des tests sont des tâches spécifiques de quel stade du processus de test ?",
      options: [
        "A) Planification des tests",
        "B) Implémentation des tests",
        "C) Analyse et Conception des tests",
        "D) Exécution des tests"
      ],
      correct: 1,
      explanation: "La définition de la manière de gérer et d'organiser les produits de travail de test (Testware), y compris les conventions et les outils à utiliser, est une activité de planification clé.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Planification des tests - Page 18"
    },
    {
      id: 5,
      level: "K2",
      section: "1.1.2",
      question: "L'activité de **'Création du plan de travail pour l'exécution des tests'** appartient à quel stade ?",
      options: [
        "A) Planification des tests",
        "B) Analyse et Conception des tests",
        "C) Implémentation des tests",
        "D) Pilotage des tests"
      ],
      correct: 2,
      explanation: "Le plan de travail pour l'exécution (ordonnancement des procédures de test, constitution des suites de tests) est une tâche qui se produit lors de l'Implémentation des tests, juste avant le début de l'exécution.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Implémentation et Exécution des tests - Page 19"
    },
    {
      id: 6,
      level: "K2",
      section: "1.1.2",
      question: "La **'Vérification des critères d'entrée'** est une tâche effectuée lors de quelle activité ?",
      options: [
        "A) Analyse des tests",
        "B) Planification des tests",
        "C) Pilotage et Contrôle des tests",
        "D) Clôture des tests"
      ],
      correct: 2,
      explanation: "Le Pilotage des tests est responsable du suivi et de la vérification que les conditions prédéfinies pour démarrer une activité (critères d'entrée) ou pour la terminer (critères de sortie) sont satisfaites.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Pilotage et Contrôle des tests - Page 18"
    },
    {
      id: 7,
      level: "K4",
      section: "1.1.3",
      question: "Mise en situation : Votre équipe travaille sur un produit critique pour la sûreté (high-risk). Quelle approche de la Planification des tests est la plus appropriée pour ce contexte ?",
      options: [
        "A) Une planification très détaillée et formalisée, alignée sur des normes réglementaires et un risque élevé",
        "B) Une planification légère et adaptative, se concentrant uniquement sur la prochaine itération",
        "C) Une planification qui met l'accent sur les tests de performance plutôt que les tests fonctionnels",
        "D) Ne pas faire de planification du tout pour maximiser la flexibilité"
      ],
      correct: 0,
      explanation: "Pour les produits critiques pour la sûreté ou soumis à des réglementations, le processus de test doit être très rigoureux et formel. Cela nécessite une planification détaillée, documentée, traçable et conforme aux normes en vigueur.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.4 'Facteurs influençant le processus de test' - Page 22 (applicable à 1.1.3)"
    },
    {
      id: 8,
      level: "K2",
      section: "1.1.2",
      question: "Lors de la **Clôture des tests**, quelle est l'activité qui permet de fournir des données concrètes pour les futurs projets ?",
      options: [
        "A) Évaluer les critères d'entrée du prochain niveau de test",
        "B) Mesurer la qualité du produit et du processus de test",
        "C) Réaffecter les testeurs aux autres projets",
        "D) Exécuter des tests de régression de maintenance"
      ],
      correct: 1,
      explanation: "La clôture comprend la mesure de la qualité du produit et du processus de test (leçons apprises, causes racines), fournissant des données et des métriques essentielles pour l'estimation et la planification des tests futurs (benchmarking).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Clôture des tests - Page 20"
    },
    {
      id: 9,
      level: "K2",
      section: "1.1.3",
      question: "Dans un environnement de **DevOps** avec des cycles de livraison continus, comment le processus de test est-il principalement adapté ?",
      options: [
        "A) Les tests sont concentrés à la fin (big bang) pour maximiser l'efficacité",
        "B) Les tests sont intégrés et automatisés tout au long du pipeline de livraison (Continuous Testing)",
        "C) Seuls les tests d'acceptation utilisateur sont maintenus",
        "D) La planification des tests est la seule activité maintenue"
      ],
      correct: 1,
      explanation: "Dans DevOps, pour soutenir des cycles de livraison courts et fréquents, les tests doivent être automatisés et intégrés en permanence dans le pipeline (Continuous Testing) afin de fournir un feedback rapide.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.3 'Processus de test dans le cycle de vie du développement logiciel' - Page 21"
    },
    {
      id: 10,
      level: "K2",
      section: "1.1.1",
      question: "L'objectif d'**'aider à la prise de décision sur la publication du logiciel'** est la responsabilité principale de qui ?",
      options: [
        "A) L'équipe de test seule",
        "B) Le Test Manager et les parties prenantes clés (ex : Direction, Product Owner)",
        "C) Le responsable des défauts (Defect Manager) uniquement",
        "D) L'équipe de développement seule"
      ],
      correct: 1,
      explanation: "Le Test Manager fournit les données sur l'état du risque résiduel, mais la décision finale de publication (Go/No-Go) est prise par les parties prenantes clés (direction, métier, Product Owner) qui sont responsables des risques commerciaux.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.1 'Objectifs de test' - Page 17"
    },
    {
      id: 11,
      level: "K4",
      section: "1.1.4",
      question: "Mise en situation : Votre équipe de test est expérimentée et bien formée, et le produit est à faible risque. Quel facteur influence le processus de test pour être moins formel ?",
      options: [
        "A) La présence de normes industrielles strictes",
        "B) La complexité technique élevée du système",
        "C) La compétence de l'équipe et le faible risque associé au produit",
        "D) L'utilisation d'un modèle de développement séquentiel"
      ],
      correct: 2,
      explanation: "L'expérience et la compétence des personnes (facteur Personnel et compétences) ainsi qu'un faible risque de défaillance permettent une approche de test moins formelle et moins axée sur la documentation détaillée.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.4 'Facteurs influençant le processus de test' - Page 22"
    },
    {
      id: 12,
      level: "K2",
      section: "1.1.2",
      question: "Quel est le critère d'entrée le plus important pour débuter l'activité d'**Implémentation des tests** ?",
      options: [
        "A) La conception architecturale du logiciel doit être terminée",
        "B) Les procédures de test doivent être exécutées avec succès",
        "C) Les cas de test de haut niveau doivent être conçus et approuvés",
        "D) Les défauts critiques doivent tous être corrigés"
      ],
      correct: 2,
      explanation: "L'Implémentation des tests est l'étape où les cas de test de haut niveau sont transformés en procédures de test exécutables. Elle ne peut commencer que si la conception des tests est achevée et approuvée.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Analyse et Conception des tests (Sortie) & Implémentation et Exécution (Entrée) - Page 19"
    },
    {
      id: 13,
      level: "K2",
      section: "1.1.2",
      question: "Dans quelle activité du processus de test le Test Manager est-il responsable de **'S'assurer que les produits de test sont correctement configurés et gérés'** ?",
      options: [
        "A) Planification des tests",
        "B) Exécution des tests",
        "C) Clôture des tests",
        "D) Pilotage des tests"
      ],
      correct: 0,
      explanation: "La Planification des tests définit la manière dont les tests seront gérés. Cela inclut la planification de la gestion de configuration des produits de travail de test (Testware).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Planification des tests - Page 18"
    },
    {
      id: 14,
      level: "K4",
      section: "1.1.3",
      question: "Mise en situation : Un projet doit livrer un incrément fonctionnel dans un mois, ce qui ne laisse que 5 jours pour les tests de niveau système. Quel ajustement le Test Manager doit-il considérer en premier lieu ?",
      options: [
        "A) Augmenter la portée des tests pour couvrir de nouveaux scénarios",
        "B) Prioriser l'exécution des tests sur la base des risques business (tests basés sur le risque)",
        "C) Exécuter tous les tests manuellement pour s'assurer de la qualité",
        "D) Reporter la livraison d'un mois sans négocier d'abord la portée"
      ],
      correct: 1,
      explanation: "Face à une contrainte de temps sévère, le contrôle des tests le plus efficace est d'utiliser une approche basée sur le risque pour s'assurer que les tests les plus critiques sont exécutés en priorité, maximisant la détection des défauts les plus impactants dans le temps imparti.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.3 'Processus de test dans le cycle de vie du développement logiciel' & Section 2.2.1 'Tests Basés sur le Risque' - Page 21/28"
    },
    {
      id: 15,
      level: "K2",
      section: "1.1.2",
      question: "Quelle activité du processus de test est principalement axée sur la conversion des cas de test de haut niveau en un format exécutable et le tri des cas de test ?",
      options: [
        "A) Analyse et Conception des tests",
        "B) Implémentation des tests",
        "C) Planification des tests",
        "D) Exécution des tests"
      ],
      correct: 1,
      explanation: "L'Implémentation des tests est l'étape où les tests sont préparés pour l'exécution, ce qui inclut le développement (spécification) des procédures de test à partir des cas de test de haut niveau et la création du plan d'exécution (tri/ordonnancement).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Implémentation et Exécution des tests - Page 19"
    },
    {
      id: 16,
      level: "K2",
      section: "1.1.2",
      question: "Un des objectifs du **Pilotage des tests** est de fournir des informations pour les rapports de test. À qui ces rapports sont-ils principalement destinés ?",
      options: [
        "A) Uniquement au Test Manager",
        "B) Aux parties prenantes internes et externes",
        "C) À l'équipe de développement uniquement",
        "D) Aux futurs Test Managers pour la maintenance"
      ],
      correct: 1,
      explanation: "Le Pilotage des tests sert à évaluer l'état des tests et à le communiquer aux parties prenantes internes et externes concernées par l'avancement, la qualité et le risque du produit.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Pilotage et Contrôle des tests - Page 18"
    },
    {
      id: 17,
      level: "K4",
      section: "1.1.4",
      question: "Mise en situation : La direction souhaite que le processus de test soit aussi rapide et léger que possible. Le produit est une application web non critique. Quel facteur est le plus susceptible de dicter un processus de test **léger et informel** ?",
      options: [
        "A) L'utilisation de spécifications des exigences très détaillées",
        "B) Les contraintes de temps et de budget serrées",
        "C) Le faible risque de défaillance (produit non critique) et la faible formalité requise",
        "D) Le manque d'outils d'automatisation des tests"
      ],
      correct: 2,
      explanation: "Une faible formalité requise (souvent liée à un faible risque) et des contraintes budgétaires/temporelles sont des facteurs qui poussent à l'adoption d'un processus de test léger et moins axé sur la documentation formelle.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.4 'Facteurs influençant le processus de test' - Page 22"
    },
    {
      id: 18,
      level: "K2",
      section: "1.1.2",
      question: "Dans le cadre de l'activité d'**Exécution des tests**, quel est l'enregistrement clé produit ?",
      options: [
        "A) Les cas de test de haut niveau",
        "B) Les journaux d'exécution (log) et les rapports d'anomalies (défauts)",
        "C) Le Plan de Test final",
        "D) Le critère de sortie défini"
      ],
      correct: 1,
      explanation: "Pendant l'exécution, les actions sont consignées (journal d'exécution), les résultats sont enregistrés, et les écarts par rapport aux résultats attendus sont documentés comme des anomalies (défauts).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Implémentation et Exécution des tests - Page 19"
    },
    {
      id: 19,
      level: "K4",
      section: "1.1.2",
      question: "Mise en situation : Les critères de sortie (Exit Criteria) de la phase de test spécifient que '95% des tests planifiés doivent être réussis' et 'tous les défauts critiques doivent être corrigés'. L'équipe a atteint 98% de succès, mais deux défauts critiques sont toujours en attente de correction. Quelle activité doit être engagée ?",
      options: [
        "A) Procéder à la clôture des tests immédiatement car le pourcentage de succès est atteint",
        "B) Négocier une révision des critères de sortie avec les parties prenantes avant de poursuivre",
        "C) Demander à l'équipe de développement de corriger les défauts critiques avant de clôturer",
        "D) Déplacer les tests critiques restants vers le test de maintenance"
      ],
      correct: 1,
      explanation: "Les critères de sortie sont des conditions nécessaires pour mettre fin à un niveau de test. Si tous les critères ne sont pas remplis, le Test Manager doit négocier avec les parties prenantes pour soit prolonger le test (action de contrôle), soit réviser formellement les critères de sortie (acceptation du risque résiduel).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Pilotage et Contrôle des tests - Page 18"
    },
    {
      id: 20,
      level: "K2",
      section: "1.1.2",
      question: "Dans l'activité d'**Analyse et Conception des tests**, quelle tâche est réalisée **avant** la conception des cas de test de haut niveau ?",
      options: [
        "A) L'exécution des procédures de test",
        "B) La définition des conditions de test",
        "C) La planification détaillée de l'exécution",
        "D) La vérification de l'environnement de test"
      ],
      correct: 1,
      explanation: "L'Analyse et la Conception des tests se déroulent dans cet ordre : 1) Définir/Analyser les **conditions de test** (quoi tester) puis 2) Concevoir les **cas de test** (comment tester le quoi) pour couvrir ces conditions.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.1.2 'Activités de test' - Analyse et Conception des tests - Page 19"
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
          <h2 className="text-3xl font-bold mb-2">Quiz Section 1.1 Terminé !</h2>
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
                <span className="text-sm text-black">
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

export default Processus;