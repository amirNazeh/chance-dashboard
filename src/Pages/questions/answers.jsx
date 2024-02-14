import { axiosInstance } from "Config/axios";
import React, { useEffect, useState } from "react";

import { deleteAnswers } from "store/A&Q/deleteAnswer";
import { useDispatch } from "react-redux";
import UpdateAnswer from "./updateAnswer";

const Answers = (props) => {
  const dispatch = useDispatch();
  const [showUpdateAnswer, setShowUpdateAnswer] = useState({
    show: false,
    answerId: "",
  });
  const [data, setData] = useState([]);

  const getAnswer = async (id) => {
    await axiosInstance
      .post("/dashboard/answers/index", { question_id: id })
      .then((res) => {
        setData(res.data.answers);
        return res.data.answers;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAnswer(props.id);
  }, [props.id]);
  return (
    <>
      {data.length > 0 && (
        <ol type="a">
          {data.map((el) => (
            <>
              <div className="d-flex justify-content-between">
                <li>{el.answer_text}</li>
                <div>
                  <i
                    className="fa-solid fa-pen-to-square  pe-2 pointer"
                    onClick={() => {
                      setShowUpdateAnswer({ show: true, answerId: el?.id });
                    }}
                  ></i>
                  <i
                    className="fa-regular fa-trash-can text-danger  pointer"
                    onClick={() =>
                      dispatch(
                        deleteAnswers({ id: el?.id, surveyId: props?.surveyId })
                      )
                    }
                  ></i>
                </div>
              </div>
              <hr></hr>
            </>
          ))}
        </ol>
      )}
      <UpdateAnswer
        surveyId={props.surveyId}
        data={showUpdateAnswer}
        setShow={() => setShowUpdateAnswer({ show: false, answerId: "" })}
      />
    </>
  );
};

export default Answers;
