import React, { useEffect, useState } from "react";
import { getEvents } from "store/events/getEvents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "Components/loader/loader";
import { Button, Card } from "react-bootstrap";

import AddNotification from "./addNotification/addNotification";
import { deleteEvent } from "../../store/events/deleteEvent";
import UpdateEvent from "./updateNotification/updateNotification";

const Notifications = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getEvents);

  const [showAddNotes, setShowAddEvent] = useState(false);
  const [showUpdateNotes, setShowUpdateEvent] = useState({
    show: false,
    id: "",
  });

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Notifications</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => setShowAddEvent(true)}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Notification
        </Button>
      </div>
      {isLoading ? (
        <div style={{ marginTop: "-11vh" }}>
          <Loader />
        </div>
      ) : data && data.length > 0 ? (
        <div className="row justify-content-center mt-3">
          {data.map((el) => (
            <Card className="col-lg-4 col-md-5 col-12  m-md-2 m-1" key={el.id}>
              {/* <i
                className="fa-solid fa-circle-xmark fs-5 text-end pointer"
                style={{ marginRight: "-15px", marginTop: "-5px" }}
                onClick={() => dispatch(deleteEvent(el.id))}
              ></i> */}
              <Card.Body>
                <Card.Title className="">{el.title}</Card.Title>
                <Card.Text>{el.body}</Card.Text>
              </Card.Body>

              <div className="text-end ">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setShowUpdateEvent({ show: true, id: el.id })}
                >
                  <i className="fa-solid fa-pen-to-square  pe-2"></i>
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(deleteEvent(el.id))}
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
            No Notifications
          </h5>
        )
      )}

      <AddNotification
        show={showAddNotes}
        setShow={() => setShowAddEvent(false)}
      />
      <UpdateEvent
        data={showUpdateNotes}
        setShow={() => setShowUpdateEvent({ show: false, id: "" })}
      />
    </div>
  );
};

export default Notifications;
