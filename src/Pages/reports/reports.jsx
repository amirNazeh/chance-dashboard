import Accordion from "react-bootstrap/esm/Accordion";

const Reports = () => {
  function PrintElem(elem) {
    let title = `
    <div style="text-align: center; color: 7FB539; border-bottom: 1px solid lightgray;">
        <h1 style="font-size: 20px;">NAME</h1>
        
    </div>
    `;
    var print = `<div style=" margin-top:50px" > ${elem.target.innerHTML}</div>`;
    var mywindow = window.open("", "PRINT", "height=800,width=900");
    mywindow.document.write(title);
    mywindow.document.write(print);
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    //mywindow.close();
  }

  return (
    <div className=" w-100 mt-5 p-4">
      <h4 className="text-center mb-4">Reports</h4>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="mb-3">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body
            id="testt"
            onClick={(e) => {
              PrintElem(e);
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default Reports;
