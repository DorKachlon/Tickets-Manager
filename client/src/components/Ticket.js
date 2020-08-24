import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "../ticket.css";
export default function Ticket({
    ticket,
    setHideTicketsCounter,
    hideTicketsCounter,
}) {
    const [hidden, setHidden] = useState(false);
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    function convertDate(creationTime) {
        let d = new Date(creationTime);
        let m = addZero(d.getMinutes());
        let h = d.getHours();
        let amPm = "PM";
        if (h > 12) {
            h = h - 12;
            amPm = "PM";
        } else if (h < 12) {
            amPm = "AM";
        }
        let s = addZero(d.getSeconds());
        let today = d;
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yyyy = today.getFullYear();
        today = dd + "/" + mm + "/" + yyyy;
        return today + " " + h + ":" + m + ":" + s + " " + amPm;
    }

    return (
        <>
            {!hidden ? (
                <div className="ticket">
                    <Paper elevation={3}>
                        <div className="headerTicket">
                            <div className="title"> {ticket.title}</div>
                            <Button
                                className="hideTicketButton"
                                style={{ marginLeft: "auto", fontWeight:"bolder",  textTransform: "none"}}
                                onClick={() => {
                                    setTimeout(() => {
                                        setHidden(true);
                                        setHideTicketsCounter(
                                            hideTicketsCounter + 1
                                        );
                                    }, 100);
                                }}
                                color="primary"
                            >
                                Hide
                            </Button>
                        </div>
                        <div className="content">{ticket.content}</div>
                        <div className="footerTicket">
                            <div className="email">by {ticket.userEmail}</div>
                            <div className="date">
                                |{convertDate(ticket.creationTime)}
                            </div>
                            {ticket.labels && (
                                <div className="labels">
                                    {ticket.labels.map((label) => (
                                        <button key={label} className="label">
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Paper>
                </div>
            ) : null}
        </>
    );
}
