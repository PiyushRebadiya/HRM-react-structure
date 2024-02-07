import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const AdditionsForm = ({ onHide }) => {
  const [loading, setLoading] = useState(false);
  const [SalaryAmt, setSalaryAmt] = useState("")
  const [AdditionAmt, setAdditionAmt] = useState("")
  const [isactive, setIsActive] = useState(true)

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
              <h1> Additions</h1>
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
                        <label>Incentive  :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control"
                          placeholder="Enter Incentive "
                        />
                      </div>
                    </Col>
                    <Col lg={6}>

                      <div className="form-group">
                        <label>Salary Amount :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" value={SalaryAmt} placeholder="Enter Salary Amount " onChange={(event) => {
                          const input = event.target.value;
                          const numericInput = input.replace(/\D/g, '');
                          setSalaryAmt(numericInput)
                        }} />
                      </div>
                    </Col>
                  </Row>

              <Row>
                <Col lg={6}>
                <div className="form-group">
                        <label>HRA  :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control"
                          placeholder="Enter HRA "
                        />
                      </div>
                </Col>
                <Col lg={6}>
                <div className="form-group">
                        <label>OT :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control"
                          placeholder="Enter OT "
                        />
                      </div>
                </Col>
                <Col lg={6}>
                <div className="form-group">
                        <label>DA :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control"
                          placeholder="Enter DA "
                        />
                      </div>
                </Col>
                <Col lg={6}>
                <div className="form-group">
                        <label>Medical Allowance  :<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control"
                          placeholder="Enter Medical Allowance "
                        />
                      </div>
                </Col>
              </Row>
                  <div className="form-group">
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
                  </div>
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

export default AdditionsForm