import React, { useContext, useState } from 'react'
import { Paper , Grid, List, ListItem, ListItemText, TextField, Button, ThemeProvider, createMuiTheme, CssBaseline, Divider, Box } from '@material-ui/core'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ClassesContext } from '../context/classesContext';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
    direction: "rtl",
    palette:{
        primary: {
            light: '#51d1e1',
            main: '#26c6da',
            dark: '#1a8a98',
            contrastText: '#fff',
        } ,
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
// const clss = ['الاول' , 'الثاني' , 'الثالث' , 'لارابع' , 'الخامس']
function Class() {
    const onClickAdd = (e) => {
        e.preventDefault()
        // const {value} = e.target
        setAllClss((perv)=>{
            let arr = [...perv , newClss]
            return arr
        })
    }
    const {allClss  , setAllClss} = useContext(ClassesContext)
    const [newClss , setNewClss] =useState('')
    
    return (

        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
        <div>
         <Grid container>
         <CssBaseline>

             <Grid item xs={6} md={4}>
             <Paper style={{borderTop:`10px ${theme.palette.primary.light} solid` , margin:'10px'}}>  
             {/* <div>{allClss}</div> */}
            <List>
            <ListItem>
                    <ListItemText style={{textAlign:'right'}} primary="الصفوف" />
                    </ListItem>
                    <Divider />

                {allClss.map((item , key) =>(
                <ListItem button>
                    <ListItemText  style={{textAlign:'right', marginRight:'25%'}} primary={item} />        
                </ListItem>
                
                ))}
            </List>
             </Paper>
             </Grid>
             {/* <Grid item xs={2}></Grid> */}
             <Grid item xs={6} md={4}>
             <Paper style={{borderTop:`10px ${theme.palette.primary.light} solid`  , margin:'10px'}}>  
             <form   onSubmit={(e) => onClickAdd(e)}> 
             <Box display='flex' flexDirection='row' justifyContent='space-around'  alignContent='space-between' alignItems='baseline' flexWrap='wrap' p={2}>
             {/* <Box display='flex' flexDirection='row'  p={2}> */}

                 <TextField variant='outlined' 
                 onChange={(e) => {
                     const {value} = e.target
                     setNewClss(value)
                 }}
                 id='allClss' name='allClss' defaultValue='hello' label='تعريف صف' />
                 <Button variant='contained'  type='submit'  style={{backgroundColor:theme.palette.primary.dark,color:'white'  , margin:'5px'}} >اضافة</Button>
                 </Box>
             </form>
             </Paper>
             </Grid>
             </CssBaseline>

         </Grid>
        </div>
        </ThemeProvider>
        </StylesProvider>
    )
}

export default Class
