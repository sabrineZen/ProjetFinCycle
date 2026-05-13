import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import { useState, useEffect } from "react";
function InfoPersonnelles(){
    const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [adresse, setAdresse] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:5000/api/utilisateurs/profil", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {
      setPrenom(data.prenom)
      setNom(data.nom)
      setEmail(data.email)
      setTelephone(data.telephone)
      setAdresse(data.adresse)
    })
  }, [])

  function enregistrer() {
    fetch("http://localhost:5000/api/utilisateurs/profil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        prenom: prenom,
        nom: nom,
        email: email,
        telephone: telephone,
        adresse: adresse
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message)
    })
  }
    return(
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Informations personnelles</h2>
            <div className="flex gap-4">
                <div className="flex-1" >
                    <label className="text-sm text-orange-600">Prénom</label>
                    <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1">
                      <BsPerson className="text-[#FF6900] text-xl"/>
                      <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} className="outline-none w-full" />                      
                    </div> 
                 </div>
                  <div className="flex-1">
                     <label className="text-sm text-orange-600">Nom</label>
                     <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1">
                        <BsPerson className="text-[#FF6900] text-xl"/>
                        <input type="text" value={nom} onChange={e => setNom(e.target.value)} className="outline-none w-full" />                         
                      </div>               
                   </div>  

            </div>

            <div>
                     <label className="text-sm text-orange-600">Email</label>
                     <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
                        <CgMail className="text-[#FF6900] text-xl" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="outline-none w-full" />                        
                      </div>               
                   </div>  
           
           <div>
               <label className="text-sm text-orange-600">Telephone</label>
             <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1"> 
               <MdOutlinePhone className="text-[#FF6900] text-xl" />
               <input type="text" value={telephone} onChange={e => setTelephone(e.target.value)} className="outline-none w-full" />               
             </div>
           </div>
           
            <div>
              <label className="text-sm text-orange-600">Adresse</label>
              <div className="flex items-center bg-[#FFF0E8]  rounded-lg px-3 py-2 mt-1">
               <GrLocation className="text-valider text-xl"/>
               <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)} className="outline-none w-full bg-transparent" />               
              </div>    
            </div>                              
           <button onClick={enregistrer} className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">Enregistrer modification</button>
           
        </div>
    )
}
export default InfoPersonnelles