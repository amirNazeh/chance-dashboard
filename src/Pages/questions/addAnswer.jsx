import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch } from "react-redux";
import { getQuestions } from "store/A&Q/getQuestions";
const AddAnswer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const addAnswer = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/answers/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getQuestions(props.surveyId));
        formik.resetForm();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question_id: props.data.questionId,

      answer_text: "",
    },
    validationSchema: yup.object({
      answer_text: yup.string().required("answer is required"),
    }),
    onSubmit: (values) => {
      addAnswer(values);
    },
  });
  const close = () => {
    formik.resetForm();
    props.setShow();
  };
  return (
    <>
      <Modal show={props.data.show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Answer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="  col-12 my-4">
              <Form.Control
                as="textarea"
                placeholder="Answer Text"
                name="answer_text"
                onChange={formik.handleChange}
                value={formik.values.answer_text}
                onBlur={formik.handleBlur}
              />

              {formik.errors.answer_text && formik.touched.answer_text && (
                <Form.Text className=" text-danger" id="answer_text">
                  {formik.errors.answer_text}
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

export default AddAnswer;
