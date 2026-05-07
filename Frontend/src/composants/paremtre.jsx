import { MdOutlineLanguage } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { MdAddCard } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { FaHome, FaBriefcase } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
const adresses = [
    {
        id: 1,
        type: "Adresse principale",
        icone: <FaHome className="text-white text-xl"/>,
        parDefaut: true,
        nom: "Sophie Martin",
        rue: "12 Rue de la République",
        ville: "75001 Paris",
        pays: "France",
    },
    {
        id: 2,
        type: "Bureau",
        icone: <FaBriefcase className="text-gray-500 text-xl"/>,
        parDefaut: false,
        nom: "Sophie Martin",
        rue: "45 Avenue des Champs-Élysées",
        ville: "75008 Paris",
        pays: "France",
    }
]
function Parametre(){
    return(
        <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">{/*partie langue */}
                <div className="flex items-center gap-2 mb-3">
                    <MdOutlineLanguage className="text-[#FF6900] text-xl"/>
                    <p className="font-bold" style={{ color: '#8B2A1B' }}>Langues</p>
                </div>              
               <div className="relative">
                   <select className="w-full bg-[#FFF0E8] rounded-xl px-4 py-3 appearance-none outline-none">
                      <option>Français</option>
                      <option>English</option>
                   </select>
                   <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"/>
              </div>           
            </div>

            <div className="pb-4 border-b border-gray-200">{/*partie securité */}
             <div className="flex items-center gap-2 mb-3">
                 <IoLockClosed className="text-[#FF6900] text-xl"/>
                  <p className="font-bold" style={{ color: '#8B2A1B' }}>Securité</p>
             </div>             
             <div className="bg-[#FFF0E8] rounded-xl p-4 space-y-3">
                  <p lassName="font-semibold text-[#8B2A1B]">Modifier Mot passe</p>
                  <div className="flex items-center bg-white rounded-lg px-3 py-2">
                     <input type="password" placeholder="Nouveau mot de passe" className="outline-none bg-transparent w-full"></input>
                  </div>                 
                  <button className="bg-[#FF6900] text-white px-4 py-2 rounded-lg">Mettre a jour </button>
             </div>
            </div>
             
            {/*partie adresses */}
            <div className="space-y-4">
                <p className="font-bold" style={{ color: '#8B2A1B' }}>Mes adresses</p>
               {adresses.map(adr => (
               <div key={adr.id} className={`rounded-2xl p-4 border-2 ${adr.parDefaut ? "border-orange-400 bg-[#FFF0E8]" : "border-gray-100 bg-white"}`}>
                    <div className="flex items-center gap-3 mb-3">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center ${adr.parDefaut ? "bg-orange-500" : "bg-gray-100"}`}>
                           {adr.icone}
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                           <p className="font-bold text-[#8B2A1B]">{adr.type}</p>
                           {adr.parDefaut && (
                                <span className="flex items-center gap-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                <FaStar className="text-xs"/> Par défaut
                                </span>
                            )}
                        </div>
                        <RiDeleteBinLine className="text-red-400 text-xl cursor-pointer hover:text-red-600"/>
                    </div>
                    <div className="ml-15 space-y-1 pl-2">
                      <p className="font-bold text-[#8B2A1B]">{adr.nom}</p>
                      <p className="text-gray-600">{adr.rue}</p>
                      <p className="text-gray-600">{adr.ville}</p>
                      <p className="text-gray-600">{adr.pays}</p>
                    </div>
                        {!adr.parDefaut && (
                        <button className="mt-3 border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-50">
                          Définir par défaut
                        </button>
                        )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
                <button className="border-2 border-[#FF6900] text-[#FF6900] px-6 py-3 rounded-xl font-bold hover:bg-[#FFF0E8] ">Voir plus vos Adresses</button>
            </div>

            <div className="pb-4 border-b border-gray-200">{/*partie Compte*/}
                <div className="flex items-center gap-2 mb-3">
                  <RiDeleteBinLine className="text-red-500 text-xl" />
                   <p className="font-bold" style={{ color: '#8B2A1B' }}>Compte</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                    <p className="font-semibold text-red-500">Supprimer Mon compte</p>
                    <p className="text-red-400 text-sm mt-1">Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
                    <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg">Supprimer le Compte </button>
                </div>
            </div>
         <button className="w-full bg-[#FF6900] text-white py-3 rounded-xl font-bold">Enregistrer tous les changements</button>
        </div>
    )
}
export default Parametre