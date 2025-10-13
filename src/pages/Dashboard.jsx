import React from 'react';
import { Link } from 'react-router-dom';

// Composant réutilisable pour une carte de certification
const CertificationCard = ({ title, description }) => {
  return (
    <div className="
      flex flex-col 
      p-8 bg-white 
      rounded-xl 
      border-l-4 border-indigo-500 
      shadow-lg 
      hover:shadow-xl 
      hover:scale-[1.02] 
      transition duration-300 ease-in-out 
      cursor-pointer
    ">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    // Conteneur principal du dashboard
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Quiz Certifications ISTQB
      </h1>

      {/* Conteneur des cartes : utilisation d'une grille pour la flexibilité */}
      <div className="
        grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        gap-6 
        max-w-4xl 
        mx-auto 
      ">
        <Link to="/home1">
        
        <CertificationCard 
          title="ISTQB Foundation" 
          description="Les bases du test logiciel. Prêt pour la prochaine étape !"
        />
        </Link>
      
        <Link to="/home">
        <CertificationCard 
          title="ISTQB Test Management" 
          description="Maîtriser la planification, le suivi et le contrôle des activités de test."
        />
        </Link>
        
        <CertificationCard 
          title="Autre Certification à Venir" 
          description="Une place pour un nouveau challenge !"
        />
        
      </div>
      
    </div>
  );
};

export default Dashboard;
