import { fade, makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
const widthOfSearch = "200px";
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
  textField: {
    color: "black",
    width: "auto",
    padding: "0px",
    borderRadius: "5px",
    minWidth: widthOfSearch,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    transition: theme.transitions.create("width"),
    "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            //regular border
            border: "none",
        },
        "&.Mui-focused fieldset": {
            //focused border
            border: "none",
        },
        "&:hover fieldset": {
            //hover border
            border: "none",
        },
    },
  },
}));

export default useStyles;
