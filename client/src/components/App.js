import React, { useState, useCallback } from "react";
import "../style/App.css";
import axios from "axios";
import Swal from "sweetalert2";
import Ticket from "./Ticket";
import HeaderAndSiderNavbar from "./HeaderAndSiderNavbar";
import useStyles from "../useStyles";

function App() {
    const [ticketsArray, setTicketsArray] = useState([]);
    const [hideTicketsCounter, setHideTicketsCounter] = useState(0);
    const classes = useStyles();

    console.log("render app");

    const restore = useCallback(() => setHideTicketsCounter(0), []);

    const loadTicketsArrayForSearch = useCallback(
        async (inputValue, selectValue) => {
            try {
                const { data } = await axios.get(
                    `/api/tickets?${selectValue}=${encodeURIComponent(
                        inputValue
                    )}`
                );
                setTicketsArray(data);
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${e.message}`,
                });
            }
            // setValueOfNav(6);
        },
        []
    );

    const loadTicketsArray = useCallback(
        async (valueOfNav) => {
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
                        const { data } = await axios.get(
                            "/api/tickets/deleted"
                        );
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
        },
        [restore]
    );

    const clickedDoneOrUndone = useCallback(
        async (id, doneOrUndone) => {
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
        },
        [loadTicketsArray]
    );

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
        [loadTicketsArray]
    );

    const clickedHide = useCallback(
        async (id) => {
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
        },
        [loadTicketsArray]
    );

    return (
        <div className={classes.root}>
            <HeaderAndSiderNavbar
                loadTicketsArrayForSearch={loadTicketsArrayForSearch}
                ticketsArray={ticketsArray}
                hideTicketsCounter={hideTicketsCounter}
                restore={restore}
                loadTicketsArray={loadTicketsArray}
            />
            <main
            // style={{ width: "90vw" }}
            // className={clsx(classes.content, {
            //     [classes.contentShift]: open,
            // })}
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
