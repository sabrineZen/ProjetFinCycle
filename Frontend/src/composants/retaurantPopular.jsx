function RestaurantPopular({restaurant, hoverClass}) {
    return(
         <div className={`shadow-lg bg-[#FFFFFF]  w-[570px] h-[450px] rounded-[30px] flex justify-start items-start flex-col ${hoverClass}`}>
            <div className="w-143 h-50 bg-gray-300 rounded-t-[30px]"></div>
            <h2 className="text-3xl font-semibold mb-2 pt-8 text-secondary pl-3 ">{restaurant.name}</h2>
         </div>
    );
    
}
export default RestaurantPopular;