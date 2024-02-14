import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes } from "store/notes/getNotes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "./../../Components/loader/loader";
import { Button, Card } from "react-bootstrap";
import AddNote from "./addnote";
import { deleteNote } from "store/notes/daleteNote";
import UpdateNote from "./updateNote";

const Notes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [showUpdateNotes, setShowUpdateNotes] = useState({
    show: false,
    id: "",
  });

  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getNotes);

  useEffect(() => {
    id && dispatch(getNotes(id));
  }, [dispatch, id]);
  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Notes</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => setShowAddNotes(true)}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Note
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
              {/* <i
                className="fa-solid fa-circle-xmark fs-5 text-end pointer"
                style={{ marginRight: "-15px", marginTop: "-5px" }}
                onClick={() => dispatch(deleteNote({ id: el.id, userId: id }))}
              ></i> */}
              <Card.Body>
                <Card.Title>{el.category?.name}</Card.Title>
                <Card.Text>{el.content}</Card.Text>
              </Card.Body>

              <div className="text-end ">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setShowUpdateNotes({ show: true, id: el.id })}
                >
                  <i className="fa-solid fa-pen-to-square  pe-2"></i>
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    dispatch(deleteNote({ id: el.id, userId: id }))
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
          No Notes
        </h5>
      )}
      <AddNote
        show={showAddNotes}
        setShow={() => setShowAddNotes(false)}
        id={id}
      />
      <UpdateNote
        userId={id}
        data={showUpdateNotes}
        setShow={() => setShowUpdateNotes({ show: false, id: "" })}
      />
    </div>
  );
};

export default Notes;
