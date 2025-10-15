import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const TestContext = () => {
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
      section: "1.2.1",
      question: "Parmi les parties prenantes suivantes, lesquelles sont principalement responsables de la spécification des exigences et de la définition du niveau de qualité requis ?",
      options: [
        "A) Les testeurs et test leads",
        "B) Les chefs de projet, Product Owners et utilisateurs métier",
        "C) Les développeurs uniquement",
        "D) L'équipe d'exploitation"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les chefs de projet, Product Owners et utilisateurs métier spécifient les exigences, définissent le niveau de qualité requis et recommandent la couverture nécessaire basée sur les risques perçus. Ils participent également aux tests d'acceptation utilisateurs (UAT).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.1 'Les parties prenantes du test' - Page 21"
    },
    {
      id: 2,
      level: "K2",
      section: "1.2.1",
      question: "Quel rôle joue l'équipe d'exploitation en tant que partie prenante des tests ?",
      options: [
        "A) Elle développe le code source",
        "B) Elle participe aux tests d'acceptation opérationnelle et définit les exigences non fonctionnelles",
        "C) Elle crée les cas de test uniquement",
        "D) Elle remplace les testeurs"
      ],
      correct: 1,
      explanation: "Le syllabus précise que l'équipe d'exploitation est engagée dans les tests d'acceptation opérationnelle, elle veille à ce que le système soit prêt pour la production et contribue à la définition des exigences non fonctionnelles.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.1 'Les parties prenantes du test' - Page 21"
    },
    {
      id: 3,
      level: "K2",
      section: "1.2.2",
      question: "Quelle est l'utilité PRINCIPALE de la matrice des parties prenantes (matrice pouvoir-intérêt) ?",
      options: [
        "A) Augmenter le budget du projet",
        "B) Hiérarchiser l'engagement des parties prenantes et gérer les attentes de manière efficiente",
        "C) Réduire le nombre de testeurs",
        "D) Éliminer les parties prenantes"
      ],
      correct: 1,
      explanation: "Le syllabus indique que la matrice des parties prenantes (matrice pouvoir-intérêt) aide les Test Managers à hiérarchiser l'engagement des parties prenantes et à gérer les attentes de manière efficiente. C'est un outil de gestion stratégique.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.2 'Importance de la connaissance des parties prenantes' - Page 22"
    },
    {
      id: 4,
      level: "K2",
      section: "1.2.2",
      question: "Comment sont appelées les parties prenantes avec une influence élevée et un intérêt élevé dans la matrice ?",
      options: [
        "A) Apathiques",
        "B) Promoteurs",
        "C) Latents",
        "D) Défenseurs"
      ],
      correct: 1,
      explanation: "Le syllabus définit les Promoteurs comme des collaborateurs clés ayant une grande influence et un grand intérêt, essentiels pour élaborer la stratégie de test et le plan. Ils se trouvent dans le quadrant influence élevée/intérêt élevé.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.2 'Importance de la connaissance des parties prenantes' - Page 22"
    },
    {
      id: 5,
      level: "K2",
      section: "1.2.2",
      question: "Quelle catégorie de parties prenantes a une influence élevée mais un faible intérêt ?",
      options: [
        "A) Promoteurs",
        "B) Défenseurs",
        "C) Latents",
        "D) Apathiques"
      ],
      correct: 2,
      explanation: "Le syllabus définit les Latents comme ayant une influence élevée mais un faible intérêt. Bien qu'elles ne s'intéressent pas forcément aux tâches quotidiennes, leurs décisions sont essentielles pour l'affectation des ressources et l'orientation du projet à haut niveau.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.2 'Importance de la connaissance des parties prenantes' - Page 22"
    },
    {
      id: 6,
      level: "K2",
      section: "1.2.2",
      question: "Comment devrait-on gérer les parties prenantes 'Défenseurs' (faible influence, intérêt élevé) ?",
      options: [
        "A) Les ignorer complètement",
        "B) Les maintenir engagées avec des mises à jour régulières et leur participation à des discussions spécifiques",
        "C) Les transformer en développeurs",
        "D) Réduire leur niveau d'intérêt"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les Défenseurs (faible influence, intérêt élevé) fournissent souvent un retour d'information qualitatif et peuvent être maintenues engagées grâce à des mises à jour régulières et à leur participation à des discussions spécifiques.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.2 'Importance de la connaissance des parties prenantes' - Page 22"
    },
    {
      id: 7,
      level: "K2",
      section: "1.2.3",
      question: "Pourquoi une organisation utiliserait-elle un modèle de développement logiciel HYBRIDE ?",
      options: [
        "A) Pour compliquer inutilement le processus",
        "B) Pour faciliter la transition vers Agile ou s'adapter à des besoins spécifiques (projets à haut risque)",
        "C) Pour réduire la qualité du produit",
        "D) Pour éliminer tous les tests"
      ],
      correct: 1,
      explanation: "Le syllabus explique que les modèles hybrides sont utilisés soit comme transition vers Agile (facilitant les changements progressifs), soit comme approche adaptée à l'objectif (certains projets à haut risque peuvent nécessiter des tâches séquentielles pour certaines choses et des pratiques Agile pour d'autres).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.3 'Le Management des tests dans un modèle de développement logiciel hybride' - Page 23"
    },
    {
      id: 8,
      level: "K2",
      section: "1.2.3",
      question: "Dans un framework hybride, que doit évaluer le Test Manager concernant l'équipe ?",
      options: [
        "A) Uniquement le salaire des membres",
        "B) La compréhension et la facilité de l'équipe à effectuer une transition transparente entre méthodologies",
        "C) La couleur des vêtements",
        "D) Le nombre de pauses café"
      ],
      correct: 1,
      explanation: "Le syllabus indique que dans un cadre hybride, le Test Manager doit évaluer la compréhension et la facilité de l'équipe à effectuer une transition transparente entre les méthodologies traditionnelles et Agile, identifier les forces et faiblesses dans l'adaptation à une approche hybride.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.3 'Le Management des tests dans un modèle de développement logiciel hybride' - Page 23"
    },
    {
      id: 9,
      level: "K2",
      section: "1.2.4",
      question: "Dans un modèle de développement SÉQUENTIEL (ex: modèle en V), comment est réalisée l'estimation des tests ?",
      options: [
        "A) Estimation itérative, partie de la planification des Stories par itération",
        "B) Estimation détaillée précoce pour chaque niveau de test",
        "C) Pas d'estimation du tout",
        "D) Estimation uniquement à la fin du projet"
      ],
      correct: 1,
      explanation: "Selon le tableau comparatif du syllabus, dans un modèle de développement séquentiel (ex: modèle en V), l'estimation est détaillée et précoce pour chaque niveau de test. En comparaison, dans les modèles itératifs (ex: SCRUM), l'estimation est itérative et fait partie de la planification des Stories.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.4 'Activités de management des tests pour différents modèles de SDLC' - Tableau 1 - Page 24"
    },
    {
      id: 10,
      level: "K2",
      section: "1.2.4",
      question: "Comment les rôles diffèrent-ils entre un modèle séquentiel et un modèle itératif (Agile) ?",
      options: [
        "A) Il n'y a aucune différence",
        "B) Séquentiel: Test Manager supervise; Itératif: rôles intégrés, facilitateur/coach remplace le Test Manager traditionnel",
        "C) Les testeurs n'existent pas en Agile",
        "D) Le Test Manager a plus de pouvoir en Agile"
      ],
      correct: 1,
      explanation: "Le syllabus indique que dans un modèle séquentiel, le Test Manager supervise les décisions et la gestion de l'équipe, tandis que dans un modèle itératif, les rôles sont intégrés et le facilitateur ou coach remplace le Test Manager traditionnel.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.4 'Activités de management des tests pour différents modèles de SDLC' - Tableau 1 - Page 24"
    },
    {
      id: 11,
      level: "K2",
      section: "1.2.4",
      question: "Quel type d'outils est CENTRAL dans un modèle de développement itératif (Agile) ?",
      options: [
        "A) Outils de documentation lourde uniquement",
        "B) Outils pour CI/CD et l'automatisation",
        "C) Aucun outil n'est utilisé",
        "D) Uniquement des outils de gestion de projet Waterfall"
      ],
      correct: 1,
      explanation: "Le syllabus précise que dans les modèles itératifs, les outils pour CI/CD (Intégration Continue/Déploiement Continu) et l'automatisation sont centraux, soutenant les tests en continu. Les modèles séquentiels utilisent principalement des outils de management des tests adaptés aux tests par phase.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.4 'Activités de management des tests pour différents modèles de SDLC' - Tableau 1 - Page 24"
    },
    {
      id: 12,
      level: "K2",
      section: "1.2.4",
      question: "Comment le suivi et le reporting diffèrent-ils entre les modèles séquentiels et itératifs ?",
      options: [
        "A) Il n'y a pas de reporting en Agile",
        "B) Séquentiel: rapports basés sur des jalons; Itératif: reporting continu avec tableaux de bord en temps réel",
        "C) Le reporting est identique",
        "D) Séquentiel: pas de reporting; Itératif: rapports annuels"
      ],
      correct: 1,
      explanation: "Le syllabus indique que dans les modèles séquentiels, les rapports sont basés sur des jalons avec en option des tableaux de bord automatisés, tandis que dans les modèles itératifs, le reporting est continu avec des tableaux de bord en temps réel et des mises à jour quotidiennes de l'état d'avancement.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.4 'Activités de management des tests pour différents modèles de SDLC' - Tableau 1 - Page 24"
    },
    {
      id: 13,
      level: "K2",
      section: "1.2.5",
      question: "Pour les tests de COMPOSANTS (tests unitaires), quelle activité le Test Manager doit-il réaliser ?",
      options: [
        "A) Ignorer complètement ce niveau de test",
        "B) Définir le périmètre, objectifs et critères de clôture; impliquer les testeurs dans les revues de code",
        "C) Exécuter personnellement tous les tests unitaires",
        "D) Éliminer les tests unitaires"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour les tests de composants, le Test Manager doit définir le périmètre, les objectifs et les critères de clôture, et impliquer les testeurs dans des activités allant au-delà des rôles traditionnels, comme les revues de code où leurs compétences analytiques apportent une valeur ajoutée.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.5 'Activités de management des tests à différents niveaux de test' - Page 25"
    },
    {
      id: 14,
      level: "K2",
      section: "1.2.5",
      question: "Pour les tests d'ACCEPTATION, que doit coordonner le Test Manager ?",
      options: [
        "A) Uniquement les tests unitaires",
        "B) La logistique des tests d'acceptation, faciliter les tests sur site client, gérer les tests UAT",
        "C) L'architecture du système",
        "D) Le développement du code"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour les tests d'acceptation, le Test Manager doit collaborer avec les parties prenantes, coordonner la logistique, faciliter les tests sur le site du client, s'assurer que le produit répond aux besoins métier, et guider les parties prenantes tout au long du processus d'approbation.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.5 'Activités de management des tests à différents niveaux de test' - Page 25"
    },
    {
      id: 15,
      level: "K2",
      section: "1.2.6",
      question: "Que comprend le management des tests FONCTIONNELS ?",
      options: [
        "A) Uniquement les tests de performance",
        "B) Planification stratégique alignée sur les exigences fonctionnelles et coordination des ressources",
        "C) Ignorer toutes les exigences fonctionnelles",
        "D) Tests de sécurité uniquement"
      ],
      correct: 1,
      explanation: "Le syllabus indique que le management des tests fonctionnels comprend : l'élaboration d'une stratégie de test détaillée qui s'aligne sur les exigences fonctionnelles et objectifs du projet, ainsi que l'allocation efficiente des ressources humaines et techniques pour couvrir tous les aspects fonctionnels.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.6 'Activités de management des tests pour différents types de tests' - Page 26"
    },
    {
      id: 16,
      level: "K2",
      section: "1.2.6",
      question: "Que doit faire le Test Manager pour les tests NON-FONCTIONNELS ?",
      options: [
        "A) Les ignorer complètement",
        "B) Établir des benchmarks de performance et superviser les tests de conformité aux normes",
        "C) Se concentrer uniquement sur les tests fonctionnels",
        "D) Remplacer tous les tests fonctionnels par des tests non-fonctionnels"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour les tests non-fonctionnels, le Test Manager doit établir des benchmarks de performance et gérer les activités qui évaluent le système par rapport à ces critères, ainsi que superviser les tests qui garantissent la conformité aux normes non fonctionnelles (sécurité, utilisabilité, fiabilité).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.6 'Activités de management des tests pour différents types de tests' - Page 26"
    },
    {
      id: 17,
      level: "K2",
      section: "1.2.6",
      question: "Pour les tests BOÎTE BLANCHE, que doit gérer le Test Manager ?",
      options: [
        "A) Uniquement les interfaces utilisateur",
        "B) L'optimisation de la couverture du code et l'intégration des connaissances techniques",
        "C) Ignorer la structure interne du code",
        "D) Se concentrer uniquement sur les tests boîte noire"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour les tests boîte blanche, le Test Manager doit superviser l'utilisation d'outils de couverture de code pour identifier les lacunes et orienter les ressources, et gérer l'incorporation des connaissances techniques dans la planification des tests en comprenant le fonctionnement interne.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.6 'Activités de management des tests pour différents types de tests' - Page 26"
    },
    {
      id: 18,
      level: "K2",
      section: "1.2.7",
      question: "Dans la PLANIFICATION des tests, que doit inclure une définition complète du périmètre ?",
      options: [
        "A) Uniquement le nom du projet",
        "B) Toutes les exigences fonctionnelles et non fonctionnelles, implications des tests boîte noire et blanche",
        "C) La couleur du logo",
        "D) Uniquement le budget"
      ],
      correct: 1,
      explanation: "Le syllabus indique qu'un plan de test doit être méticuleusement élaboré avec une définition complète du périmètre, incluant l'identification de toutes les exigences fonctionnelles et non fonctionnelles, ainsi que les implications des méthodologies de test boîte noire et boîte blanche.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.7 'Activités de management des tests pour la planification, le pilotage et le contrôle' - Page 27"
    },
    {
      id: 19,
      level: "K2",
      section: "1.2.7",
      question: "Que doit inclure un framework de gestion des risques robuste dans le plan de test ?",
      options: [
        "A) Uniquement une liste de risques",
        "B) Analyse d'impact détaillée, identification des vulnérabilités et stratégies d'atténuation",
        "C) Ignorer tous les risques",
        "D) Aucune considération de risque"
      ],
      correct: 1,
      explanation: "Le syllabus indique qu'un framework de gestion des risques robuste doit inclure une analyse d'impact détaillée en identifiant les vulnérabilités et défis potentiels, ainsi que le développement de stratégies d'atténuation impliquant une planification préventive pour contourner ou minimiser ces risques efficacement.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.7 'Activités de management des tests pour la planification, le pilotage et le contrôle' - Page 27"
    },
    {
      id: 20,
      level: "K2",
      section: "1.2.7",
      question: "Dans le CONTRÔLE des tests, que signifie 'gestion adaptable des processus' ?",
      options: [
        "A) Ne jamais changer l'approche de test",
        "B) Ajuster dynamiquement le processus en réponse aux nouvelles connaissances et à l'évolution du projet",
        "C) Ignorer tous les changements",
        "D) Arrêter complètement les tests"
      ],
      correct: 1,
      explanation: "Le syllabus indique que le contrôle des tests consiste à ajuster dynamiquement le processus de test en réponse aux nouvelles connaissances, aux défis et à l'évolution de la dynamique du projet. Cela exige du Test Manager qu'il soit réactif et flexible, capable d'implémenter des changements dans l'approche des tests.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.2.7 'Activités de management des tests pour la planification, le pilotage et le contrôle' - Page 28"
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

export default TestContext;