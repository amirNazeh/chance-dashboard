import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  let token = localStorage.getItem("token");

  if (token) {
    return props.children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default PrivateRoute;
