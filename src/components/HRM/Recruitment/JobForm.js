import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'
import moment from 'moment';
import axios from 'axios';

const JobForm = ({ onHide }) => {
    const [isactive, setIsActive] = useState(true)
    const [loading, setLoading] = useState(false);
    const [selectedleave, setSelectedLeave] = useState("")
    const toDayDate = new Date()
    const formattedDateToDay = moment(toDayDate).format('yyyy-MM-DD');
    const [startdate, setStartDate] = useState(formattedDateToDay)
    const [enddate, setEndDate] = useState(formattedDateToDay)
    const [daycount, setDayCount] = useState("")
    const [reminingday, setReminingDay] = useState(12)
    const [leavereason, setLeaveReason] = useState("")
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
                                <h1>Job</h1>
                                {/* <small>Category list</small> */}
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
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Department : <span className='text-danger'>*</span></label>
                                                <div className='d-flex'>
                                                    <Select
                                                        className='w-100'
                                                        // options={leaveOption}
                                                        isClearable={true}
                                                        // value={leaveOption.find((option) => option.value == selectedleave)}
                                                        onChange={(selected) => {
                                                            setSelectedLeave(selected ? selected.value : '')
                                                        }}
                                                        placeholder="Enter Department"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Position : <span className='text-danger'>*</span></label>
                                                <div className='d-flex'>
                                                    <Select
                                                        className='w-100'
                                                        // options={leaveOption}
                                                        isClearable={true}
                                                        // value={leaveOption.find((option) => option.value == selectedleave)}
                                                        onChange={(selected) => {
                                                            setSelectedLeave(selected ? selected.value : '')
                                                        }}
                                                        placeholder="Enter Position"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Job Location : <span className='text-danger'>*</span></label>
                                                <div className='d-flex'>
                                                    <input className='form-control' type='text' placeholder='Enter Job Location' />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>No Of Vacancies : <span className='text-danger'>*</span></label>
                                                <div className='d-flex'>
                                                    <input className='form-control' type='number' placeholder='Enter No Of Vacancies' />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Start Date :</label>
                                                <input type="date" className="form-control" value={startdate} onChange={(event) => { setStartDate(event.target.value) }} />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>End Date :</label>
                                                <input type="date" className="form-control" value={enddate} onChange={(event) => { setEndDate(event.target.value) }} />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group">
                                                <label>Experience :</label>
                                                <input type="number" className="form-control" />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Salary From  :</label>
                                                <input type="number" className="form-control" />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <label>Salary To :</label>
                                                <input type="number" className="form-control" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="reset-button ">
                                        <button className="btn btn-success m-2" disabled={loading}>
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

export default JobForm