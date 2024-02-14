import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "./../../Components/loader/loader";
import { Button, Card } from "react-bootstrap";
import { getUserEvents } from "store/userEvent/getUserEvent";
import UserEventForm from "./userEventForm";
import { deleteUserEvent } from "store/userEvent/deleteUserEven";
const UserEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showUserEventForm, setUserEventForm] = useState({
    show: false,
    EventId: "",
  });
  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getUserEvents);

  useEffect(() => {
    id && dispatch(getUserEvents(id));
  }, [dispatch, id]);
  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Events</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => setUserEventForm({ ...showUserEventForm, show: true })}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Event
        </Button>
      </div>
      {isLoading ? (
        <div style={{ marginTop: "-11vh" }}>
          <Loader />
        </div>
      ) : data && data.length > 0 ? (
        <div className="row justify-content-center mt-3">
          {data.map((el) => (
            <Card className="col-lg-4 col-md-5 col-12 m-2 p-2" key={el.id}>
              <Card.Body>
                <Card.Title>{el.title}</Card.Title>
                <Card.Text>{el.body}</Card.Text>
              </Card.Body>

              <div className="text-end ">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() =>
                    setUserEventForm({ show: true, EventId: el.id })
                  }
                >
                  <i className="fa-solid fa-pen-to-square  pe-2"></i>
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    dispatch(deleteUserEvent({ id: el.id, userId: id }))
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
        data &&
        data.length === 0 && (
          <h5
            className="w-100 text-center align-self-center "
            style={{ marginTop: "30vh" }}
          >
            No Events
          </h5>
        )
      )}
      {showUserEventForm.show && (
        <UserEventForm
          data={showUserEventForm}
          setShow={() => setUserEventForm({ show: false, EventId: "" })}
          userId={id}
        />
      )}
    </div>
  );
};
export default UserEvent;
