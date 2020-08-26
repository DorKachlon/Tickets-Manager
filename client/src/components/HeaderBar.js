import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import DataTitle from './DataTitle';

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

export default function HeaderBar({
  setSelectValue,
  selectValue,
  loadTicketsArray2,
  open,
  handleDrawerOpen,
  valueOfNav,
  ticketsArray,
  hideTicketsCounter,
  restore,
}) {
  const classes = useStyles();
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

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
    <>
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
              <MenuItem value="searchText">Title</MenuItem>
              <MenuItem value="searchContent">Content</MenuItem>
              <MenuItem value="Email">E-mail</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </>
  );
}
