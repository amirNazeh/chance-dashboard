import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div
      className="text-center col-12 col-sm-ms-5   "
      style={{ marginTop: "40vh" }}
    >
      <Spinner animation="border" variant="" />
    </div>
  );
};
export default Loader;
