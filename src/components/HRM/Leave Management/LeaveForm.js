import React, { useMemo } from 'react'
import { useState, useEffect } from 'react';
import Select from 'react-select'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generateCguId } from '../../common/actions';
import axiosPrivateHttp from '../../../server/axios/axiosPrivateHttp';
import { fetchLeaveList } from '../../../redux/actions/leave-list-api';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
const LeaveForm = ({ onHide, selectedRow }) => {
    const [loading, setLoading] = useState(false);
    const companyId = useSelector((state) => state?.user?.data?.CompanyId);
    const dispatch = useDispatch()
    const validateSchema = Yup.object().shape({
        leaveType: Yup.string()
            .required('Enter Leave Name'),
        leaveSname: Yup.string()
            .max(2, 'Too Long!')
            .required('Enter Leave SortName'),
    });
    const formik = useFormik({
        initialValues: {
            leaveType: '',
            leaveSname: '',
            carryForword: '',
            monthlyLimit: '',
            yearlyLimit: '',
            qtLimit: '',
            description: '',
            cwOff: true,
            cHoliday: false
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            const flag = selectedRow ? "U" : "A"
            const payload = {
                "Flag": flag,
                "LeavesTypes": {
                    "CompanyId": companyId,
                    "LeaveTypeFName": values.leaveType,
                    "LeaveTypeSName": values.leaveSname,
                    "CarryForward": values.carryForword,
                    "YearlyLimit": values.yearlyLimit,
                    "ConsiderWeeklyOff": values.cwOff,
                    "ConsiderHoliday": values.cHoliday,
                    "Description": values.description,
                    "Monthly": values.monthlyLimit,
                    "Quarterly": values.qtLimit,
                    "Cguid": selectedRow ? selectedRow.Cguid : generateCguId(),
                    "LeaveTypeId": selectedRow ? selectedRow.LeaveTypeId : undefined,
                }
            }
            callLeaveApi(payload)
        },
    });
    const { handleSubmit, handleChange, errors, touched, handleBlur, values, setFieldValue } = formik
    const { leaveType, leaveSname, carryForword, monthlyLimit, yearlyLimit, qtLimit, description, cwOff } = values
    useEffect(() => {
        if (selectedRow) {
            setFieldValue('leaveType', selectedRow.LeaveTypeFName)
            setFieldValue('leaveSname', selectedRow.LeaveTypeSName)
            setFieldValue('carryForword', selectedRow.CarryForward)
            setFieldValue('yearlyLimit', selectedRow.YearlyLimit)
            setFieldValue('cwOff', selectedRow.ConsiderWeeklyOff)
            setFieldValue('cHoliday', selectedRow.ConsiderHoliday)
            setFieldValue('description', selectedRow.Description)
            setFieldValue('monthlyLimit', selectedRow.Monthly)
            setFieldValue('qtLimit', selectedRow.Quarterly)
        }
    }, [selectedRow])

    const callLeaveApi = async (payload) => {
        try {
            const response = await axiosPrivateHttp.post('/api/HRM/CreateLeavesType', JSON.parse(JSON.stringify(payload)))
            if (response.data.Success === true) {
                onHide();
                dispatch(fetchLeaveList(companyId))
                notification.success({
                    message: (selectedRow ? 'Data Modified Successfully !!!' : 'Data Added Successfully !!!'),
                    placement: 'bottomRight', // You can adjust the placement
                    duration: 1, // Adjust the duration as needed
                });
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F9') {
                event.preventDefault();
                handleSubmit();
            }
        };
        // Add event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [leaveType, leaveSname, carryForword, monthlyLimit, yearlyLimit, qtLimit, description, cwOff]);
    return (
        <div>
            <div>
                <div className="form-border">
                    {/* Content Header (Page header) */}
                    <section className="content-header model-close-btn" style={{ width: "100%" }}>
                        <div className='form-heading'>
                            <div className="header-icon">
                                <i className="fa fa-users" />
                            </div>
                            <div className="header-title">
                                <h1>Leave Management</h1>
                            </div>
                        </div>
                        <div className='close-btn'>
                            <button type="button" className="close ml-auto" aria-label="Close" style={{ color: 'black' }} onClick={onHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </section>
                    <div className="row">
                        {/* Form controls */}
                        <div className="col-sm-12">
                            <div className="lobicard all_btn_card" id="lobicard-custom-control1">
                                <div className="col-sm-12">
                                    <Row>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Leave Type FullName :<span className='text-danger'>*</span></label>
                                                <input type="text" id="leaveType" name="leaveType" onChange={handleChange} className="form-control" value={values.leaveType}
                                                    placeholder='Enter Leave Name'
                                                />
                                                {
                                                    errors.leaveType && touched.leaveType ? (
                                                        <span className='text-danger'>{errors.leaveType}</span>
                                                    ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>leave Type SortName :<span className='text-danger'>*</span></label>
                                                <input type="text" id="leaveSname" name="leaveSname" onChange={handleChange} className="form-control" value={values.leaveSname}
                                                    placeholder='Enter Leave SortName'
                                                />
                                                {
                                                    errors.leaveSname && touched.leaveSname ? (
                                                        <span className='text-danger'>{errors.leaveSname}</span>
                                                    ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Carry Forward :</label>
                                                <input type="number" id="carryForword" name="carryForword" onChange={handleChange} className="form-control" value={values.carryForword}
                                                    placeholder='Enter Carry Forword'
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Monthly Limit :</label>
                                                <input type="number" className="form-control" id="monthlyLimit" onChange={handleChange} name="monthlyLimit" value={values.monthlyLimit}
                                                    placeholder='Enter Monthly Limit'
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Yearly Limit :</label>
                                                <input type="number" className="form-control" id="yearlyLimit" onChange={handleChange} name="yearlyLimit" value={values.yearlyLimit}
                                                    placeholder='Enter Yearly Limit'
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Quarterly Limit :</label>
                                                <input type="number" className="form-control" id="qtLimit" onChange={handleChange} name="qtLimit" value={values.qtLimit}
                                                    placeholder='Enter Quarterly Limit'
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Description :</label>
                                                <textarea placeholder='Enter Description' value={values.description} onChange={handleChange} id="description" name="description" rows="4" className='form-control' cols="50" />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <div>
                                                    <label>
                                                        <input type='checkbox' onChange={handleChange} id="cwOff" name="cwOff" checked={values.cwOff} /> Consider Weekly Off</label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input type='checkbox' onChange={handleChange} id="cHoliday" name='cHoliday' checked={values.cHoliday} /> Consider Holiday</label>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* <div>
                                        <label>Status :</label><br />
                                        <div className='billing-category'>
                                            <div>
                                                <label className="radio-inline">
                                                    <input type="radio" name="status" checked={isactive} onChange={() => { setIsActive(true) }} /> Active
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="status" checked={!isactive} onChange={() => { setIsActive(false) }} /> Inactive
                                                </label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="reset-button ">
                                        <button className="btn btn-success m-2" onClick={handleSubmit} disabled={loading}>
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
                    {/* /.content */}
                </div>
            </div>
        </div>
    )
}

export default LeaveForm