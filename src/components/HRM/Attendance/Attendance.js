import React, { useState, useEffect } from 'react'
import moment from 'moment'
import AttendanceTable from './AttendanceTable'
import EmployeeAL from './EmployeeAL'
import PunchInOut from './PunchInOut'
import Statistics from './Statistics'
import PunchLog from './PunchLog'

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const formattedDate = moment(currentTime).format('DD-MM-YYYY');
  const formattedTime = moment(currentTime).format('hh:mm A');
  return (
    <div>
      <div className='content-wrapper'>
        <section className="content-header">
          <div className="header-icon">
            <i class="fa fa-tasks" style={{ fontSize: "40px", marginTop: "6px" }}> </i>
          </div>
          <div className='headeradjust'>
            <div className="header-title">
              <h1>Attendance</h1>
              {/* <small>Task details</small> */}
            </div>
            <div>
              <div className='date-section'>
                <h4 style={{ margin: '0px', fontWeight: 'bold' }}><span style={{ color: "grey" }}>{formattedDate}</span> | {formattedTime}</h4>
                {/* <p>{formattedTime}</p> */}
              </div>
            </div>
          </div>
        </section>
        <section className="content footer-section-form-padding p-4">
          <div className="row">
            <div className=" col-sm-6 col-md-6 col-lg-3">
              <div id="cardbox4" className='cardbox6'>
                <div className="statistic-box">
                  <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                  <div className="counter-number pull-right">
                    <span className="count-number fs-1">23</span>
                    <span className="slight">
                    </span>
                  </div>
                  <h3>All Employee</h3>
                </div>
              </div>
            </div>
            <div className=" col-sm-6 col-md-6 col-lg-3">
              <div id="cardbox1" className='cardbox7'>
                <div className="statistic-box">
                  <i class="fa fa-pause-circle fa-3x" aria-hidden="true"></i>
                  <div className="counter-number pull-right">
                    <span className="count-number fs-1">5</span>
                    <span className="slight">
                    </span>
                  </div>
                  <h3>Present Employee</h3>
                </div>
              </div>
            </div>
            <div className=" col-sm-6 col-md-6 col-lg-3">
              <div id="cardbox2" className='cardbox8' >
                <div className="statistic-box">
                  <i class="fa fa-crosshairs fa-3x" aria-hidden="true"></i>
                  <div className="counter-number pull-right">
                    <span className="count-number fs-1">5</span>
                    <span className="slight">
                    </span>
                  </div>
                  <h3>Absent Employee</h3>
                </div>
              </div>
            </div>
            <div className=" col-sm-6 col-md-6 col-lg-3">
              <div id="cardbox3" className='cardbox5'>
                {/* <div id="cardbox3" className='cardbox5' onClick={() => handleProjectData(completedProject, "Completed Project")}> */}
                <div className="statistic-box">
                  <i class="fa fa-trophy fa-3x" aria-hidden="true"></i>
                  <div className="counter-number pull-right">
                    <span className="count-number fs-1">11</span>
                    <span className="slight">
                    </span>
                  </div>
                  <h3>Paid Leave</h3>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
          <div className="col-lg-4 pinpin">
            <div className="card lobicard lobicard-custom-control" data-sortable="true">
              <div className="card-header">
                <div className="card-title custom_title">
                  <h4>Time Sheet</h4>
                </div>
              </div>
              <div className="card-body">
                <PunchInOut />
              </div>
            </div>
          </div>
          <div className="col-lg-5 pinpin">
            <div className="card lobicard lobicard-custom-control" data-sortable="true">
              <div className="card-header">
                <div className="card-title custom_title">
                  <h4>Statistics</h4>
                </div>
              </div>
              <div className="card-body">
                <Statistics />
              </div>
            </div>
          </div>
          <div className="col-lg-3 pinpin">
            <div className="card lobicard lobicard-custom-control" data-sortable="true">
              <div className="card-header">
                <div className="card-title custom_title">
                  <h4>Statistics</h4>
                </div>
              </div>
              <div className="card-body">
                <PunchLog />
              </div>
            </div>
          </div>
          <div className="col-lg-12 pinpin">
            <div className="card lobicard lobicard-custom-control" data-sortable="true">
              <div className="card-header">
                <div className="card-title custom_title">
                  <h4>Employee List</h4>
                </div>
              </div>
              <div className="card-body">
                <EmployeeAL />
              </div>
            </div>
          </div>
          <div className="col-lg-12 pinpin">
            <div className="card lobicard lobicard-custom-control" data-sortable="true">
              <div className="card-header">
                <div className="card-title custom_title">
                  <h4>Employee</h4>
                </div>
              </div>
              <div className="card-body">
                <AttendanceTable />
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default Attendance