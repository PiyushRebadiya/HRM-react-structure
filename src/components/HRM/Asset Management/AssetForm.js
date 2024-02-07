import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import axios from 'axios'
import moment from 'moment'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { notification } from 'antd';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Space, Tooltip } from 'antd';
import { Button } from 'react-bootstrap';
import { GrPowerReset } from "react-icons/gr";

const validationSchema = Yup.object().shape({
    // selectedsubCategory: Yup.string().required("Sub-Category Name is required"),
    // processname: Yup.string().required("Process Name is required"),
});

const AssetForm = ({ onHide, rowData, fetchData, getAssetData }) => {

    const [assetName, setAssetName] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [qty, setQty] = useState("")
    const [getuserdata, setGetuserData] = useState([])
    const [handoverBy, setHandoverBy] = useState("")
    const [handoverTo, setHandoverTo] = useState("")
    const [handoverType, setHandoverType] = useState("T")
    const todayDate = new Date()
    const formattedDateToDay = moment(todayDate).format('yyyy-MM-DD');
    const [handoverDate, setHandoverDate] = useState(formattedDateToDay)
    const [returnDate, setReturnDate] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [remark, setRemark] = useState("")
    const [status, setStatus] = useState("")
    const [isactive, setIsActive] = useState(true)
    const URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('CRMtoken')
    const custId = localStorage.getItem('CRMCustId')
    const userid = localStorage.getItem('CRMUserId')
    const userName = localStorage.getItem('CRMUsername')
    const CompnyId = localStorage.getItem('CRMCompanyId')
    const role = localStorage.getItem('CRMRole')
    const [ipaddress, setIpAddress] = useState('')
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    let firstUserSelected;

    useEffect(() => {
        if (rowData) {
            // setSelectedSubCategory(rowData.SubCategoryID)
            // setProcessName(rowData.ProcessName)
            // setIsActive(rowData.IsActive)
            // setProcessId(rowData.Id)
            // setGuid(rowData.Cguid)
        }
    }, [rowData])

    const getUserData = async () => {
        try {
            const res = await axios.get(URL + `/api/Master/GetEmpList?CustId=${custId}&CompanyId=${CompnyId}`, {
                headers: { Authorization: `bearer ${token}` }
            })
            setGetuserData(res.data)
            firstUserSelected = res.data[0].Id;
            // console.log(firstUserSelected, "firstUserSelectedfirstUserSelectedfirstUserSelectedfirstUserSelectedfirstUserSelectedfirstUserSelected")
            if (!rowData) {
                setHandoverBy(firstUserSelected)
            }
            // console.log(firstUserSelected, "assignBy")
        } catch (error) {
            console.log(error)
        }
    }

    const fetchIPAddress = async () => {
        try {
            const res = await axios.get('https://api.ipify.org/?format=json', {
            });
            setIpAddress(res.data.ip)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getUserData()
        fetchIPAddress()
    }, [])

    getuserdata.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
    const activeUser = getuserdata.filter((display) => display.IsActive === true);
    const userOptions = activeUser.map((display) => ({
        value: display.Id,
        label: display.FirstName + ' ' + display.LastName
    }));

    const handleSelect = (selected) => {
        setHandoverTo(selected.value)
        // if (errors.assignTo) {
        //     setErrors(prevErrors => ({ ...prevErrors, assignTo: '' }));
        // }
    }

    const handoveroption = [
        { label: 'Permanent', value: "P" },
        { label: 'Temporary ', value: "T" },
    ];

    const DataSubmit = async () => {
        // try {
        //     await validationSchema.validate({
        //         selectedsubCategory,
        //         processname
        //     }, { abortEarly: false });
        //     setLoading(true);
        //     if (processid >= 0) {
        //         const res = await axios.post(URL + "/api/Master/CreateProcess", {
        //             Id: processid,
        //             SubCategoryID: selectedsubCategory,
        //             ProcessName: processname,
        //             CompanyID: companyId,
        //             IsActive: isactive,
        //             Cguid: guid,
        //             UserId: userId,
        //             UserName: userName,
        //             IPAddress: ipaddress,
        //         },
        //             {
        //                 headers: { Authorization: `bearer ${token}` },
        //             })
        //         if (res.data.Success == true) {
        //             fetchData()
        //             onHide()
        //             if (getProcessData) {
        //                 getProcessData()
        //             }
        //             notification.success({
        //                 message: 'Data Modified Successfully !!!',
        //                 placement: 'bottomRight', 
        //                 duration: 1, 
        //             });
        //         }
        //     }
        //     else {
        //         const res = await axios.post(URL + "/api/Master/CreateProcess", {
        //             SubCategoryID: selectedsubCategory,
        //             ProcessName: processname,
        //             CompanyID: companyId,
        //             IsActive: true,
        //             Cguid: UUID,
        //             UserId: userId,
        //             UserName: userName,
        //             IPAddress: ipaddress,
        //         },
        //             {
        //                 headers: { Authorization: `bearer ${token}` },
        //             });
        //         console.log(res, "response-insert-process")
        //         if (res.data.Success == true) {
        //             fetchData()
        //             onHide()
        //             if (getProcessData) {
        //                 getProcessData()
        //             }
        //             notification.success({
        //                 message: 'Data Added Successfully !!!',
        //                 placement: 'bottomRight', 
        //                 duration: 1,
        //             });
        //         }
        //     }
        // } catch (error) {
        //     if (error.response) {
        //         setProcessError(error.response.data.Message)
        //     }
        //     const validationErrors = {};
        //     if (error.inner && Array.isArray(error.inner)) {
        //         error.inner.forEach(err => {
        //             validationErrors[err.path] = err.message;
        //         });
        //     }
        //     setErrors(validationErrors);
        // } finally {
        //     setLoading(false);
        // }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F9') {
                event.preventDefault();
                DataSubmit();
            }
        };

        // Add event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Add any other dependencies as needed

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
                            <h1>Asset Handover Form</h1>
                            {/* <small>Task List</small> */}
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
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Asset Name :<span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" value={assetName} placeholder="Enter Asset Name" onChange={(event) => {
                                                    // const input = event.target.value;
                                                    // const capitalLetters = input.toUpperCase();
                                                    setAssetName(event.target.value)
                                                    // if (errors.TaskName) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, TaskName: '' }));
                                                    // }
                                                }} />
                                                {/* {errors.TaskName && <div className="error-message text-danger">{errors.TaskName}</div>} */}
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Date :</label>
                                                <input type='date' className='form-control' value={handoverDate} onChange={(event) => {
                                                    setHandoverDate(event.target.value)
                                                    // if (errors.formdate) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, formdate: '' }));
                                                    // }
                                                }} />
                                                {/* {errors.formdate && <div className="error-message text-danger">{errors.formdate}</div>} */}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Serial No. :<span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" value={serialNumber} placeholder="Enter Serial No." onChange={(event) => {
                                                    // const input = event.target.value;
                                                    // const capitalLetters = input.toUpperCase();
                                                    setSerialNumber(event.target.value)
                                                    // if (errors.TaskName) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, TaskName: '' }));
                                                    // }
                                                }} />
                                                {/* {errors.TaskName && <div className="error-message text-danger">{errors.TaskName}</div>} */}
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Quantity :<span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" value={qty} placeholder="Enter Quantity" onChange={(event) => {
                                                    // const input = event.target.value;
                                                    // const capitalLetters = input.toUpperCase();
                                                    setQty(event.target.value)
                                                    // if (errors.TaskName) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, TaskName: '' }));
                                                    // }
                                                }} />
                                                {/* {errors.TaskName && <div className="error-message text-danger">{errors.TaskName}</div>} */}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                {role == 'Admin' ? (

                                                    <label>Handover By :<span className='text-danger'>*</span></label>
                                                ) : null}
                                                {role === 'Admin' ? (
                                                    <Select
                                                        className='w-100'
                                                        options={userOptions}
                                                        // isDisabled={rowData ? true : false}
                                                        // value={assignoption.find((option) => option.value === assignBy)}
                                                        // value={userOptions.find((option) => option.value == assignBy)}
                                                        value={handoverBy ? userOptions.find((option) => option.value == handoverBy) : null}
                                                        isSearchable={true}
                                                        onChange={(selected) => {
                                                            setHandoverBy(selected.value);
                                                            // if (errors.assignBy) {
                                                            //     setErrors(prevErrors => ({ ...prevErrors, assignBy: '' }));
                                                            // }
                                                        }}
                                                        placeholder="Select Handover By"
                                                    />
                                                ) : (null)}

                                                {/* {errors.assignBy && <div className="error-message text-danger">{errors.assignBy}</div>} */}
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Handover To :<span className='text-danger'>*</span></label>
                                                <Select
                                                    className='w-100'
                                                    options={userOptions}
                                                    value={userOptions.find((option) => option.value == handoverTo)}                            
                                                    onChange={handleSelect}
                                                    placeholder="Select Handover To"
                                                />
                                                {/* {errors.assignTo && <div className="error-message text-danger">{errors.assignTo}</div>} */}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Handover Type :<span className='text-danger'>*</span></label>
                                                <Select
                                                    className='w-100'
                                                    options={handoveroption}
                                                    value={handoveroption.find((option) => option.value == handoverType)}
                                                    onChange={(selected) => {
                                                        setHandoverType(selected.value);
                                                        // if (errors.assignBy) {
                                                        //     setErrors(prevErrors => ({ ...prevErrors, assignBy: '' }));
                                                        // }
                                                    }}
                                                    placeholder="Select Handover To"
                                                />
                                                {/* {errors.assignTo && <div className="error-message text-danger">{errors.assignTo}</div>} */}
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Return Date :</label>
                                                <input type='date' className='form-control' value={returnDate} onChange={(event) => {
                                                    setReturnDate(event.target.value)
                                                    // if (errors.formdate) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, formdate: '' }));
                                                    // }
                                                }} disabled={handoverType == "P" ? true : false} />
                                                {/* {errors.formdate && <div className="error-message text-danger">{errors.formdate}</div>} */}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Contact Number :<span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" value={contactNumber} placeholder="Enter Contact Number" onChange={(event) => {
                                                    // const input = event.target.value;
                                                    // const capitalLetters = input.toUpperCase();
                                                    setContactNumber(event.target.value)
                                                    // if (errors.TaskName) {
                                                    //     setErrors(prevErrors => ({ ...prevErrors, TaskName: '' }));
                                                    // }
                                                }} />
                                                {/* {errors.TaskName && <div className="error-message text-danger">{errors.TaskName}</div>} */}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Remark :</label>
                                                <textarea className="form-control" rows="3" placeholder="Enter Remark" value={remark} onChange={(event) => {
                                                    setRemark(event.target.value);
                                                }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className='buttons-reset'>
                                        <div className="reset-button ">
                                            <button className="btn btn-success m-2" onClick={DataSubmit} disabled={loading}>
                                                {loading ? 'Saving...' : 'Save [F9]'}
                                            </button>
                                            <button className="btn btn-danger m-2" onClick={onHide} disabled={loading}>
                                                Cancel [ESC]
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.content */}
            </div>
        </div>
    )
}

export default AssetForm