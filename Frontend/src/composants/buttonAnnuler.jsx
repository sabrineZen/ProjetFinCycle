import React from "react";

function AnnulerButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full h-full rounded-[15px] border-2 border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-widest cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 active:scale-95"
        >
            Annuler
        </button>
    );
}

export default AnnulerButton;