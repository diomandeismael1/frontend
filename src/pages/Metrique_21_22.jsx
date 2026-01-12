import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const Quiz_21 = () => {
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
      section: "2.1.1",
      question: "Parmi les métriques suivantes, laquelle est une métrique de PROJET ?",
      options: [
        "A) Efficience de la détection des défauts",
        "B) Pourcentage de tests exécutés réussis et échoués",
        "C) Niveau de maturité des tests",
        "D) Capacité du processus de test"
      ],
      correct: 1,
      explanation: "Les métriques de projet mesurent les progrès réalisés par rapport aux critères de sortie du projet, tels que le pourcentage de tests exécutés, réussis et échoués. Les options A, C et D sont des métriques de processus qui mesurent la capacité et l'efficacité du processus de test.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1 'Métriques de test' - Introduction - Page 50"
    },
    {
      id: 2,
      level: "K2",
      section: "2.1.1",
      question: "Quelle est la différence entre les métriques de produit et les métriques de processus ?",
      options: [
        "A) Les métriques de produit mesurent les attributs du produit, les métriques de processus mesurent la capacité du processus de test",
        "B) Il n'y a pas de différence",
        "C) Les métriques de produit sont pour Agile, les métriques de processus pour le modèle en V",
        "D) Les métriques de produit sont moins importantes que les métriques de processus"
      ],
      correct: 0,
      explanation: "Le syllabus définit clairement que les métriques de produit mesurent les attributs du produit (comme le degré auquel le produit répond aux attentes de qualité), tandis que les métriques de processus mesurent la capacité du processus de test et l'efficacité des tests.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1 'Métriques de test' - Introduction - Page 50"
    },
    {
      id: 3,
      level: "K2",
      section: "2.1.1",
      question: "Parmi les métriques suivantes, laquelle est utilisée à la fois pour le pilotage/contrôle des tests ET pour la clôture des tests ?",
      options: [
        "A) Estimation réelle vs planifiée pour les activités de test",
        "B) Couverture des exigences",
        "C) Nombre cumulé de défauts résolus par rapport au nombre cumulé de défauts",
        "D) Cas de tests automatisés réels vs planifiés"
      ],
      correct: 1,
      explanation: "Selon le tableau 2 du syllabus, la couverture des exigences et la couverture des risques produit sont les métriques qui peuvent être utilisées à la fois pour le pilotage/contrôle des tests (pour mesurer l'avancement) et pour la clôture des tests (pour mesurer l'atteinte des objectifs).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1.1 'Métriques pour les activités de gestion des tests' - Tableau 2 - Page 51"
    },
    {
      id: 4,
      level: "K2",
      section: "2.1.2",
      question: "Quel est l'objectif principal du pilotage des tests ?",
      options: [
        "A) Fournir des directives et des actions correctives",
        "B) Collecter des données concernant le test et l'évaluation associés",
        "C) Consolider les leçons apprises",
        "D) Définir les objectifs de test"
      ],
      correct: 1,
      explanation: "Le syllabus définit le pilotage des tests comme l'activité qui consiste à collecter des données concernant le test et l'évaluation associés. Il sert à évaluer l'avancement du test et à vérifier le respect des critères de sortie. Le contrôle des tests, quant à lui, utilise ces informations pour fournir des directives et actions correctives.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1.2 'Pilotage, contrôle et clôture' - Page 51-52"
    },
    {
      id: 5,
      level: "K2",
      section: "2.1.2",
      question: "Quelle est la différence entre un indicateur principal (leading) et un indicateur retardé (lagging) ?",
      options: [
        "A) Les indicateurs principaux mesurent des activités en cours qui prédisent la qualité future",
        "B) Les indicateurs retardés sont plus importants que les indicateurs principaux",
        "C) Les indicateurs principaux sont utilisés uniquement en Agile",
        "D) Il n'y a pas de différence significative"
      ],
      correct: 0,
      explanation: "Le syllabus explique que la couverture de code est un indicateur principal (leading) car elle mesure une activité en cours qui prédit la qualité future. Les défauts en production, le taux de réouverture et le coût des défauts sont des indicateurs retardés (lagging) car ils mesurent des résultats après coup.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1.2 'Pilotage, contrôle et clôture' - Page 52"
    },
    {
      id: 6,
      level: "K2",
      section: "2.1.3",
      question: "Pourquoi le Test Manager doit-il comprendre que même avec 100% de couverture structurelle aux niveaux inférieurs, des défauts peuvent rester ?",
      options: [
        "A) Car les outils de couverture ne fonctionnent pas correctement",
        "B) Car des défauts et des risques de qualité restent à traiter à des niveaux de test plus élevés",
        "C) Car 100% de couverture est impossible à atteindre",
        "D) Car les développeurs introduisent toujours de nouveaux défauts"
      ],
      correct: 1,
      explanation: "Le syllabus indique clairement que le Test Manager doit comprendre que même si les tests de composants et les tests d'intégration des composants atteignent 100% de leur couverture structurelle, des défauts et des risques de qualité restent à traiter à des niveaux de test plus élevés (système, intégration système, acceptation).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1.3 'Rapports de test' - Page 52"
    },
    {
      id: 7,
      level: "K2",
      section: "2.1.3",
      question: "Parmi les métriques relatives aux défauts suivantes, laquelle aide à identifier les zones de haute densité de défauts ?",
      options: [
        "A) Nombre cumulé de défauts résolus",
        "B) Ventilation du nombre de défauts par composants/éléments du test",
        "C) Statut des défauts (ouvert, fermé)",
        "D) Nombre total de défauts uniquement"
      ],
      correct: 1,
      explanation: "Le syllabus indique que la ventilation du nombre ou du pourcentage de défauts catégorisés par éléments du test ou composants peut être utilisée pour identifier les zones de forte densité de défauts ou de sévérité des défauts, et évaluer l'efficience et l'efficacité des tests.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1.3 'Rapports de test' - Métriques relatives aux défauts - Page 53"
    },
    {
      id: 8,
      level: "K4",
      section: "2.1.3",
      question: "Vous observez que 95% des tests planifiés sont exécutés, 80% réussis, 15% échoués. Il reste 10 jours avant la release. Les défauts ouverts diminuent lentement. Quelle est la décision la PLUS appropriée ?",
      options: [
        "A) Livrer immédiatement car 95% des tests sont exécutés",
        "B) Continuer les tests et analyser les tendances des défauts avant de décider",
        "C) Arrêter tous les tests car on approche de la deadline",
        "D) Recommencer tous les tests depuis le début"
      ],
      correct: 1,
      explanation: "Bien que 95% des tests soient exécutés, le taux d'échec de 15% et la diminution lente des défauts ouverts suggèrent que la qualité n'est pas encore stable. Le syllabus indique que lorsque l'exécution des tests se poursuit et que de moins en moins de défauts sont identifiés, il est possible de prendre la décision de mettre fin aux tests, mais cette décision doit être basée sur les rapports des métriques et les critères de sortie convenus. Il faut donc continuer le pilotage.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.1.3 'Rapports de test' - Page 53"
    },
    {
      id: 9,
      level: "K2",
      section: "2.2.1",
      question: "Que doit principalement estimer un Test Manager dans l'estimation de test ?",
      options: [
        "A) Uniquement le nombre de défauts qui seront trouvés",
        "B) Le temps, les efforts et les coûts nécessaires à la clôture des tests",
        "C) Uniquement le nombre de testeurs nécessaires",
        "D) La qualité finale du produit"
      ],
      correct: 1,
      explanation: "Le syllabus définit l'estimation de test comme une activité de management des tests qui permet d'estimer le temps, les efforts et les coûts nécessaires à la clôture des tests. C'est l'une des tâches majeures et importantes du management des tests.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.1 'Estimation des activités qu'impliqueront les tests' - Page 54"
    },
    {
      id: 10,
      level: "K2",
      section: "2.2.1",
      question: "Dans le contexte du 'triangle temps-coût-qualité', que signifie la relation d'interdépendance entre ces trois valeurs ?",
      options: [
        "A) On peut modifier ces trois valeurs indépendamment",
        "B) Ces valeurs sont étroitement liées et s'influencent mutuellement",
        "C) Seul le temps affecte la qualité",
        "D) Le coût n'a pas d'impact sur le temps"
      ],
      correct: 1,
      explanation: "Le syllabus explique que le triangle temps-coût-qualité comprend trois valeurs qui sont interdépendantes, ce qui signifie qu'elles sont étroitement liées et s'influencent mutuellement. On ne peut pas manipuler ces valeurs de manière arbitraire car elles font partie des contraintes naturelles du projet qui nécessitent des compromis.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.1 'Estimation des activités qu'impliqueront les tests' - Page 54"
    },
    {
      id: 11,
      level: "K2",
      section: "2.2.2",
      question: "Parmi les facteurs suivants liés au PRODUIT, lequel peut influencer l'effort de test ?",
      options: [
        "A) La stabilité des processus de développement",
        "B) La complexité du domaine du produit",
        "C) Les compétences des testeurs",
        "D) Le nombre de jours fériés"
      ],
      correct: 1,
      explanation: "Le syllabus classe les facteurs influençant l'effort de test en plusieurs catégories. La complexité du domaine du produit fait partie des facteurs liés au PRODUIT. Les processus de développement sont des facteurs liés au processus, les compétences font partie des facteurs liés aux personnes, et les jours fériés sont des facteurs liés à la satisfaction des personnes.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.2 'Facteurs susceptibles d'influer sur l'effort de test' - Produit - Page 55"
    },
    {
      id: 12,
      level: "K2",
      section: "2.2.2",
      question: "Pourquoi les 'personnes' sont-elles considérées comme un facteur important dans l'estimation de l'effort de test ?",
      options: [
        "A) Car elles coûtent cher",
        "B) Car les personnes sont les ressources les plus nécessaires et toute instabilité doit être prise en compte",
        "C) Car elles travaillent lentement",
        "D) Car elles font toujours des erreurs"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les personnes sont les ressources les plus nécessaires, et toute instabilité (vacances, satisfaction, compétences, expérience) doit donc être prise en compte. Par conséquent, les personnes sont un facteur important dans l'estimation de l'effort de test.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.2 'Facteurs susceptibles d'influer sur l'effort de test' - Personnes - Page 55"
    },
    {
      id: 13,
      level: "K2",
      section: "2.2.2",
      question: "Quel facteur lié au 'processus de développement' peut influencer les estimations de test ?",
      options: [
        "A) La taille du produit à tester",
        "B) Le modèle de développement (Agile, séquentiel, hybride) en vigueur",
        "C) Le nombre de défauts trouvés",
        "D) La localisation des équipes"
      ],
      correct: 1,
      explanation: "Selon le syllabus, le modèle de développement (modèle de développement logiciel Agile/itératif, modèle de développement séquentiel, ou modèle hybride) en vigueur est un facteur lié au processus de développement qui peut influencer les estimations de test, car les tests sont directement liés au développement.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.2 'Facteurs susceptibles d'influer sur l'effort de test' - Processus de développement - Page 55"
    },
    {
      id: 14,
      level: "K2",
      section: "2.2.3",
      question: "Les techniques d'estimation de test peuvent être classées en deux catégories. Lesquelles ?",
      options: [
        "A) Techniques rapides et techniques lentes",
        "B) Techniques basées sur des métriques et techniques basées sur l'expertise",
        "C) Techniques Agile et techniques traditionnelles",
        "D) Techniques automatiques et techniques manuelles"
      ],
      correct: 1,
      explanation: "Le syllabus indique clairement que les techniques ou approches d'estimation de test peuvent être classées en deux catégories : celles basées sur des métriques (qui utilisent des données historiques) et celles basées sur l'expertise (qui utilisent l'expérience et le jugement d'experts).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' - Page 56"
    },
    {
      id: 15,
      level: "K2",
      section: "2.2.3",
      question: "Quelle technique d'estimation permet de calculer l'écart type pour mesurer l'incertitude de l'estimation ?",
      options: [
        "A) Planning Poker",
        "B) Estimation en trois points",
        "C) Méthode Delphi à large bande",
        "D) Estimation basée sur les ratios"
      ],
      correct: 1,
      explanation: "Le syllabus indique que la technique d'estimation en trois points utilise les estimations optimiste, pessimiste et la plus probable pour calculer la valeur attendue et l'écart-type de l'estimation. L'écart-type est une mesure de l'incertitude ou de la variabilité de l'estimation.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' - Erreur d'estimation - Page 56"
    },
    {
      id: 16,
      level: "K4",
      section: "2.2.3",
      question: "Vous devez estimer les tests pour un nouveau projet. Vous avez des données historiques fiables de 3 projets similaires, mais peu d'experts disponibles et un délai court. Quelle technique est la PLUS appropriée ?",
      options: [
        "A) Méthode Delphi à large bande (nécessite plusieurs experts et du temps)",
        "B) Estimation basée sur les métriques (utilise les données historiques)",
        "C) Planning Poker (nécessite toute l'équipe disponible)",
        "D) Jugement d'expert uniquement"
      ],
      correct: 1,
      explanation: "Le syllabus indique que lorsque vous disposez de données historiques fiables de projets similaires, l'estimation basée sur les métriques est la plus appropriée car elle s'appuie sur des données factuelles. La méthode Delphi et le Planning Poker nécessitent la participation d'experts/équipe et plus de temps. Le jugement d'expert seul est moins fiable quand des données sont disponibles.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' - Disponibilité des données - Page 56"
    },
    {
      id: 17,
      level: "K4",
      section: "2.2.3",
      question: "Votre projet utilise un modèle de développement séquentiel avec une équipe distribuée sur plusieurs sites. La complexité est élevée. Quelle technique d'estimation serait la PLUS adaptée ?",
      options: [
        "A) Planning Poker (adapté pour Agile, équipes colocalisées)",
        "B) Méthode Delphi à large bande (permet le consensus d'experts distants)",
        "C) Estimation rapide sans analyse",
        "D) Compter uniquement les cas de test"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour un modèle de développement séquentiel, la technique d'estimation Delphi à large bande peut être utilisée, notamment pour une complexité élevée. Elle permet de faire une estimation précise en utilisant la sagesse collective de membres d'équipe potentiellement distribués. Le Planning Poker est plus adapté à Agile avec équipes colocalisées.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' - Page 56-57"
    },
    {
      id: 18,
      level: "K2",
      section: "2.2.3",
      question: "Pourquoi les hypothèses formulées lors de l'estimation de test devraient-elles toujours être documentées ?",
      options: [
        "A) Pour remplir les exigences de documentation uniquement",
        "B) Pour permettre la révision et l'ajustement des estimations quand le contexte change",
        "C) Pour impressionner le management",
        "D) Car c'est une obligation légale"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les hypothèses formulées lors de l'estimation de test devraient toujours être documentées. Il précise aussi que toute estimation est basée sur les informations disponibles au moment où elle est préparée et que ces informations peuvent changer au fil du temps. Pour rester précises, les estimations doivent être mises à jour pour refléter les nouvelles informations et changements.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' - Page 56"
    },
    {
      id: 19,
      level: "K2",
      section: "2.2.3",
      question: "Quel est un critère de sélection important pour choisir une technique d'estimation de test ?",
      options: [
        "A) La couleur de l'outil d'estimation",
        "B) Les contraintes de calendrier (certaines techniques nécessitent plus de temps que d'autres)",
        "C) La popularité de la technique sur les réseaux sociaux",
        "D) Le coût de formation à la technique uniquement"
      ],
      correct: 1,
      explanation: "Le syllabus liste plusieurs facteurs de sélection d'une technique d'estimation, dont les contraintes de calendrier. Certaines techniques nécessitent plus de temps et d'efforts que d'autres, ce qui peut affecter la faisabilité et l'adéquation de la technique. Par exemple, le Planning Poker est facile à réaliser, alors que l'extrapolation peut être plus difficile et longue.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' - Contraintes de calendrier - Page 57"
    },
    {
      id: 20,
      level: "K4",
      section: "2.2.3",
      question: "Vous travaillez sur un projet Agile avec des sprints de 2 semaines. Vous devez estimer rapidement les User Stories pour le prochain sprint. Quelle technique est la PLUS appropriée ?",
      options: [
        "A) Estimation en trois points avec calculs mathématiques détaillés",
        "B) Planning Poker avec l'équipe Agile",
        "C) Analyse statistique complète des données historiques",
        "D) Méthode Delphi avec consultation d'experts externes pendant plusieurs jours"
      ],
      correct: 1,
      explanation: "Le syllabus indique que le Planning Poker est une technique d'estimation basée sur le consensus, principalement utilisée pour estimer l'effort ou la taille relative des User Stories dans le développement logiciel en mode Agile. C'est une variante de la méthode Delphi à large bande adaptée à Agile, rapide à mettre en œuvre et impliquant toute l'équipe.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.2.3 'Sélection des techniques d'estimation de test' + Appendice D 'Planning poker' - Page 56-57 et 92"
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
    if (percentage >= 80) return "Excellent ! Vous maîtrisez les metriques 🎯";
    if (percentage >= 60) return "Bien ! Revoyez quelques concepts clés";
    return "Relisez la section 2.1 du syllabus attentivement";
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

export default Quiz_21;