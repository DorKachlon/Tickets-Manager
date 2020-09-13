import React, { useCallback, useState } from "react";
import HeaderBar from "./HeaderBar";
import SideNavbar from "./SideNavbar";

export default function HeaderAndSiderNavbar({
    loadTicketsArrayForSearch,
    ticketsArray,
    hideTicketsCounter,
    restore,
    valueOfNav,
    setValueOfNav,
    loadTicketsArray,
}) {
    const [open, setOpen] = useState(false);
    console.log("render header side");

    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
    }, []);
    return (
        <>
            <HeaderBar
                loadTicketsArrayForSearch={loadTicketsArrayForSearch}
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
                loadTicketsArray={loadTicketsArray}
            />
        </>
    );
}
