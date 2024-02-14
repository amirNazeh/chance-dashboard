import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";
import "../child/addChild/addChild.css";
import profile from "../../assets/profile.png";

import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./../../Config/axios";
import { useParams } from "react-router-dom";
import { getAdminById } from "./../../store/admins/getAdminById";
import Loader from "Components/loader/loader";

const AdminForm = () => {
  const { id } = useParams();

  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const isUpdate = id === "null" ? false : true;

  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getAdminById);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    isUpdate && dispatch(getAdminById(id));
  }, [dispatch, id, isUpdate]);
  const addAdmin = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/admins/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate("/admins");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const updateAdmin = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post(`/dashboard/admins/update/${id}`, body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.messege);
        navigate("/admins");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      full_name: isUpdate && data ? data.full_name : "",
      user_name: isUpdate && data ? data.user_name : "",
      email: isUpdate && data ? data.email : "",
      password: isUpdate && data ? data.password : "",
      image: isUpdate && data ? null : "",
      date_of_birth: isUpdate && data ? data.date_of_birth : "",
      gallery: isUpdate && data ? data.gallery : null,
      role: "admin",
    },
    validationSchema: yup.object({
      full_name: yup.string().required("Required"),
      user_name: yup.string().required("Required"),
      email: yup.string().email().required(),
      password: isUpdate ? yup.string().min(8) : yup.string().required().min(8),
      image: !isUpdate && yup.string().required("image is required"),
      date_of_birth: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      Object.keys(values).forEach((item) => {
        if (values[item] === "") {
          values[item] = null;
        }
      });
      isUpdate ? updateAdmin(values) : addAdmin(values);
    },
  });
  function handleImage(e) {
    formik.handleChange(e);
    formik.setFieldValue("image", e.currentTarget.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="addUesr mt-5 p-4  ">
      <h3 className="text-center pb-4">
        {isUpdate ? "Update Admin " : "Add Admin"}
      </h3>

      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <div className="profile-pic  ">
            <div>
              <img
                className=""
                src={file ? file : isUpdate && data ? data.image_url : profile}
                alt=""
              />
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
                {` ${formik.errors.image}`}
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
                  {` ${formik.errors.full_name}`}
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
                  {` ${formik.errors.user_name}`}
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
                  {` ${formik.errors.email}`}
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
                  {` ${formik.errors.password}`}
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
              {formik.errors.date_of_birth && formik.touched.date_of_birth && (
                <Form.Text className=" text-danger" id="email">
                  {` ${formik.errors.date_of_birth}`}
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
              className="col-6  mt-4"
              variant="primary"
              type="submit"
              disabled={loading}
              style={{ fontWeight: "bold" }}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <div>{isUpdate ? "Update" : "Add"}</div>
              )}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default AdminForm;
