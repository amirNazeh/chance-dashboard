import Table from "react-bootstrap/Table";
import "./allChild.css";
import Loader from "Components/loader/loader";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { toast } from "react-toastify";
import { getAllChild } from "store/child/allChild";
import { deleteChild } from "store/child/deleteChid";
import { useNavigate } from "react-router-dom";
const AllChild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, childData, error } = useSelector(
    // @ts-ignore
    (state) => state.allChild
  );

  useEffect(() => {
    dispatch(getAllChild());
  }, [dispatch]);
  useEffect(() => {
    toast.error(error);
  }, [error]);

  // if (!isLoading) {
  //   return <Loader />;
  // }

  //   if (data) {
  //     return (
  //       <div className="allUser  col-lg-10 col-sm-9 col-12 ms-auto p-4">
  //         <h4 className="text-center pb-4">All Students</h4>
  //         <Table striped bordered hover className="text-center align-middle">
  //           <thead>
  //             <tr>
  //               <th>#</th>
  //               <th>Name</th>
  //               <th>Email</th>
  //               <th>Birthday</th>
  //               <th>Image</th>
  //               <th>Edite</th>
  //               <th>Delete</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {data.map((el, index) => (
  //               <tr key={el.id}>
  //                 <td>{index + 1}</td>
  //                 <td>{el.user.full_name}</td>
  //                 <td>{el.user.email}</td>
  //                 <td>{el.user.date_of_birth}</td>
  //                 <td>
  //                   <img src={el.user.image_url} alt="img" className=" " />
  //                 </td>
  //                 <td>
  //                   <i className="fa-solid fa-user-pen pointer"></i>
  //                 </td>
  //                 <td>
  //                   <i
  //                     className="fa-solid fa-trash-can pointer"
  //                     onClick={() => {
  //                       dispatch(deleteChild(el.id));
  //                     }}
  //                   ></i>
  //                 </td>
  //               </tr>
  //             ))}
  //             <tr>
  //               <td>2</td>
  //               <td>Jacob</td>
  //               <td>Thornton</td>
  //               <td>@fat</td>
  //             </tr>
  //             <tr>
  //               <td>3</td>
  //               <td colSpan={2}>Larry the Bird</td>
  //               <td>@twitter</td>
  //             </tr>
  //           </tbody>
  //         </Table>
  //       </div>
  //     );
  //   } else {
  //     return <h5 className="w-100 text-center align-self-center ">No Data</h5>;
  //   }

  return (
    <>
      <div className="allChild mt-5 p-4 ">
        <h4 className="text-center ">All Child</h4>
        {isLoading ? (
          <Loader />
        ) : childData && childData.length > 0 ? (
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
                <th>Notes</th>
                <th>Events</th>
                <th>Edite</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {childData.map((el, index) => (
                <tr key={el.id}>
                  <td>{index + 1}</td>
                  <td>{el.user.full_name} </td>
                  <td>{el.user.user_name}</td>
                  <td>{el.user.email}</td>
                  <td>{el.user.date_of_birth}</td>
                  <td>
                    <img src={el.user.image_url} alt="img" className=" " />
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-note-sticky pointer"
                      onClick={() => {
                        navigate(`/notes/${el.user_id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    {" "}
                    <i
                      className="fa-solid fa-calendar-days  pointer"
                      onClick={() => {
                        navigate(`/userEvent/${el.user_id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-user-pen pointer"
                      onClick={() => {
                        navigate(`/updateChild/${el.id}`);
                      }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can pointer"
                      onClick={() => {
                        dispatch(deleteChild(el.id));
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h5
            className="w-100 text-center align-self-center "
            style={{ marginTop: "35vh" }}
          >
            No Child
          </h5>
        )}
      </div>
    </>
  );
};

export default AllChild;
