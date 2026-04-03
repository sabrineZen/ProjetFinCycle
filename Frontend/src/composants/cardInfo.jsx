function CardInfo({ couleur, titre, valeur, hoverClass, icon }) {
    return (
        <div className={`flex justify-start items-center bg-[#FFFFFF] rounded-[25px] p-4 shadow-lg w-full max-w-[400px] h-auto min-h-[100px] ${hoverClass}`}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: couleur }}>
                {icon}
            </div>
            <div className="ml-4">
                <h3 className="text-base sm:text-lg font-bold text-secondary">{titre}</h3>
                <p className="text-lg sm:text-xl font-light text-secondary">{valeur}</p>
            </div>
        </div>
    );
}
export default CardInfo;