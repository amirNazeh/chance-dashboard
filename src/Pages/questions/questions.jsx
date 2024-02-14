import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "./../../Components/loader/loader";
import { Button, Card } from "react-bootstrap";
import { getQuestions } from "store/A&Q/getQuestions";
import AddQusetions from "./addQuestions";
import { deleteQuestion } from "store/A&Q/deleteQuestions";
import Answers from "./answers";
import UpdateQusetion from "./updateQuestions";
import AddAnswer from "./addAnswer";
const QuestionsAndAnswers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showAddQandA, setShowAddQandA] = useState(false);
  const [showAddAnswer, setShowAddAnswer] = useState({
    show: false,
    questionId: "",
  });
  const [showUpdateQusetion, setShowUpdateQusetion] = useState({
    show: false,
    id: "",
  });
  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getQuestions);

  useEffect(() => {
    id && dispatch(getQuestions(id));
  }, [dispatch, id]);

  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Questions & Answers</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => setShowAddQandA(true)}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Question
        </Button>
      </div>
      {isLoading ? (
        <div style={{ marginTop: "-11vh" }}>
          <Loader />
        </div>
      ) : data && data.length > 0 ? (
        <div className="row justify-content-center m-3 ">
          {data.map((el, index) => (
            <Card className=" col-12 m-2 p-2" key={el.id}>
              {/* <i
                className="fa-solid fa-circle-xmark fs-5 text-end pointer"
                style={{ marginRight: "-15px", marginTop: "-5px" }}
                onClick={() =>
                  dispatch(deleteQuestion({ id: el.id, surveyId: id }))
                }
              ></i> */}
              <Card.Body>
                <Card.Title className="text-center">{el.type}</Card.Title>
                <Card.Text className="d-flex">
                  <h6 className="me-2">{index + 1 + "-"} </h6>
                  {el.question_text}
                </Card.Text>
                <Answers id={el.id} surveyId={id} />
              </Card.Body>

              <div className="text-end mb-1">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() =>
                    setShowUpdateQusetion({ show: true, id: el.id })
                  }
                >
                  <i className="fa-solid fa-pen-to-square  pe-2"></i>
                  Edit
                </Button>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() =>
                    setShowAddAnswer({ show: true, questionId: el.id })
                  }
                >
                  <i className="fa-solid fa-plus pe-2"></i>
                  Add Answer
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    dispatch(deleteQuestion({ id: el.id, surveyId: id }))
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
          No Questions
        </h5>
      )}
      <AddQusetions
        show={showAddQandA}
        setShow={() => setShowAddQandA(false)}
        id={id}
      />
      <UpdateQusetion
        surveyId={id}
        data={showUpdateQusetion}
        setShow={() => setShowUpdateQusetion({ show: false, id: "" })}
      />
      <AddAnswer
        surveyId={id}
        data={showAddAnswer}
        setShow={() => setShowAddAnswer({ show: false, questionId: "" })}
      />
    </div>
  );
};

export default QuestionsAndAnswers;
