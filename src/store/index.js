import { configureStore } from "@reduxjs/toolkit";
import allChild from "./child/allChild.js";
import addChild from "./child/addChild.js";
import allTeacher from "./teacher/allTeacher.js";
import getChildById from "./child/getChildById.js";
import getTeacherById from "./teacher/getTeacherById.js";
import getEvents from "./events/getEvents.js";
import getEventById from "./events/getEventById.js";
import getNotes from "./notes/getNotes.js";
import getNoteById from "./notes/getNoteById.js";
import getDepartments from "./departments/allDepartments";
import getDepartmentById from "./departments/getDepartmentById.js";
import getSurvey from "./servey/getSurvey.js";
import getSurveyById from "./servey/getSurveyById.js";
import getQuestions from "./A&Q/getQuestions.js";
import getQuestionsById from "./A&Q/getQuestionsById.js";
import getAnswerById from "./A&Q/getAnswerById.js";
import getNotesCategory from "./notesCategory/getAllNotesCategory.js";
import getNoteCategoryById from "./notesCategory/getNoteCategoryById.js";
import getAllAdmins from "./admins/getAdmins.js";
import getAdminById from "./admins/getAdminById.js";
import getChildToday from "./childToday/getChildToday.js";
import getUserEvents from "./userEvent/getUserEvent.js";
import getUserEventById from "./userEvent/getUserEventById.js";

export const store = configureStore({
  reducer: {
    allChild,
    addChild,
    getChildById,
    allTeacher,
    getTeacherById,
    getDepartments,
    getDepartmentById,
    getSurvey,
    getSurveyById,
    getQuestions,
    getQuestionsById,
    getAnswerById,
    getNotesCategory,
    getNoteCategoryById,
    getNotes,
    getNoteById,
    getUserEvents,
    getUserEventById,
    getEvents,
    getEventById,
    getAllAdmins,
    getAdminById,
    getChildToday,
  },
});
