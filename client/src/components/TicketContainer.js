import React from "react";
import Ticket from "./Ticket";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

export default function TicketContainer({ ticketsArray, loadTicketsArray }) {
  const cache = React.useRef(
    new CellMeasurerCache({
      fixWidth: true,
      defaultHeight: 100,
    })
  );

  function rowRenderer({ key, index, style, parent }) {
    console.log("render ticket Container");
    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={{ ...style }}>
          {!ticketsArray[index].hide && (
            <Ticket ticket={ticketsArray[index]} loadTicketsArray={loadTicketsArray} />
          )}
        </div>
      </CellMeasurer>
    );
  }
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 60px)",
          position: "absolute",
          bottom: "0",
        }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={ticketsArray.length}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    </>
  );
}
