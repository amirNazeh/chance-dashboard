import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";
import "./addChild.css";
import profile from "../../../assets/profile.png";
import { addChild } from "store/child/addChild";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { reset } from "store/child/addChild";
const AddChild = () => {
  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // @ts-ignore
  const { isLoading, data, error } = useSelector((state) => state.addChild);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error) {
    toast.error(error[0]);
    dispatch(reset());
  }

  if (data) {
    toast.success(data.message);

    navigate("/allChild");
    dispatch(reset());
  }
  const formik = useFormik({
    initialValues: {
      full_name: "",
      user_name: "",
      email: "",
      password: "",
      image: "",
      date_of_birth: "",
      gallery: "",
      role: "child",
    },
    validationSchema: yup.object({
      full_name: yup.string().required("Required"),
      user_name: yup.string().required("Required"),
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
      image: yup.string().required(),
      date_of_birth: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      Object.keys(values).forEach((item) => {
        if (values[item] === "") {
          values[item] = null;
        }
      });

      dispatch(addChild(values));

      //.then((ee) => {
      //console.log(ee);
      //toast.success(data?.message);
      //navigate("/allChild");
      //});
    },
  });
  function handleImage(e) {
    formik.setFieldValue("image", e.currentTarget.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="addUesr mt-5 p-4  ">
      <h3 className="text-center pb-4">Add Child</h3>

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
            {formik.errors.date_of_birth && formik.touched.date_of_birth && (
              <Form.Text className=" text-danger" id="email">
                {formik.errors.date_of_birth}
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
            disabled={isLoading}
            style={{ fontWeight: "bold" }}
          >
            {isLoading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <div>Add</div>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddChild;
