import React from 'react';

function CardInfo({ couleur, titre, valeur, hoverClass, icon }) {
    return (
        <div className={`
            flex items-center 
            bg-white 
            rounded-2xl 
            p-5 
            shadow-sm hover:shadow-md 
            transition-all duration-300 
            border border-gray-100
            w-full 
            ${hoverClass}
        `}>
            {/* Conteneur de l'icône avec opacité légère pour un look moderne */}
            <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner" 
                style={{ 
                    backgroundColor: couleur,
                    filter: 'brightness(1.1)' 
                }}
            >
                {/* On s'assure que l'icône a une taille constante */}
                <div className="text-white text-2xl">
                    {icon}
                </div>
            </div>

            {/* Contenu texte */}
            <div className="ml-4 overflow-hidden">
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {titre}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">
                    {valeur}
                </h3>
            </div>
        </div>
    );
}

export default CardInfo;