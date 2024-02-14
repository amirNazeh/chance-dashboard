import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacher } from "./../../../store/teacher/allTeacher";
import { toast } from "react-toastify";
import Loader from "Components/loader/loader";
import Table from "react-bootstrap/esm/Table";
import "./allTeacher.css";
import { deleteTeacher } from "store/teacher/deleteTeacher";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "Config/axios";
const AllTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @ts-ignore
  const { isLoading, data, error } = useSelector((state) => state.allTeacher);

  useEffect(() => {
    dispatch(getAllTeacher());
  }, [dispatch]);
  if (error) {
    toast.error(error);
  }


  return (
    <>
      <div className="allTeacher mt-5 p-4 ">
        <h4 className="text-center ">All Teacher</h4>
        {isLoading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          <Table
            striped
            bordered
            hover
            className="text-center align-middle mt-4"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Image</th>
                <th>Notes</th>
                <th>Events</th>
                <th>Edite</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, index) => (
                <tr key={el.id}>
                  <td>{index + 1}</td>
                  <td>{el.user.full_name}</td>
                  <td>{el.user.user_name}</td>
                  <td>{el.user.email}</td>

                  <td>
                    <Department T_id={el.id} D_id={el.department_id} />
                  </td>

                  <td>
                    <img src={el.user.image_url} alt="img" className=" " />
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-note-sticky pointer"
                      onClick={() => {
                        navigate(`/notes/${el.user_id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    {" "}
                    <i
                      className="fa-solid fa-calendar-days  pointer"
                      onClick={() => {
                        navigate(`/userEvent/${el.user_id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-user-pen pointer"
                      onClick={() => {
                        navigate(`/updateTeacher/${el.id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can pointer"
                      onClick={() => {
                        dispatch(deleteTeacher(el.id));
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h5
            className="w-100 text-center align-self-center "
            style={{ marginTop: "35vh" }}
          >
            No Teacher
          </h5>
        )}
      </div>
    </>
  );
};

export default AllTeacher;

const Department = (props) => {
  const [department, setDepartment] = useState(null);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    teacherDepartment(props.T_id);
  }, [props.T_id, add]);
  useEffect(() => {
    department &&
      department.length === 0 &&
      AddteacherDepartment(props.T_id, props.D_id);
  }, [department, props.D_id, props.T_id]);
  const AddteacherDepartment = async (T_id, D_id) => {
    await axiosInstance
      .post("/dashboard/departments/department_teacher", {
        teacher_id: T_id,
        department_id: D_id,
      })
      .then(() => setAdd(true))
      .catch((e) => console.log(e));
  };
  const teacherDepartment = (id) => {
    axiosInstance
      .get(`/teacher/teacher_departments/${id}`)
      .then((res) => {
        setDepartment(res.data?.departments);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      {department &&
        department.length > 0 &&
        department.map((e) => <span key={e.id}>{e?.name}</span>)}
    </>
  );
};
