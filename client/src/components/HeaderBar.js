import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import DataTitle from "./DataTitle";
import useStyles from "../useStyles";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function HeaderBar({
  loadTicketsArrayForSearch,
  open,
  handleDrawerOpen,
  valueOfNav,
  ticketsArray,
  restore,
  setValueOfNav,
}) {
  const [selectValue, setSelectValue] = useState("searchText");
  console.log("render header");
  const classes = useStyles();
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

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
      case 6:
        str = "All tickets";
        break;
      default:
        str = "All tickets";
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
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ width: "380px", display: "flex" }}>
            Tickets Manager -<div id="titlePartOfNav"> {titlePartOfNav()}</div>
          </Typography>
          <DataTitle ticketsArray={ticketsArray} restore={restore} valueOfNav={valueOfNav} />
          <TextField
            style={{
              marginLeft: "auto",
              color: "white",
              marginRight: "1.5em",
            }}
            variant="outlined"
            placeholder="Search…"
            className={classes.textField}
            color="black"
            id="searchInput"
            onKeyUp={(e) => {
              setValueOfNav(1);
              loadTicketsArrayForSearch(e.target.value, selectValue);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={selectValue}
              onChange={handleChange}
              style={{ padding: "0 0.5em" }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
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
