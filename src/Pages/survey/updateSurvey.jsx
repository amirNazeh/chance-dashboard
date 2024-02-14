import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyById } from "store/servey/getSurveyById";
import { getSurvey } from "store/servey/getSurvey";
const UpdateSurvey = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { data, isLoading } = useSelector((state) => state.getSurveyById);

  useEffect(() => {
    props.data.show && dispatch(getSurveyById(props.data.id));
  }, [dispatch, props.data.id, props.data.show]);
  const updateSurvey = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/survey/update/${props.data.id}`, body)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.messege);
        dispatch(getSurvey(props.department));
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
      department_id: props?.department,
      name: data && data?.survey_details?.name ? data.survey_details?.name : "",
      date: data && data?.survey_details?.date ? data.survey_details?.date : "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Survey Name Required"),
      date: yup.string().required(),
    }),
    onSubmit: (values) => {
      updateSurvey(values);
    },
  });
  return (
    <>
      <Modal show={props.data.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
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
                  placeholder="Survey Name"
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
                    {`${formik.errors.date}`}
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

export default UpdateSurvey;
