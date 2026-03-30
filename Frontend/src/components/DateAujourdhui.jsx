import React from "react";

function DateAujourdhui() {
  const aujourdHui = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <p 
      id="date"
      className="text-gray-700 font-medium text-lg mb-2"
    >
      {aujourdHui.toLocaleDateString("fr-FR", options)}
    </p>
  );
}

export default DateAujourdhui;