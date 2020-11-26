import Axios from "axios";
import React from "react";
import { useAuth } from "../context/authContext";
const api_token = "Bearer xvkFBgEgW6Wshl1cCEqFJUajNQfPfMTxD0GEaALV";
export const getSubjects = async (token) => {
  let res = await Axios.get(
    "https://api.wwtm.info/api/dashboard/subjects",
    {
      headers: {
        // 'Accept':'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getSections = async (id, token) => {
  let res = await Axios.get(
    "https://api.wwtm.info/api/dashboard/subjects/" + id,
    {
      headers: {
        // 'Accept':'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const addSubject = async (values, token) => {
  let res = await Axios.post(
    "https://api.wwtm.info/api/dashboard/subjects",
    values,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const addSection = async (values, id, token) => {
  let res = await Axios.post(
    "https://api.wwtm.info/api/dashboard/subjects/" +
      id +
      "/sections",
    values,
    {
      headers: {
        // 'Accept':'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
///api/dashboard/subjects/1/sections/1
export const getQuestions = async (values, token) => {
  let res = await Axios.get(
    `https://api.wwtm.info/api/dashboard/subjects/${values.subjectId}/sections/${values.sectionId}`,
    {
      headers: {
        // 'Accept':'application/json',
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};
export const postQuestion = async (values, id, token) => {
  let res = await Axios.post(
    `https://api.wwtm.info/api/dashboard/sections/${id}/questions`,
    values,
    {
      headers: {
        // 'Accept':'application/json',
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const putSubjectActive = async (id, value, token) => {
  //   console.log(token)
  let param = value ? "block" : "active";
  let res = await Axios.put(
    `https://api.wwtm.info/api/dashboard/subjects/${id}/${param}`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const putSectionActive = async (idSup, idSec, value, token) => {
  //   console.log(token)
  let param = value ? "block" : "active";
  let res = await Axios.put(
    `https://api.wwtm.info/api/dashboard/subjects/${idSup}/sections/${idSec}/${param}`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const putQuestionActive = async (idSec, idQue, value, token) => {
  //   console.log(token)
  let param = value ? "block" : "active";
  let res = await Axios.put(
    `https://api.wwtm.info/api/dashboard/sections/${idSec}/questions/${idQue}/${param}`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const deleteQuestion = async (idSec, idQue, token) => {
  //   console.log(token)
  // let param = value ? "block" : "active";
  let res = await Axios.delete(
    `https://api.wwtm.info/api/dashboard/sections/${idSec}/questions/${idQue}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const updateQuestion = async (idSec, idQue,values , token) => {
  //   console.log(token)
  // let param = value ? "block" : "active";
  let res = await Axios.put(
    `https://api.wwtm.info/api/dashboard/sections/${idSec}/questions/${idQue}`,
    
        values
    ,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
