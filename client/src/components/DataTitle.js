import React from "react";
import "../style/dataTitle.css";

export default function DataTitle({ ticketsArray, restore, valueOfNav }) {
  const hideTicketsCounter = () => {
    let counter = 0;
    for (let ticket of ticketsArray) {
      if (ticket.hide) {
        counter++;
      }
    }
    return counter;
  };
  const mainStr = `Showing ${ticketsArray.length} results `;
  return (
    <div>
      {mainStr}
      {valueOfNav !== 4 && (
        <>
          {hideTicketsCounter() !== 0 && (
            <>
              <span>(</span>
              <span id="hideTicketsCounter">{hideTicketsCounter()}</span>

              <span> hidden tickets - </span>
              <button id="restoreHideTickets" onClick={() => restore()}>
                restore
              </button>
              <span>)</span>
            </>
          )}
        </>
      )}
    </div>
  );
}
