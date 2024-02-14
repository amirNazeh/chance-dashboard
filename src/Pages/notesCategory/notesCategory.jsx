import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Loader from "Components/loader/loader";
import { getNotesCategory } from "store/notesCategory/getAllNotesCategory";
import AddNoteCategory from "./addNoteCategory";
import { deleteNoteCategory } from "store/notesCategory/deleteCategory";
import UpdateNoteCategory from "./updateNoteCategory";

const NotesCategory = () => {
  const dispatch = useDispatch();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showUpdateNoteCategory, setShowUpdateNoteCategory] = useState({
    show: false,
    id: "",
  });

  const { isLoading, categoryData } = useSelector(
    // @ts-ignore
    (state) => state.getNotesCategory
  );

  useEffect(() => {
    dispatch(getNotesCategory());
  }, [dispatch]);
  return (
    <div className="mt-5 p-4 da">
      <h4 className="pb-4 text-center">Notes Category</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => setShowAddCategory(true)}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Category
        </Button>
      </div>
      {isLoading ? (
        <div style={{ marginTop: "-11vh" }}>
          <Loader />
        </div>
      ) : categoryData && categoryData.length > 0 ? (
        <div className="row justify-content-center mt-3">
          {categoryData.map((el) => (
            <Card className="col-lg-3 col-md-5 col-12 m-md-2 m-1  " key={el.id}>
              <Card.Body>
                <Card.Title className="">{el.name}</Card.Title>
              </Card.Body>
              <div className="text-end mb-1">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() =>
                    setShowUpdateNoteCategory({ show: true, id: el.id })
                  }
                >
                  <i className="fa-solid fa-pen-to-square  pe-2"></i>
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(deleteNoteCategory(el.id))}
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
          No Category
        </h5>
      )}
      <AddNoteCategory
        show={showAddCategory}
        setShow={() => setShowAddCategory(false)}
      />
      <UpdateNoteCategory
        data={showUpdateNoteCategory}
        setShow={() => setShowUpdateNoteCategory({ show: false, id: "" })}
      />
    </div>
  );
};

export default NotesCategory;
