import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Card,
  TextField,
  List,
  ListItem,
  ListItemText,
  createMuiTheme,
  Divider,
  Button,
  Box,
  ListItemIcon,
  Switch,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { ClassesContext } from "../context/classesContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";
import { addSection, addSubject, getSubjects, putSubjectActive ,putSectionActive } from "../api/api.js";
import { getSections } from "../api/api.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ArrowLeft, FormatListBulleted, Subject } from "@material-ui/icons";
import { useAuth } from "../context/authContext";
import { ToggleButton } from "@material-ui/lab";
const theme = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: "#7c88cc",
      main: "#5c6bc0",
      dark: "#404a86",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "",
    },
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
function Section() {
  const { allClss, setAllClss } = useContext(ClassesContext);
  const [subjects, setSubjects] = useState([]);
  const [errorState, setError] = useState(false);
  const [selectedId, setSelecteId] = useState("");
  const [sections, setSections] = useState({});
  const [newSubject , setNewSubject] = useState("");
  const [newSection , setNewSection] = useState("");
  const [loading , setLoading] = useState(false)
  const {authTokens} = useAuth()
  function getSubject() {
    getSubjects(authTokens)
      .then((res) => {
        setSubjects(() => res.data);
        setLoading(false)
        setAllClss(() => res.data);
        // console.log(res);
      })

      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }
  function getSectionById(id) {
    getSections(id , authTokens)
      .then((res) => {
        setSections(() => res.data);
        console.log(res);
      })

      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }
  function addnewSubject() {
    addSubject({name: newSubject} , authTokens).then(res => {
        alert(res.message)
        setNewSubject('')
        setLoading(true)
    }).catch(err => console.log(err))
  }
  function addNewSection() {
      if(newSection)
    addSection({name: newSection} , sections.id ,authTokens).then(res => {
        setNewSection('')
        alert(res.message)
    }).catch(err => console.log(err))
  }
  const handleSubjectSetActive = (id , value , key) => {
    putSubjectActive(id , value  , authTokens).then(()=>setLoading(true)).catch(err => alert(JSON.stringify(err.message)))
  }
  const handleSectionSetActive = ( idSec , value , key) => {
    putSectionActive(sections.id ,idSec , value  , authTokens).then(()=>getSectionById(sections.id)).catch(err => alert(JSON.stringify(err.message)))
  }
  useEffect(() => {
    if(!loading && subjects.length) return;
    getSubject();
    // console.log(authTokens)
  }, [loading]);
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Paper fullWidth> */}
        <Grid container>
         
          <Grid item xs={12} md={4}>
            {/* <Grid item xs={6}> */}
            <Paper
              style={{
                borderTop: `10px ${theme.palette.secondary.main} solid`,
                margin: "10px",
                maxHeight: "80vh",
                overflow: "auto",
              }}
            >
              <Box>
                {/* <TextField style={{margin:'5px'}}  label='الصف' /> */}

                {/* <Divider variant='middle' /> */}

                <List>
                  <ListItem>
                    <ListItemText primary="المواد:" />

                    <Divider />
                  </ListItem>
                  <ListItem>
                  <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                flexWrap="nowrap"
                justifyItems="center"
                alignContent="space-between"
               
              >
                <Box>
                  {" "}
                  <TextField
                    label="اضافة مادة"
                    variant="outlined"
                    value={newSubject}
                    size="small"
                    onChange={(e)=> setNewSubject(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "auto 5px" }}
                    onClick={addnewSubject}
                  >
                    حفظ
                  </Button>
                </Box>
              </Box>
              </ListItem>
                  {subjects.length && !errorState ? (
                    <React.Fragment>
                      {subjects.map((item, key) => (
                        
                        <ListItem
                          key={key}
                          button
                          onClick={() => getSectionById(item.id)}
                        >  
                        <Switch
                        checked={item.is_active}
                        onChange={()=>handleSubjectSetActive(item.id , item.is_active , key)}
                        name={`check${key}`}
                      />
                          <ListItemText
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            secondary={item.name}
                          />

                          <ArrowLeft fontSize="small" />
        
                        </ListItem>
                      ))}
                    </React.Fragment>
                  ) : (
                    <ListItem>جاري التحميل...</ListItem>
                  )}
                  {/*                         
                        {allClss.map((item , key ) =>(
                            <ListItem key={key}>
                                <ListItemText style={{textAlign:'center'}} primary={item} />
                            </ListItem>
                        ))} */}
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <Grid item xs={6}> */}
            <Paper
              style={{
                borderTop: `10px ${theme.palette.secondary.main} solid`,
                margin: "10px",
                maxHeight: "80vh",
                overflow: "auto",
              }}
            >
              <Box>
                {/* <TextField style={{margin:'5px'}}  label='الصف' /> */}

                {/* <Divider variant='middle' /> */}

                <List>
                  <ListItem>
                    <ListItemText
                      primary={sections.name || "يرجى اختيار المادة "}
                    />
                    <Divider />
                  </ListItem>
                  {sections.name && !errorState ? (
                    <React.Fragment>
                      <ListItem>
                        <TextField
                          label="فرع جديد"
                          value={newSection}
                          size="small"
                    onChange={(e)=> setNewSection(e.target.value)}
                    variant="outlined"
                        />
                        <Button
                          size="small"
                          variant="contained"
                          style={{ margin: "auto 5px" }}
                          onClick={addNewSection}
                        >
                          حفظ
                        </Button>
                      </ListItem>
                      {sections.sections.map((item, key) => (
                        <ListItem key={key} button>
                           <Switch
                        checked={item.is_active}
                        onChange={()=>handleSectionSetActive(item.id , item.is_active , key)}
                        name={`check${key}`}
                      />
                          <ListItemText
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            secondary={item.name}
                          />

                         
                        </ListItem>
                      ))}
                    </React.Fragment>
                  ) : (
                    <ListItem></ListItem>
                  )}
                  {/*                         
                        {allClss.map((item , key ) =>(
                            <ListItem key={key}>
                                <ListItemText style={{textAlign:'center'}} primary={item} />
                            </ListItem>
                        ))} */}
                </List>
              </Box>
            </Paper>
          </Grid>
          {/* <Grid item xs={4}>
                </Grid> */}
        </Grid>
        {/* </Paper> */}
      </div>
    </ThemeProvider>
  );
}

export default Section;
