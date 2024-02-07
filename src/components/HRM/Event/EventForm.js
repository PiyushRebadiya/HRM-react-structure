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
import { Button } from 'react-bootstrap';
import { GrPowerReset } from "react-icons/gr";
import EventMaster from './EventMaster';
import { Space, Tooltip } from 'antd';
import { useFormik, ErrorMessage } from 'formik';


const EventForm = ({ onHide, rowData, fetchData }) => {
  const [loading, setLoading] = useState(false)
  const [eventName, setEventName] = useState("")
  const toDayDate = new Date()
  const formattedDateToDay = moment(toDayDate).format('yyyy-MM-DD');
  const [formdate, setFormDate] = useState(formattedDateToDay);
  const formattedDateToDate = moment(toDayDate).format('yyyy-MM-DD');
  // const [todate, setToDate] = useState(formattedDateToDate);
  const [place, setPlace] = useState("");
  const [remark, setRemark] = useState("");
  // const [errors, setErrors] = useState({});

  const validateSchema = Yup.object().shape({
    eventName: Yup.string().required("Event Name is required"),
    place: Yup.string().required("Place is required"),
  })

  const formik = useFormik({
    initialValues: {
      eventName: "",
      fromDate: moment(new Date()).format('yyyy-MM-DD'),
      toDate: moment(new Date()).format('yyyy-MM-DD'),
      place: "",
      remark: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      console.log(values, 'valuess')
    }
  })

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = formik;

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
              <h1>Event</h1>
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
                    <Col>
                      <div className="form-group">
                        <label>Event Name :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" placeholder="Enter Event Name"
                          name='eventName'
                          id='eventName'
                          onChange={handleChange}
                        />
                        {
                          errors.eventName && touched.eventName ? (
                            <span className='text-danger'>{errors.eventName}</span>
                          ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group">
                        <label>Start Date :<span className='text-danger'>*</span></label>
                        <input type='date' className='form-control'
                          value={moment(values.fromDate).format('YYYY-MM-DD')}
                          name='fromDate'
                          id='fromDate'
                          onChange={handleChange}
                        />
                        {
                          errors.fromDate && touched.fromDate ? (
                            <span className='text-danger'>{errors.fromDate}</span>
                          ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group">
                        <label>End Date :<span className='text-danger'>*</span></label>
                        <input type='date' min={moment(values.fromDate).format('YYYY-MM-DD')} className='form-control'
                          value={moment(values.toDate).format('YYYY-MM-DD')}
                          name='toDate'
                          id='toDate'
                          onChange={handleChange}
                        />
                        {
                          errors.toDate && touched.toDate ? (
                            <span className='text-danger'>{errors.toDate}</span>
                          ) : null}

                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="form-group">
                        <label>Place :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" placeholder="Enter Place Name"
                          name='place'
                          id='place'
                          onChange={handleChange}
                        />
                        {
                          errors.place && touched.place ? (
                            <span className='text-danger'>{errors.place}</span>
                          ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="form-group">
                        <label>Remark</label>
                        <textarea
                          // ref={remark1Ref}
                          className="form-control"
                          rows="2"
                          placeholder="Enter Remark"
                          name='remark'
                          id='remark'
                          onChange={handleChange}
                        />
                        {
                          errors.remark && touched.remark ? (
                            <span className='text-danger'>{errors.remark}</span>
                          ) : null}
                      </div>
                    </Col>
                  </Row>
                  <div className='buttons-reset'>
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
          </div>
        </div>
        {/* /.content */}
      </div>
    </div>
  )
}

export default EventForm