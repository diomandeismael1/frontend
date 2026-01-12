import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const Quiz_23 = () => {
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
      section: "2.3.1",
      question: "Quel est l'état INITIAL d'un rapport de défaut dans un cycle de vie simple des défauts ?",
      options: [
        "A) EN COURS",
        "B) OUVERT (ou NOUVEAU)",
        "C) RÉSOLU",
        "D) FERMÉ"
      ],
      correct: 1,
      explanation: "Selon le syllabus, l'état initial lorsque le rapport de défaut est créé est OUVERT (peut être appelé NOUVEAU). C'est le point de départ du cycle de vie du défaut.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.1 'Cycle de vie des défauts' - Page 59"
    },
    {
      id: 2,
      level: "K2",
      section: "2.3.1",
      question: "Dans quel état un rapport de défaut passe-t-il lorsque l'équipe travaille sur sa correction ?",
      options: [
        "A) OUVERT",
        "B) EN COURS",
        "C) RÉSOLU",
        "D) REJETÉ"
      ],
      correct: 1,
      explanation: "L'état EN COURS indique que l'équipe travaille activement sur l'analyse et/ou la correction du rapport de défaut. C'est l'état de travail actif sur le défaut.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.1 'Cycle de vie des défauts' - Page 59"
    },
    {
      id: 3,
      level: "K2",
      section: "2.3.1",
      question: "Qui est généralement responsable de faire passer un défaut à l'état FERMÉ après un test de confirmation réussi ?",
      options: [
        "A) Le développeur qui a corrigé le défaut",
        "B) Le chef de projet",
        "C) Le testeur qui exécute le test de confirmation",
        "D) Le comité de gestion des défauts"
      ],
      correct: 2,
      explanation: "Le syllabus indique que le testeur fait passer le rapport de défaut à l'état FERMÉ, soit après un test de confirmation réussi, soit pour confirmer le rejet du rapport de défaut.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.1 'Cycle de vie des défauts' - Page 59"
    },
    {
      id: 4,
      level: "K3",
      section: "2.3.1",
      question: "Vous concevez un cycle de vie des défauts pour votre organisation. Quelle bonne pratique devriez-vous suivre ?",
      options: [
        "A) Utiliser plusieurs états terminaux (FERMÉ, ANNULÉ, ARCHIVÉ)",
        "B) Permettre que deux états consécutifs appartiennent au même rôle responsable sans justification",
        "C) N'utiliser qu'un seul état terminal (ex: FERMÉ) avec raison de fermeture",
        "D) Créer un cycle de vie différent pour chaque projet"
      ],
      correct: 2,
      explanation: "Le syllabus recommande de n'utiliser qu'un seul état terminal (par exemple, FERMÉ). Le passage à cet état exige souvent de choisir une raison de fermeture, utile pour l'évaluation du processus et les activités d'amélioration. Il est aussi recommandé de définir le cycle de vie à l'échelle de l'organisation.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.1 'Cycle de vie des défauts' - Bonnes pratiques - Page 60"
    },
    {
      id: 5,
      level: "K2",
      section: "2.3.1",
      question: "Pourquoi est-il recommandé de représenter les défauts dupliqués et les faux positifs par un état distinct ?",
      options: [
        "A) Pour impressionner le management",
        "B) Car ils peuvent être utiles lors d'analyses de défauts plus poussées pour l'amélioration du processus",
        "C) Pour compliquer le workflow",
        "D) Car c'est obligatoire selon la norme ISO"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les défauts dupliqués et les faux positifs doivent être représentés par un état distinct ou une combinaison de l'état REJETÉ avec la raison du rejet. Ils peuvent être utiles lors d'analyses de défauts plus poussées dans le but d'améliorer le processus de test.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.1 'Cycle de vie des défauts' - Bonnes pratiques - Page 60"
    },
    {
      id: 6,
      level: "K2",
      section: "2.3.2",
      question: "Qui est généralement propriétaire du processus global de gestion des défauts ?",
      options: [
        "A) L'équipe de développement",
        "B) Le chef de projet uniquement",
        "C) L'organisation de test et le Test Manager",
        "D) Le fournisseur externe"
      ],
      correct: 2,
      explanation: "Le syllabus indique que bien que l'organisation de test et le Test Manager soient souvent propriétaires du processus global de gestion des défauts et de l'outil de gestion des défauts, une équipe cross-fonctionnelle est généralement responsable de la gestion des défauts pour un projet donné.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.2 'Gestion cross-fonctionnelle des défauts' - Page 60"
    },
    {
      id: 7,
      level: "K2",
      section: "2.3.2",
      question: "Quel est le rôle du comité de gestion des défauts (comité de triage) ?",
      options: [
        "A) Uniquement corriger les défauts",
        "B) Déterminer si chaque défaut doit être corrigé, rejeté ou reporté",
        "C) Exécuter les tests de confirmation",
        "D) Développer l'outil de gestion des défauts"
      ],
      correct: 1,
      explanation: "Le comité de gestion des défauts (parfois appelé comité de triage) doit déterminer si chaque rapport de défaut représente un défaut valable et s'il doit être corrigé, rejeté ou reporté. Pour prendre cette décision, le comité tient compte des avantages, des risques et des coûts associés à la correction du défaut.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.2 'Gestion cross-fonctionnelle des défauts' - Page 60"
    },
    {
      id: 8,
      level: "K2",
      section: "2.3.2",
      question: "Qui peut faire partie du comité de gestion des défauts ?",
      options: [
        "A) Uniquement les testeurs",
        "B) Test Manager, représentants du développement, fournisseurs, gestion de projet, Product Owner",
        "C) Uniquement le management",
        "D) Uniquement les développeurs"
      ],
      correct: 1,
      explanation: "Le syllabus indique que le comité de gestion des défauts peut comprendre le Test Manager, des représentants du développement, des fournisseurs, des représentants de la gestion de projet, de la gestion de produit ou du Product Owner et d'autres parties prenantes qui ont un intérêt dans le logiciel testé.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.2 'Gestion cross-fonctionnelle des défauts' - Page 60"
    },
    {
      id: 9,
      level: "K2",
      section: "2.3.3",
      question: "Dans les équipes Agile, quand un rapport de défaut formel devrait-il être créé ?",
      options: [
        "A) Pour tous les défauts sans exception",
        "B) Pour les défauts qui bloquent le sprint ou ne peuvent pas être résolus dans la même itération",
        "C) Jamais, la communication orale suffit toujours",
        "D) Uniquement en fin de projet"
      ],
      correct: 1,
      explanation: "Le syllabus indique que des rapports de défaut devraient être créés pour : les défauts qui bloquent d'autres activités du sprint, les défauts qui ne peuvent pas être résolus au cours de la même itération, les défauts qui doivent être résolus par d'autres équipes ou fournisseurs, et lorsqu'un rapport est explicitement demandé.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.3 'Particularités de la gestion des défauts dans les équipes en mode Agile' - Page 61"
    },
    {
      id: 10,
      level: "K2",
      section: "2.3.3",
      question: "Quelle est une pratique courante pour gérer les défauts qui ne peuvent pas être résolus dans une itération Agile ?",
      options: [
        "A) Les ignorer complètement",
        "B) Les ajouter au backlog du produit pour priorisation",
        "C) Les transférer automatiquement à un fournisseur externe",
        "D) Les archiver immédiatement"
      ],
      correct: 1,
      explanation: "Le syllabus indique que la pratique courante consiste à ajouter les défauts qui ne peuvent pas être résolus dans la même itération au backlog du produit afin qu'ils puissent être classés par ordre de priorité parmi d'autres défauts et User Stories pour une itération ultérieure.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.3 'Particularités de la gestion des défauts dans les équipes en mode Agile' - Page 61"
    },
    {
      id: 11,
      level: "K2",
      section: "2.3.3",
      question: "Quels facteurs devraient influencer le niveau de formalité de la gestion des défauts en Agile ?",
      options: [
        "A) Uniquement le nombre de testeurs",
        "B) Colocalisation, répartition géographique, nombre d'équipes, maturité, taille, risques",
        "C) La couleur du logo de l'entreprise",
        "D) Le jour de la semaine"
      ],
      correct: 1,
      explanation: "Le syllabus liste plusieurs facteurs : colocalisation des membres de l'équipe, répartition entre différents fuseaux horaires, nombre d'équipes coopérant, maturité de l'équipe, taille de l'équipe, risques associés au produit, et exigences réglementaires ou contractuelles.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.3 'Particularités de la gestion des défauts dans les équipes en mode Agile' - Page 61"
    },
    {
      id: 12,
      level: "K2",
      section: "2.3.4",
      question: "Quel est un défi majeur de la gestion des défauts dans le développement logiciel hybride ?",
      options: [
        "A) Le coût des ordinateurs",
        "B) L'alignement sur les attributs des défauts et les outils entre différentes équipes",
        "C) La couleur des post-it utilisés",
        "D) Le choix du langage de programmation"
      ],
      correct: 1,
      explanation: "Le syllabus identifie l'alignement sur les attributs des défauts et les outils comme un défi majeur. Dans un scénario idéal, toutes les équipes utilisent un seul outil, mais dans la pratique, il est courant que chaque équipe utilise un outil différent, nécessitant une synchronisation.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.4 'Défis liés à la gestion des défauts dans le développement de logiciels hybride' - Page 62"
    },
    {
      id: 13,
      level: "K2",
      section: "2.3.4",
      question: "Comment peut-on améliorer l'alignement du plan de test dans un environnement hybride ?",
      options: [
        "A) En ignorant les équipes Agile",
        "B) Par la participation active de toutes les équipes au processus de planification",
        "C) En imposant un modèle unique sans consultation",
        "D) En gardant tous les plans secrets"
      ],
      correct: 1,
      explanation: "Le syllabus recommande un meilleur alignement par la participation active des membres de toutes les équipes au processus de planification (par exemple, la participation des équipes du modèle séquentiel aux réunions Agile où les défauts sont discutés). La transparence peut être améliorée en partageant les plans entre équipes.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.4 'Défis liés à la gestion des défauts dans le développement de logiciels hybride' - Page 62"
    },
    {
      id: 14,
      level: "K3",
      section: "2.3.5",
      question: "Quelles informations sont OBLIGATOIRES dans un rapport de défaut pour la plupart des environnements ?",
      options: [
        "A) Le nom du testeur uniquement",
        "B) Titre, description détaillée, sévérité, priorité",
        "C) Uniquement un numéro d'identification",
        "D) La solution proposée uniquement"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour gérer un rapport de défaut dans la plupart des environnements, les éléments obligatoires sont : un titre avec bref résumé, une description détaillée avec étapes de reproduction, la sévérité de l'impact, et la priorité de correction.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.5 'Informations des rapports de défaut' - Page 63"
    },
    {
      id: 15,
      level: "K2",
      section: "2.3.5",
      question: "Quelles données sont généralement créées automatiquement par l'outil de gestion des défauts ?",
      options: [
        "A) La description détaillée du défaut",
        "B) Identifiant unique, date/heure de création, nom du créateur, état actuel",
        "C) La solution au problème",
        "D) Les étapes de reproduction"
      ],
      correct: 1,
      explanation: "Le syllabus liste les données automatiquement créées par l'outil : identifiant unique, date/heure de création, nom de la personne qui a découvert/signalé l'anomalie, projet et phase, état actuel, propriétaire actuel, et historique des modifications.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.5 'Informations des rapports de défaut' - Page 63"
    },
    {
      id: 16,
      level: "K2",
      section: "2.3.5",
      question: "Pourquoi devrait-on limiter les attributs collectés dans un rapport de défaut ?",
      options: [
        "A) Pour économiser de l'espace disque",
        "B) Car chaque attribut supplémentaire augmente le temps et peut accroître la confusion",
        "C) Pour cacher des informations",
        "D) Car c'est plus joli visuellement"
      ],
      correct: 1,
      explanation: "Le syllabus indique que chaque attribut supplémentaire augmente le temps consacré au rapport de défauts et peut accroître la confusion de la personne qui saisit le rapport. Il est donc conseillé de ne collecter que les données nécessaires à la gestion des défauts et/ou qui seront utilisées pour l'amélioration du processus.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.5 'Informations des rapports de défaut' - Page 63"
    },
    {
      id: 17,
      level: "K2",
      section: "2.3.5",
      question: "Quelles informations aident à la résolution des défauts ?",
      options: [
        "A) Le nom du testeur uniquement",
        "B) Le sous-système/composant, l'élément de test, sa version, l'environnement de test",
        "C) La couleur de l'interface",
        "D) Le nombre de lignes de code"
      ],
      correct: 1,
      explanation: "Le syllabus indique que pour aider à la résolution des défauts, les informations utiles incluent : le sous-système ou composant où se situe le défaut, l'élément du test spécifique et son numéro de version, et l'environnement de test dans lequel le défaut a été observé.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.5 'Informations des rapports de défaut' - Page 63"
    },
    {
      id: 18,
      level: "K2",
      section: "2.3.6",
      question: "Comment les informations sur les phases d'introduction, détection et élimination des défauts peuvent-elles être utilisées ?",
      options: [
        "A) Pour décorer les rapports",
        "B) Pour évaluer le confinement de phase et effectuer une analyse du coût de la qualité",
        "C) Pour augmenter le nombre de réunions",
        "D) Pour réduire le nombre de testeurs"
      ],
      correct: 1,
      explanation: "Le syllabus indique que l'utilisation des informations relatives aux phases d'introduction, de détection et d'élimination des défauts permet d'évaluer le confinement de phase et/ou d'effectuer une analyse du coût de la qualité dans le but de suggérer des moyens d'améliorer l'efficacité de la détection des défauts.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.6 'Définition des actions d'amélioration du processus à l'aide des rapports de défaut' - Page 64"
    },
    {
      id: 19,
      level: "K2",
      section: "2.3.6",
      question: "À quoi servent les informations sur les défauts dupliqués et rejetés ?",
      options: [
        "A) À rien du tout",
        "B) À évaluer la qualité de la création des rapports de défauts",
        "C) À augmenter le nombre de défauts",
        "D) À remplacer les testeurs"
      ],
      correct: 1,
      explanation: "Le syllabus indique que l'utilisation d'informations sur les défauts dupliqués et rejetés permet d'évaluer la qualité de la création des rapports de défauts, ce qui peut mener à des améliorations du processus de reporting.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.6 'Définition des actions d'amélioration du processus à l'aide des rapports de défaut' - Page 64"
    },
    {
      id: 20,
      level: "K2",
      section: "2.3.6",
      question: "Quel est l'impact de ne pas suivre les défauts pendant certaines phases du SDLC ?",
      options: [
        "A) Amélioration de la qualité",
        "B) Réduction considérable de la visibilité sur les capacités du processus",
        "C) Augmentation de la motivation des testeurs",
        "D) Aucun impact"
      ],
      correct: 1,
      explanation: "Le syllabus indique que bien que la décision de ne pas suivre les défauts soit souvent prise au nom de l'efficience, elle réduit considérablement la visibilité sur les capacités du processus de développement et de test de logiciels, rendant les améliorations difficiles à mettre en œuvre en raison d'un manque de données fiables.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 2.3.6 'Définition des actions d'amélioration du processus à l'aide des rapports de défaut' - Page 64-65"
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

export default Quiz_23;