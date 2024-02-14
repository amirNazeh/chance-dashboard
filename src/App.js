import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  NavBar,
  SideBar,
  AddChild,
  AllChild,
  UpdateChild,
  AllTeacher,
  AddTeacher,
  UpdateTeacher,
  Departments,
  Servey,
  QuestionsAndAnswers,
  NotesCategory,
  Notes,
  UserEvent,
  Notifications,
  Admins,
  AdminForm,
  ChildToday,
  Reports,
  NotFound,
} from "./Pages/index";
import PrivateRoute from "./Guard/privateRoute";
import ShowNaw from "./Guard/showNav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <ShowNaw>
          <NavBar />
        </ShowNaw>
        <div className="d-flex">
          <ShowNaw>
            <SideBar />
          </ShowNaw>

          <div className=" body col-12  ">
            <Routes>
              <Route
                path="/allChild"
                element={
                  <PrivateRoute>
                    <AllChild />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addChild"
                element={
                  <PrivateRoute>
                    <AddChild />
                  </PrivateRoute>
                }
              />
              <Route
                path="/updateChild/:id"
                element={
                  <PrivateRoute>
                    <UpdateChild />
                  </PrivateRoute>
                }
              />
              <Route
                path="/allTeacher"
                element={
                  <PrivateRoute>
                    <AllTeacher />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addTeacher"
                element={
                  <PrivateRoute>
                    <AddTeacher />
                  </PrivateRoute>
                }
              />
              <Route
                path="/updateTeacher/:id"
                element={
                  <PrivateRoute>
                    <UpdateTeacher />
                  </PrivateRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <PrivateRoute>
                    <Departments />
                  </PrivateRoute>
                }
              />
              <Route
                path="/servey"
                element={
                  <PrivateRoute>
                    <Servey />
                  </PrivateRoute>
                }
              />
              <Route
                path="/questions&answers/:id"
                element={
                  <PrivateRoute>
                    <QuestionsAndAnswers />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notesCategory"
                element={
                  <PrivateRoute>
                    <NotesCategory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notes/:id"
                element={
                  <PrivateRoute>
                    <Notes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/userEvent/:id"
                element={
                  <PrivateRoute>
                    <UserEvent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Notifications"
                element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admins"
                element={
                  <PrivateRoute>
                    <Admins />
                  </PrivateRoute>
                }
              />
              <Route
                path="/adminForm/:id"
                element={
                  <PrivateRoute>
                    <AdminForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/childToday"
                element={
                  <PrivateRoute>
                    <ChildToday />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <PrivateRoute>
                    <Reports />
                  </PrivateRoute>
                }
              />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <NotFound />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
