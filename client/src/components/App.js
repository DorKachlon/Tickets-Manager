import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import "../App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import DataTitle from "./DataTitle";

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
    const [call, setCall] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [valueOfNav, setValueOfNav] = useState(1);

    async function loadTicketsArray(param) {
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
    // async function loadTicketsArray(param) {
    //     setHideTicketsCounter(0);
    //     switch (valueOfNav) {
    //         case 1: {
    //             if (param) {
    //                 try {
    //                     const { data } = await axios.get(
    //                         `/api/tickets?searchText=${param.replace(" ", "+")}`
    //                     );
    //                     await setTicketsArray(data);
    //                 } catch (e) {
    //                     alert(e);
    //                 }
    //             } else {
    //                 try {
    //                     const { data } = await axios.get("/api/tickets");
    //                     setHideTicketsCounter(0);
    //                     setTicketsArray(data);
    //                 } catch (e) {
    //                     alert(e);
    //                 }
    //             }
    //             break;
    //         }
    //         case 2: {
    //             try {
    //                 const { data } = await axios.get("/api/tickets/done");
    //                 setTicketsArray(data);
    //             } catch (e) {
    //                 alert(e);
    //             }
    //             break;
    //         }
    //         case 3: {
    //             try {
    //                 const { data } = await axios.get("/api/tickets/undone");
    //                 setTicketsArray(data);
    //             } catch (e) {
    //                 alert(e);
    //             }
    //             break;
    //         }

    //         default:
    //             break;
    //     }
    // }

    useEffect(() => {
        loadTicketsArray();
    }, []);

    // useEffect(() => {
    //     loadTicketsArray();
    // }, [valueOfNav]);
    
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
            loadTicketsArray();
        } catch (e) {
            alert(e);
        }
    }

    function titlePartOfNav() {
        let str = "";
        switch (valueOfNav) {
            case 1:
                str = "All tickets";
                break;
            case 2:
                str = "Done Tickets";
                break;
            case 3:
                str = "Undone Tickets";
                break;
            case 4:
                str = "Hide Tickets";
                break;
            case 5:
                str = "Trash";
                break;
            default:
                str = "All tickets";
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
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        style={{ marginRight: 2 + "em" }}
                    >
                        Tickets Manager -
                        <span id={"titlePartOfNav"}> {titlePartOfNav()}</span>
                    </Typography>
                    <DataTitle
                        ticketsArray={ticketsArray}
                        hideTicketsCounter={hideTicketsCounter}
                        restore={restore}
                    />
                    <TextField
                        style={{ marginLeft: "auto", color: "white" }}
                        id="searchInput"
                        label="Search"
                        onKeyUp={(e) => {
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

                <List>
                    <Divider />
                    <ListItem
                        button
                        key={"All Tickets"}
                        style={
                            valueOfNav === 1
                                ? { backgroundColor: "#3F51B5", color: "white" }
                                : {}
                        }
                        onClick={() => setValueOfNav(1)}
                    >
                        <ListItemIcon>
                            <AllInboxIcon
                                style={
                                    valueOfNav === 1 ? { color: "white" } : {}
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary={"All Tickets"} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        key={"Done Tickets"}
                        style={
                            valueOfNav === 2
                                ? { backgroundColor: "#3F51B5", color: "white" }
                                : {}
                        }
                        onClick={() => setValueOfNav(2)}
                    >
                        <ListItemIcon>
                            <CheckCircleIcon
                                style={
                                    valueOfNav === 2 ? { color: "white" } : {}
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary={"Done Tickets"} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        key={"Undone Tickets"}
                        style={
                            valueOfNav === 3
                                ? { backgroundColor: "#3F51B5", color: "white" }
                                : {}
                        }
                        onClick={() => setValueOfNav(3)}
                    >
                        <ListItemIcon>
                            <SmsFailedIcon
                                style={
                                    valueOfNav === 3 ? { color: "white" } : {}
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary={"Undone Tickets"} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        key={"Hide Tickets"}
                        style={
                            valueOfNav === 4
                                ? { backgroundColor: "#3F51B5", color: "white" }
                                : {}
                        }
                        onClick={() => setValueOfNav(4)}
                    >
                        <ListItemIcon>
                            <VisibilityOffIcon
                                style={
                                    valueOfNav === 4 ? { color: "white" } : {}
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary={"Hide Tickets  NOTWORK"} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        key={"Trash"}
                        style={
                            valueOfNav === 5
                                ? { backgroundColor: "#3F51B5", color: "white" }
                                : {}
                        }
                        onClick={() => setValueOfNav(5)}
                    >
                        <ListItemIcon>
                            <DeleteIcon
                                style={
                                    valueOfNav === 5 ? { color: "white" } : {}
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary={"Trash NOTWORK"} />
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
            <main
                style={{ width: "90vw" }}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {ticketsArray.map((ticket) => {
                    return (
                        <Ticket
                            key={ticket.id}
                            open={open}
                            ticket={ticket}
                            hideTicketsCounter={hideTicketsCounter}
                            setHideTicketsCounter={setHideTicketsCounter}
                            clickedDoneOrUndone={clickedDoneOrUndone}
                            call={call}
                        />
                    );
                })}
            </main>
        </div>
    );
}

export default App;
