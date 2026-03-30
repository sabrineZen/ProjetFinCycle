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
    <p className="text-gray-500 ml-2 text-sm">
      {aujourdHui.toLocaleDateString("fr-FR", options)}
    </p>
  );
}

export default DateAujourdhui;