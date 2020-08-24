import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import "./App.css";
import axios from "axios";

function App() {
    const [ticketsArray, setTicketsArray] = useState([]);
    useEffect(() => {
        async function loadTicketsArray() {
            try {
                const { data } = await axios.get("/api/tickets");
                setTicketsArray(data);
            } catch (e) {
                alert(e);
            }
        }
        loadTicketsArray();
    }, []);

    return (
        <main>
            {ticketsArray.map((object) => (
                <Ticket ticket={object} />
            ))}
        </main>
    );
}

export default App;
