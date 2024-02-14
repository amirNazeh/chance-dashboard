import React from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";

import { getUserEvents } from "store/userEvent/getUserEvent";
import { getUserEventById } from "./../../store/userEvent/getUserEventById";

const UserEventForm = (props) => {
  const isUpdate = props.data.EventId ? true : false;

  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, data } = useSelector(
    // @ts-ignore
    (state) => state.getUserEventById
  );

  useEffect(() => {
    isUpdate && dispatch(getUserEventById(props.data.EventId));
  }, [dispatch, isUpdate, props.data.EventId]);

  const addUserEvent = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/user_event/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getUserEvents(props.userId));
        formik.resetForm();
        props.setShow();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const updateUserEvent = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post(`/dashboard/user_event/update/${props.data.EventId}`, body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.messege);
        dispatch(getUserEvents(props.userId));

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
    enableReinitialize: true,
    initialValues: {
      title: isUpdate && data ? data.title : "",
      body: isUpdate && data ? data.body : "",
      user_id: props.userId,
    },
    validationSchema: yup.object({
      title: yup.string().required(),
      body: yup.string().required(),
    }),
    onSubmit: (values) => {
      isUpdate ? updateUserEvent(values) : addUserEvent(values);
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
          <Modal.Title>{isUpdate ? "Update Event" : "Add Event"}</Modal.Title>
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
                  placeholder="Title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.title && formik.touched.title && (
                  <Form.Text className=" text-danger" id="title">
                    {` ${formik.errors.title}`}
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
                className={
                  loading && !isUpdate
                    ? "px-3"
                    : loading && isUpdate
                    ? "px-4"
                    : ""
                }
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <div>{isUpdate ? "Update" : "Add"}</div>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UserEventForm;
