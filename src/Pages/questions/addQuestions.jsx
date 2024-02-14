import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch } from "react-redux";
import { getQuestions } from "store/A&Q/getQuestions";
const AddQusetions = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const addQusetions = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/questions/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getQuestions(props.id));
        formik.resetForm();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      survey_id: props.id,
      type: "MCQ",
      question_text: "",
    },
    validationSchema: yup.object({
      type: yup.string().required(),
      question_text: yup.string().required(),
    }),
    onSubmit: (values) => {
      addQusetions(values);
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
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="  col-12 my-4">
              <Form.Select
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
                onBlur={formik.handleBlur}
              >
                <option value="MCQ">MCQ</option>
                <option value="trueOrfalse">True or False</option>
                <option value="complete">Complete</option>
                <option value="multiChoose">MultiChoose</option>
              </Form.Select>
              {formik.errors.type && formik.touched.type && (
                <Form.Text className=" text-danger" id="title">
                  {formik.errors.type}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="  col-12 my-4">
              <Form.Control
                as="textarea"
                placeholder="Question Text"
                name="question_text"
                onChange={formik.handleChange}
                value={formik.values.question_text}
                onBlur={formik.handleBlur}
              />

              {formik.errors.question_text && formik.touched.question_text && (
                <Form.Text className=" text-danger" id="question_text">
                  {formik.errors.question_text}
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
            <Button variant="primary" onClick={close}>
              Done
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddQusetions;
