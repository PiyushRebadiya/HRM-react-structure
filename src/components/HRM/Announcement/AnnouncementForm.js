import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Descriptions, notification } from 'antd';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form validation Schema start
// const pincodeRegex = /^[0-9]{6}$/
// const validationSchema = Yup.object().shape({
//     projectName: Yup.string().required("Project Name is required"),
//     status: Yup.string().required("Please select status"),
//     // Add validation schema for other fields,
// });
// Form validation Schema end

const AnnouncementForm = ({ onHide }) => {
    const [loading, setLoading] = useState(false);
    const [formdate, setFormDate] = useState("");
    const [Descriptions, setDescriptions] = useState("");
    const [Subject, setSubject] = useState("");
    const [Place, setPlace] = useState("");

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
            if (event.key === 'F9') {
                event.preventDefault();
                // DataSubmit();
            }

        };
        // Add event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [formdate, loading, Descriptions, Subject, Place]); // Add any other dependencies as needed

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
            <div className='form-border'>
                {/* Content Header (Page header) */}
                <section className="content-header model-close-btn " style={{ width: "100%" }}>
                    <div className='form-heading'>
                        <div className="header-icon">
                            <i className="fa fa-users" />
                        </div>
                        <div className="header-title">
                            <h1>Notice</h1>
                            {/* <small>Project List</small> */}
                        </div>
                    </div>
                    <div className='close-btn'>
                        <button type="button" className="close ml-auto" aria-label="Close" style={{ color: 'black' }} onClick={onHide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </section>
                {/* Main content */}
                <div className="">
                    <div className="row">
                        {/* Form controls */}
                        <div className="col-sm-12">
                            <div className="lobicard all_btn_card" id="lobicard-custom-control1" data-sortable="true">
                                <div className="col-sm-12">
                                    <Row>
                                        <div className="form-group">
                                            <label>Subject:<span className='text-danger'>*</span></label>
                                            <input className='form-control' value={Subject} placeholder='Subject' onChange={(event) => {
                                                setSubject(event.target.value)
                                                // if (errors.formdate) {
                                                //     setErrors(prevErrors => ({ ...prevErrors, formdate: '' }));
                                                // }
                                            }} />
                                        </div>
                                        <div className="form-group">
                                            <label> Date :</label>
                                            <input type='date' className='form-control' value={formdate} onChange={(event) => {
                                                setFormDate(event.target.value)
                                                // if (errors.formdate) {
                                                //     setErrors(prevErrors => ({ ...prevErrors, formdate: '' }));
                                                // }
                                            }} />
                                            {/* {errors.formdate && <div className="error-message text-danger">{errors.formdate}</div>} */}
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="form-group">
                                            <label>Announcement Type:<span className='text-danger'>*</span></label>
                                            <Select
                                                placeholder="Announcement"
                                            />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="form-group">
                                            <label>Place:<span className='text-danger'>*</span></label>
                                            <input className='form-control'
                                                value={Place} placeholder='Place' onChange={(event) => {
                                                    setPlace(event.target.value)
                                                    // if (errors.formdate) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, formdate: '' }));
                                                    // }
                                                }} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="form-group">
                                            <label>Description :</label>
                                            <textarea className="form-control" placeholder="Description" rows="3"
                                                value={Descriptions}
                                                onChange={(event) => {
                                                    setDescriptions(event.target.value);
                                                    // if (errors.compAddress) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, compAddress: '' }));
                                                    // }
                                                }}
                                            />
                                            {/* {errors.compAddress && <div className="error-message text-danger">{errors.compAddress}</div>} */}
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="form-group">
                                            <label>Attachment :</label>
                                            <input type="file" placeholder='Attachment' />
                                        </div>
                                    </Row>

                                    {/* <div className="form-group">
                                        <div>
                                            <label>Status</label><br />
                                            <label className="radio-inline">
                                                <input
                                                    type="radio"
                                                    name="statusdepartment"
                                                    checked={isactive === true}
                                                    onChange={() => { setIsActive(true) }}
                                                /> Active
                                            </label>
                                            <label className="radio-inline">
                                                <input
                                                    type="radio"
                                                    name="statusdepartment"
                                                    checked={isactive === false}
                                                    onChange={() => { setIsActive(false) }}
                                                /> Inactive
                                            </label>
                                        </div>
                                    </div> */}
                                    <div className="reset-button ">
                                        <button className="btn btn-success m-2"
                                            // onClick={DataSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save [F9]'}
                                        </button>
                                        <button className="btn btn-danger m-2" onClick={onHide}
                                            disabled={loading}
                                        >
                                            Cancel [ESC]
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.content */}
            </div>
        </div >
    )
}

export default AnnouncementForm