import { useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Logo from "../../assets/logo1.png";
import { axiosInstance } from "Config/axios";

import { Spinner } from "react-bootstrap";

import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (isAuth) {
      navigate("/allChild");
    }
  }, [isAuth, navigate]);
  const login = (data) => {
    setLoading(true);
    //const id = toast.loading("Please wait...");
    axiosInstance
      .post("/dashboard/user/login", data)
      .then((res) => {
        // toast.update(id, {
        //   render: "All is good",
        //   type: "success",
        //   isLoading: false,
        //   autoClose: 9000,
        // });
        //toast.dismiss(id);
        localStorage.setItem("AuthId", res.data.user.id);

        localStorage.setItem("token", res.data.user.token);
        setLoading(false);
        navigate("/allChild");
      })
      .catch((e) => {
        toast.error("Email or Password is Wrong");
        setLoading(false);
        // toast.update(id, {
        //   render: e.response?.data?.messege,
        //   type: "error",
        //   isLoading: false,
        //   autoClose: 5000,
        //   closeOnClick: true,
        //   hideProgressBar: false,
        // });
      });
  };
  const formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
    },
    validationSchema: yup.object({
      user_name: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div className="login d-flex bg-light w-100">
      <div className="col-9 col-md-6 col-lg-4 m-auto p-5 bg-white rounded-4 mt-6 ">
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <img src={Logo} alt="logo" className="mb-5" />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              name="user_name"
              onChange={formik.handleChange}
              value={formik.values.user_name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.user_name && formik.touched.user_name && (
              <div className="text-danger" id="email">
                {formik.errors.user_name}
              </div>
            )}
          </div>

          <div className="mb-3 ">
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
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
              <div className="text-danger" id="password">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <div>LOGIN</div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
