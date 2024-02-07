import React, { useState, useEffect } from 'react'
import OvertimeForm from './OvertimeForm';
import OvertimeTable from './OvertimeTable'
import { Button, Modal } from 'react-bootstrap';


function OvertimeNewData(props) {


  const { } = props
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <OvertimeForm
        // getCategoryData={getCategoryData}
        // fetchData={fetchData}
        onHide={props.onHide}
      />
    </Modal>
  );
}
const OvertimeMaster = () => {

  const [overtime, setOvertime] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    // Function to handle keypress event
    function handleKeyPress(event) {
      if (event.key === 'F2') {
        setOvertime(true);
      }
    }

    // Add event listener for keypress
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array to ensure this effect runs only once
  const handleData = (data) => {
    setData(data)
  }
  return (
    <div className='content' style={{ background: "none" }}>

      <section className='p-0'>
        <div className="row">
          <div className="col-lg-12 pinpin">
            <div className="card lobicard" data-sortable="true">
              <div className="card-header">
                <div className='title-download-section'>
                  <div className="card-title custom_title">
                    <h4 className='report-heading'>Overtime List</h4>
                  </div>
                </div>
              </div>
              <div className="btn-group d-flex input-searching-main pt-3 pl-3 ps-3" role="group">
                <div className="buttonexport" id="buttonlist">
                  {/* <button className="btn btn-add"> <i className="fa fa-plus" /> Add Customer
                                      </button> */}
                  <Button className="btn btn-add rounded-2" onClick={() => setOvertime(true)}>
                    <i className="fa fa-plus" /> Add Overtime [F2]
                  </Button>
                  <OvertimeNewData
                    show={overtime}
                    onHide={() => setOvertime(false)}

                  />
                </div>
                <div className='searching-input'>
                  <input type="text" className='form-control' placeholder='Search here'
                    // onChange={(event) => { sertSearchInput(event.target.value) }}
                  />

                </div>
              </div>
              <div className='p-3'>
                <OvertimeTable
                // insertData={insertData}
                // searchinput={searchinput}
                // onData={handleData}

                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>)
}

export default OvertimeMaster