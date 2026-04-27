import { useLocation } from 'react-router-dom'
import Carteplat from '../../composants/carteplat'
import Footer from '../../composants/footer'
function CategoriesPage() {
    const location = useLocation()
    const categorieChoisie = location.state
    const categories=[
        {id:1, nom:"Plats Traditionnel",
          plats:[
            {nom:"Couscous",prix:450},
            {nom:"Rechta",prix:380},
            {nom:"Chakhchoukha",prix:400},
            {nom:"Berkoukes",prix:350},
            {nom:"Douwara",prix:300},
            {nom:"Mthewem",prix:420}

          ]
        },
        {id:2, nom:"Grillades",
          plats:[
            {nom:"Brochettes Viande",prix:350},
            {nom:"Poulet Grillé",prix:480},
            {nom:"Merguez",prix:320},
            {nom:"Côtelettes Agneau",prix:550},
            {nom:"Kefta",prix:300},
            {nom:"Tikka Poulet",prix:420},

          ]
        },
        { id:3,nom:"Fast Food",
          plats:[
            {nom:"Burger Maison",prix:250},
            {nom:"Sandwich Merguez",prix:180},
            {nom:"Hot Dog", prix:150},
            {nom:"Panini Poulet",prix:200},
            {nom:"Pizza Rapide",prix:280},
            {nom:"Sandwich Kefta",prix:170}
         ]
        },
        { id:4,nom:"Saldes",
          plats:[
            {nom:"Salade Mechouia",prix:180},
            {nom:"Salade Fattouche",prix:150},
            {nom:"Salade Niçoise",prix:200},
            {nom:"Taktouka",prix:160},
            {nom:"Salade Verte",prix: 120},
            {nom:"Salade Chouia",prix: 140}
          ]
        },
        { id:5,nom:"Dessert",
          plats:[
            {nom:"Baklawa",prix:200},
            {nom:"Qalb Louz",prix:180},
            {nom:"Zlabia",prix:150},
            {nom:"Makhrouta",prix:170},
            {nom:"Charak",prix:120},
            {nom:"Samsa",prix: 160},
          ]
        },
        { id:6,nom:"Boissons",
          plats:[
            {nom:"Jus Citron Menthe",prix:120},
            {nom:"Limonade",prix:100},
            {nom:"Jus Orange Frais",prix:130},
            {nom:"Thé à la Menthe",prix:80},
            {nom:"Café",prix:70},
            {nom:"Lben",prix:60}
          ]
        },
        { id:7,nom:"Plats Asiatique",
          plats:[
            {nom:"Riz Cantonais",prix:350},
            {nom:"Nouilles Sautées" ,prix:320},
            {nom:"Poulet Kung Pao" ,prix:380},
            {nom:"Sushi Maison" ,prix:450},
            {nom:"Soupe Ramen" ,prix:300},
            {nom:"Nem Frit" ,prix:250}
          ]
        },

    ]
    const catAfficher = categories.find(cat => cat.id === categorieChoisie.id)
    return (
      <div> 
        <div >
                <h2 className="text-3xl font-bold px-8 pt-8 pb-4" style={{ color: '#8B2A1B' }}>{catAfficher.nom}</h2>
                <div className="grid grid-cols-3 gap-6 p-8">
                    {catAfficher.plats.map(plt =>(
                    <Carteplat plat={plt} hoverClass="hover:scale-105 transition-transform duration-300" />
                    ))
                }
                </div>
                
        </div>
        <Footer />
     </div> 
    )
}

export default CategoriesPage;