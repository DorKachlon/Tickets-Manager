import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import "../App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import DataTitle from "./DataTitle";
// import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SmsFailedIcon from "@material-ui/icons/SmsFailed";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


function App() {
    const [ticketsArray, setTicketsArray] = useState([]);
    let [hideTicketsCounter, setHideTicketsCounter] = useState(0);
    let [searchHappened, setSearchHappened] = useState(false);
    
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    async function loadTicketsArray(param) {
        debugger;
        if (param) {
            try {
                const { data } = await axios.get(
                    `/api/tickets?searchText=${param.replace(" ", "+")}`
                );
                setTicketsArray(data);
            } catch (e) {
                alert(e);
            }
        } else {
            try {
                const { data } = await axios.get("/api/tickets");
                setHideTicketsCounter(0);
                setTicketsArray(data);
            } catch (e) {
                alert(e);
            }
        }
    }
    useEffect(() => {
        loadTicketsArray();
    }, []);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        open && classes.hide
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap style={{marginRight:"2em"}}>
                    Tickets Manager
                </Typography>
                <DataTitle
                ticketsArray={ticketsArray}
                searchHappened={searchHappened}
                hideTicketsCounter={hideTicketsCounter}
                loadTicketsArray={loadTicketsArray}
            />
                <TextField
                style={{marginLeft:"auto", color:"white"}}
                id="searchInput"
                label="Search"
                onChange={(e) => {
                    e.target.value !== ""
                        ? setSearchHappened(true)
                        : setSearchHappened(false);
                    loadTicketsArray(e.target.value);
                }}
            />
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
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key={"All Tickets"}>
                    <ListItemIcon>
                        <AllInboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"All Tickets"} />
                </ListItem>
                <ListItem button key={"Done Tickets"}>
                    <ListItemIcon>
                        <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Done Tickets"} />
                </ListItem>
                <ListItem button key={"Undone Tickets"}>
                    <ListItemIcon>
                        <SmsFailedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Undone Tickets"} />
                </ListItem>
                <ListItem button key={"Hide Tickets"}>
                    <ListItemIcon>
                        <VisibilityOffIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Hide Tickets"} />
                </ListItem>
                <ListItem button key={"Trash"}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Trash"} />
                </ListItem>
            </List>
            
            <Divider />
        </Drawer>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <Ticket
                ticketsArray={ticketsArray}
                hideTicketsCounter={hideTicketsCounter}
                setHideTicketsCounter={setHideTicketsCounter}
            />
        </main>
    </div>

    );
}

export default App;
