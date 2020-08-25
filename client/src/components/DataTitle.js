import React from "react";

export default function DataTitle({
    ticketsArray,
    searchHappened,
    hideTicketsCounter,
    loadTicketsArray,
}) {
    const mainStr = `Showing ${ticketsArray.length} results`;
    const hiddenStr = `( ${hideTicketsCounter} hidden tickets - `;
    return (
        <div>
            {mainStr}
            {hideTicketsCounter !== 0 && (
                <span id="hideTicketsCounter">{hideTicketsCounter}</span>
            )}
            {hideTicketsCounter !== 0 && { hiddenStr }}
        </div>
    );
}
