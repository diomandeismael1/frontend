import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react';

const DevCycle = () => {
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
    section: "2.1",
    question: "Mise en situation : Vous êtes Test Manager sur un projet utilisant le modèle en V. L'équipe de développement vient de terminer la phase de conception architecturale. Quelle est la PREMIÈRE activité de test que vous devez initier en parallèle ?",
    options: [
      "A) Exécuter les tests système",
      "B) Concevoir les tests d'intégration des composants basés sur l'architecture",
      "C) Attendre la fin du développement pour commencer les tests",
      "D) Commencer uniquement les tests unitaires"
    ],
    correct: 1,
    explanation: "Dans le modèle en V, chaque phase de développement a une phase de test correspondante. Après la conception architecturale, on doit concevoir les tests d'intégration des composants. Cette approche 'shift-left' permet de détecter les problèmes de conception tôt.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in the Context of a SDLC' - Modèle en V"
  },
  {
    id: 2,
    level: "K4",
    section: "2.1",
    question: "Mise en situation : Votre organisation passe d'un modèle en cascade à Scrum. Les testeurs se plaignent de ne plus avoir de 'phase de test' dédiée. Comment devez-vous adapter le rôle des testeurs ?",
    options: [
      "A) Maintenir une phase de test séparée à la fin de chaque sprint",
      "B) Intégrer les testeurs dans l'équipe cross-fonctionnelle, tester continuellement durant le sprint",
      "C) Éliminer complètement les testeurs car Scrum n'en a pas besoin",
      "D) Créer une équipe de test séparée qui teste après chaque sprint"
    ],
    correct: 1,
    explanation: "Dans Scrum, les testeurs font partie intégrante de l'équipe cross-fonctionnelle. Les tests sont effectués en continu tout au long du sprint, pas dans une phase séparée. Cela permet un feedback rapide et l'intégration de la qualité dès le début.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in Agile' - Intégration des testeurs"
  },
  {
    id: 3,
    level: "K4",
    section: "2.1",
    question: "Mise en situation : Vous gérez un projet DevOps avec 20 déploiements par jour. Les tests manuels prennent 4 heures. Quelle est la stratégie de test la PLUS critique à implémenter ?",
    options: [
      "A) Augmenter l'équipe de testeurs manuels à 20 personnes",
      "B) Réduire le nombre de déploiements à 1 par jour",
      "C) Automatiser massivement les tests et les intégrer dans le pipeline CI/CD",
      "D) Éliminer tous les tests pour accélérer"
    ],
    correct: 2,
    explanation: "Dans un environnement DevOps avec déploiements fréquents, l'automatisation des tests et leur intégration dans le pipeline CI/CD sont essentielles. Les tests manuels ne peuvent pas suivre le rythme. L'automatisation permet un feedback rapide et continu sur la qualité.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in DevOps' - Continuous Testing"
  },
  {
    id: 4,
    level: "K3",
    section: "2.2",
    question: "Mise en situation : Lors de la phase d'analyse des exigences, un testeur identifie une exigence ambiguë : 'Le système doit être rapide'. Quelle est l'action la PLUS appropriée selon le shift-left testing ?",
    options: [
      "A) Ignorer l'ambiguïté et attendre la phase de test",
      "B) Clarifier immédiatement l'exigence avec les parties prenantes avant qu'elle soit implémentée",
      "C) Documenter l'ambiguïté dans un rapport après le développement",
      "D) Supposer une définition de 'rapide' et continuer"
    ],
    correct: 1,
    explanation: "Le shift-left testing encourage la détection précoce des problèmes. Clarifier une exigence ambiguë AVANT l'implémentation évite des coûts de correction beaucoup plus élevés plus tard. C'est un exemple de prévention des défauts.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.2 'Shift-Left Approach' - Early Testing"
  },
  {
    id: 5,
    level: "K4",
    section: "2.2",
    question: "Mise en situation : Votre équipe applique le shift-left. Vous avez investi 40% de l'effort total en revues de conception et tests statiques. Le management se plaint du 'retard' avant le codage. Comment justifiez-vous cette approche ?",
    options: [
      "A) Accepter la critique et réduire les revues",
      "B) Expliquer que détecter défauts en conception coûte 10-100x moins cher qu'en production",
      "C) Dire que c'est une mode passagère",
      "D) Abandonner le shift-left"
    ],
    correct: 1,
    explanation: "Le principe fondamental du shift-left est économique : les défauts trouvés tôt coûtent 10 à 100 fois moins cher à corriger. L'investissement initial en revues et tests statiques réduit drastiquement les coûts de correction tardifs et améliore la qualité globale.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.2 'Shift-Left Approach' - Cost benefits"
  },
  {
    id: 6,
    level: "K3",
    section: "2.3",
    question: "Mise en situation : Votre application mobile est déployée. Vous utilisez des outils de monitoring qui détectent un crash affectant 5% des utilisateurs iOS 17. C'est un exemple de quelle approche de test ?",
    options: [
      "A) Shift-left testing",
      "B) Shift-right testing",
      "C) Test unitaire",
      "D) Test d'acceptation"
    ],
    correct: 1,
    explanation: "Le shift-right testing étend les tests en production. Le monitoring en production, la détection de crashs en temps réel, l'analyse des comportements utilisateurs réels sont des pratiques shift-right qui complètent les tests traditionnels.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.3 'Shift-Right Approach' - Production monitoring"
  },
  {
    id: 7,
    level: "K4",
    section: "2.3",
    question: "Mise en situation : Vous lancez deux versions d'une page produit (A avec bouton vert, B avec bouton rouge) à 50% des utilisateurs chacune pour mesurer le taux de conversion. C'est un exemple de quelle technique shift-right ?",
    options: [
      "A) Test de régression",
      "B) Test A/B (A/B testing)",
      "C) Test d'intégration",
      "D) Test de performance"
    ],
    correct: 1,
    explanation: "Le test A/B est une technique shift-right où on teste différentes versions en production avec de vrais utilisateurs pour valider des hypothèses métier. C'est du 'testing in production' contrôlé qui fournit des données réelles d'utilisation.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.3 'Shift-Right Approach' - A/B Testing"
  },
  {
    id: 8,
    level: "K3",
    section: "2.1",
    question: "Mise en situation : Dans un modèle de développement itératif, vous terminez l'itération 3. Quel type de test de régression devez-vous OBLIGATOIREMENT effectuer ?",
    options: [
      "A) Aucun, les tests de régression sont uniquement pour le modèle en V",
      "B) Tester les nouvelles fonctionnalités de l'itération 3 seulement",
      "C) Tester les nouvelles fonctionnalités ET vérifier que les fonctionnalités des itérations 1-2 fonctionnent toujours",
      "D) Retester uniquement l'itération 1"
    ],
    correct: 2,
    explanation: "Dans un développement itératif, chaque itération ajoute du code qui peut impacter les fonctionnalités existantes. Les tests de régression sont essentiels pour vérifier que les nouvelles modifications n'ont pas cassé les fonctionnalités précédentes. C'est particulièrement critique dans les approches itératives.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in Iterative Models' - Regression testing"
  },
  {
    id: 9,
    level: "K4",
    section: "2.1",
    question: "Mise en situation : Votre projet suit un modèle hybride : Waterfall pour l'infrastructure (critique, réglementé) et Scrum pour l'interface utilisateur (changements fréquents). Comment synchroniser les tests entre ces deux flux ?",
    options: [
      "A) Tester complètement l'infrastructure avant de commencer l'UI",
      "B) Définir des interfaces stables entre les deux, tester en parallèle avec tests d'intégration réguliers",
      "C) Abandonner le modèle hybride, choisir un seul modèle",
      "D) Ne pas synchroniser, tester indépendamment"
    ],
    correct: 1,
    explanation: "Dans un modèle hybride, la clé est de définir des interfaces claires et stables entre les différents flux. Les tests d'intégration réguliers entre les composants Waterfall et Scrum assurent la cohérence. Cela permet de bénéficier des avantages des deux approches.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in Hybrid Models' - Interface management"
  },
  {
    id: 10,
    level: "K3",
    section: "2.1",
    question: "Mise en situation : Dans votre équipe Scrum, qui est principalement responsable de la qualité du produit livré ?",
    options: [
      "A) Uniquement les testeurs",
      "B) Uniquement le Scrum Master",
      "C) Toute l'équipe Scrum (développeurs, testeurs, Product Owner)",
      "D) Uniquement le Product Owner"
    ],
    correct: 2,
    explanation: "Dans Scrum, la qualité est une responsabilité collective de toute l'équipe. Les développeurs, testeurs et Product Owner collaborent pour livrer un incrément de qualité. Personne n'est individuellement responsable - c'est un effort d'équipe.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in Agile' - Shared quality responsibility"
  },
  {
    id: 11,
    level: "K4",
    section: "2.2",
    question: "Mise en situation : Vous réalisez une revue de conception architecturale (shift-left). Vous trouvez 15 défauts majeurs. Le coût moyen de correction immédiate : 2h/défaut. Si ces défauts étaient trouvés en production, le coût moyen serait 50h/défaut. Quel est le ROI de cette revue ?",
    options: [
      "A) Perte de temps, les revues sont inutiles",
      "B) Économie de 720 heures (15 × (50h - 2h))",
      "C) Aucun impact économique",
      "D) Les défauts de conception ne peuvent pas être quantifiés"
    ],
    correct: 1,
    explanation: "Le ROI du shift-left est quantifiable : 15 défauts × (50h en production - 2h en conception) = 15 × 48h = 720 heures économisées. C'est la justification économique majeure du shift-left : détecter tôt coûte BEAUCOUP moins cher.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.2 'Shift-Left Approach' - Economic benefits"
  },
  {
    id: 12,
    level: "K3",
    section: "2.1",
    question: "Mise en situation : Dans un sprint Scrum de 2 semaines, QUAND les testeurs devraient-ils commencer à tester les User Stories ?",
    options: [
      "A) La dernière journée du sprint uniquement",
      "B) Dès qu'une User Story est développée et ready for testing (continuellement durant le sprint)",
      "C) Uniquement lors de la Sprint Review",
      "D) Après la fin de tous les développements du sprint"
    ],
    correct: 1,
    explanation: "Dans Scrum, les tests sont continus. Dès qu'une User Story atteint la 'Definition of Ready for Testing', les testeurs commencent à tester. Cela permet un feedback rapide aux développeurs et évite l'accumulation de tests en fin de sprint.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in Agile' - Continuous testing within sprint"
  },
  {
    id: 13,
    level: "K4",
    section: "2.3",
    question: "Mise en situation : Vous utilisez le 'Chaos Engineering' en production : injecter délibérément des pannes (serveurs, réseau) pour tester la résilience. 2% des utilisateurs sont impactés. Est-ce acceptable ?",
    options: [
      "A) Non, jamais impacter les utilisateurs en production",
      "B) Oui, SI informé/consenti, monitored, avec rollback rapide - c'est du shift-right contrôlé",
      "C) Oui, toujours acceptable",
      "D) Le Chaos Engineering n'existe pas"
    ],
    correct: 1,
    explanation: "Le Chaos Engineering est une pratique shift-right légitime MAIS doit être contrôlée : impact minimal et contrôlé, monitoring actif, capacité de rollback immédiat, et idéalement consentement utilisateur (ou information). Netflix utilise cette approche pour tester la résilience en conditions réelles.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.3 'Shift-Right Approach' - Chaos Engineering"
  },
  {
    id: 14,
    level: "K3",
    section: "2.1",
    question: "Mise en situation : Votre équipe utilise CI/CD avec déploiement automatique après passage des tests. Un test automatisé a un faux négatif (passe alors qu'il devrait échouer). Quel est le risque IMMÉDIAT ?",
    options: [
      "A) Aucun risque, les faux négatifs sont acceptables",
      "B) Déploiement automatique d'un défaut en production, contournant la protection des tests",
      "C) Amélioration de la vitesse de déploiement",
      "D) Réduction des coûts"
    ],
    correct: 1,
    explanation: "Dans CI/CD, les tests automatisés sont la 'quality gate'. Un faux négatif (test qui passe incorrectement) permet à un défaut de passer en production automatiquement. C'est pourquoi la fiabilité des tests automatisés est CRITIQUE dans CI/CD - ils sont la dernière ligne de défense.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in CI/CD' - Test reliability importance"
  },
  {
    id: 15,
    level: "K4",
    section: "2.2",
    question: "Mise en situation : Vous pratiquez le BDD (Behavior Driven Development). Les tests d'acceptation sont écrits AVANT le code, en collaboration avec le Product Owner. C'est un exemple de quel concept ?",
    options: [
      "A) Shift-right",
      "B) Shift-left extrême : les tests guident le développement dès la définition des exigences",
      "C) Test après développement",
      "D) Aucun lien avec shift-left"
    ],
    correct: 1,
    explanation: "BDD est un shift-left extrême où les tests (sous forme de scénarios Gherkin) sont écrits AVANT le code, en collaboration avec les parties prenantes métier. Ces tests deviennent des spécifications exécutables qui guident le développement. C'est la forme la plus avancée de shift-left.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.2 'Shift-Left Approach' - BDD as extreme shift-left"
  },
  {
    id: 16,
    level: "K3",
    section: "2.1",
    question: "Mise en situation : Vous utilisez le modèle en V sur un projet aéronautique (haute sûreté). Le client exige une traçabilité complète exigences→tests. Pourquoi le modèle en V est-il particulièrement adapté à cette contrainte ?",
    options: [
      "A) Le modèle en V est rapide",
      "B) Le modèle en V établit une correspondance explicite entre phases de développement et phases de test, facilitant la traçabilité",
      "C) Le modèle en V élimine le besoin de documentation",
      "D) Le modèle en V est bon marché"
    ],
    correct: 1,
    explanation: "Le modèle en V crée une correspondance explicite : exigences→tests d'acceptation, conception détaillée→tests système, conception architecturale→tests d'intégration, code→tests unitaires. Cette structure facilite la traçabilité requise dans les domaines réglementés comme l'aéronautique.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'V-Model' - Traceability in regulated domains"
  },
  {
    id: 17,
    level: "K4",
    section: "2.3",
    question: "Mise en situation : Votre dashboard de monitoring production affiche : taux d'erreur API soudainement 10x plus élevé à 14h03. Aucun déploiement récent. Quelle est la PREMIÈRE action shift-right appropriée ?",
    options: [
      "A) Ignorer, c'est probablement temporaire",
      "B) Investiguer immédiatement : logs, traces distribuées, corrélation avec événements externes (traffic spike, dépendances)",
      "C) Attendre le lendemain pour analyser",
      "D) Redémarrer tous les serveurs sans analyse"
    ],
    correct: 1,
    explanation: "Le monitoring shift-right doit être actionnable. Une anomalie détectée nécessite une investigation immédiate : analyser les logs, traces distribuées, corréler avec événements système/réseau/dépendances. C'est du 'observability-driven testing' - utiliser la production comme source de feedback pour améliorer la qualité.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.3 'Shift-Right Approach' - Production observability"
  },
  {
    id: 18,
    level: "K3",
    section: "2.1",
    question: "Mise en situation : Votre équipe Scrum a une 'Definition of Done' qui inclut : 'Tous les tests d'acceptation automatisés passent'. Une User Story est développée mais 2 tests automatisés échouent. Peut-elle être considérée 'Done' ?",
    options: [
      "A) Oui, si le Product Owner l'accepte quand même",
      "B) Non, elle ne satisfait pas la Definition of Done - elle ne peut pas être marquée Done ni déployée",
      "C) Oui, les tests automatisés ne sont pas importants",
      "D) Cela dépend de l'humeur de l'équipe"
    ],
    correct: 1,
    explanation: "La Definition of Done (DoD) est un contrat d'équipe non-négociable. Si la DoD inclut 'tous tests passent' et que des tests échouent, la User Story N'EST PAS Done. Elle reste dans le sprint ou est retournée au backlog. C'est un mécanisme de qualité essentiel en Agile.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.1 'Testing in Agile' - Definition of Done enforcement"
  },
  {
    id: 19,
    level: "K4",
    section: "2.2",
    question: "Mise en situation : Vous proposez shift-left avec revues de code systématiques. Un développeur senior résiste : 'Les revues ralentissent le développement'. Quel argument basé sur des données pouvez-vous utiliser ?",
    options: [
      "A) Les revues sont obligatoires, point final",
      "B) Études montrent : revues détectent 60-90% défauts avant tests, réduisant coût et temps global malgré temps revue",
      "C) Les revues ne servent à rien",
      "D) C'est juste une mode"
    ],
    correct: 1,
    explanation: "Les données empiriques montrent que les revues de code détectent 60-90% des défauts avant même les tests. Bien qu'elles ajoutent du temps en début de cycle, elles réduisent drastiquement le temps de débogage, retests et corrections tardives. Le temps TOTAL de développement+test est réduit.",
    reference: "Syllabus ISTQB Fondation v4.0 - Section 2.2 'Shift-Left Approach' - Code review effectiveness data"
  },
  {
    id: 20,
    level: "K4",
    section: "2.1-2.3",
    question: "Mise en situation COMPLEXE : Votre organisation lance un produit SaaS critique. Vous devez : (1) Respecter réglementation stricte (shift-left avec traçabilité), (2) Déployer 3x/jour (CI/CD), (3) Valider hypothèses métier en production (shift-right A/B). Quelle stratégie intègre TOUT ?",
    options: [
      "A) Choisir un seul objectif, les trois sont incompatibles",
      "B) Shift-left (revues, tests statiques) + CI/CD (automatisation massive) + Shift-right contrôlé (monitoring, A/B avec feature flags)",
      "C) Abandonner la réglementation pour aller plus vite",
      "D) Tester uniquement en production"
    ],
    correct: 1,
    explanation: "Ces objectifs sont compatibles avec une stratégie intégrée : Shift-left pour qualité/conformité réglementaire, CI/CD avec tests automatisés comme quality gates pour déploiements fréquents sûrs, Shift-right avec feature flags pour A/B testing contrôlé. C'est une approche moderne 'whole lifecycle quality'.",
    reference: "Syllabus ISTQB Fondation v4.0 - Sections 2.1, 2.2, 2.3 - Integrated quality strategy"
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

export default DevCycle;
