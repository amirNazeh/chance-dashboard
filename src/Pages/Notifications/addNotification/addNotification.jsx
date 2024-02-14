import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { getEvents } from "store/events/getEvents";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacher } from "store/teacher/allTeacher";
import { getAllChild } from "store/child/allChild";

const AddNotification = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventTo, setEventTo] = useState("all");

  const dispatch = useDispatch();
  // @ts-ignore
  const { data } = useSelector((state) => state.allTeacher);

  // @ts-ignore

  const { childData } = useSelector((state) => state.allChild);

  useEffect(() => {
    dispatch(getAllTeacher());
    dispatch(getAllChild());
  }, [dispatch]);

  const addNotification = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/events/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getEvents());
        formik.resetForm();
        props.setShow();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      id: "",
    },
    validationSchema: yup.object({
      title: yup.string().required(),
      body: yup.string().required(),
      id: eventTo !== "all" && yup.string().required("name is required"),
    }),
    onSubmit: (values) => {
      addNotification(values);
    },
  });
  const close = () => {
    formik.resetForm();
    setEventTo("all");
    props.setShow();
  };
  return (
    <>
      <Modal show={props.show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notification</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <div className="mt-3 d-flex justify-content-evenly">
              <Form.Check
                label="All"
                name="group1"
                type="radio"
                checked={eventTo === "all"}
                onChange={() => setEventTo("all")}
              />
              <Form.Check
                label="Child"
                name="group1"
                type="radio"
                checked={eventTo === "child"}
                onChange={() => setEventTo("child")}
              />
              <Form.Check
                label="Teacher"
                name="group1"
                type="radio"
                checked={eventTo === "teacher"}
                onChange={() => setEventTo("teacher")}
              />
            </div>
          </Form.Group>
        </Form>

        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {eventTo === "child" && (
              <Form.Group className="  col-12 my-4">
                <Form.Select
                  name="id"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                  onBlur={formik.handleBlur}
                >
                  <option>Name</option>
                  {childData &&
                    childData.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.user?.full_name}
                      </option>
                    ))}
                </Form.Select>

                {formik.errors.id && formik.touched.id && (
                  <Form.Text className=" text-danger" id="id">
                    {formik.errors.id}
                  </Form.Text>
                )}
              </Form.Group>
            )}
            {eventTo === "teacher" && (
              <Form.Group className="  col-12 my-4">
                <Form.Select
                  name="id"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                  onBlur={formik.handleBlur}
                >
                  <option>Name</option>
                  {data &&
                    data.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.user?.full_name}
                      </option>
                    ))}
                </Form.Select>

                {formik.errors.id && formik.touched.id && (
                  <Form.Text className=" text-danger" id="id">
                    {formik.errors.id}
                  </Form.Text>
                )}
              </Form.Group>
            )}
            <Form.Group className="  col-12 my-4">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />

              {formik.errors.title && formik.touched.title && (
                <Form.Text className=" text-danger" id="title">
                  {formik.errors.title}
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
                  {formik.errors.body}
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

export default AddNotification;
