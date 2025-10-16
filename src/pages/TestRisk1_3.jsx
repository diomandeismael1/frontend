import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const TestRisk = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

const questions = [
  {
    id: 1,
    level: "K3",
    section: "1.3.1",
    question: "Mise en situation : Vous êtes Test Manager sur un projet e-commerce critique. Lors de l'identification des risques, vous identifiez que le module de paiement a une probabilité élevée de défaillance (équipe développement inexpérimentée) et un impact très élevé (perte de revenus directs). Un autre risque : le moteur de recherche a une probabilité faible mais un impact moyen. Selon le test basé sur les risques, laquelle de ces affirmations est correcte ?",
    options: [
      "A) Les deux domaines doivent recevoir exactement le même effort de test",
      "B) Le module de paiement doit recevoir plus d'effort de test dès le début du cycle",
      "C) Le moteur de recherche doit être testé en priorité car il affecte tous les utilisateurs",
      "D) Aucun des deux ne nécessite de tests approfondis"
    ],
    correct: 1,
    explanation: "Le test basé sur les risques priorise l'effort de test en fonction du niveau de risque (combinaison de probabilité et d'impact). Le module de paiement présente un niveau de risque élevé (haute probabilité × impact très élevé), donc il doit recevoir une couverture de test plus intensive et commencer plus tôt dans le cycle.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.1 et 1.3.4 - Pages 29-32"
  },
  {
    id: 2,
    level: "K4",
    section: "1.3.2",
    question: "Mise en situation : Vous dirigez l'identification des risques pour un système de gestion hospitalière. Vous avez impliqué 5 experts métier internes. Après deux semaines, vous découvrez que plusieurs risques critiques liés à l'intégration avec les systèmes de laboratoire n'ont pas été mentionnés. Quel est le problème PRINCIPAL ?",
    options: [
      "A) Les experts étaient tous incompétents",
      "B) Vous avez impliqué un panel trop étroit; il fallait inclure les techniciens de laboratoire",
      "C) L'identification des risques n'est pas fiable",
      "D) Les risques d'intégration n'existent pas vraiment"
    ],
    correct: 1,
    explanation: "L'implication de l'échantillon le plus large possible de parties prenantes pertinentes est essentielle. En n'impliquant que les experts métier internes, les personnes ayant une expertise directe sur l'intégration technique ont été exclues.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.2 - Page 30"
  },
  {
    id: 3,
    level: "K4",
    section: "1.3.3",
    question: "Mise en situation : Deux défauts identiques : 'Le bouton de confirmation ne répond pas'. L'un dans le flux de commande (10 000 clients/jour), l'autre en administration (5 administrateurs/jour). Comment devraient-ils être classifiés en termes d'impact de risque ?",
    options: [
      "A) Ils ont le même risque car c'est le même défaut",
      "B) Le défaut en production a un impact plus élevé malgré sa rareté",
      "C) Celui du flux de commande a un impact beaucoup plus élevé en raison de la fréquence d'utilisation",
      "D) Le défaut d'administration a un risque plus élevé"
    ],
    correct: 2,
    explanation: "L'impact du risque est influencé par la fréquence d'utilisation de la fonctionnalité affectée. Le bouton de confirmation dans le flux de commande est utilisé beaucoup plus fréquemment, créant un impact de risque significativement plus élevé.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.3 - Pages 30-31"
  },
  {
    id: 4,
    level: "K3",
    section: "1.3.4",
    question: "Mise en situation : Vous avez identifié 50 risques. Vous avez 3 mois et 5 testeurs. Vous pouvez tester complètement les 15 risques les plus élevés, partiellement 20 autres, et n'aurez pas le temps pour les 15 restants. Que devriez-vous faire PRINCIPALEMENT ?",
    options: [
      "A) Tester les 50 risques superficiellement pour couvrir tout",
      "B) Ignorer les 15 risques restants",
      "C) Appliquer l'approche 'profondeur d'abord' pour les 15 risques les plus élevés en priorité",
      "D) Demander aux testeurs de travailler 16 heures par jour"
    ],
    correct: 2,
    explanation: "L'approche 'profondeur d'abord' est appropriée lorsqu'il est important d'atténuer les niveaux de risques les plus élevés le plus tôt possible. Cela maximise la réduction du risque résiduel avec les ressources disponibles.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.4 - Pages 31-32"
  },
  {
    id: 5,
    level: "K4",
    section: "1.3.4",
    question: "Mise en situation : Vous testez un système de recommandation IA pour un site de vente. Risque identifié : 'L'IA peut biaiser les recommandations pour certaines régions'. Probabilité modérée, impact très élevé (implications légales). Comment adapter vos techniques de test ?",
    options: [
      "A) Ignorer ce risque car c'est un problème de développement",
      "B) Utiliser uniquement des tests fonctionnels standards",
      "C) Sélectionner des techniques rigoureuses incluant analyse de biais, tests boîte blanche du modèle",
      "D) Réduire les tests pour économiser du temps"
    ],
    correct: 2,
    explanation: "Un risque élevé avec implications légales demande une rigueur accrue. Pour un système d'IA, cela inclut l'analyse de biais, les tests boîte blanche du modèle, et l'implication de parties prenantes expertes.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.4 - Pages 31-32"
  },
  {
    id: 6,
    level: "K3",
    section: "1.3.5",
    question: "Mise en situation : Votre projet est un système interne pour PME. Risques identifiés : faible à moyen niveau. Budget et temps limités. Devriez-vous utiliser des techniques LOURDES (AMDE formelle) ou LÉGÈRES ?",
    options: [
      "A) Techniques lourdes, car ce sont les meilleures",
      "B) Techniques légères, adaptées à faible risque avec ressources limitées",
      "C) Un mélange 50/50",
      "D) Aucune technique nécessaire"
    ],
    correct: 1,
    explanation: "Les techniques légères nécessitent moins d'effort et conviennent aux applications non critiques. Les techniques lourdes sont réservées aux systèmes critiques en termes de sécurité.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.5 - Pages 33-34"
  },
  {
    id: 7,
    level: "K4",
    section: "1.3.6",
    question: "Mise en situation : À la fin de votre projet : (1) Tous défauts critiques détectés semaine 1, (2) Aucun défaut critique en production, (3) Les parties prenantes se plaignent d'avoir été mal représentées. Quelle métrique de succès est PROBLÉMATIQUE ?",
    options: [
      "A) Les défauts critiques trouvés tôt",
      "B) Pas de défauts en production",
      "C) La participation et représentation des parties prenantes",
      "D) Tout était parfait"
    ],
    correct: 2,
    explanation: "La première métrique de succès est : les parties prenantes concernées ont-elles été impliquées ? Si elles se plaignent d'une mauvaise représentation, l'analyse était potentiellement incomplète, menaçant la validité future du test basé sur risques.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.6 - Page 34"
  },
  {
    id: 8,
    level: "K3",
    section: "1.3.3",
    question: "Mise en situation : Évaluation de deux risques : Risque A : Fonction paiement échoue sous charge (30% probabilité, impact très élevé). Risque B : Faute de frappe label (5% probabilité, impact très faible). En matrice 3x3, comment les classeriez-vous ?",
    options: [
      "A) Équivalents",
      "B) Risque A élevé/critique, Risque B très faible/acceptable",
      "C) Risque B plus important",
      "D) Urgence égale"
    ],
    correct: 1,
    explanation: "Une matrice qualitative combine probabilité et impact. Risque A (probabilité modérée × impact très élevé) = niveau élevé. Risque B (probabilité très faible × impact très faible) = niveau très faible. Ces niveaux influencent directement l'allocation d'effort de test.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.3 - Pages 30-31"
  },
  {
    id: 9,
    level: "K4",
    section: "1.3.1",
    question: "Mise en situation : Suite à migration cloud, risque 'perte données' réduit de critique à élevé grâce aux sauvegardes automatiques. NOUVEAU risque émerge : 'migration données historiques peut introduire incohérences'. Cela démontre quel aspect fondamental ?",
    options: [
      "A) Les risques ne changent jamais une fois identifiés",
      "B) L'analyse des risques est CONTINUE et ITÉRATIVE tout au long du projet",
      "C) Risques ne peuvent être réduits que, jamais augmentés",
      "D) Une fois atténué, il n'est plus important"
    ],
    correct: 1,
    explanation: "L'analyse des risques est une activité continue et itérative qui ne doit pas être réalisée une seule fois. Les changements architecturaux réduisent certains risques mais créent de nouveaux.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.2 - Page 34"
  },
  {
    id: 10,
    level: "K4",
    section: "1.3.4",
    question: "Mise en situation : Vous planifiez 1000h de tests. Scénario 1 (largeur) : Tester tous risques = 900h. Scénario 2 (profondeur) : Tester 20% risques critiques complètement = 600h. Vous avez 800h. Lequel choisir ?",
    options: [
      "A) Scénario 1 car couvre plus",
      "B) Scénario 2 car laisse tampon et optimise atténuation critique",
      "C) Dépend du budget total",
      "D) Équivalents"
    ],
    correct: 1,
    explanation: "Seul Scénario 2 rentre dans le budget. Il suit l'approche 'profondeur d'abord' pour maximiser atténuation des risques les plus élevés, laissant 200h de tampon pour contingences.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.4 - Pages 31-32"
  },
  {
    id: 11,
    level: "K3",
    section: "1.3.2",
    question: "Mise en situation : Vous utilisez 'ateliers sur les risques' pour identifier les risques qualité. Vous invitez développeurs, testeurs, Product Owner, et experts métier. Quel est l'AVANTAGE PRINCIPAL de cette approche collaborative ?",
    options: [
      "A) Réduire les honoraires de consultants",
      "B) Permettre à des perspectives diverses d'identifier des risques plus complets",
      "C) Accélérer le projet",
      "D) Éliminer tous les risques"
    ],
    correct: 1,
    explanation: "L'implication de diverses parties prenantes permet d'identifier un ensemble plus complet de risques. Chaque perspective (technique, business, utilisateur) apporte des angles différents pour découvrir des risques potentiels.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.2 - Pages 29-30"
  },
  {
    id: 12,
    level: "K4",
    section: "1.3.4",
    question: "Mise en situation : Analyse des risques identifie que l'intégration API tierce a probabilité élevée de défaillance. Cependant, cette API est aussi utilisée par d'autres équipes. Quels facteurs le Test Manager doit-il considérer dans sa stratégie d'atténuation ?",
    options: [
      "A) Seulement l'impact direct sur notre projet",
      "B) Les éléments de test, caractéristiques de qualité, niveaux/types de test, SDLC, équipe et exigences réglementaires",
      "C) Demander à l'autre équipe de tester à notre place",
      "D) Ignorer la dépendance externe"
    ],
    correct: 1,
    explanation: "Le Test Manager doit analyser les éléments du test affectés, les caractéristiques de qualité pertinentes, les niveaux et types de test nécessaires, l'adaptation au SDLC, les compétences de l'équipe, et les exigences réglementaires.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.4 - Pages 32"
  },
  {
    id: 13,
    level: "K3",
    section: "1.3.5",
    question: "Mise en situation : Vous comparez deux techniques : AMDE complète (60 jours d'effort) vs analyse pragmatique des risques (PRAM - 5 jours). Votre projet est critique pour la sûreté. Quelle approche vous paraît justifiée ?",
    options: [
      "A) PRAM car plus rapide",
      "B) AMDE car projet critique, nécessite rigueur formelle",
      "C) Pas d'analyse du tout",
      "D) Les deux sont équivalentes"
    ],
    correct: 1,
    explanation: "Les techniques lourdes comme AMDE sont 'très souvent utilisées dans les systèmes critiques en termes de sécurité'. Pour un projet de sûreté critique, l'investissement dans une analyse formelle est justifié.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.5 - Page 33"
  },
  {
    id: 14,
    level: "K4",
    section: "1.3.3",
    question: "Mise en situation : Un risque : 'base données peut devenir inaccessible'. Probabilité 2% (serveur fiable, 99.9% uptime). Impact très élevé. Vous l'évaluez comme 'MOYEN'. Que manque-t-il dans cette analyse de risque ?",
    options: [
      "A) C'est correct, 2% × très élevé = moyen",
      "B) Vous n'avez pas considéré 'absence de solutions alternatives raisonnables' qui augmente l'impact réel",
      "C) Le risque est en fait bas",
      "D) L'impact ne peut pas être 'très élevé' avec 2% probabilité"
    ],
    correct: 1,
    explanation: "L'impact doit aussi considérer l'absence de solutions de contournement. Même probabilité faible, l'absence d'alternative peut transformer le risque global en élevé, car les parties prenantes n'ont pas d'option si cela se produit.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.3 - Page 31 : facteurs d'impact"
  },
  {
    id: 15,
    level: "K3",
    section: "1.3.6",
    question: "Mise en situation : Après projet, vous mesurez : 'Les tests ignorés présentaient-ils un niveau de risque inférieur ?' et trouvez que 70% oui mais 30% non (défauts en production !). Cela indique quel problème ?",
    options: [
      "A) Le test basé sur risques a totalement échoué",
      "B) L'évaluation initiale des risques était imprécise pour 30% des tests ignorés",
      "C) Les risques ne peuvent pas être évalués",
      "D) Cela n'a aucune importance"
    ],
    correct: 1,
    explanation: "Cette métrique mesure la qualité de l'évaluation initiale des risques. Si 30% des tests ignorés avaient en réalité des niveaux de risque élevés (prouvé par défauts produits), cela révèle une imprécision dans le processus d'évaluation initiale.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.6 - Page 34"
  },
  {
    id: 16,
    level: "K4",
    section: "1.3.1",
    question: "Mise en situation : Deux approches de test basé sur risques : (1) Prévention stricte des risques identifiés, (2) Combinaison test + plan d'urgence pour certains risques. Quand l'approche (2) est-elle plus appropriée ?",
    options: [
      "A) Jamais, les tests sont toujours suffisants",
      "B) Quand le coût du test dépasse significativement le coût de l'impact du risque",
      "C) Toujours",
      "D) Seulement pour risques très faibles"
    ],
    correct: 1,
    explanation: "Selon le syllabus, parmi les mesures d'atténuation des risques : tester, plan d'urgence (solutions de contournement), transfert à un tiers, ou acceptation. Pour certains risques, l'équilibre coût-bénéfice favorise une approche combinée.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.4 - Page 32"
  },
  {
    id: 17,
    level: "K3",
    section: "1.3.2",
    question: "Mise en situation : Lors d'atelier risques, un participant externe soulève un risque très peu probable mais critiquement important : 'Transaction peut être dupliquée en cas de timeout réseau'. Comment gérer ce risque 'tail risk' ?",
    options: [
      "A) L'ignorer car peu probable",
      "B) L'explorer méticuleusement car impact critique justifie l'investigation même faible probabilité",
      "C) Le reporter mais sans investir en tests",
      "D) Créer une nouvelle équipe juste pour ce risque"
    ],
    correct: 1,
    explanation: "L'impact du risque doit être évalué indépendamment de la probabilité. Pour un risque de transaction dupliquée (impact très élevé), même faible probabilité, l'investigation est justifiée car les conséquences financières/légales sont graves.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.3 - Pages 30-31"
  },
  {
    id: 18,
    level: "K4",
    section: "1.3.4",
    question: "Mise en situation : Vous appliquez l'approche 'largeur d'abord' initiale puis transitionnez vers 'profondeur d'abord' en fin de projet. Quel était l'OBJECTIF stratégique de cette transition ?",
    options: [
      "A) C'était une erreur, ne pas mélanger les approches",
      "B) Assurer couverture minimale risques tous niveaux, puis concentrer ressources restantes sur atténuation critique",
      "C) Compliquer inutilement le processus",
      "D) Pas d'objectif particulier"
    ],
    correct: 1,
    explanation: "Le syllabus décrit cette transition comme courante et appropriée : commencer par 'largeur d'abord' (parties prenantes veulent vue d'ensemble) puis basculer à 'profondeur d'abord' (quand temps devient limité) pour garantir atténuation critique.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.4 - Page 32"
  },
  {
    id: 19,
    level: "K3",
    section: "1.3.2",
    question: "Mise en situation : Vous menez rétrospective post-projet pour améliorer l'identification des risques. Vous découvrez que certains risques 'organisationnels' (turnover équipe, conflits hiérarchiques) n'ont pas été capturés dans l'analyse risques qualité. Était-ce une erreur ?",
    options: [
      "A) Oui, tous les risques doivent être dans l'analyse qualité",
      "B) Non, ce sont des risques PROJET, pas risques QUALITÉ, mais devraient être signalés comme sous-produits de l'analyse",
      "C) Jamais capturer risques organisationnels",
      "D) Cela n'a aucun lien"
    ],
    correct: 1,
    explanation: "Le syllabus distingue risques produit (qualité) de risques projet. L'identification génère souvent des sous-produits (problèmes généraux, problèmes documents). Bien que non au centre du test basé sur risques, le Test Manager doit rapporter ces sous-produits au management du projet.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.2 - Page 30"
  },
  {
    id: 20,
    level: "K4",
    section: "1.3.6",
    question: "Mise en situation : Analyse rétrospective montre : 'Défauts critiques trouvés tôt (bon)', 'Aucun en production (bon)', mais 'Effort réel 50% plus que prévu'. Cela révèle quel enseignement pour la prochaine application du test basé sur risques ?",
    options: [
      "A) Le test basé sur risques coûte trop cher",
      "B) L'estimation initiale des efforts d'atténuation des risques doit être affinée et validée par historique",
      "C) Le test basé sur risques n'aide pas avec les coûts",
      "D) Évaluation des risques correcte, pas d'ajustement nécessaire"
    ],
    correct: 1,
    explanation: "Cet enseignement montre que même si l'ÉVALUATION des risques était correcte (résultats excellents), l'ESTIMATION des efforts pour les atténuer était imprécise. Cela justifie la collecte de données historiques pour affiner les estimations futures.",
    reference: "Syllabus ISTQB Test Management v3.0 - Section 1.3.6 - Page 34 : métriques de succès et difficultés associées"
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

export default TestRisk;