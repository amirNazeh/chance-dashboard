import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "store/departments/allDepartments";
import { getDepartmentById } from "store/departments/getDepartmentById";
const UpdateDepartment = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { data, isLoading } = useSelector((state) => state.getDepartmentById);

  useEffect(() => {
    props.data.show && dispatch(getDepartmentById(props.data.id));
  }, [dispatch, props.data.id, props.data.show]);
  const updateDepartment = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/departments/update/${props.data.id}`, body)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.messege);
        dispatch(getDepartments());
        formik.resetForm();
        props.setShow();
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name:
        data && data?.department_details?.name
          ? data.department_details?.name
          : "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
    }),
    onSubmit: (values) => {
      updateDepartment(values);
    },
  });
  return (
    <>
      <Modal show={props.data.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Update Department</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <div className="text-center  my-5 py-5  ">
            <Spinner animation="border" variant="" />
          </div>
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <Form.Group className="  col-12 my-4">
                <Form.Control
                  type="text"
                  placeholder="Department Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.name && formik.touched.name && (
                  <Form.Text className=" text-danger" id="name">
                    {`${formik.errors.name}`}
                  </Form.Text>
                )}
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
                className={loading ? "px-4" : ""}
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <div>Update</div>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateDepartment;
