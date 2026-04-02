function CardInfo({ couleur, titre, valeur,hoverClass,icon }) {
    return(
        // Carte d'information avec une petite icone colorée à gauche sur les commande etc..
        <div className={`flex justify-start items-center bg-[#FFFFFF]  rounded-[25px] p-4 shadow-lg w-[400px] h-[100px] ${hoverClass}`}>
                 <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"  style={{ background: couleur }} >{icon}</div>
                  <div className="ml-4">
                        <h3 className="text-lg font-bold text-secondary">{titre}</h3>
                        <p className="text-xl font-light text-secondary">{valeur}</p>
                </div>

        </div>
    )
}
export default CardInfo;