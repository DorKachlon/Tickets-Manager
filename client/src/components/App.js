import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import "./App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

function App() {
    const [ticketsArray, setTicketsArray] = useState([]);
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
                <Ticket key={object.id} ticket={object} />
            ))}
        </main>
    );
}

export default App;
