import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "Components/loader/loader";
import { Button, Table } from "react-bootstrap";
import { getAllAdmins } from "store/admins/getAdmins";
import { useNavigate } from "react-router-dom";
import { deleteAdmin } from "store/admins/deleteAdmin";

const Admins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @ts-ignore
  const { isLoading, data } = useSelector((state) => state.getAllAdmins);

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);
  let authId = parseInt(localStorage.getItem("AuthId"));

  return (
    <div className="mt-5 p-4">
      <h4 className="pb-4 text-center">Admins</h4>
      <div className="text-end">
        <Button
          className="px-4 "
          style={{ fontWeight: "bold" }}
          variant="primary"
          type="submit"
          onClick={() => navigate("/adminForm/null")}
        >
          <i className="fa-solid fa-plus pe-2"></i>
          Add Admin
        </Button>
      </div>
      {isLoading ? (
        <div style={{ marginTop: "-11vh" }}>
          <Loader />
        </div>
      ) : (
        data &&
        data.length > 0 && (
          <div className=" mt-3">
            <Table
              striped
              bordered
              hover
              className="text-center align-middle mt-4"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Birthday</th>
                  <th>Image</th>

                  <th>Edite</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, index) => (
                  <tr key={el.id}>
                    <td>{index + 1}</td>
                    <td>{el.full_name} </td>
                    <td>{el.user_name}</td>
                    <td>{el.email}</td>
                    <td>{el.date_of_birth}</td>
                    <td>
                      <img
                        src={el.image_url}
                        alt="img"
                        className=" "
                        style={{ height: "5rem", width: "5rem" }}
                      />
                    </td>

                    <td>
                      <i
                        className="fa-solid fa-user-pen pointer"
                        onClick={() => {
                          navigate(`/adminForm/${el.id}`);
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className={
                          authId === el.id
                            ? "fa-solid fa-ban fs-5"
                            : "fa-solid fa-trash-can pointer"
                        }
                        onClick={() => {
                          authId !== el.id && dispatch(deleteAdmin(el.id));
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )
      )}
    </div>
  );
};

export default Admins;
