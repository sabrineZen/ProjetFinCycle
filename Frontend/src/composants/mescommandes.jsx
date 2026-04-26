import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
function MesCommandes(){
    const commandes=[          
                {id:"#1240",date:"15 mars 2026",articles: 5,etat:"Livrée",prix: 5000},
                {id:"#1241",date:"20 mars 2026",articles: 3,etat:"En Cours",prix: 1800},
                {id:"#1242", date:"25mars2026",articles: 2,etat:"Annulée",prix: 1200},
                {id:"#1243",date:"31mars2026",articles: 3,etat:"Livrée",prix: 1000},
                {id:"#1244",date:"2 Avril2026",articles: 4,etat:"En Cours",prix: 1500},
                {id:"#1245", date:"10 Avril2026",articles: 1,etat:"Annulée",prix: 500}

            ]
            const styles = {
                "Livrée": "bg-green-100 text-green-600",
                "En Cours":"bg-blue-100 text-blue-600",
                "Annulée": "bg-red-100 text-red-600"
            };

    return(
        <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Mes Commandes</h2>
            {commandes.map(cmd =>
              <div  key={cmd.id}className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between ">
                <div className={"w-12 h-12 rounded-full flex items-center justify-center "+ styles[cmd.etat]}>
                 {cmd.etat==="Livrée" && <FiCheckCircle className=" rounded-full text-2xl" />}
                 {cmd.etat==="En Cours" && <MdLocalShipping className=" rounded-full text-2xl"/>}
                  {cmd.etat==="Annulée" && <MdOutlineCancel className=" rounded-full text-2xl"/>}
               </div>
              <div className="flex-1 ml-4">
            <div className="flex items-center gap-2">
                <p className="font-bold" style={{ color: '#8B2A1B' }}>Commandes</p>
                <p className="font-bold " style={{ color: '#8B2A1B' }}> {cmd.id}</p>
                <span className={"text-xs font-sans px-2 py-1 rounded-full " + styles[cmd.etat]}>
                     {cmd.etat}
                    </span>
            </div>
            <p className="text-sm text-gray-400">{cmd.date} • {cmd.articles} articles • {cmd.prix} DA</p>
        </div>
        <div className="flex items-center gap-2"></div>
              </div>
            )}
            <div className="flex justify-center mt-4">
                <button className="border-2 border-[#FF6900] text-[#FF6900] px-6 py-3 rounded-xl font-bold hover:bg-[#FFF0E8] ">Voir plus de Commandes</button>
            </div>
             
        </div>
    )
}
export default MesCommandes