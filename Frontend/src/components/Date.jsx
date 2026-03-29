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
    <p id="date">
      {aujourdHui.toLocaleDateString("fr-FR", options)}
    </p>
  );
}

export default DateAujourdhui;