import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import useStyles from '../useStyles';

export default function SideNavbar({
  handleDrawerClose, open, valueOfNav, setValueOfNav,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
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
            {theme.direction === 'ltr' ? (
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
            key="All Tickets"
            style={
              valueOfNav === 1 || valueOfNav === 6
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(1)}
          >
            <ListItemIcon>
              <AllInboxIcon
                style={
                  valueOfNav === 1 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="All Tickets" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Done Tickets"
            style={
              valueOfNav === 2
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(2)}
          >
            <ListItemIcon>
              <CheckCircleIcon
                style={
                  valueOfNav === 2 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Done Tickets" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Undone Tickets"
            style={
              valueOfNav === 3
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(3)}
          >
            <ListItemIcon>
              <SmsFailedIcon
                style={
                  valueOfNav === 3 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Undone Tickets" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Hide Tickets"
            style={
              valueOfNav === 4
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(4)}
          >
            <ListItemIcon>
              <VisibilityOffIcon
                style={
                  valueOfNav === 4 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Hide Tickets  NOTWORK" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Trash"
            style={
              valueOfNav === 5
                ? { backgroundColor: '#3F51B5', color: 'white' }
                : {}
            }
            onClick={() => setValueOfNav(5)}
          >
            <ListItemIcon>
              <DeleteIcon
                style={
                  valueOfNav === 5 ? { color: 'white' } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </>
  );
}
