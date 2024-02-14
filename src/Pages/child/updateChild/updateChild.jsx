import Loader from "Components/loader/loader";
import { axiosInstance } from "Config/axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getChildById } from "store/child/getChildById";
import * as yup from "yup";

const UpdateChild = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getChildById);
  const [showPassword, setShowPassword] = useState(false);

  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getChildById(id));
  }, [dispatch, id]);

  const updateChild = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/childs/update/${id}`, body)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.messege);
        navigate("/allChild");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: `${data ? data?.child?.user.full_name : ""}`,
      user_name: `${data ? data.child?.user?.user_name : ""}`,
      email: `${data ? data?.child?.user.email : ""}`,
      password:
        data && data.child?.user?.password ? data.child.user?.password : null,

      date_of_birth: `${data ? data.child?.user?.date_of_birth : ""}`,
      gallery: data ? data?.child?.user.gallery : null,

      role: "child",
    },
    validationSchema: yup.object({
      full_name: yup.string().required("Required"),
      user_name: yup.string().required("Required"),
      email: yup.string().email().required(),
      password: yup.string().min(8).nullable(),

      date_of_birth: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      Object.keys(values).forEach((item) => {
        if (values[item] === "") {
          values[item] = null;
        }
      });
      updateChild(values);
    },
  });

  function handleImage(e) {
    formik.setFieldValue("image", e.currentTarget.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="addUesr mt-5 p-4  ">
          <h3 className="text-center pb-4">Update Child</h3>

          <Form onSubmit={formik.handleSubmit}>
            <div className="profile-pic  ">
              <div>
                <img
                  className=""
                  src={file ? file : data && data?.child?.user?.image_url}
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
            </div>
            <div className="row w-100 m-0">
              <Form.Group className=" col-md-6 col-12 mb-4">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="full_name"
                  id="full_name"
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
                    {`${formik.errors.password}`}
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
                  <div>Update</div>
                )}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default UpdateChild;
