import react, {useState, useEffect} from 'react';
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award, Menu } from 'lucide-react';
import Sidebar from './Sidebar';


// Importer le fichier JSON
import questionsData from './questions.json';

function TestStrategie(){
const [questions, setQuestions]= useState([]);
const [currentQuestion, setCurrentQuestion]= useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [loading, SetLoading]= useState (true)
const [showExplanation,setShowExplanation ] = useState(true)


//charger les questions depuis le fichier JSON
useEffect(()=>{
    try {
        setQuestions(questionsData.questions || questionsData);
        SetLoading(false);
        console.log(questionsData);
        
    }catch (err){
        setError('erreur lors de chargement des questions');
        SetLoading (false);
    }
},[]);



const question = questions[currentQuestion];
const isCorrect = selectedAnswer === question.correct;


return (
    <div className='flex min-h-screen bg-gray-50'>
    
      {/* Contenu principal */}
            <div className="flex-1 lg:ml-0">
              <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                {/* Bouton menu mobile */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mb-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Menu className="w-5 h-5" />
                </button>
      
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        Niveau - {question.level}
                        
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                        Section 
                      </span>
                    </div>
                    <span className="text-gray-600 font-semibold">
                      Question
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    >pourcentage</div>
                  </div>
      
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Score actuel : 10 /10 </span>
                      <span>
                        Taux de réussite : 100%
                      </span>
                  </div>
                </div>
      
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    text
                  </h2>
      
                  <div className="space-y-3">
                    
                  </div>
                </div>
      
                  <div className={`mb-6 p-6 rounded-lg "bg-green-50 border-2 border-green-200""}`}>
                    <div className="flex items-start gap-3 mb-4">
                        <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" /> 
                      <div>
                        <h3 className={`text-lg font-bold mb-2 "text-red-800"}`}>
                           "✓ Bonne réponse !" 
                        </h3>
                        <p className="text-gray-700 mb-4">explication</p>
                        
                        <div className="flex items-start gap-2 bg-white p-4 rounded border-l-4 border-blue-500">
                          <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">Référence :</p>
                            <p className="text-sm text-gray-600">question.reference</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <div className="flex gap-4">
                 
                </div>
              </div>
            </div>
          </div>
        );
      };

export default TestStrategie;