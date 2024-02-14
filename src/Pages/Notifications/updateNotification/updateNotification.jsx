import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "store/events/getEventById";
import { getEvents } from "store/events/getEvents";
const UpdateEvent = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { data, isLoading } = useSelector((state) => state.getEventById);

  useEffect(() => {
    props.data.show && dispatch(getEventById(props.data.id));
  }, [dispatch, props.data.id, props.data.show]);
  const updateEvent = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/events/update/${props.data.id}`, body)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.messege);
        dispatch(getEvents());
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
      title: data && data?.event_details?.title ? data.event_details.title : "",
      body: data && data?.event_details?.body ? data.event_details.body : "",
    },
    validationSchema: yup.object({
      title: yup.string().required(),
      body: yup.string().required(),
    }),
    onSubmit: (values) => {
      updateEvent(values);
    },
  });
  return (
    <>
      <Modal show={props.data.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Update Notification</Modal.Title>
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
                  type="textarea"
                  placeholder="Title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.title && formik.touched.title && (
                  <Form.Text className=" text-danger" id="title">
                    {`${formik.errors.title}`}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="  col-12 my-4">
                <Form.Control
                  as="textarea"
                  placeholder="Body"
                  name="body"
                  onChange={formik.handleChange}
                  value={formik.values.body}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.body && formik.touched.body && (
                  <Form.Text className=" text-danger" id="Body">
                    {`${formik.errors.body}`}
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

export default UpdateEvent;
