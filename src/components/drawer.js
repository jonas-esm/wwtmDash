import React from 'react'
import { Divider, List,ListItem, ListItemIcon, ListItemText, StylesProvider, ThemeProvider, jssPreset, createMuiTheme, makeStyles, CssBaseline } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {routes} from '../routes.js'
import rtl from 'jss-rtl';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from "classnames";

import { create } from 'jss';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
    direction: "rtl",
    palette:{
    primary: {
        light: '#51d1e1',
        main: '#26c6da',
        dark: '#1a8a98',
        contrastText: '#fff',
    }},
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 16,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },})
    const drawerWidth = 180
    const useStyles = makeStyles({
        link:{textDecoration:'none'},
        menuButton: {
            marginLeft: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              display: 'none',
            },
          },
          // necessary for content to be below app bar
          toolbar: theme.mixins.toolbar,
          drawerPaper: {
            // backgroundColor:'red',
            // background:"url('../components/images/material.jpg')",
        
            width: drawerWidth,
          },
          itemText:{
              textDecoration:'none',
              fontWeight:'bold',
            color:'#777'
          },
          itemLink:{
            transition:'all .1s ease-in-out;',

            color:'#999',
            "&& :hover ":{
                
                backgroundColor:'transparent',
                transform:'scale(1.1)'
          }
        },
          activeLink:{
              fontWeight:'bold',
              transition:'all .1s ease-in-out;',

            //   color:"red",
            //   backgroundColor:'red'
            borderLeft:'5px #26c6da solid',
            "&& :hover ":{

                backgroundColor:'transparent',
            }
          },
          blacFont:{
            textDecoration:'none',
            color:theme.palette.primary.dark,
            fontWeight:'bold',

            
          },
          blueIcon:{
            //   color:theme.palette.primary,
            color:'#26c6da',
            "&& :hover ":{
                transform:'scale(1)',

                backgroundColor:'transparent',
          }}

    })
function Drawer(props) {
    const classes = useStyles()
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
      }
    return (

        <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
            <CssBaseline>
              <div>
        <div className={classes.toolbar} />
        <Divider />
        <List >
        {routes.map((item , key) =>{

        var listItemClasses = classNames({
            [" " + classes.activeLink]: activeRoute( item.path)
        });
        // }
        const blackFontClasses = classNames({
        [" " + classes.blacFont]: activeRoute( item.path)
        });
        const blueIconClasses = classNames({
            [" " + classes.blueIcon]: activeRoute( item.path)
            });
        return (
             <NavLink
             to={item.path}
             activeClassName='active'
            //  className={classes.item}
            className={classes.link}
            //  activeClassName="active"
             key={key}
           >
                <ListItem button
                 className={classes.itemLink + listItemClasses}
                 onClick={props.handleDrawerToggle}
                 >
                     <ListItemIcon >
                     <item.icon  className={classes.itemText +blueIconClasses}/>
                     </ListItemIcon>
           
            <ListItemText
            className={classes.itemText + blackFontClasses}
              primary={item.name}
             
            //   {classNames(classes.itemText, whiteFontClasses, {
            //     [classes.itemTextRTL]: props.rtlActive
            //   })}
              disableTypography={true}
            />
          </ListItem>
          </NavLink>

        )})}
        </List>


        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        {/* <Divider /> */}
        {/* <List> */}
     
      </div>
      </CssBaseline>
      </ThemeProvider>
      </StylesProvider>
    )
}

// export default Drawer
export default withRouter(Drawer)
