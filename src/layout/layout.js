import React, { useEffect , useState } from 'react'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DrawerProps from '../components/drawer'
import Material from '../components/images/material.jpg'
import { routes } from '../routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ClassesContext } from '../context/classesContext';
import { getSubjects } from '../api/api';
import PrivateRoute from '../components/PrivateRoute';
import { AuthContext } from '../context/authContext';
import { Button } from '@material-ui/core';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    direction: "rtl",
    palette:{
        primary: {
            light: '#51d1e1',
            main: '#26c6da',
            dark: '#1a8a98',
            contrastText: '#fff',
        },
        secondary:{
            light:'#fe9b94',
            main:'#fe9089',
            dark:'#e48b85',
            contrastText:''
        }
    },
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
    },
  });
// import classes from '*.module.css';
// Configure JSS

const drawerWidth = 180;

const useStyles = makeStyles({
    direction:'rtl',
  root: {
    display: 'flex',
    direction:'rtl'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,

    },
  },
  appBar: {
    backgroundColor:theme.palette.primary.dark,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor:'#eee',

    // background:"url('../components/images/material.jpg')",



    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  rttl:{
      direction:'rtl'
  }
});

function Layout(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  function logOut() {
    setTokens("");
  }
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [allClss , setAllClss] = React.useState([])
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    function fetchSubjects(){
      getSubjects(authTokens).then((res) => setAllClss(()=>res.data)).catch(err => console.log(err))
    }
    useEffect(() => {
      fetchSubjects()
    }, [])
  
    // const drawer = (
    //   <div>
    //     <div className={classes.toolbar} />
    //     <Divider />
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Route  path="/">

      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
   <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          </Typography>
          <IconButton 
          edge="end"
          onClick={logOut}
          >
            
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            anchor='right'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerProps theme={theme} handleDrawerToggle={handleDrawerToggle} jss={jss} classes={classes}/>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            anchor='right'

            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
                       <DrawerProps theme={theme}  jss={jss} classes={classes}/>

          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ClassesContext.Provider value={{allClss , setAllClss}}>

        <Switch>
        <Route exact path="/"><Redirect to="/section"/></Route>
      {routes.map((item , key)=>
        item.privateRoute ? (<PrivateRoute key={key} component={item.view} exact path={item.path} />
          ) : (<Route exact path={item.path}>
        {item.view}
    </Route>)
        
      )}
      </Switch>
      </ClassesContext.Provider>
      
      </main>
    </div>
    </ThemeProvider>
    </StylesProvider>
    </AuthContext.Provider>
    </Route>
    )
}

export default Layout


