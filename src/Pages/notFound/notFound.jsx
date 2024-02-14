import React from "react";
import "./notFound.css";
const NotFound = () => {
  return (
    <div className="not_found w-100 m-auto">
      <div className="page-404 ">
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <div className="inner-circle">
                <span>404</span>
              </div>
              <span className="inner-status">Oops! You're lost</span>
              <span className="inner-detail">
                We can not find the page you're looking for.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
