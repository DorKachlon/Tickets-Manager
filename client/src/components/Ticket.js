import React from "react";
import Paper from "@material-ui/core/Paper";

export default function Ticket({ ticket }) {
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
        <div className="ticket">
            <Paper elevation={3}>
                <div className="title"> {ticket.title}</div>
                <div className="content">{ticket.content}</div>
                <div className="email">by {ticket.userEmail}</div>
                <div className="date">|{convertDate(ticket.creationTime)}</div>
                {ticket.labels && (
                    <div className="labels">
                        {ticket.labels.map((label) => (
                            <button key={label} className="label">
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </Paper>
        </div>
    );
}
