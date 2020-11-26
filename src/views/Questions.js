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
  Typography,
  Table,
  makeStyles,
  Switch,
  Grow,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { ClassesContext } from "../context/classesContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getQuestions,
  getSections,
  postQuestion,
  putQuestionActive,
  deleteQuestion,
  updateQuestion
} from "../api/api";
import { useAuth } from "../context/authContext";
import { Alert } from "@material-ui/lab";
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
      light: "#ffee33",
      main: "#ffea00",
      dark: "#b2a300",
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
const useStyles = makeStyles({
  answers: {
    paddingRight: theme.spacing(6),
    backgroundColor: "#eeeeff",
    // borderBottom:'1px #ccc solid'
  },
});
const quest = {
  questions: [
    {
      id: 142,
      content: "Sit temporibus sint dolorem.",
      image: null,
      correct_answer: {
        id: 566,
        content:
          "Id qui ullam aperiam ullam et officiis. Et enim vero sequi qui. Dolorem ut nisi id voluptates voluptas sint.",
        created_at: "2020-11-01 15:55:58",
        updated_at: "2020-11-01 15:55:58",
      },
      answers: [
        {
          id: 565,
          content:
            "Excepturi quia explicabo est porro nam. Quod pariatur vel assumenda omnis qui. Ut commodi ea quia aspernatur assumenda quisquam est. Sapiente ut qui sed debitis consectetur rem.",
          created_at: "2020-11-01 15:55:58",
          updated_at: "2020-11-01 15:55:58",
        },
        {
          id: 566,
          content:
            "Id qui ullam aperiam ullam et officiis. Et enim vero sequi qui. Dolorem ut nisi id voluptates voluptas sint.",
          created_at: "2020-11-01 15:55:58",
          updated_at: "2020-11-01 15:55:58",
        },
        {
          id: 567,
          content:
            "Ut consequatur consequuntur ratione. Placeat tempore harum consectetur voluptatem. Pariatur in voluptas officiis quia.",
          created_at: "2020-11-01 15:55:58",
          updated_at: "2020-11-01 15:55:58",
        },
        {
          id: 568,
          content:
            "Illum eligendi molestiae nobis vel. Ut non facilis impedit porro beatae beatae. Est minus quidem dolor qui sequi maxime. Eligendi eos modi nulla perferendis impedit. Sed praesentium rerum eius.",
          created_at: "2020-11-01 15:55:58",
          updated_at: "2020-11-01 15:55:58",
        },
      ],
      created_at: "2020-11-01 15:55:53",
      updated_at: "2020-11-01 15:55:58",
    },
  ],
};
function Questions() {
  const classes = useStyles();
  const { allClss, setAllClss } = useContext(ClassesContext);
  const [Subject, setSubject] = useState({});
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [questions, setQuestons] = useState([]);
  const [loading, setloading] = useState(false);

  const [question, setquestion] = useState("");
  const [answer1, setanswer1] = useState("");
  const [answer2, setanswer2] = useState("");
  const [answer3, setanswer3] = useState("");
  const [answer4, setanswer4] = useState("");
  const [queEdit, setQueEdit] = useState("");
  const [queDeleteConfirm , setqueDeleteConfirm] = useState('')
  const [ansVisible, setAnsVisible] = useState("");
  const [editingValues , setEditingValues] = useState({})
  const [selectedFile, setselectedFile] = useState(null);
  const [msgVisible , setMsgVisible] = useState({show:false , msg:""})
  const [queEditValues , setqueEditValues] = useState({})
  const { authTokens } = useAuth();
  function getSectionsById(id) {
    getSections(id, authTokens)
      .then((res) => setSections(() => res.data.sections))
      .catch((err) => console.log(err));
  }
  function handleSubjectSelection(values) {
    if (!values) {
      setSubject({});
      setSections([]);
      return;
    }
    setSubject(() => values);
    getSectionsById(values.id);
  }
  function handleSectionSelection(values) {
    if (!values) {
      setSelectedSection("");

      return;
    }

    setSelectedSection(values.id);
    fetchQuestion(values.id);
  }
  function fetchQuestion(id) {
    if (!id) {
      return;
    }
    let subjectId = Subject.id;
    let values = {
      sectionId: id,
      subjectId,
    };
    // console.log(JSON.stringify(values))

    getQuestions(values, authTokens)
      .then((res) => {
        setQuestons(() => res.data.questions || []);
        setloading(false);
      })
      .catch((err) => console.log(err));
  }
  const handlemsgVisible = () => {
    let newState = {show: false , msg:""};
    setMsgVisible(()=>newState);
  }
  
  const onFileChange = (event) => {
    // Update the state
    setselectedFile(event.target.files[0]);
  };
  const handleFields = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "q": {
        setquestion(e.target.value);
        break;
      }
      case "a1": {
        setanswer1(e.target.value);
        break;
      }

      case "a2": {
        setanswer2(e.target.value);
        break;
      }
      case "a3": {
        setanswer3(e.target.value);
        break;
      }
      case "a4": {
        setanswer4(e.target.value);
        break;
      }

      default:
        break;
    }
  };
  useEffect(() => {
    if (!loading) {
      return;
    }
    fetchQuestion(selectedSection);
    // setQuestons(()=>quest.questions)
  }, [loading, questions]);
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object

    if (selectedFile) formData.append("image", selectedFile, selectedFile.name);
    formData.append("content", question);
    formData.append("answers[0][content]", answer1);
    formData.append("answers[1][content]", answer2);
    formData.append("answers[2][content]", answer3);
    formData.append("answers[3][content]", answer4);
    formData.append("correct_answer", 1);

    // Details of the uploaded file
    // console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    postQuestion(formData, selectedSection, authTokens)
      .then((res) => {
        if (res.message) 
        {
        // alert(res.message);
        let msg = res.message ? "تمت الاضافة بنجاح" : res.message
        let newMsg = {show:true , msg}
        setMsgVisible(()=> newMsg)
        setquestion("");
        setanswer1("");
        setanswer2("");
        setanswer3("");
        setanswer4("");
        setloading(true);}
        else console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const showQuestion = (idQue, value) => {
    putQuestionActive(selectedSection, idQue, value, authTokens)
      .then(() => {
        setloading(true);
      })
      .catch((err) => alert(JSON.stringify(err)));
  };
  const handleDeleteButton =(v)=>{
    if(queDeleteConfirm == v){
      setqueDeleteConfirm('')
    }else setqueDeleteConfirm(v)
  }
  const handleEditConfirm = (v , values) =>{
    if(v == queEdit){
      setQueEdit('')
      setqueEditValues({})
      setEditingValues({})
    }
    else{
      console.log(values)
      setAnsVisible(v)
      setQueEdit(v)
      setEditingValues(()=> values)
      setqueEditValues(values)
    }
  }
  const handleShowAns = v =>{
    if(v == ansVisible){
      setAnsVisible('')
    }
    else{
      setAnsVisible(v)
    }
  }
  const handleDeleteQuestion = (id) => {
    deleteQuestion(selectedSection , id , authTokens).then((res)=> 
    { setloading(true)
      let msg = res.message ? "تم الحذف بنجاح" : res.message
      let newMsg = {show:true , msg}
      setMsgVisible(()=> newMsg)
    }).catch((err)=> alert(err))
  }
  const handleUpdateQuestion = () => {
   let item = {...editingValues}
   delete item["image"]
   item.correct_answer = 1
  //  alert(JSON.stringify(item))

   setEditingValues(() => item)
   updateQuestion(selectedSection , item.id , item , authTokens).then((res)=>{
    //  alert(res.message) 
    setloading(true)
    let msg = res.message.includes("Updated Successfully") ? "تم التعديل بنجاح" : res.message
    let newMsg = {show:true , msg}
    setMsgVisible(()=> newMsg)
    setQueEdit('')
    setqueEditValues({})
    setEditingValues({})
  }).catch(err => alert(err))
  }
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Paper fullWidth> */}
        <Snackbar open={msgVisible.show} autoHideDuration={2000} onClose={handlemsgVisible}>
  <Alert onClose={handlemsgVisible} severity="success">
  {msgVisible.msg} 
  </Alert>
</Snackbar>
        <Grid container>
          <Grid item xs={12} md={8}>
            {/* <Box borderTop={`10px ${theme.palette.secondary.main} solid`}> */}
            <Paper
              style={{
                borderTop: `10px ${theme.palette.secondary.main} solid`,
                margin: "10px",
              }}
            >
              {/* <TextField style={{margin:'5px'}}  label='الصف' /> */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Box flexGrow={1} m={1}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={allClss}
                    getOptionLabel={(option) => option.name || ""}
                    //   style={{ width: 300 }}
                    onChange={(e, v) => {
                      handleSubjectSelection(v);
                    }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="المادة" variant="outlined" />
                    )}
                  />
                </Box>
                {/* <Divider variant='middle' /> */}

                <Box flexGrow={1} m={1}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={sections}
                    getOptionLabel={(option) => option.name}
                    //   style={{ width: 300 }}
                    size="small"
                    onChange={(e, v) => {
                      handleSectionSelection(v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="الفرع"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6">الأسئلة</Typography>
              </Box>
              <Box maxHeight="80vh" overflow="scroll">
                <List>
                  {questions.map((item, i) => (
                    <React.Fragment>
                      <ListItem>
                        <Switch
                          checked={item.is_active}
                          onChange={() => showQuestion(item.id, item.is_active)}
                          name={`check${i}`}
                        />
                        {(item.id == queEdit  )? (
                          <TextField
                          name={`qu${i}`}
                          fullWidth
                          label="السؤال"
                          defaultValue={editingValues.content}
                          onChange={(e) =>{
                            let value = e.target.value
                            setEditingValues((perv)=> {let obj ; return obj = {...perv , content:value}}) }}
                          />
                        ) : (
                          <ListItemText primary={item.content} />
                        )}
                        <IconButton onClick={() => handleShowAns(item.id)}>
                       < ExpandMoreRoundedIcon fontSize='small'/>
                        </IconButton>
                        {/* <Button onClick={()=> setAnsVisible(item.id)}>الاجوبة</Button> */}
                        {/* <Button onClick={()=> setAnsVisible(item.id)}>الاجوبة</Button> */}
                       {item.id == queEdit ? (<React.Fragment>
                        <IconButton
                        size='small'
                          aria-label=""
                          onClick={() => handleEditConfirm(item.id)}
                        >
                         تراجع
                        </IconButton> <IconButton
                        size='small'
                        aria-label=""
                          onClick={() => handleUpdateQuestion(item)}
                          style={{marginRight:'10px'}}
                        >
                         تعديل
                        </IconButton></React.Fragment>) : (
                        <IconButton
                          aria-label=""
                          onClick={() => handleEditConfirm(item.id , item)}
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>)}
                        {queDeleteConfirm == item.id ? (
                          <React.Fragment>
                        <IconButton
                        size='small'
                          aria-label=""
                          onClick={() => handleDeleteButton(item.id)}
                        >
                         تراجع
                        </IconButton> <IconButton
                        size='small'
                        aria-label=""
                          onClick={() => handleDeleteQuestion(item.id)}
                          style={{marginRight:'10px'}}
                        >
                         حذف
                        </IconButton></React.Fragment>) : (
                        <IconButton
                          aria-label=""
                        size='small'
                        onClick={() => handleDeleteButton(item.id)}
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>)}
                      </ListItem>

                      {ansVisible == item.id && (
                        <List disablePadding>
                          {item.answers.map((answer, ia) => (
                            <React.Fragment>
                              <Grow key={ia} in={ansVisible == item.id}>
                                <ListItem className={classes.answers}>
                                {item.id == queEdit ? (
                          <TextField
                            fullWidth
                          name={`an${ia}`}
                          label="الجواب"
                            defaultValue={editingValues.answers[ia].content}
                            onChange={(e) =>{
                              let value = e.target.value
                              let newAns = {...editingValues}
                              newAns.answers[ia].content = value;
                              setEditingValues(()=> newAns )} }    />
                        ) : (
                                  <ListItemText secondary={answer.content} />)}
                                </ListItem>
                              </Grow>
                              <Divider />
                            </React.Fragment>
                          ))}
                        </List>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
              {/* </Box> */}
            </Paper>
          </Grid>
          {/* <Grid item xs={1}>
                </Grid> */}
          <Grid item xs={12} md={4}>
            <Paper
              style={{
                borderTop: `10px ${theme.palette.secondary.main} solid`,
                margin: "10px",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                justifyItems="center"
                alignContent="space-between"
                p={1}
              >
                <Box m={1} textAlign="center">
                  {" "}
                  <Typography variant="h6"> إضافة سؤال جديد </Typography>
                </Box>
                <Box m={1} textAlign="center" borderLeft="5px gray solid">
                  {" "}
                  <TextField
                    size="small"
                    label="السؤال"
                    variant="outlined"
                    onChange={handleFields}
                    value={question}
                    id="fsfs"
                    name="q"
                  />
                </Box>
                <Box m={1} textAlign="center" borderLeft="5px green solid">
                  {" "}
                  <TextField
                    onChange={handleFields}
                    value={answer1}
                    id="fefe"
                    name="a1"
                    size="small"
                    label="إجابة صحيحة"
                    variant="outlined"
                  />
                </Box>
                <Box m={1} textAlign="center" borderLeft="5px red solid">
                  {" "}
                  <TextField
                    onChange={handleFields}
                    value={answer2}
                    id="fwfw"
                    name="a2"
                    size="small"
                    label="إجابة خاطئة"
                    variant="outlined"
                  />
                </Box>
                <Box m={1} textAlign="center" borderLeft="5px red solid">
                  {" "}
                  <TextField
                    onChange={handleFields}
                    value={answer3}
                    id="fqfq"
                    name="a3"
                    size="small"
                    label="إجابة خاطئة"
                    variant="outlined"
                  />{" "}
                </Box>
                <Box m={1} textAlign="center" borderLeft="5px red solid">
                  {" "}
                  <TextField
                    onChange={handleFields}
                    value={answer4}
                    id="gtgt"
                    name="a4"
                    size="small"
                    label="إجابة خاطئة"
                    variant="outlined"
                  />{" "}
                </Box>
                <Box m={1} textAlign="center" borderLeft="5px red solid">
                  تحميل صورة
                  <input size="small" type="file" onChange={onFileChange} />
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "5px" }}
                  onClick={onFileUpload}
                >
                  حفظ
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </div>
    </ThemeProvider>
  );
}

export default Questions;
