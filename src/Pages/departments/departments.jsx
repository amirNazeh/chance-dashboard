import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getDepartments } from "store/departments/allDepartments";
import { Button, Card } from "react-bootstrap";
import Loader from "Components/loader/loader";
import { deleteDepartment } from "store/departments/deleteDepartments";
import AddDepartment from "./addDepartment";
import UpdateDepartment from "./updateDeprtment";
const Departments = () => {
  const dispatch = useDispatch();
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showUpdateDepartment, setShowUpdateDepartment] = useState({
    show: false,
    id: "",
  });

  const { isLoading, DepartmentData } = useSelector(
    // @ts-ignore
    (state) => state.getDepartments
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  return (
    <div className="mt-5 p-4 da">
      <h4 className="pb-4 text-center">Departments</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          disabled={isLoading}
          onClick={() => setShowAddDepartment(true)}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Department
        </Button>
      </div>
      {isLoading ? (
        <div style={{ marginTop: "-11vh" }}>
          <Loader />
        </div>
      ) : DepartmentData && DepartmentData.length > 0 ? (
        <div className="row justify-content-center mt-3">
          {DepartmentData.map((el) => (
            <Card className="col-lg-3 col-md-5 col-12 m-md-2 m-1  " key={el.id}>
              {/* <i
                className="fa-solid fa-circle-xmark fs-5 text-end pointer"
                style={{ marginRight: "-15px", marginTop: "-5px" }}
                onClick={() => dispatch(deleteDepartment(el.id))}
              ></i> */}
              <Card.Body>
                <Card.Title className="">{el.name}</Card.Title>
              </Card.Body>
              <div className="text-end mb-1">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() =>
                    setShowUpdateDepartment({ show: true, id: el.id })
                  }
                >
                  <i className="fa-solid fa-pen-to-square  pe-2"></i>
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(deleteDepartment(el.id))}
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
          No Departments
        </h5>
      )}
      <AddDepartment
        show={showAddDepartment}
        setShow={() => setShowAddDepartment(false)}
      />
      <UpdateDepartment
        data={showUpdateDepartment}
        setShow={() => setShowUpdateDepartment({ show: false, id: "" })}
      />
    </div>
  );
};

export default Departments;
