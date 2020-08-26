import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Swal from 'sweetalert2';
import Ticket from './Ticket';
import HeaderBar from './HeaderBar';
import SideNavbar from './SideNavbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
  const [call, setCall] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [valueOfNav, setValueOfNav] = useState(1);
  const [selectValue, setSelectValue] = useState('searchText');

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
          text: { e },
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
          text: { e },
        });
      }
    }
  }

  useEffect(() => {
    async function loadTicketsArray(inputValue) {
      if (inputValue) {
        try {
          const { data } = await axios.get(
            `/api/tickets?searchText=${inputValue.replace(
              ' ',
              '+',
            )}`,
          );
          await setTicketsArray(data);
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: { e },
          });
        }
      } else {
        try {
          switch (valueOfNav) {
            case 1: {
              const { data } = await axios.get('/api/tickets');
              setTicketsArray(data);
              break;
            }
            case 2: {
              const { data } = await axios.get(
                '/api/tickets/done',
              );
              setTicketsArray(data);
              break;
            }
            case 3: {
              const { data } = await axios.get(
                '/api/tickets/undone',
              );
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
            text: { e },
          });
        }
      }
      setHideTicketsCounter(0);
    }
    if (valueOfNav !== 6) loadTicketsArray();
  }, [valueOfNav]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function restore() {
    setHideTicketsCounter(0);
    setCall(call + 1);
  }
  async function clickedDoneOrUndone(id, doneOrUndone) {
    try {
      await axios.post(`/api/tickets/${id}/${doneOrUndone}`);
      loadTicketsArray2();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: { e },
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
          />
        ))}
      </main>
    </div>
  );
}

export default App;
