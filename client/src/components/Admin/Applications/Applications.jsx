import React, { useState, useEffect } from "react";
import { Axios } from "../../../instance";
import Navbar from "../headers/header";
import "../Applications/Applications.css";
import Approval from "../Approval";
import { Modal, Button } from "react-bootstrap";

function Applications() {
  const [apps, setApps] = useState([]);
  const [selApplication, setSelApplication] = useState({});
  const [approves, setApproves] = useState(false);
  const [show, setShow] = useState(false);

  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get("/admin/getForm").then((response) => {
      setApps(response.data);
    });
  }, []);
  const openModel = (appss) => {
    console.log(appss);
    handleShow();
    setSelApplication(appss);
  };

  const approve = (data) => {
    Axios.patch(`/admin/formApprove/${data._id}`).then((response) => {
      console.log("inside approve function");
      setApproves(response.data);
    });
  };

  const reject = (data) => {
    Axios.patch(`/admin/formReject/${data._id}`).then((response) => {
      console.log("inside reject function");
      setApproves(response.data);
    });
  };


  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Company Description</th>
            <th>View</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((data, i) => {
            return (
              <tr key={i}>
                <td data-column="First Name" key={i}>
                  {i + 1}
                </td>
                <td data-column="Last Name" key={i}>
                  {data.company_name}
                </td>
                <td data-column="Job Title" key={i}>
                  {data.Describe_Your_Company_And_Products}
                </td>
                <td data-column="Twitter">
                  <button onClick={() => openModel(data)}> Details</button>
                </td>
                <td data-column="Twitter">
                  {data.isApproved === null ? (
                    <label class="dropdown">
                      <div class="dd-button">Status</div>
                      <input type="checkbox" class="dd-input" id="test" />
                      <ul class="dd-menu">
                        <li onClick={() => approve(data)}>Approve</li>
                        <li onClick={() => reject(data)}> Reject </li>
                      </ul>
                    </label>
                  ) : data.isApproved === true ? (
                    <p className="approve "> Approved </p>
                  ) : (
                    <p className="reject"> Rejected </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="mb-1" style={{ color: "#35558a" }}>
            {selApplication.company_name}
          </h4>
          <div className="d-flex justify-content-between">
            <p className="small">Client Name</p>
            <p className="small">{selApplication.name}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">Phone</p>
            <p className="small">{selApplication.phone}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">Email</p>
            <p className="small">{selApplication.email}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">Address</p>
            <p className="small">
              {selApplication.address},{selApplication.city},
              {selApplication.state}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">Discribe Your Team and Background</p>
            <p className="small">
              {selApplication.Describe_Your_Company_And_Products}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">
              Who are your competitors and competative advantage?
            </p>
            <p className="small">{selApplication.competitive_advantage}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">
              How do you market  your product and services?
            </p>
            <p className="small">{selApplication.market_plan}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">
              What is the potential market size of the product?
            </p>
            <p className="small">{selApplication.market_size}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">
              What is your value proposition for the customer?
            </p>
            <p className="small">{selApplication.revenue_model}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">Explain your revenue model</p>
            <p className="small">{selApplication.proposal}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small">Describe Your Team and Background</p>
            <p className="small">{selApplication.team_and_background}</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Applications;
