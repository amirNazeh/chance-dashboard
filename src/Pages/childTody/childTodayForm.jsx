import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllChild } from "store/child/allChild";
import { getChildToday } from "./../../store/childToday/getChildToday";
const ChildTodayForm = (props) => {
  const isUpdate = props.data.id ? true : false;

  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, childData } = useSelector(
    // @ts-ignore
    (state) => state.allChild
  );

  useEffect(() => {
    !childData && dispatch(getAllChild());
  }, [childData, dispatch]);

  const addChild = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/today_childs/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getChildToday(props.id));
        formik.resetForm();
        props.setShow();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message[0]);
      });
  };
  const updateChild = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post(`/dashboard/today_childs/update/${props.data.id}`, body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.messege);
        dispatch(getChildToday(props.id));

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
      teacher_id: props.id,
      child_id: isUpdate ? props.data.childId : "",
    },
    validationSchema: yup.object({
      child_id: yup.string().required("child name required"),
    }),
    onSubmit: (values) => {
      props.data.id ? updateChild(values) : addChild(values);
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
          <Modal.Title>{isUpdate ? "Update Child" : "Add Child"}</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <div className="text-center  my-5 py-5  ">
            <Spinner animation="border" variant="" />
          </div>
        ) : childData && childData.length > 0 ? (
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <Form.Group className="  col-12 my-4">
                <Form.Label>Child Name:</Form.Label>
                <Form.Select
                  name="child_id"
                  onChange={formik.handleChange}
                  value={formik.values.child_id}
                  onBlur={formik.handleBlur}
                >
                  <option></option>
                  {childData &&
                    childData.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.user.full_name}
                      </option>
                    ))}
                </Form.Select>
                {formik.errors.child_id && formik.touched.child_id && (
                  <Form.Text className=" text-danger" id="child_id">
                    {`${formik.errors.child_id}`}
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
        ) : (
          <h6 className="text-center text-danger my-5 py-5  ">
            Add Child First
          </h6>
        )}
      </Modal>
    </>
  );
};

export default ChildTodayForm;
