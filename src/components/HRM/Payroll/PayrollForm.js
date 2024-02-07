import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { notification } from "antd";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Form validation Schema start
// const pincodeRegex = /^[0-9]{6}$/
// const validationSchema = Yup.object().shape({
//     projectName: Yup.string().required("Project Name is required"),
//     status: Yup.string().required("Please select status"),
//     // Add validation schema for other fields,
// });
// Form validation Schema end

const PayrollForm = ({ getProjectData, rowData, fetchData, onHide }) => {
  const [employeeName, setemployeeName] = React.useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [SalaryAmt, setSalaryAmt] = useState("");
  const [formdate, setFormDate] = useState("");
  const [todate, setToDate] = useState("");
  const [isactive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // const [masterData, setMasterData] = useState([]);
  // const [ipaddress, setIpAddress] = useState('')
  const [status, setStatus] = React.useState("IPT");
  const [errors, setErrors] = useState({});
  const [projectId, setProjectId] = React.useState(-1);
  const [guid, setGuid] = useState("");

  // const token = localStorage.getItem('CRMtoken')
  // const companyId = localStorage.getItem("CRMCompanyId")
  // const UserName = localStorage.getItem('CRMUsername')
  // const UserId = localStorage.getItem('CRMUserId')
  // const CustId = localStorage.getItem('CRMCustId')
  // const URL = process.env.REACT_APP_API_URL
  // const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  // const year = currentDate.getFullYear();
  // const hours = currentDate.getHours();
  // const minutes = currentDate.getMinutes();
  // const second = currentDate.getSeconds();
  // const uuid = uuidv4();
  // const UUID = `${day}CC${month}-${uuid}-${CustId}`

  //  useEffect(() => {
  //     if (rowData) {
  //         setProjectName(rowData.employeetName)
  //         setStatus(rowData.Status)
  //         setProjectId(rowData.Id)
  //     }
  //  }, [rowData])

  // const DataSubmit = async () => {
  //     try {
  //         await validationSchema.validate({
  //             projectName,
  //             status
  //         }, { abortEarly: false });
  //         setLoading(true);
  //         if (projectId >= 0) {
  //             const res = await axios.post(URL + "/api/Master/CreateProject", {
  //                 Id: projectId,
  //                 ProjectName: projectName,
  //                 Status: status,
  //                 CompanyId: companyId,
  //                 UserId: UserId,
  //                 UserName: UserName,
  //                 IPAddress: ipaddress,
  //             },
  //                 {
  //                     headers: { Authorization: `bearer ${token}` },
  //                 })
  //             if (res.data.Success == true) {
  //                 fetchData()
  //                 onHide()
  //                 if (getProjectData) {

  //                     getProjectData()
  //                 }
  //                 notification.success({
  //                     message: 'Data Modified Successfully !!!',
  //                     placement: 'bottomRight', // You can adjust the placement
  //                     duration: 1, // Adjust the duration as needed
  //                 });
  //             }
  //         }
  //         else {
  //             const res = await axios.post(URL + "/api/Master/CreateProject", {
  //                 ProjectName: projectName,
  //                 Status: status,
  //                 CompanyId: companyId,
  //                 UserId: UserId,
  //                 UserName: UserName,
  //                 IPAddress: ipaddress,
  //             },
  //                 {
  //                     headers: { Authorization: `bearer ${token}` },
  //                 });
  //             if (res.data.Success == true) {
  //                 fetchData()
  //                 onHide()
  //                 if (getProjectData) {
  //                     getProjectData()
  //                 }
  //                 notification.success({
  //                     message: 'Data Added Successfully !!!',
  //                     placement: 'bottomRight', // You can adjust the placement
  //                     duration: 1, // Adjust the duration as needed
  //                 });
  //             }
  //         }
  //     } catch (error) {
  //         const validationErrors = {};
  //         if (error.inner && Array.isArray(error.inner)) {
  //             error.inner.forEach(err => {
  //                 validationErrors[err.path] = err.message;
  //             });
  //         }
  //         setErrors(validationErrors);
  //     } finally {
  //         setLoading(false);
  //     }

  // }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F9") {
        event.preventDefault();
        // DataSubmit();
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [employeeName, EmployeeId, SalaryAmt, formdate, todate, isactive]); // Add any other dependencies as needed

  // const fetchMasterData = async () => {
  //     try {
  //         const res = await axios.get(URL + '/api/Master/mst_Master', {
  //             headers: { Authorization: `bearer ${token}` }
  //         })
  //         setMasterData(res.data)
  //         console.log(res.data, "Master")
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // const fetchIPAddress = async () => {
  //     try {
  //         const res = await axios.get('https://api.ipify.org/?format=json', {
  //         });
  //         setIpAddress(res.data.ip)
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // }
  // useEffect(() => {
  //     fetchMasterData()
  //     fetchIPAddress()
  // }, [])

  // const options = masterData.filter((display) => display.Remark === "TaskStatus");
  // const statusOptions = options.map((display) => ({
  //     value: display.MasterTag1,
  //     label: display.Description,
  // }))

  // const statusOptions = masterData.reduce((options, display) => {
  //     if (display.Remark === "TaskStatus") {
  //         options.push({
  //             value: display.MasterTag1,
  //             label: display.Description,
  //         });
  //     }
  //     return options;
  // }, []);
  // Set the default selected option to the first option in statusOptions
  // const defaultStatus = statusOptions.length > 0 ? statusOptions[0] : null;
  // const [status, setStatus] = React.useState(defaultStatus);

  // const handleStatusOptionChange = (selectedOption) => {
  //     setStatus(selectedOption.value);
  //     if (errors.status) {
  //         setErrors(prevErrors => ({ ...prevErrors, status: '' }));
  //     }
  //     // Access the label of the selected option
  //     const selectedLabel = selectedOption.label;
  //     console.log(selectedLabel);
  // };
  return (
    <div>
      <div className="form-border">
        {/* Content Header (Page header) */}
        <section
          className="content-header model-close-btn "
          style={{ width: "100%" }}
        >
          <div className="form-heading">
            <div className="header-icon">
              <i className="fa fa-users" />
            </div>
            <div className="header-title">
              <h1>Employee Salary</h1>
              {/* <small>Project List</small> */}
            </div>
          </div>
          <div className="close-btn">
            <button
              type="button"
              className="close ml-auto"
              aria-label="Close"
              style={{ color: "black" }}
              onClick={onHide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </section>
        {/* Main content */}
        <div className="container p-2">
          <Row>
            <Col lg={6}>
            <div className="card">
            <div className="card-body">
              <h2 className="card-title">Employee Details</h2>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="employeeName">Employee Name</label>
                  <div className="d-flex w-100">
                    <Select
                      className="w-100"
                      // options={filterPartyName}
                      // value={filterPartyName.find(
                      //   (option) => option.value == partyName
                      // )}
                      // isClearable={true}
                      // onChange={(selected) => {
                      //   setPartyName(selected ? selected.value : "");
                      //   setAddressShow(true);
                      //   if (errors.partyName) {
                      //     setErrors((prevErrors) => ({
                      //       ...prevErrors,
                      //       partyName: "",
                      //     }));
                      //   }
                      // }}
                      placeholder="Select Employee"
                    />
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="employeeId">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter employee ID"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="employeeId">Department</label>
                  <div className="d-flex w-100">
                    <Select
                      className="w-100"
                      // options={filterPartyName}
                      // value={filterPartyName.find(
                      //   (option) => option.value == partyName
                      // )}
                      // isClearable={true}
                      // onChange={(selected) => {
                      //   setPartyName(selected ? selected.value : "");
                      //   setAddressShow(true);
                      //   if (errors.partyName) {
                      //     setErrors((prevErrors) => ({
                      //       ...prevErrors,
                      //       partyName: "",
                      //     }));
                      //   }
                      // }}
                      placeholder="Select Employee"
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="employeeId">Position</label>
                  <div className="d-flex w-100">
                    <Select
                      className="w-100"
                      // options={filterPartyName}
                      // value={filterPartyName.find(
                      //   (option) => option.value == partyName
                      // )}
                      // isClearable={true}
                      // onChange={(selected) => {
                      //   setPartyName(selected ? selected.value : "");
                      //   setAddressShow(true);
                      //   if (errors.partyName) {
                      //     setErrors((prevErrors) => ({
                      //       ...prevErrors,
                      //       partyName: "",
                      //     }));
                      //   }
                      // }}
                      placeholder="Select Employee"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
            </Col>
            <Col lg={6}>
            <div className="card">
            <div className="card-body">
              <h2 className="card-title">Salary Details</h2>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="salary">Basic</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                  />
                </div>
               
                <Col lg={6}>
                      <div className="form-group">
                        <label>
                          Bank :<span className="text-danger">*</span>
                        </label>
                        <div className="d-flex w-100">
                          <input className="form-control" disabled />
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                    <div className="form-group">
                        <label>
                          Bank Account No. :<span className="text-danger">*</span>
                        </label>
                        <div className="d-flex w-100">
                          <input className="form-control"/>
                        </div>
                      </div>
                    </Col>
              </div>
            </div>
          </div>
            </Col>
          </Row>
         

         <Row>
          <Col lg={6}>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Deduction Details</h2>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="pf">PF (Provident Fund)</label>
                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Applicable</label>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter PF"
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="esi">ESI (Employee State Insurance)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter ESI"
                  />
                </div>
              
              </div>
              <div className="form-group">
                <label htmlFor="tds">TDS (Tax Deducted at Source)</label>
                <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Applicable</label>
                  </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter TDS"
                />
              </div>
            </div>
          </div>
          </Col>
          <Col lg={6}>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Addition Details</h2>
              <div className="form-row">
               
                <div className="form-group col-md-6">
                  <label htmlFor="esi">OT</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="esi">Convienance</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="form-group col-md-8">
                  <label htmlFor="hra">HRA (House Rent Allowance)</label>
                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Applicable</label>
                  </div>
                  <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="Enter HRA"
                    disabled
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="hra">Medical Allowance</label>
                  <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="Enter HRA"
                  />
                </div>
              </div>
              {/* <div className="form-group">
                <label htmlFor="tds">TDS (Tax Deducted at Source)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter TDS"
                />
              </div> */}
            </div>
          </div>
          </Col>
         </Row>

        

          <div className="form-group">
            <label htmlFor="netSalary">Net Salary</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              readOnly
            />
          </div>
          <div className="reset-button ">
            <button
              className="btn btn-success m-2"
              // onClick={DataSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save [F9]"}
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={onHide}
              disabled={loading}
            >
              Cancel [ESC]
            </button>
          </div>
        </div>
        {/* /.content */}
      </div>
    </div>
  );
};

export default PayrollForm;
