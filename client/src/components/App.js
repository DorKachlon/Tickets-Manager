import React, { useEffect, useState, useRef } from "react";
import Ticket from "./Ticket";
import "../App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

function App() {
    const [ticketsArray, setTicketsArray] = useState([]);
    let [hideTicketsCounter, setHideTicketsCounter] = useState(0);
    const CTicket = useRef();
    debugger;
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
                setTicketsArray(data);
            } catch (e) {
                alert(e);
            }
        }
    }
    useEffect(() => {
        loadTicketsArray();
    }, []);

    return (
        <main>
            <div>
                Showing {ticketsArray.length} results{" "}
                {hideTicketsCounter !== 0 &&
                    `(${hideTicketsCounter} hidden tickets - `}
                {hideTicketsCounter !== 0 && <button>restore</button>}
                {hideTicketsCounter !== 0 && ")"}
            </div>
            <TextField
                id="searchInput"
                label="Search"
                variant="outlined"
                placeholder="Search"
                onChange={(e) => {
                    loadTicketsArray(e.target.value);
                }}
            />

            {ticketsArray.map((object) => (
                <Ticket
                    ref={CTicket}
                    key={object.id}
                    ticket={object}
                    hideTicketsCounter={hideTicketsCounter}
                    setHideTicketsCounter={setHideTicketsCounter}
                />
            ))}
        </main>
    );
}

export default App;
