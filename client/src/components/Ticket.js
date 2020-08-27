import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import '../style/ticket.css';
import ReadMoreReact from 'read-more-react';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

export default function Ticket({
  ticket,
  setHideTicketsCounter,
  hideTicketsCounter,
  clickedDoneOrUndone,
  open,
  call,
  hideTicketsArray,
  setHideTicketsArray,
  clickedDeleteOrUndelete,
}) {
  const [classK, setClassK] = useState('ticket');
  function addZero(i) {
    if (i < 10) {
      i = `0${i}`;
    }
    return i;
  }
  function convertDate(creationTime) {
    const d = new Date(creationTime);
    const m = addZero(d.getMinutes());
    let h = d.getHours();
    let amPm = 'PM';
    if (h > 12) {
      h -= 12;
      amPm = 'PM';
    } else if (h < 12) {
      amPm = 'AM';
    }
    const s = addZero(d.getSeconds());
    let today = d;
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;
    return `${today}, ${h}:${m}:${s} ${amPm}`;
  }
  useEffect(() => {
    setClassK('ticket');
  }, [call]);

  return (
    <div
      className={classK}
      style={open ? { width: '70vw' } : { width: '90vw' }}
    >
      <Paper
        elevation={3}
        style={
          ticket.done ? { backgroundColor: 'rgb(144, 204, 117)' } : {}
        }
      >
        <div className="headerTicket">
          <div className="title">
            {' '}
            {ticket.title}
          </div>
          <Button
            className="hideTicketButton"
            style={{
              marginLeft: 'auto',
              fontWeight: 'bolder',
              textTransform: 'none',
            }}
            onClick={() => {
              setHideTicketsCounter(hideTicketsCounter + 1);
              setClassK('hiddenTicket');
              const newArr = [...hideTicketsArray];
              newArr.push(ticket);
              setHideTicketsArray(newArr);
            }}
            color="primary"
          >
            Hide
          </Button>
        </div>
        <div className="content">
          <ReadMoreReact
            style={{ color: 'blue' }}
            text={ticket.content}
            min={500}
            ideal={500}
            max={10000}
            readMoreText="see more"
          />
        </div>
        {/* <div className="content">{ticket.content}</div> */}
        <div className="footerTicket">
          <div className="email">
            <span style={{ marginRight: '0.5em' }}>by</span>
            {ticket.userEmail}
          </div>
          <div className="date">
            {convertDate(ticket.creationTime)}
          </div>
          {ticket.labels && (
            <div className="labels">
              {ticket.labels.map((label) => (
                <span disabled key={label} className="label">
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          className="footerButton"
          style={
            ticket.delete
              ? { backgroundColor: 'rgba(211, 109, 109, 0.84)' }
              : {}
          }
        >
          {!ticket.done ? (
            <IconButton
              onClick={() => clickedDoneOrUndone(ticket.id, 'done')}
            >
              <CheckCircleIcon style={{ color: 'green' }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => clickedDoneOrUndone(ticket.id, 'undone')}
            >
              <CancelIcon style={{ color: 'red' }} />
            </IconButton>
          )}
          {!ticket.delete ? (
            <IconButton
              onClick={() => clickedDeleteOrUndelete(ticket.id, 'delete')}
            >
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => clickedDeleteOrUndelete(ticket.id, 'undelete')}
            >
              <AddToQueueIcon style={{ color: 'green' }} />
            </IconButton>
          )}
        </div>
      </Paper>
    </div>
  );
}
