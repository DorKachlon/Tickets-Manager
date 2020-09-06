import React, { useEffect, useState, useCallback } from "react";
import "../style/App.css";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import Ticket from "./Ticket";
import HeaderBar from "./HeaderBar";
import SideNavbar from "./SideNavbar";
import useStyles from "../useStyles";

function App() {
    const [ticketsArray, setTicketsArray] = useState([]);
    const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
    const [open, setOpen] = useState(false);
    const [valueOfNav, setValueOfNav] = useState(1);
    const [selectValue, setSelectValue] = useState("searchText");
    const classes = useStyles();

    console.log("render app");

    function restore() {
        setHideTicketsCounter(0);
    }
    async function loadTicketsArrayForSearch(inputValue) {
        try {
            const { data } = await axios.get(
                `/api/tickets?${selectValue}=${encodeURIComponent(inputValue)}`
            );
            setTicketsArray(data);
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${e.message}`,
            });
        }
        setValueOfNav(6);
    }
    async function loadTicketsArray() {
        try {
            switch (valueOfNav) {
                case 1: {
                    const { data } = await axios.get("/api/tickets");
                    setTicketsArray(data.filter((obj) => !obj.delete));
                    break;
                }
                case 2: {
                    const { data } = await axios.get("/api/tickets/done");
                    setTicketsArray(data.filter((obj) => !obj.delete));
                    break;
                }
                case 3: {
                    const { data } = await axios.get("/api/tickets/undone");
                    setTicketsArray(data.filter((obj) => !obj.delete));
                    break;
                }
                case 5: {
                    const { data } = await axios.get("/api/tickets/deleted");
                    setTicketsArray(data);
                    break;
                }
                default: {
                    const { data } = await axios.get("/api/tickets");
                    setTicketsArray(data);
                    break;
                }
            }
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${e.message}`,
            });
        }
        restore();
    }
    useEffect(() => {
        if ([1, 2, 3, 5].includes(valueOfNav)) loadTicketsArray();
        // if (valueOfNav === 4) ;
    }, [valueOfNav]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const clickedDoneOrUndone = useCallback(async (id, doneOrUndone) => {
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
    }, []);

    const clickedDeleteOrUndelete = useCallback(
        async (id, deleteOrUndelete) => {
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
        },
        []
    );
    const clickedHide = useCallback(async (id) => {
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
    }, []);
    return (
        <div className={classes.root}>
            <HeaderBar
                loadTicketsArrayForSearch={loadTicketsArrayForSearch}
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
                style={{ width: "90vw" }}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {ticketsArray.map((ticket) => (
                    <Ticket
                        key={ticket.id}
                        ticket={ticket}
                        hideTicketsCounter={hideTicketsCounter}
                        setHideTicketsCounter={setHideTicketsCounter}
                        clickedDoneOrUndone={clickedDoneOrUndone}
                        clickedDeleteOrUndelete={clickedDeleteOrUndelete}
                        clickedHide={clickedHide}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;
