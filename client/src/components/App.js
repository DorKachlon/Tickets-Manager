import React, { useState, useCallback, useEffect } from "react";
import "../style/App.css";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderAndSiderNavbar from "./HeaderAndSiderNavbar";
import useStyles from "../useStyles";
import TicketContainer from "./TicketContainer";

function App() {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [valueOfNav, setValueOfNav] = useState(1);
  const classes = useStyles();

  console.log("render app");

  const loadTicketsArrayForSearch = useCallback(async (inputValue, selectValue) => {
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
    // setValueOfNav(6);
  }, []);

  const loadTicketsArray = useCallback(async () => {
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
        case 4: {
          const { data } = await axios.get("/api/tickets/hided");
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
    // restore();
  }, [valueOfNav]);

  useEffect(() => {
    loadTicketsArray();
  }, [loadTicketsArray]);

  const restore = useCallback(async () => {
    await axios.post(`/api/tickets/UnHideAll`);
    loadTicketsArray();
  }, [loadTicketsArray]);

  return (
    <div className={classes.root}>
      <HeaderAndSiderNavbar
        loadTicketsArrayForSearch={loadTicketsArrayForSearch}
        ticketsArray={ticketsArray}
        restore={restore}
        valueOfNav={valueOfNav}
        setValueOfNav={setValueOfNav}
      />
      <TicketContainer
        ticketsArray={ticketsArray}
        valueOfNav={valueOfNav}
        loadTicketsArray={loadTicketsArray}
      />
    </div>
  );
}

export default App;
