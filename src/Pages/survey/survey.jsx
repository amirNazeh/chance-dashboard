import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getDepartments } from "store/departments/allDepartments";
import { Button, Card, Form } from "react-bootstrap";
import Loader from "Components/loader/loader";
import { getSurvey } from "store/servey/getSurvey";
import AddSurvey from "./addSurvey";
import { deleteSurvey } from "store/servey/deleteSurvey";
import UpdateSurvey from "./updateSurvey";
import { useNavigate } from "react-router-dom";

const Servey = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState(null);
  const [showAddSurvey, setShowAddSurvey] = useState(false);
  const [showUpdateSurvey, setShowUpdateSurvey] = useState({
    show: false,
    id: "",
  });
  const navigate = useNavigate();

  const { DepartmentData, isLoading } = useSelector(
    // @ts-ignore
    (state) => state.getDepartments
  );
  // @ts-ignore
  const { surveyData, loading } = useSelector((state) => state.getSurvey);

  useEffect(() => {
    !DepartmentData && dispatch(getDepartments());
  }, [DepartmentData, dispatch]);
  useEffect(() => {
    department && dispatch(getSurvey(department));
  }, [dispatch, department]);
  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Servey</h4>
      {DepartmentData && DepartmentData.length > 0 ? (
        <div>
          <div className="d-flex justify-content-between">
            <Form.Group className="w-50 d-flex align-items-center">
              <h5 className="me-1">Department: </h5>
              <Form.Select onChange={(el) => setDepartment(el.target.value)}>
                <option></option>
                {DepartmentData &&
                  DepartmentData.length > 0 &&
                  DepartmentData.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            {department && !loading && !surveyData && (
              <Button
                className="px-4 "
                style={{ fontWeight: "bold" }}
                variant="primary"
                type="submit"
                disabled={loading}
                onClick={() => setShowAddSurvey(true)}
              >
                <i className="fa-solid fa-plus pe-2"></i>
                Add Servey
              </Button>
            )}
          </div>

          {loading || isLoading ? (
            <div style={{ marginTop: "-11vh" }}>
              <Loader />
            </div>
          ) : department && surveyData ? (
            <div>
              <Card className="mx-5 mt-5  p-2">
                {/* <i
              className="fa-solid fa-circle-xmark fs-5 text-end pointer"
              style={{ marginRight: "-8px", marginTop: "-5px" }}
              onClick={() =>
                dispatch(
                  deleteSurvey({ id: surveyData.id, userId: department })
                )
              }
            ></i> */}
                <Card.Body>
                  <Card.Title>{surveyData?.name}</Card.Title>
                  <Card.Text>{surveyData?.date}</Card.Text>
                </Card.Body>

                <div className="text-end ">
                  <Button
                    className="me-2"
                    variant="outline-primary"
                    onClick={() =>
                      setShowUpdateSurvey({ show: true, id: surveyData?.id })
                    }
                  >
                    <i className="fa-solid fa-pen-to-square  pe-2"></i>
                    Edit
                  </Button>
                  <Button
                    className="me-2"
                    variant="outline-primary"
                    onClick={() => {
                      navigate(`/questions&answers/${surveyData?.id}`);
                    }}
                  >
                    <i className="fa-solid fa-circle-question fs-5 pe-2"></i>
                    Questions
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      dispatch(
                        deleteSurvey({ id: surveyData.id, userId: department })
                      )
                    }
                  >
                    <i className="fa-regular fa-trash-can pe-2"></i>
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <h5
              className="w-100 text-center align-self-center "
              style={{ marginTop: "30vh" }}
            >
              No Survey
            </h5>
          )}
        </div>
      ) : (
        DepartmentData &&
        DepartmentData.length === 0 && (
          <h4
            className=" text-danger text-center"
            style={{ marginTop: "30vh" }}
          >
            Add Department First{" "}
          </h4>
        )
      )}
      <AddSurvey
        show={showAddSurvey}
        setShow={() => setShowAddSurvey(false)}
        id={department}
      />
      <UpdateSurvey
        department={department}
        data={showUpdateSurvey}
        setShow={() => setShowUpdateSurvey({ show: false, id: "" })}
      />
    </div>
  );
};

export default Servey;
