import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function TicketContainer({ ticketsArray, loadTicketsArray, valueOfNav }) {
  console.log("render ticket Container");
  let [ticketDisplay, setTicketDisplay] = useState([]);
  let [hasMore, setHasMore] = useState(true);
  let [numberTodisplay, setNumberTodisplay] = useState(20);

  useEffect(() => {
    if (ticketsArray.length > 0) {
      setTicketDisplay(ticketsArray.slice(0, numberTodisplay));
      if (ticketsArray.slice(0, 20).length === ticketsArray.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } else {
      setTicketDisplay([]);
      setHasMore(false);
    }
  }, [ticketsArray]);

  useEffect(() => {
    setNumberTodisplay(20);
  }, [valueOfNav]);

  const fetchMoreData = () => {
    if (ticketDisplay.length === ticketsArray.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setTicketDisplay((prev) => ticketsArray.slice(0, prev.length + 20));
      setNumberTodisplay((prev) => prev + 20);
    }, 1500);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={ticketDisplay.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div
            style={{
              position: "relative",
              height: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {ticketDisplay.map((ticket) =>
          valueOfNav === 4 ? (
            <Ticket key={ticket.id} ticket={ticket} loadTicketsArray={loadTicketsArray} />
          ) : (
            !ticket.hide && (
              <Ticket key={ticket.id} ticket={ticket} loadTicketsArray={loadTicketsArray} />
            )
          )
        )}
      </InfiniteScroll>
    </>
  );
}
