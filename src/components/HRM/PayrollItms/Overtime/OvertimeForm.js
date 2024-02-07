import { Rate } from 'antd';
import React, { useEffect ,useState} from 'react';
import Select from 'react-select'


const OvertimeForm = ({onHide}) => {
  const [loading, setLoading] = useState(false);
  const [Rate ,setRate] = useState("");

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
            <h1>Add Overtime</h1>
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
                <div className="form-group">
                  <label>Employee Name :<span className='text-danger'>*</span></label>
                  <Select
                    placeholder="Select Employee Name"
                  />
                  {/* {errors.status && <div className="error-message text-danger">{errors.status}</div>} */}
                </div>
                <div className="form-group">
                  <label>Rate :<span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" value={Rate} placeholder="Enter Rate " onChange={(event) => {
                    const input = event.target.value;
                    const numericInput = input.replace(/\D/g, '');
                    setRate(numericInput)
                  }} />
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
  </div>  )
}

export default OvertimeForm