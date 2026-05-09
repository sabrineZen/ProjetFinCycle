//chargement de plat 
const chargerplats=async(req,res)=>{
    try {
        const plats=await Plat.findall();
        res.json(plats);
    }catch (error) {
        res.status(500).json({message:error.message});
        console.error(error);
    }   }

   // charger les plats populaires a partir le nombre de commande
   const platsPopulaires = async (req, res) => {
  const plats = await Plat.findAll({
    include: [
      {
        model: LigneCommande,
        attributes: []
      }
    ],
    group: ["Plat.id"],
    order: [[sequelize.fn("COUNT", sequelize.col("Commandes.id")), "DESC"]]
  });

  res.json(plats);
};
//filter les plats 
const filtrerplats=async(req,res)=>{
    try {
        const {categorieId}=req.query;
        const plats=await Plat.findAll({where:{
          ...(nom && {nom: {[Op.like]: `%${nom}%`}}),

        }});
        res.json(plats);
    }catch (error) {
        res.status(500).json({message:error.message});
        console.error(error);
    }}


module.exports = { chargerplats,platsPopulaires,filtrerplats};