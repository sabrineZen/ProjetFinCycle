function Footer() {
  return (
    <footer className="w-full bg-[#8B2A1B] text-white mt-12 py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">

        {/* Logo / description */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold">Foodie</h2>
          <p className="mt-3 text-sm sm:text-base opacity-80">
            Découvrez les meilleurs plats près de chez vous 🍕
          </p>
        </div>

        {/* Liens */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="hover:underline cursor-pointer">Accueil</li>
            <li className="hover:underline cursor-pointer">Catégories</li>
            <li className="hover:underline cursor-pointer">Restaurants</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm sm:text-base">Email: contact@foodie.com</p>
          <p className="text-sm sm:text-base mt-1">Téléphone: +213 00 00 00 00</p>
        </div>

      </div>

      {/* Bas du footer */}
      <div className="text-center text-xs sm:text-sm mt-8 opacity-70">
        © 2026 Foodie. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;