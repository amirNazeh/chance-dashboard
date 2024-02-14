import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./addTeacher.css";
import profile from "../../../assets/profile.png";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "Config/axios";
import { getDepartments } from "store/departments/allDepartments";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "./../../../Components/loader/loader";

const AddTeacher = () => {
  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, DepartmentData } = useSelector(
    // @ts-ignore
    (state) => state.getDepartments
  );
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  function handleImage(e) {
    formik.setFieldValue("image", e.currentTarget.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const addTeacher = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/teachers/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate("/allTeacher");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    initialValues: {
      full_name: "",
      user_name: "",
      email: "",
      password: "",
      image: "",
      date_of_birth: "",
      gallery: "",
      role: "teacher",
      department_id: "",
    },
    validationSchema: yup.object({
      full_name: yup.string().required("Required"),
      user_name: yup.string().required("Required"),
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
      image: yup.string().required(),
      date_of_birth: yup.string().required("Required"),
      department_id: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      Object.keys(values).forEach((item) => {
        if (values[item] === "") {
          values[item] = null;
        }
      });
      addTeacher(values);
    },
  });

  return (
    <div className="addTeacher mt-5 p-4">
      <h3 className="text-center pb-4">Add Teacher</h3>

      {isLoading && !DepartmentData ? (
        <Loader />
      ) : (
        <>
          {DepartmentData && DepartmentData.length > 0 ? (
            <Form onSubmit={formik.handleSubmit}>
              <div className="profile-pic  ">
                <div>
                  <img className="" src={file ? file : profile} alt="" />
                  <div className="wrapper">
                    <i className="fas fa-camera  "></i>
                    <input
                      type="file"
                      className="pointer"
                      name="image"
                      onChange={handleImage}
                    />
                  </div>
                </div>
                {formik.errors.image && formik.touched.image && (
                  <Form.Text className=" text-danger col-12" id="image">
                    {formik.errors.image}
                  </Form.Text>
                )}
              </div>
              <div className="row w-100 m-0">
                <Form.Group className=" col-md-6 col-12 mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    name="full_name"
                    onChange={formik.handleChange}
                    value={formik.values.full_name}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.full_name && formik.touched.full_name && (
                    <Form.Text className=" text-danger" id="full_name">
                      {formik.errors.full_name}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className=" col-md-6 col-12 mb-4">
                  <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="user_name"
                    onChange={formik.handleChange}
                    value={formik.values.user_name}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.user_name && formik.touched.user_name && (
                    <Form.Text className=" text-danger" id="full_name">
                      {formik.errors.user_name}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group
                  className=" col-md-6 col-12 mb-4"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.email && formik.touched.email && (
                    <Form.Text className=" text-danger" id="email">
                      {formik.errors.email}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group
                  className="col-md-6 col-12 mb-4"
                  controlId="formBasicPassword"
                >
                  <div className="password-input">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                    <div
                      className="showPassword"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={
                          showPassword
                            ? "fa-regular fa-eye-slash"
                            : "fa-regular fa-eye"
                        }
                      ></i>
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <Form.Text className=" text-danger" id="email">
                      {formik.errors.password}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group
                  className="col-md-6 col-12 mb-4"
                  controlId="formBasicBirth"
                >
                  <Form.Control
                    type="date"
                    placeholder="Date Of Birth "
                    name="date_of_birth"
                    onChange={formik.handleChange}
                    value={formik.values.date_of_birth}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.date_of_birth &&
                    formik.touched.date_of_birth && (
                      <Form.Text className=" text-danger" id="email">
                        {formik.errors.date_of_birth}
                      </Form.Text>
                    )}
                </Form.Group>
                <Form.Group
                  className="col-md-6 col-12 mb-4"
                  controlId="formBasicDepartment"
                >
                  <Form.Select
                    name="department_id"
                    onChange={formik.handleChange}
                    value={formik.values.department_id}
                    onBlur={formik.handleBlur}
                  >
                    <option selected>Department</option>
                    {DepartmentData &&
                      DepartmentData.length > 0 &&
                      DepartmentData.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                  </Form.Select>
                  {formik.errors.department_id &&
                    formik.touched.department_id && (
                      <Form.Text className=" text-danger" id="email">
                        {formik.errors.department_id}
                      </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className=" col-md-6 col-12 mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Gallery"
                    name="gallery"
                    onChange={formik.handleChange}
                    value={formik.values.gallery}
                    onBlur={formik.handleBlur}
                  />
                </Form.Group>
              </div>
              <div className="text-center">
                <Button
                  className="col-6  mt-1"
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  style={{ fontWeight: "bold" }}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    <div>Add</div>
                  )}
                </Button>
              </div>
            </Form>
          ) : (
            <>
              {DepartmentData && DepartmentData.length === 0 && (
                <h4
                  className=" text-danger text-center"
                  style={{ marginTop: "30vh" }}
                >
                  Add Department First{" "}
                </h4>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AddTeacher;
