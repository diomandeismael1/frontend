import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const Quiz = () => {
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
      section: "1.6.1",
      question: "Vous êtes Test Manager et devez introduire un nouvel outil de gestion des tests. Quelle est la PREMIÈRE étape que vous devez réaliser selon les bonnes pratiques ?",
      options: [
        "A) Acheter immédiatement l'outil commercial le plus populaire du marché",
        "B) Identifier les possibilités d'amélioration des processus avec le soutien d'outils appropriés",
        "C) Former tous les testeurs à l'utilisation de l'outil",
        "D) Déployer l'outil dans tous les projets simultanément"
      ],
      correct: 1,
      explanation: "Selon le syllabus, la première bonne pratique pour l'introduction d'un outil est d'identifier les possibilités d'amélioration des processus avec le soutien d'outils appropriés. Il faut d'abord comprendre quel problème l'outil doit résoudre avant de le sélectionner, l'acheter ou le déployer.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.1 'Bonnes pratiques pour l'introduction des outils' - Page 44"
    },
    {
      id: 2,
      level: "K2",
      section: "1.6.1",
      question: "Parmi les bonnes pratiques suivantes, laquelle est recommandée APRÈS l'achat d'un outil de test mais AVANT son déploiement complet dans l'organisation ?",
      options: [
        "A) Définir qui est responsable de l'outil",
        "B) Mener un projet pilote pour valider les critères de sélection",
        "C) Implémenter un moyen de recueillir des informations à partir de l'utilisation réelle de l'outil",
        "D) Évaluer le fournisseur de l'outil"
      ],
      correct: 1,
      explanation: "Le projet pilote doit être mené après l'achat de l'outil pour valider les critères de sélection et évaluer comment l'outil s'intègre aux processus existants, avant de procéder au déploiement complet. L'évaluation du fournisseur se fait avant l'achat, et la responsabilité ainsi que la collecte d'informations sont des activités continues.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.1 'Bonnes pratiques pour l'introduction des outils' - Adoption et déploiement - Page 44-45"
    },
    {
      id: 3,
      level: "K2",
      section: "1.6.1",
      question: "Lors de l'évaluation d'un outil de test, quelle activité devriez-vous effectuer pour vous assurer de sa compatibilité avec votre environnement ?",
      options: [
        "A) Lire les avis en ligne sur l'outil",
        "B) Effectuer une évaluation de validation du concept (proof of concept)",
        "C) Vérifier uniquement le prix de l'outil",
        "D) Demander au fournisseur s'il est compatible"
      ],
      correct: 1,
      explanation: "Selon le syllabus, effectuer une évaluation de validation du concept (proof of concept - POC) est une bonne pratique essentielle pour évaluer un outil. Cela permet de vérifier concrètement si l'outil répond aux exigences et s'intègre correctement dans l'environnement technique existant.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.1 'Bonnes pratiques pour l'introduction des outils' - Évaluation et sélection - Page 44"
    },
    {
      id: 4,
      level: "K2",
      section: "1.6.1",
      question: "Quelle approche est recommandée pour l'introduction d'un outil dans l'organisation ?",
      options: [
        "A) Déployer l'outil immédiatement dans tous les projets",
        "B) Introduire l'outil dans l'organisation de manière incrémentale",
        "C) Attendre que tous les testeurs soient formés avant de déployer l'outil",
        "D) Introduire l'outil uniquement dans les projets critiques"
      ],
      correct: 1,
      explanation: "Le syllabus recommande d'introduire l'outil dans l'organisation de manière incrémentale. Cette approche permet de gérer les risques, d'apprendre progressivement et d'ajuster l'implémentation en fonction des retours d'expérience, plutôt qu'un déploiement massif qui pourrait créer des perturbations importantes.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.1 'Bonnes pratiques pour l'introduction des outils' - Adoption et déploiement - Page 45"
    },
    {
      id: 5,
      level: "K2",
      section: "1.6.2",
      question: "Une organisation développant des logiciels critiques pour la sûreté doit choisir un outil de test. Quel type d'outil est généralement PRÉFÉRÉ dans ce contexte ?",
      options: [
        "A) Un outil Open-Source pour réduire les coûts",
        "B) Un outil personnalisé développé en interne",
        "C) Un outil commercial car il répond plus souvent aux normes requises",
        "D) Un outil gratuit trouvé sur Internet"
      ],
      correct: 2,
      explanation: "Selon le syllabus, les organisations qui développent des logiciels critiques pour la sûreté ou soumises à la conformité réglementaire peuvent préférer les outils commerciaux car ils répondent plus souvent aux normes requises et possèdent souvent la certification appropriée nécessaire dans ces contextes réglementés.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.2 'Aspects techniques et métiers pour les décisions relatives aux outils' - Réglementation et sécurité - Page 45"
    },
    {
      id: 6,
      level: "K2",
      section: "1.6.2",
      question: "Concernant les aspects financiers des outils de test, quelle affirmation est CORRECTE ?",
      options: [
        "A) Les outils Open-Source n'ont aucun coût de maintenance",
        "B) Les outils commerciaux ont uniquement un coût initial, sans coûts récurrents",
        "C) Tous les outils peuvent avoir des coûts de maintenance et de support élevés",
        "D) Les outils personnalisés sont toujours les moins coûteux"
      ],
      correct: 2,
      explanation: "Le syllabus indique clairement que tous les types d'outils (Open-Source, commerciaux et personnalisés) peuvent avoir des coûts de maintenance et de support élevés. Les outils Open-Source, bien qu'ils aient généralement un coût initial moins élevé, nécessitent également de la maintenance. Les outils commerciaux ont souvent des coûts de licence récurrents.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.2 'Aspects techniques et métiers pour les décisions relatives aux outils' - Aspects financiers - Page 45"
    },
    {
      id: 7,
      level: "K2",
      section: "1.6.2",
      question: "Quel facteur devrait influencer la décision d'utiliser un outil personnalisé plutôt qu'un outil commercial ou Open-Source ?",
      options: [
        "A) Le budget disponible uniquement",
        "B) La popularité de l'outil sur le marché",
        "C) Aucun autre outil ne fournit la fonctionnalité requise",
        "D) Le nombre de testeurs dans l'organisation"
      ],
      correct: 2,
      explanation: "Selon le syllabus, les outils personnalisés peuvent être le meilleur choix pour répondre à toutes les exigences individuelles et dans les cas où aucun autre outil (commercial ou Open-Source) ne fournit la fonctionnalité requise. C'est donc l'absence d'alternative qui justifie principalement le développement d'un outil personnalisé.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.2 'Aspects techniques et métiers pour les décisions relatives aux outils' - Exigences des parties prenantes - Page 45"
    },
    {
      id: 8,
      level: "K4",
      section: "1.6.3",
      question: "Vous devez calculer le ROI d'un outil d'automatisation des tests. L'outil coûte 10 000€ (achat + formation). Les coûts de maintenance annuels sont de 2 000€. Il permet d'économiser 500 heures de tests manuels par an (valorisées à 50€/h). Quel est le temps de retour sur investissement ?",
      options: [
        "A) Moins de 6 mois",
        "B) Environ 6 mois",
        "C) Environ 1 an",
        "D) Plus de 2 ans"
      ],
      correct: 1,
      explanation: "Économie annuelle = 500h × 50€ = 25 000€. Coût annuel = 2 000€ maintenance. Bénéfice net annuel = 25 000€ - 2 000€ = 23 000€. Coût initial = 10 000€. Temps de retour = 10 000€ ÷ 23 000€/an ≈ 0,43 an ≈ 5-6 mois. Le syllabus insiste sur l'importance d'une analyse coût-bénéfice prenant en compte les coûts récurrents et non récurrents pour garantir un ROI positif.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.3 'Considérations relatives au processus de sélection et évaluation du retour sur investissement' - Page 45-47"
    },
    {
      id: 9,
      level: "K2",
      section: "1.6.3",
      question: "Parmi les éléments suivants, lequel est un coût RÉCURRENT lié à un outil de test ?",
      options: [
        "A) Définition des exigences en matière d'outils",
        "B) Frais de licence annuels et support",
        "C) Formation initiale à l'outil",
        "D) Validation du concept (Proof of Concept)"
      ],
      correct: 1,
      explanation: "Les frais récurrents de licence et de support sont des coûts qui se répètent régulièrement (généralement annuellement). Les autres options (définition des exigences, formation initiale, POC) sont des coûts non récurrents qui n'interviennent qu'une seule fois lors de l'introduction de l'outil.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.3 'Considérations relatives au processus de sélection et évaluation du retour sur investissement' - Activités et coûts récurrents - Page 46"
    },
    {
      id: 10,
      level: "K2",
      section: "1.6.3",
      question: "Qu'est-ce que le 'coût d'opportunité' dans le contexte de l'introduction d'un outil de test ?",
      options: [
        "A) Le coût de l'outil lui-même",
        "B) Le temps passé à évaluer et utiliser l'outil qui aurait pu être consacré aux tâches de test",
        "C) Le coût de formation des testeurs",
        "D) Le coût de maintenance annuel de l'outil"
      ],
      correct: 1,
      explanation: "Le syllabus définit les coûts d'opportunité comme le temps passé à évaluer, administrer, former et utiliser l'outil qui aurait pu être consacré aux tâches de test proprement dites. C'est un coût 'caché' important à prendre en compte, car des ressources de test supplémentaires peuvent être nécessaires avant que l'outil puisse être utilisé efficacement.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.3 'Considérations relatives au processus de sélection et évaluation du retour sur investissement' - Coûts d'opportunité - Page 46-47"
    },
    {
      id: 11,
      level: "K2",
      section: "1.6.3",
      question: "Parmi les avantages suivants, lequel n'est PAS mentionné dans le syllabus comme bénéfice potentiel des outils de test ?",
      options: [
        "A) Réduction du travail manuel répétitif",
        "B) Augmentation automatique de la motivation des testeurs",
        "C) Accès plus rapide aux informations sur les tests",
        "D) Réduction des erreurs humaines"
      ],
      correct: 1,
      explanation: "Le syllabus liste plusieurs avantages des outils de test (réduction du travail manuel, accélération des cycles, réduction des erreurs humaines, accès plus rapide aux informations, augmentation de la couverture), mais n'indique pas que les outils augmentent automatiquement la motivation des testeurs. La motivation est un facteur humain qui dépend de nombreux autres éléments.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.3 'Considérations relatives au processus de sélection et évaluation du retour sur investissement' - Avantages - Page 47"
    },
    {
      id: 12,
      level: "K2",
      section: "1.6.3",
      question: "Quel risque concernant le ROI d'un outil doit être pris en compte lors de sa sélection ?",
      options: [
        "A) L'outil sera toujours plus performant que prévu",
        "B) L'immaturité de l'organisation peut conduire à une utilisation inefficace de l'outil",
        "C) Les fournisseurs réduisent toujours leurs prix après l'achat",
        "D) Les outils nécessitent moins de maintenance que prévu"
      ],
      correct: 1,
      explanation: "Le syllabus identifie plusieurs risques liés au ROI, dont l'immaturité de l'organisation qui peut conduire à une utilisation inefficace de l'outil. Les autres risques mentionnés incluent des coûts plus élevés que prévu, des bénéfices moins importants que prévu, et des changements dans la politique de maintenance du fournisseur.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.3 'Considérations relatives au processus de sélection et évaluation du retour sur investissement' - Risques concernant le ROI - Page 47"
    },
    {
      id: 13,
      level: "K2",
      section: "1.6.4",
      question: "Quelle est la PREMIÈRE étape du cycle de vie d'un outil de test ?",
      options: [
        "A) Support et maintenance",
        "B) Acquisition",
        "C) Évolution",
        "D) Décommissionnement"
      ],
      correct: 1,
      explanation: "Le syllabus décrit quatre stades du cycle de vie d'un outil : 1) Acquisition (sélection et désignation d'un responsable), 2) Support et maintenance, 3) Évolution (modifications au fil du temps), 4) Décommissionnement (fin de vie). L'acquisition est logiquement la première étape.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.4 'Cycle de vie d'un outil' - Page 47"
    },
    {
      id: 14,
      level: "K2",
      section: "1.6.4",
      question: "Qui devrait être désigné comme responsable de l'outil lors de la phase d'acquisition ?",
      options: [
        "A) Le développeur principal",
        "B) Un propriétaire (owner) qui prend les décisions relatives à l'utilisation de l'outil",
        "C) Tous les testeurs collectivement",
        "D) Le fournisseur de l'outil"
      ],
      correct: 1,
      explanation: "Le syllabus indique que lors de l'acquisition, la deuxième étape consiste à désigner un responsable (parfois appelé propriétaire/owner) de l'outil. Cette personne prend les décisions relatives à l'utilisation de l'outil (par exemple, conventions de nommage, stockage des produits d'activités). Cela permet une gestion cohérente et responsable de l'outil.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.4 'Cycle de vie d'un outil' - Acquisition - Page 47"
    },
    {
      id: 15,
      level: "K2",
      section: "1.6.4",
      question: "Que se passe-t-il pendant la phase de 'Décommissionnement' d'un outil ?",
      options: [
        "A) L'outil est mis à jour vers une nouvelle version",
        "B) L'outil est retiré et les données doivent être préservées et/ou archivées",
        "C) L'outil est déployé dans de nouveaux projets",
        "D) L'outil est synchronisé avec d'autres outils"
      ],
      correct: 1,
      explanation: "Le syllabus indique que lors du décommissionnement (fin de vie de l'outil), l'outil doit être retiré. Dans la plupart des cas, les fonctionnalités seront remplacées par un nouvel outil et les données devront être préservées et/ou archivées. Cette décision peut être prise par le fournisseur ou parce que les avantages d'un nouvel outil dépassent ses coûts et risques.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.4 'Cycle de vie d'un outil' - Décommissionnement - Page 48"
    },
    {
      id: 16,
      level: "K2",
      section: "1.6.5",
      question: "Quel type de métriques un outil de gestion des tests peut-il typiquement fournir ?",
      options: [
        "A) Le moral de l'équipe de test",
        "B) L'état actuel et passé de l'exécution des tests (réussi, échoué, ignoré, bloqué)",
        "C) La qualité du code source uniquement",
        "D) Les salaires des testeurs"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les outils de gestion des tests peuvent fournir une variété de métriques différentes liées aux éléments de test disponibles, aux tests, aux tests planifiés ainsi qu'à l'état actuel et passé de l'exécution des tests (par exemple, réussi, échoué, ignoré, bloqué ou planifié).",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.5 'Métriques des outils' - Page 48"
    },
    {
      id: 17,
      level: "K2",
      section: "1.6.5",
      question: "Que peuvent fournir les outils de gestion des exigences en termes de métriques ?",
      options: [
        "A) Les performances du système sous test",
        "B) La traçabilité de la couverture des exigences par les cas de test",
        "C) La complexité du code source",
        "D) Les temps de réponse des applications"
      ],
      correct: 1,
      explanation: "Selon le syllabus, les outils de gestion des exigences assurent la traçabilité de la couverture des exigences par les cas de test passés et échoués. Cela permet de savoir quelles exigences sont couvertes par quels tests et leur statut d'exécution.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.5 'Métriques des outils' - Page 48"
    },
    {
      id: 18,
      level: "K2",
      section: "1.6.5",
      question: "Quel type d'informations les outils de gestion des défauts peuvent-ils fournir ?",
      options: [
        "A) Uniquement le nombre total de défauts",
        "B) L'état, la sévérité, la priorité et la densité de défauts des éléments du test",
        "C) Uniquement les défauts critiques",
        "D) Les performances du système"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les outils de gestion des défauts peuvent fournir des informations sur les défauts telles que l'état, la sévérité, la priorité et la densité de défauts des éléments du test. D'autres données précieuses mentionnées incluent le pourcentage de détection des défauts, les niveaux de test auxquels les défauts sont introduits et le délai de détection.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.5 'Métriques des outils' - Page 48"
    },
    {
      id: 19,
      level: "K2",
      section: "1.6.5",
      question: "Que mesurent les outils de couverture du code ?",
      options: [
        "A) Le nombre de défauts dans le code",
        "B) Quelles parties de l'objet de test ont été exercées par les tests",
        "C) La performance du système sous test",
        "D) Le nombre de testeurs nécessaires"
      ],
      correct: 1,
      explanation: "Le syllabus indique que les outils de couverture du code aident à comprendre quelles parties de l'objet du test ont été exercées par les tests. Cela permet d'identifier les zones du code qui n'ont pas été testées et d'améliorer la couverture des tests.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.5 'Métriques des outils' - Page 48"
    },
    {
      id: 20,
      level: "K2",
      section: "1.6.5",
      question: "Pourquoi les outils de test doivent-ils également 'se suivre eux-mêmes' selon le syllabus ?",
      options: [
        "A) Pour mesurer la qualité du processus de test (nombre de défauts trouvés avec/sans outils)",
        "B) Pour augmenter leur prix de vente",
        "C) Pour réduire le nombre de testeurs",
        "D) Pour remplacer les Test Managers"
      ],
      correct: 0,
      explanation: "Le syllabus indique que bien que les outils de test puissent être utilisés pour collecter des métriques, ils doivent également se suivre eux-mêmes. Dans ce contexte, la qualité du processus de test peut être mesurée (par exemple, le nombre de défauts constatés avec et sans outils, la couverture des exigences, l'efficience des tests). Cela permet d'évaluer la valeur ajoutée réelle de l'outil.",
      reference: "Syllabus ISTQB Test Management v3.0 - Section 1.6.5 'Métriques des outils' - Page 48"
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

export default Quiz;