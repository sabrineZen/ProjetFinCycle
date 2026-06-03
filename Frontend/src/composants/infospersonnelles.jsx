import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
function InfoPersonnelles({ profil }){
    return(
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Informations personnelles</h2>
            <div className="flex gap-4">
                <div className="flex-1" >
                    <label className="text-sm text-orange-600">Prénom</label>
                    <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1">
                      <BsPerson className="text-[#FF6900] text-xl"/>
                      <input type="text" value={profil?.prenom || ""} readOnly placeholder="Prénom" className="outline-none w-full bg-transparent" />                      
                    </div> 
                 </div>
                  <div className="flex-1">
                     <label className="text-sm text-orange-600">Nom</label>
                     <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1">
                        <BsPerson className="text-[#FF6900] text-xl"/>
                        <input type="text" value={profil?.nom.split(' ').pop() || ""} readOnly placeholder="Nom" className="outline-none w-full bg-transparent" />                         
                      </div>               
                   </div>  

            </div>

            <div>
                     <label className="text-sm text-orange-600">Email</label>
                     <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
                        <CgMail className="text-[#FF6900] text-xl" />
                        <input type="email" value={profil?.email || ""} readOnly placeholder="Email" className="outline-none w-full bg-transparent" />                        
                      </div>               
                   </div>  
           
           <div>
               <label className="text-sm text-orange-600">Telephone</label>
             <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1"> 
               <MdOutlinePhone className="text-[#FF6900] text-xl" />
               <input type="text" value={profil?.telephone || ""} readOnly placeholder="Téléphone" className="outline-none w-full bg-transparent"/>               
             </div>
           </div>
           
            <div>
              <label className="text-sm text-orange-600">Adresse</label>
              <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1">
               <GrLocation className="text-[#FF6900] text-xl"/>
               <input type="text" value={profil?.adresse || ""} readOnly placeholder="Adresse" className="outline-none w-full bg-transparent"/>               
              </div>    
            </div>                              
           <button className="w-full bg-[#FF6900] text-white py-2 rounded-lg hover:bg-orange-600 transition">Enregistrer modification</button>
           
        </div>
    )
}
export default InfoPersonnelles