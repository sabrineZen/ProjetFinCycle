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
function Parametre({ profil }){
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
                  <p className="font-semibold text-[#8B2A1B]">Modifier Mot passe</p>
                  <div className="flex items-center bg-white rounded-lg px-3 py-2">
                     <input type="password" placeholder="Nouveau mot de passe" className="outline-none bg-transparent w-full"></input>
                  </div>                 
                  <button className="bg-[#FF6900] text-white px-4 py-2 rounded-lg">Mettre a jour </button>
             </div>
            </div>
             

            <div className="pb-4 border-b border-gray-200">{/*partie Compte*/}
                <div className="flex items-center gap-2 mb-3">
                  <RiDeleteBinLine className="text-red-500 text-xl" />
                   <p className="font-bold" style={{ color: '#8B2A1B' }}>Compte</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="font-semibold text-red-500">Supprimer Mon compte</p>
                      <p className="text-red-400 text-sm mt-1">Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Email : {profil?.email || "Non renseigné"}</p>
                      <p>Adresse : {profil?.adresse || "Non renseignée"}</p>
                    </div>
                    <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg">Supprimer le Compte </button>
                </div>
            </div>
         <button className="w-full bg-[#FF6900] text-white py-3 rounded-xl font-bold">Enregistrer tous les changements</button>
        </div>
    )
}
export default Parametre
/* si por admine ca */