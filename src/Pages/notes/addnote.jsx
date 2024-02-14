import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "store/notes/getNotes";
import { getNotesCategory } from "store/notesCategory/getAllNotesCategory";
const AddNote = (props) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, categoryData } = useSelector(
    // @ts-ignore
    (state) => state.getNotesCategory
  );

  useEffect(() => {
    dispatch(getNotesCategory());
  }, [dispatch]);
  const addNote = async (body) => {
    setIsLoading(true);
    await axiosInstance
      .post("/dashboard/notes/create", body)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(getNotes(props.id));
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
      user_id: props.id,
      category_id: categoryData ? categoryData[0]?.id : "",
      content: "",
    },
    validationSchema: yup.object({
      category_id: yup.string().required("category required"),
      content: yup.string().required(),
    }),
    onSubmit: (values) => {
      addNote(values);
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
        {isLoading ? (
          <div className="text-center  my-5 py-5  ">
            <Spinner animation="border" variant="" />
          </div>
        ) : categoryData && categoryData.length > 0 ? (
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <Form.Group className="  col-12 my-4">
                <Form.Select
                  name="category_id"
                  onChange={formik.handleChange}
                  value={formik.values.category_id}
                  onBlur={formik.handleBlur}
                >
                  {categoryData &&
                    categoryData.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.name}
                      </option>
                    ))}
                </Form.Select>
                {formik.errors.category_id && formik.touched.category_id && (
                  <Form.Text className=" text-danger" id="category_id">
                    {`${formik.errors.category_id}`}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="  col-12 my-4">
                <Form.Control
                  as="textarea"
                  placeholder="Content"
                  name="content"
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.content && formik.touched.content && (
                  <Form.Text className=" text-danger" id="Body">
                    {formik.errors.content}
                  </Form.Text>
                )}
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
                className={loading ? "px-3" : ""}
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <div>Add</div>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        ) : (
          <h6 className="text-center text-danger my-5 py-5  ">
            Add Notes Category First
          </h6>
        )}
      </Modal>
    </>
  );
};

export default AddNote;
