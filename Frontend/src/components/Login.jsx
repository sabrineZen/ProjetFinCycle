import img1 from "../assets/img1.jpg";
export default function Login() {
  return (

    
    <div className="min-h-screen flex justify-center items-center bg-[#FDE9DC] font-sans">
      
      {/* Main Card */}
      <div className="bg-[#FFF7F1] w-[850px] h-[520px] rounded-[45px] flex p-4 shadow-xl">
        
        {/* Image Side */}
        <div className="flex-[1.1] relative rounded-[40px] overflow-hidden">
          <img
            src={img1}
            alt="Hero"
            className="w-full h-full object-cover"
          />

          {/* Arrows */}
          <div className="absolute bottom-5 right-5 flex gap-2">
            <div className="bg-orange-400 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer">
              ←
            </div>
            <div className="bg-orange-400 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer">
              →
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-10 flex flex-col items-center text-center">
          
          <div className="self-start text-[#951418] font-bold mb-8">
            LOGO
          </div>

          <h1 className="text-[#951418] text-5xl mb-8 font-medium">
            Welcome
          </h1>

          {/* Inputs */}
          <input
            type="email"
            placeholder="Email"
            className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-lg mb-3 outline-none placeholder:text-[#BD897D] placeholder:text-sm"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-lg mb-3 outline-none placeholder:text-[#BD897D] placeholder:text-sm"
          />

          <a
            href="#"
            className="text-xs text-left w-[85%] mb-6 text-gray-700"
          >
            Mot de passe oublié ?
          </a>

          {/* Separator */}
          <div className="flex items-center w-full mb-5">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-xs text-gray-500">ou</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 mb-10">
            <button className="flex-1 bg-gray-200 py-3 rounded-2xl text-[#8b2323] font-bold">
              Sign Up
            </button>

            <button className="flex-1 bg-[#ff7c48] py-3 rounded-2xl text-white font-bold">
              Login
            </button>
          </div>

          {/* Footer */}
          <footer className="text-[10px] text-gray-500 leading-relaxed">
            En continuant, vous acceptez nos{" "}
            <a href="#" className="text-[#8b2323] font-bold">
              Conditions
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
 