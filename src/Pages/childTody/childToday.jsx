import { useEffect, useState } from "react";
import "./childToday.css";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacher } from "store/teacher/allTeacher";
import { getChildToday } from "./../../store/childToday/getChildToday";
import Loader from "Components/loader/loader";
import ChildTodayForm from "./childTodayForm";
import { deleteChildToday } from "store/childToday/deleteChildToday";
const ChildToday = () => {
  const dispatch = useDispatch();
  const [teacherId, setTeacherId] = useState(null);

  const [showChildTodayForm, setChildTodayForm] = useState({
    show: false,
    id: "",
    childId: "",
  });
  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.allTeacher);

  const { childTodayLoading, childTodayData } = useSelector(
    // @ts-ignore
    (state) => state.getChildToday
  );

  useEffect(() => {
    !data && dispatch(getAllTeacher());
  }, [data, dispatch]);
  useEffect(() => {
    dispatch(getChildToday(teacherId));
  }, [dispatch, teacherId]);
  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Child Today</h4>
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <>
          <Form.Group className="col-12 col-md-6 d-flex align-items-center">
            <h5 className="me-1">Teacher: </h5>
            <Form.Select onChange={(el) => setTeacherId(el.target.value)}>
              <option></option>
              {data &&
                data.length > 0 &&
                data.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.user?.full_name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {teacherId && !childTodayLoading && (
            <div className="text-end mt-2">
              {" "}
              <Button
                className="px-4 "
                style={{ fontWeight: "bold" }}
                variant="primary"
                type="submit"
                //disabled={loading}
                onClick={() =>
                  setChildTodayForm({ ...showChildTodayForm, show: true })
                }
              >
                <i className="fa-solid fa-plus pe-2"></i>
                Add Child
              </Button>
            </div>
          )}

          {childTodayLoading ? (
            <Loader />
          ) : childTodayData && childTodayData.length > 0 ? (
            <div className="row justify-content-center mt-3">
              {childTodayData.map((el) => (
                <Card className="col-lg-4 col-md-5 col-12 m-2 p-2" key={el.id}>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <img
                        src={el.child.user.image_url}
                        alt="img"
                        width={65}
                        height={65}
                        style={{ borderRadius: "50%" }}
                        className="me-2 "
                      />
                      {el.child.user.full_name}
                    </Card.Title>
                  </Card.Body>

                  <div className="text-end ">
                    <Button
                      className="me-2"
                      variant="outline-primary"
                      onClick={() =>
                        setChildTodayForm({
                          show: true,
                          id: el.id,
                          childId: el.child_id,
                        })
                      }
                    >
                      <i className="fa-solid fa-pen-to-square  pe-2"></i>
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() =>
                        dispatch(
                          deleteChildToday({ id: el.id, userId: teacherId })
                        )
                      }
                    >
                      <i className="fa-regular fa-trash-can pe-2"></i>
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}{" "}
            </div>
          ) : (
            <h5
              className="w-100 text-center align-self-center "
              style={{ marginTop: "30vh" }}
            >
              No Child
            </h5>
          )}
        </>
      ) : (
        data &&
        data.length === 0 && (
          <h4
            className=" text-danger text-center"
            style={{ marginTop: "30vh" }}
          >
            Add Teacher First{" "}
          </h4>
        )
      )}

      {showChildTodayForm.show && (
        <ChildTodayForm
          data={showChildTodayForm}
          setShow={() =>
            setChildTodayForm({ show: false, id: "", childId: "" })
          }
          id={teacherId}
        />
      )}
    </div>
  );
};
export default ChildToday;
