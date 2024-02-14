import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch } from "react-redux";
import { getDepartments } from "store/departments/allDepartments";

const AddDepartment = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const addDepartment = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/departments/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getDepartments());
        formik.resetForm();
        props.setShow();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
    }),
    onSubmit: (values) => {
      addDepartment(values);
    },
  });
  return (
    <>
      <Modal show={props.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
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
                  {formik.errors.name}
                </Form.Text>
              )}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              className={isLoading ? "px-3" : ""}
              disabled={isLoading}
            >
              {" "}
              {isLoading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <div>Add</div>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddDepartment;
