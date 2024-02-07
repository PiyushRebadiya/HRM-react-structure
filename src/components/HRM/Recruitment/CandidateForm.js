import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'
import moment from 'moment';
import axios from 'axios';

const CandidateForm = ({ onHide }) => {
    const [loading, setLoading] = useState(false);
return(

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
                            <h1>Candidate Details</h1>
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
                                    <Col lg={12}>
                                        <div className="form-group">
                                            <label>Candidate Name : <span className='text-danger'>*</span></label>
                                            <div className='d-flex'>
                                                <input className='form-control' type='text' placeholder='Enter Name' />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Email: <span className='text-danger'>*</span></label>
                                            <div className='d-flex'>
                                                <input className='form-control' type='text' placeholder='Enter Email' />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Mobile No : <span className='text-danger'>*</span></label>
                                            <div className='d-flex'>
                                                <input className='form-control' type='text' placeholder='Enter Mobile' />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Department : <span className='text-danger'>*</span></label>
                                            <div className='d-flex'>
                                                <Select
                                                    className='w-100'
                                                    // options={leaveOption}
                                                    isClearable={true}
                                                    // value={leaveOption.find((option) => option.value == selectedleave)}
                                                    // onChange={(selected) => {
                                                    //     setSelectedLeave(selected ? selected.value : '')
                                                    // }}
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
                                                    // onChange={(selected) => {
                                                    //     setSelectedLeave(selected ? selected.value : '')
                                                    // }}
                                                    placeholder="Enter Position"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Birth Date :</label>
                                            <input type="date" className="form-control"
                                            //  value={startdate} onChange={(event) => { setStartDate(event.target.value) }}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Experience :</label>
                                            <div className='d-flex'>
                                                <Select
                                                    className='w-100'
                                                    // options={leaveOption}
                                                    isClearable={true}
                                                    // value={leaveOption.find((option) => option.value == selectedleave)}
                                                    // onChange={(selected) => {
                                                    //     setSelectedLeave(selected ? selected.value : '')
                                                    // }}
                                                    placeholder="Enter Position"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <label>Expected Salary:</label>
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

export default CandidateForm