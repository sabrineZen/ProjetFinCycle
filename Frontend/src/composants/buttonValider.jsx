import React from "react";

function ValiderButton({ onClick }) {
    return (
        <button 
            onClick={onClick}
            className="w-full h-full rounded-[15px] bg-[#FF6B2B] text-white font-black uppercase text-[11px] tracking-widest cursor-pointer transition-all hover:bg-[#e85a1a] hover:shadow-lg hover:shadow-orange-200 active:scale-95"
        >
            Paiement
        </button>
    );
}

export default ValiderButton;