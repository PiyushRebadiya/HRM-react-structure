import React from 'react'
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import moment from 'moment';
import { generateCguId } from '../../common/actions';
import axiosPrivateHttp from '../../../server/axios/axiosPrivateHttp';
import { fetchHolidayList } from '../../../redux/actions/holidays-list-api'
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';

const HolidayForm = ({ onHide, selectedRow }) => {

  const [isactive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("")
  const [day, setDay] = useState("")
  const [date, setDate] = useState("")

  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.data);

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
  }, [title, day, date, isactive]);

  const validateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    date: Yup.string()
      .required('Date is required'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      description: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const flag = selectedRow ? "U" : "A"
      const payload = {
        "Flag": flag,
        "Holiday": {
          "HolidayName": values.title,
          "CompanyId": user?.CompanyId,
          "HolidayDate": values.date,
          "Description": values.description,
          "Cguid": selectedRow ? selectedRow.Cguid : generateCguId(user?.custId),
          "HolidayId": selectedRow ? selectedRow.HolidayId : undefined
        }
      }

      callHolidayAPI(payload);
    },
  });
  const { handleSubmit, handleChange, errors, touched, handleBlur, values, setFieldValue } = formik;

  useEffect(() => {
    if (selectedRow) {
      setFieldValue("title", selectedRow.HolidayName);
      setFieldValue("date", selectedRow.HolidayDate);
      setFieldValue("description", selectedRow.Description);
    }
  }, [selectedRow])

  const callHolidayAPI = async (payload) => {
    try {
      const response = await axiosPrivateHttp.post('/api/HRM/CreateHoliday', JSON.parse(JSON.stringify(payload)));
      if (response.data.Success === true) {
        onHide();
        dispatch(fetchHolidayList(user?.CompanyId))
        notification.success({
          message: (selectedRow ? 'Data Modified Successfully !!!' : 'Data Added Successfully !!!'),
          placement: 'bottomRight', // You can adjust the placement
          duration: 1, // Adjust the duration as needed
        });
      }
    }
    catch (error) {
    }
  }
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
                <h1>Holiday</h1>
                {/* <small>Category list</small> */}
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
                <div className="lobicard all_btn_card" id="lobicard-custom-control1">
                  <div className="col-sm-12">
                    {/* <Form onSubmit={handleSubmit}> */}
                    <div className="form-group">
                      <label htmlFor="title">Title :<span className='text-danger'>*</span></label>
                      <input id="title" type="text" className="form-control" name="title" value={values.title} placeholder="Enter Title" onBlur={handleBlur} onChange={handleChange} />
                      {
                        errors.title && touched.title ? (
                          <span className='text-danger'>{errors.title}</span>
                        ) : null}
                    </div>

                    {/* use for future */}
                    {/* <div className="form-group">
                      <label htmlFor="day">Day :</label>
                      <input id="day" type="text" className="form-control" name="day" placeholder="Enter Day" onBlur={handleBlur} onChange={handleChange} />
                    </div> */}
                    <div className="form-group">
                      <label htmlFor="date">Date :</label>
                      <input
                        className="form-control"
                        id="date"
                        name="date"
                        type="date"
                        value={moment(values.date).format('YYYY-MM-DD')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {
                        errors.date && touched.date ? (
                          <span className='text-danger'>{errors.date}</span>
                        ) : null}
                    </div>
                    <div className="form-group">
                      <label>Description :</label>
                      <textarea placeholder='Enter Description' value={values.description} onChange={handleChange} id="description" name="description" rows="4" className='form-control' cols="50" />
                    </div>

                    <div className="reset-button ">
                      <button className="btn btn-success m-2" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Saving...' : 'Save [F9]'}
                      </button>
                      <button className="btn btn-danger m-2" onClick={onHide} disabled={loading}>
                        Cancel [ESC]
                      </button>
                    </div>
                    {/* </Form> */}
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

export default HolidayForm