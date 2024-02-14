import { useLocation } from "react-router-dom";

const ShowNav = ({ children }) => {
  const location = useLocation();

  return <>{location.pathname !== "/" && children}</>;
};

export default ShowNav;
