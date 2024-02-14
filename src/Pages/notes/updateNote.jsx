import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { getNoteById } from "store/notes/getNoteById";
import { getNotes } from "store/notes/getNotes";
const UpdateNote = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { data, isLoading } = useSelector((state) => state.getNoteById);

  const { categoryData } = useSelector(
    // @ts-ignore
    (state) => state.getNotesCategory
  );
  useEffect(() => {
    props.data.show && dispatch(getNoteById(props.data.id));
  }, [dispatch, props.data.id, props.data.show]);
  const updateNote = async (body) => {
    setLoading(true);
    await axiosInstance
      .post(`/dashboard/notes/update/${props.data.id}`, body)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.messege);
        dispatch(getNotes(props.userId));
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
      user_id: props.userId,
      category_id:
        data && data?.note_details?.category_id
          ? data.note_details.category_id
          : "",
      content:
        data && data?.note_details?.content ? data.note_details.content : "",
    },
    validationSchema: yup.object({
      category_id: yup.string().required("category required"),
      content: yup.string().required(),
    }),
    onSubmit: (values) => {
      updateNote(values);
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
                    {`${formik.errors.content}`}
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
        ) : (
          <h6 className="text-center text-danger my-5 py-5  ">
            Add Notes Category First
          </h6>
        )}
      </Modal>
    </>
  );
};

export default UpdateNote;
