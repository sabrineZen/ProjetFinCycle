function Carteplat({plat,hoverClass}){
return(
   <div className={`shadow-lg bg-white w-full rounded-2xl overflow-hidden ${hoverClass}`}>
      <img  src="/" className="w-full h-48 bg-gray-300 rounded-t-2xl"/>
      <h2 className="font-bold text-base pl-3 pt-2 "style={{ color: '#8B2A1B' }} >{plat.nom}</h2>
      <div className="flex justify-between items-center p-3">
        <h2 className="font-semibold pl-3"style={{ color: '#8B2A1B' }}>{plat.prix} DA</h2>
        <button className="bg-orange-500 text-white w-8 h-8 rounded-lg text-xl font-bold">+</button>
      </div>
   </div>
)
}
export default Carteplat