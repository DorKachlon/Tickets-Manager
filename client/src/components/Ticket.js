import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import "../ticket.css";
import ReadMoreReact from "read-more-react";

export default function Ticket({
    ticket,
    setHideTicketsCounter,
    hideTicketsCounter,
    clickedDoneOrUndone,
    open,
    call,
}) {
    const [classK, setClassK] = useState("ticket");
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
        return today + ", " + h + ":" + m + ":" + s + " " + amPm;
    }
    useEffect(() => {
        setClassK("ticket");
    }, [call]);

    return (
        <div
            className={classK}
            style={open ? { width: "70vw" } : { width: "90vw" }}
        >
            <Paper
                elevation={3}
                style={
                    ticket.done ? { backgroundColor: "rgb(144, 204, 117)" } : {}
                }
            >
                <div className="headerTicket">
                    <div className="title"> {ticket.title}</div>
                    <Button
                        className="hideTicketButton"
                        style={{
                            marginLeft: "auto",
                            fontWeight: "bolder",
                            textTransform: "none",
                        }}
                        onClick={(e) => {
                            setHideTicketsCounter(hideTicketsCounter + 1);
                            setClassK("hiddenTicket");
                        }}
                        color="primary"
                    >
                        Hide
                    </Button>
                </div>
                <div className="content">
                    <ReadMoreReact
                        style={{ color: "blue" }}
                        text={ticket.content}
                        min={500}
                        ideal={500}
                        max={10000}
                        readMoreText="see more"
                    />
                </div>
                {/* <div className="content">{ticket.content}</div> */}
                <div className="footerTicket">
                    <div className="email">by {ticket.userEmail}</div>
                    <div className="date">
                        {convertDate(ticket.creationTime)}
                    </div>
                    {ticket.labels && (
                        <div className="labels">
                            {ticket.labels.map((label) => (
                                <span
                                    disabled={true}
                                    key={label}
                                    className="label"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="footerButton">
                    {!ticket.done ? (
                        <IconButton
                            onClick={() =>
                                clickedDoneOrUndone(ticket.id, "done")
                            }
                        >
                            <CheckCircleIcon style={{ color: "green" }} />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() =>
                                clickedDoneOrUndone(ticket.id, "undone")
                            }
                        >
                            <CancelIcon style={{ color: "red" }} />
                        </IconButton>
                    )}
                    <IconButton>
                        <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                </div>
            </Paper>
        </div>
    );
}
