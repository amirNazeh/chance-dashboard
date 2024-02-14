import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";

import { getQuestions } from "store/A&Q/getQuestions";
import { getAnswerById } from "store/A&Q/getAnswerById";
const UpdateAnswer = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { data, isLoading } = useSelector((state) => state.getAnswerById);
  console.log(data);

  useEffect(() => {
    props.data.show && dispatch(getAnswerById(props.data.answerId));
  }, [dispatch, props.data.answerId, props.data.show]);
  const updateQuestion = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/answers/update/${props.data.answerId}`, body)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.messege);
        dispatch(getQuestions(props.surveyId));
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
      question_id: data ? data?.question_id : "",
      answer_text: data ? data?.answer_text : "",
    },
    validationSchema: yup.object({
      answer_text: yup.string().required(),
    }),
    onSubmit: (values) => {
      updateQuestion(values);
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
          <Modal.Title>Update Question</Modal.Title>
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
                  as="textarea"
                  placeholder="Answer Text"
                  name="answer_text"
                  onChange={formik.handleChange}
                  value={formik.values.answer_text}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.answer_text && formik.touched.answer_text && (
                  <Form.Text className=" text-danger" id="answer_text">
                    {`${formik.errors.answer_text}`}
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

export default UpdateAnswer;
