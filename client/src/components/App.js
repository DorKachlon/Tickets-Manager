import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/src/sweetalert2.js'
import DataTitle from './DataTitle';
import Ticket from './Ticket';

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [valueOfNav, setValueOfNav] = useState(1);
  const [selectValue, setSelectValue] = useState(10);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  async function loadTicketsArray2(inputValue) {
    if (inputValue) {
      try {
        switch (selectValue) {
          case 10: {
            const { data } = await axios.get(
              `/api/tickets?searchText=${encodeURIComponent(
                inputValue,
              )}`,
            );
            setTicketsArray(data);
            break;
          }
          case 20: {
            const { data } = await axios.get(
              `/api/tickets?searchContent=${encodeURIComponent(
                inputValue,
              )}`,
            );
            setTicketsArray(data);
            break;
          }
          case 30: {
            const { data } = await axios.get(
              `/api/tickets?Email=${encodeURIComponent(
                inputValue,
              )}`,
            );
            setTicketsArray(data);
            break;
          }

          default: {
            const { data } = await axios.get(
              `/api/tickets?searchText=${encodeURIComponent(
                inputValue,
              )}`,
            );
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

  function titlePartOfNav() {
    let str = '';
    switch (valueOfNav) {
      case 1:
        str = 'All tickets';
        break;
      case 2:
        str = 'Done Tickets';
        break;
      case 3:
        str = 'Undone Tickets';
        break;
      case 4:
        str = 'Hide Tickets';
        break;
      case 5:
        str = 'Trash';
        break;
      case 6:
        str = 'All tickets';
        break;
      default:
        str = 'All tickets';
    }
    return str;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              open && classes.hide,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            style={{ marginRight: `${2}em` }}
          >
            Tickets Manager -
            <span id="titlePartOfNav">
              {' '}
              {titlePartOfNav()}
            </span>
          </Typography>
          <DataTitle
            ticketsArray={ticketsArray}
            hideTicketsCounter={hideTicketsCounter}
            restore={restore}
          />
          <TextField
            style={{
              marginLeft: 'auto',
              color: 'white',
              marginRight: '1.5em',
            }}
            id="searchInput"
            label="Search"
            onKeyUp={(e) => {
              loadTicketsArray2(e.target.value);
            }}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue}
              onChange={handleChange}
              style={{ padding: '0 0.5em' }}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={10}>Title</MenuItem>
              <MenuItem value={20}>Content</MenuItem>
              <MenuItem value={30}>E-mail</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <List>
          <Divider />
          <ListItem
            button
            key="All Tickets"
            style={
              valueOfNav === 1 || valueOfNav === 6
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(1)}
          >
            <ListItemIcon>
              <AllInboxIcon
                style={
                  valueOfNav === 1 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="All Tickets" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Done Tickets"
            style={
              valueOfNav === 2
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(2)}
          >
            <ListItemIcon>
              <CheckCircleIcon
                style={
                  valueOfNav === 2 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Done Tickets" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Undone Tickets"
            style={
              valueOfNav === 3
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(3)}
          >
            <ListItemIcon>
              <SmsFailedIcon
                style={
                  valueOfNav === 3 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Undone Tickets" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Hide Tickets"
            style={
              valueOfNav === 4
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(4)}
          >
            <ListItemIcon>
              <VisibilityOffIcon
                style={
                  valueOfNav === 4 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Hide Tickets  NOTWORK" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Trash"
            style={
              valueOfNav === 5
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(5)}
          >
            <ListItemIcon>
              <DeleteIcon
                style={
                  valueOfNav === 5 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Trash NOTWORK" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
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
