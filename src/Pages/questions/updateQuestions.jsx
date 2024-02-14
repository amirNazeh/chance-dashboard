import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";

import { getQuestions } from "store/A&Q/getQuestions";
import { getQuestionsById } from "store/A&Q/getQuestionsById";
const UpdateQusetion = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { data, isLoading } = useSelector((state) => state.getQuestionsById);

  useEffect(() => {
    props.data.show && dispatch(getQuestionsById(props.data.id));
  }, [dispatch, props.data.id, props.data.show]);
  const updateQuestion = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/questions/update/${props.data.id}`, body)
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
      survey_id: props.surveyId,
      type: data ? data?.type : "",
      question_text: data ? data?.question_text : "",
    },
    validationSchema: yup.object({
      type: yup.string().required(),
      question_text: yup.string().required(),
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
                <Form.Select
                  name="type"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  onBlur={formik.handleBlur}
                >
                  <option value="MCQ">MCQ</option>
                  <option value="trueOrFalse">True or False</option>
                  <option value="complete">Complete</option>
                  <option value="multiChoose">MultiChoose</option>
                </Form.Select>
                {formik.errors.type && formik.touched.type && (
                  <Form.Text className=" text-danger" id="title">
                    {`${formik.errors.type}`}
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

                {formik.errors.question_text &&
                  formik.touched.question_text && (
                    <Form.Text className=" text-danger" id="question_text">
                      {`${formik.errors.question_text}`}
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

export default UpdateQusetion;
