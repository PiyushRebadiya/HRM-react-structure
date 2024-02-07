import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const DeducationForm = ({ onHide }) => {
  const [loading, setLoading] = useState(false);

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
              <h1>   Deducation</h1>
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
                    <Col lg={6}>
                      <div className="form-group">
                        <label>Employee Name :<span className='text-danger'>*</span></label>
                        {/* <Select
                                    options={statusOptions}
                                    defaultValue={defaultStatus}
                                    placeholder="Select Status"
                                    onChange={handleStatusOptionChange}
                                /> */}
                        <Select
                          placeholder="Select Employee Name"
                        />
                        {/* {errors.status && <div className="error-message text-danger">{errors.status}</div>} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group">
                        <label>TDS :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" placeholder="Enter TDS "
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                    <div className="form-group">
                        <label>PF :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" placeholder="Enter PF "
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                    <div className="form-group">
                        <label>PT :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" placeholder="Enter PT "
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="reset-button ">
                    <button className="btn btn-success m-2"
                      //  onClick={DataSubmit}
                      disabled={loading}>
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
        {/* /.content */}
      </div>
    </div>
  )
}

export default DeducationForm