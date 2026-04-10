import { FaBasketShopping } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { IoChevronForward } from "react-icons/io5";
function ProfilPage(){
    return(
      <div>
           <div className="flex justify-between items-center shadow-md bg-white rounded-2xl p-4 m-4 ">{/*partie header*/}
            <div className="flex gap-3">
                <img src="/" className="w-16 h-16 rounded-full bg-gray-300"/>
                <p className="text-xl font-bold " style={{ color: '#8B2A1B' }}>Sophie martin</p>
            </div>    
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Modifier profil</button>
           </div>
           <div className="flex gap-4 m-4">{/*partie Statistique*/}
            <div className="bg-white rounded-2xl shadow-md p-4 flex-1 flex justify-between items-center">
                <div>
                <p className="text-sm font-light" style={{ color: '#8B2A1B' }}>Depense</p>
                <p className="font-bold" style={{ color: '#8B2A1B' }}>654 DA</p>
                </div>
                <TbReportMoney style={{ color: '#8B2A1B', fontSize: '24px' }}/>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 flex-1 flex justify-between items-center ">
                <div>
                   <p className="text-sm font-light" style={{ color: '#80BFB7' }}>Panier</p>
                   <p className="font-bold" style={{ color: '#80BFB7' }}>48</p>                    
                </div>
                <FaBasketShopping style={{ color: '#80BFB7', fontSize: '24px' }} />
            </div>
            
           </div>
           <div className="flex gap-4 m-4  ">{/*partie Menu+contenu*/}
             <div className="bg-white rounded-3xl shadow-md flex flex-col gap-2 p-4 h-64 w-64" >{/*partie Menu*/}
                <button className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-500 group transition " > 
                    <div className="flex items-center gap-2" >
                    <BsPerson className="text-[#8B2A1B] text-xl group-hover:text-white"/>
                    <span className="font-bold text-[#8B2A1B] group-hover:text-white">Informations</span>
                    </div>
                    <IoChevronForward className="text-[#8B2A1B] text-xl group-hover:text-white" />
                </button>
                <button className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-500 group transition ">
                    <div className="flex items-center gap-2">
                        <MdOutlineShoppingBag className="text-[#8B2A1B] text-xl group-hover:text-white" />
                       <span className="font-bold text-[#8B2A1B] group-hover:text-white">Mes Commandes</span>
                    </div>
                    <IoChevronForward className="text-[#8B2A1B] text-xl group-hover:text-white"/> 
                </button>
                <hr className="border-gray-100 mx-3" />
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-500 group transition">
                        <MdLogout className="text-[#FF6900] text-xl group-hover:text-white"/>
                       <span className="font-bold text-[#FF6900] group-hover:text-white">Se déconnecter</span>
                </button>
             </div>
              <div className="bg-white rounded-3xl shadow-md flex-1 p-4"></div>{/*partie contenu*/}

           </div>
   
       </div>

    )
}
export default ProfilPage