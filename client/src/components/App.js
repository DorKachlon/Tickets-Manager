import React, { useEffect, useState } from 'react';
import '../style/App.css';
import axios from 'axios';
import clsx from 'clsx';
import Swal from 'sweetalert2';
import Ticket from './Ticket';
import HeaderBar from './HeaderBar';
import SideNavbar from './SideNavbar';
import useStyles from '../useStyles';

function App() {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
  const [call, setCall] = useState(0);
  const [open, setOpen] = useState(false);
  const [valueOfNav, setValueOfNav] = useState(1);
  const [selectValue, setSelectValue] = useState('searchText');
  const [hideTicketsArray, setHideTicketsArray] = useState([]);
  const classes = useStyles();

  function restore() {
    setHideTicketsCounter(0);
    setCall(call + 1);
  }
  async function loadTicketsArray2(inputValue) {
    if (inputValue) {
      try {
        const { data } = await axios.get(
          `/api/tickets?${selectValue}=${encodeURIComponent(
            inputValue,
          )}`,
        );
        setTicketsArray(data);
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${e.message}`,
        });
      }
      setValueOfNav(6);
    } else {
      try {
        const { data } = await axios.get('/api/tickets');
        setHideTicketsCounter(0);
        setTicketsArray(data);
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${e.message}`,
        });
      }
    }
  }
  async function loadTicketsArray() {
    try {
      switch (valueOfNav) {
        case 1: {
          const { data } = await axios.get('/api/tickets');
          setTicketsArray(data.filter((obj) => !obj.delete));
          break;
        }
        case 2: {
          const { data } = await axios.get('/api/tickets/done');
          setTicketsArray(data.filter((obj) => !obj.delete));
          break;
        }
        case 3: {
          const { data } = await axios.get('/api/tickets/undone');
          setTicketsArray(data.filter((obj) => !obj.delete));
          break;
        }
        case 5: {
          const { data } = await axios.get('/api/tickets/deleted');
          setTicketsArray(data);
          break;
        }
        default: {
          const { data } = await axios.get('/api/tickets');
          setTicketsArray(data);
          break;
        }
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${e.message}`,
      });
    }
    restore();
  }
  useEffect(() => {
    if ([1, 2, 3, 5].includes(valueOfNav)) loadTicketsArray();
    if (valueOfNav === 4) setTicketsArray(hideTicketsArray);
  }, [valueOfNav]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function clickedDoneOrUndone(id, doneOrUndone) {
    try {
      await axios.post(`/api/tickets/${id}/${doneOrUndone}`);
      loadTicketsArray();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${e.message}`,
      });
    }
  }
  async function clickedDeleteOrUndelete(id, deleteOrUndelete) {
    try {
      await axios.post(`/api/tickets/${id}/${deleteOrUndelete}`);
      loadTicketsArray();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${e.message}`,
      });
    }
  }
  return (
    <div className={classes.root}>
      <HeaderBar
        loadTicketsArray2={loadTicketsArray2}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        valueOfNav={valueOfNav}
        ticketsArray={ticketsArray}
        hideTicketsCounter={hideTicketsCounter}
        restore={restore}
      />
      <SideNavbar
        handleDrawerClose={handleDrawerClose}
        open={open}
        valueOfNav={valueOfNav}
        setValueOfNav={setValueOfNav}
      />
      <main
        style={{ width: '90vw' }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {ticketsArray.map((ticket) => (
          <Ticket
            key={ticket.id}
            open={open}
            ticket={ticket}
            hideTicketsCounter={hideTicketsCounter}
            setHideTicketsCounter={setHideTicketsCounter}
            clickedDoneOrUndone={clickedDoneOrUndone}
            call={call}
            hideTicketsArray={hideTicketsArray}
            setHideTicketsArray={setHideTicketsArray}
            clickedDeleteOrUndelete={clickedDeleteOrUndelete}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
