import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { Paper, IconButton, Chip } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import ReadMoreReact from "read-more-react";
import { convertDate } from "../helpers";
import "../style/ticket.css";

export default function Ticket({ ticket, loadTicketsArray }) {
  console.log("render ticket");

  const clickedDoneOrUndone = async (id, doneOrUndone) => {
    try {
      await axios.post(`/api/tickets/${id}/${doneOrUndone}`);
      loadTicketsArray();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${e.message}`,
      });
    }
  };

  const clickedDeleteOrUndelete = async (id, deleteOrUndelete) => {
    try {
      await axios.post(`/api/tickets/${id}/${deleteOrUndelete}`);
      loadTicketsArray();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${e.message}`,
      });
    }
  };

  const clickedHide = async (id) => {
    try {
      await axios.post(`/api/tickets/${id}/hide`);
      loadTicketsArray();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${e.message}`,
      });
    }
  };
  return (
    <div className={"ticket"}>
      <Paper elevation={3} style={ticket.done ? { backgroundColor: "rgb(144, 204, 117)" } : {}}>
        <div className="headerTicket">
          <div className="title"> {ticket.title}</div>
          <Chip
            style={{
              margin: "5px 5px 0px auto",
              fontWeight: "bolder",
              textTransform: "none",
            }}
            variant="outlined"
            icon={<VisibilityOffIcon />}
            label="HIDE"
            clickable
            onClick={() => {
              clickedHide(ticket.id);
            }}
          />
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
        <div className="footerTicket">
          <div className="email">
            <span style={{ marginRight: "0.5em" }}>by</span>
            {ticket.userEmail}
          </div>
          <div className="date">{convertDate(ticket.creationTime)}</div>
          {ticket.labels && (
            <div className="labels">
              {ticket.labels.map((label) => (
                <Chip label={label} style={{ margin: "5px" }} />
              ))}
            </div>
          )}
        </div>
        <div
          className="footerButton"
          style={ticket.delete ? { backgroundColor: "rgba(211, 109, 109, 0.84)" } : {}}
        >
          {!ticket.done ? (
            <IconButton onClick={() => clickedDoneOrUndone(ticket.id, "done")}>
              <CheckCircleIcon style={{ color: "green" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => clickedDoneOrUndone(ticket.id, "undone")}>
              <CancelIcon style={{ color: "red" }} />
            </IconButton>
          )}
          {!ticket.delete ? (
            <IconButton onClick={() => clickedDeleteOrUndelete(ticket.id, "delete")}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => clickedDeleteOrUndelete(ticket.id, "undelete")}>
              <AddToQueueIcon style={{ color: "green" }} />
            </IconButton>
          )}
        </div>
      </Paper>
    </div>
  );
}
