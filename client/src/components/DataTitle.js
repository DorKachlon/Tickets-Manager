import React from 'react';
import '../style/dataTitle.css';

export default function DataTitle({
  ticketsArray,
  hideTicketsCounter,
  restore,
}) {
  const mainStr = `Showing ${ticketsArray.length} results `;
  return (
    <div>
      {mainStr}
      {hideTicketsCounter !== 0 && (
        <>
          <span>(</span>
          <span id="hideTicketsCounter">{hideTicketsCounter}</span>
          <span> hidden tickets - </span>
          <button id="restoreHideTickets" onClick={() => restore()}>
            restore
          </button>
          <span>)</span>
        </>
      )}
    </div>
  );
}
