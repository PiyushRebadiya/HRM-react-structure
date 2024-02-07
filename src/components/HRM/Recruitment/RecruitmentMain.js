import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import JobForm from './JobForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecruitmentTable from './RecruitmentTable';
import ApplicantList from './ApplicantList';
import CandidateForm from './CandidateForm';

function NewData(props) {
    // const { fetchData, getCategoryData } = props
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <JobForm onHide={props.onHide} />
        </Modal>
    );
}
function NewCandidate(props) {
    // const { fetchData, getCategoryData } = props
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <CandidateForm onHide={props.onHide} />
        </Modal>
    );
}
const RecruitmentMain = () => {
    const [newdata, setNewData] = React.useState(false)
    const [newCandidateform, setNewCandidateform] = React.useState(false)

   
  return (
    <div>
         <div>
            <div>
                <div className='content-wrapper'>
                    <section className="content-header close-btn-flex">
                        <div>
                            <div className="header-icon">
                                {/* <i className="fa fa-users" /> */}
                                <i class="fa fa-th-large" aria-hidden="true"></i>
                            </div>
                            <div className="header-title">
                                <h1>Recruitment Management</h1>
                                {/* <small>Category List</small> */}
                            </div>
                        </div>
                    </section>
                    {/* leave-count-section-start */}

                    <div className='card-main-counter'>
                        <Row>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-present'>
                                    <div className='card-text-section'>
                                        <h4>Current Job Opening</h4>
                                        <h3>3</h3>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-planned'>
                                    <div className='card-text-section'>
                                        <h4>Total Candidate</h4>
                                        <h3>8</h3>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-unplanned'>
                                    <div className='card-text-section'>
                                        <h4>ShortList Candidate</h4>
                                        <h3>0</h3>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-pending'>
                                    <div className='card-text-section'>
                                        <h4>Total Approved Candidate</h4>
                                        <h3>2</h3>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* leave-count-section-end */}

                    <section className="content footer-section-form-padding p-4 ">
                    <div className='row'>
                        <div className="col-lg-6 pinpin">
                            <div className="card lobicard lobicard-custom-control" data-sortable="true"
                            // style={{height: "726px"}}
                            >
                                <div className="card-header">
                                    <div className="card-title custom_title">
                                        <h4>Current Opening List</h4>
                                    </div>
                                </div>
                                <div className="btn-group d-flex input-searching-main pt-3 pl-3 ps-3" role="group">
                                <div className="buttonexport" id="buttonlist">
                                    <Button className="btn btn-add rounded-2"
                                        onClick={() => setNewData(true)}
                                    >
                                        <i className="fa fa-plus" /> Add Job 
                                    </Button>
                                    <NewData
                                        show={newdata}
                                        onHide={() => setNewData(false)}
                                       
                                    />
                                </div>
                                <div className='searching-input'>
                                    <input type="text" className='form-control' placeholder='Search here' />
                                </div>
                            </div>
                                <div className='p-2'>
                                        <RecruitmentTable/>
                                        </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pinpin">
                            <div className="card lobicard lobicard-custom-control" data-sortable="true"
                            // style={{height: "726px"}}
                            >
                                <div className="card-header">
                                    <div className="card-title custom_title">
                                        <h4>Shortlist Candidates</h4>
                                    </div>
                                </div>
                                <div className="btn-group d-flex input-searching-main pt-3 pl-3 ps-3" role="group">
                                <div className="buttonexport" id="buttonlist">
                                    
                                  
                                </div>
                                <div className='searching-input p-1 mr-2'>
                                    <input type="text" className='form-control' placeholder='Search here' />
                                </div>
                            </div>
                                <div className='p-2'>
                                        <ApplicantList/>
                                        </div>
                            </div>
                        </div>
                        <div className="col-lg-12 pinpin reminder-legend">
                            <div className="card lobicard lobicard-custom-control" data-sortable="true">
                                <div className="card-header">
                                    <div className="card-title custom_title w-100">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <h4>Applicant List</h4>
                                            </div>
                                            <div className='' style={{ cursor: 'pointer' }}>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className="btn-group d-flex input-searching-main pt-3 pl-3 ps-3" role="group">
                                <div className="buttonexport" id="buttonlist">
                                    <Button className="btn btn-add rounded-2"
                                        onClick={() => setNewCandidateform(true)}
                                    >
                                        <i className="fa fa-plus" /> Add Candidate 
                                    </Button>
                                    <NewCandidate
                                        show={newCandidateform}
                                        onHide={() => setNewCandidateform(false)}
                                       
                                    />
                                </div>
                                <div className='searching-input'>
                                    <input type="text" className='form-control' placeholder='Search here' />
                                </div>
                            </div>
                                <ApplicantList />
                            </div>
                        </div>

                    </div>
                </section>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecruitmentMain