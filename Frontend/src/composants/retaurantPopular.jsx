function RestaurantPopular({ restaurant, hoverClass }) {
  return (
    <div className={`shadow-lg bg-[#FFFFFF] w-full max-w-[570px] h-[400px] rounded-[30px] flex justify-start items-start flex-col ${hoverClass}`}>
      <div className="w-full h-40 sm:h-48 bg-gray-300 rounded-t-[30px]">photo</div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 pt-4 sm:pt-8 text-secondary pl-3">{restaurant.name}</h2>
    </div>
  );
}
export default RestaurantPopular;