import Class from './views/Class'
import React from 'react'
import Section
from './views/Section.js'
import Questions
from './views/Questions.js'
import StudentManager
from './views/StudentManager.js'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import DoneAllSharpIcon from '@material-ui/icons/DoneAllSharp';
import FormatListNumberedRtlOutlinedIcon from '@material-ui/icons/FormatListNumberedRtlOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SignIn from './views/login'
export const routes = [
    // {
    //     name:"الصف",
    //     path:"/class",
    //     view:<Class />,
    //     icon:FormatListNumberedRtlOutlinedIcon
    // },
    {
        name:"الصفوف",
        path:"/section",
        view:Section ,
        privateRoute:true,
        icon:BookOutlinedIcon

    },
    {
        name:"الأسئلة",
        path:"/questions",
        view:Questions ,
        privateRoute:true,
        icon:DoneAllSharpIcon
    },
    {
        name:"ادارة الطلاب",
        path:"/student-manager",
        view:StudentManager ,
        privateRoute:true,
        icon:SupervisorAccountIcon
    },
    {
        name:"تسجيل الدخول",
        path:"/login",
        view:<SignIn /> ,
        privateRoute:false,
        icon:SupervisorAccountIcon
    },
    
]