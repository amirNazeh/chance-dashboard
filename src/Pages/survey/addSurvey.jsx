import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch } from "react-redux";
import { getSurvey } from "store/servey/getSurvey";
const AddSurvey = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const addSurvey = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/survey/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getSurvey(props.id));
        formik.resetForm();
        props.setShow();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      department_id: props.id,
      name: "",
      date: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Survey Name Required"),
      date: yup.string().required(),
    }),
    onSubmit: (values) => {
      addSurvey(values);
    },
  });
  const close = () => {
    formik.resetForm();
    props.setShow();
  };
  return (
    <>
      <Modal show={props.show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="  col-12 my-4">
              <Form.Control
                type="text"
                placeholder="Survey Name"
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
            <Form.Group className="  col-12 my-4">
              <Form.Control
                type="date"
                placeholder="Date"
                name="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                onBlur={formik.handleBlur}
              />

              {formik.errors.date && formik.touched.date && (
                <Form.Text className=" text-danger" id="date">
                  {formik.errors.date}
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

export default AddSurvey;
