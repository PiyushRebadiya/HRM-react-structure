import React, { useEffect } from 'react'
import { useState } from 'react';
import { Tabs } from 'antd';
import AdditionsMaster from './Additions/AdditionsMaster';
import DeducationMAster from './Deducation/DeducationMaster'
import OvertimeMaster from './Overtime/OvertimeMaster'
const PayrollitemsMain = () => {

    const TabPane = Tabs.TabPane;

    return (
        <div className='content-wrapper'>
            <section className="content-header close-btn-flex">
                <div>
                    <div className="header-icon">
                        {/* <i className="fa fa-users" /> */}
                        <i class="fa fa-desktop" aria-hidden="true"></i>
                    </div>
                    <div className="header-title">
                        <h1>Payroll Items </h1>
                        {/* <small>Party List</small> */}
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-lg-12 pinpin">
                        <div className="card lobicard" data-sortable="true">
                            <div className="card-header">
                                <div className='title-download-section'>
                                    <div className="card-title custom_title">
                                        <h4 className='report-heading'> Payroll items</h4>
                                    </div>
                                    <div className='download-record-section'>
                                        {/* <Space wrap>
                                            <Tooltip title="Download PDF" >
                                                <FaFilePdf className='downloan-icon' onClick={generatePDF} />
                                            </Tooltip>
                                        </Space>
                                        <Space wrap>
                                            <Tooltip title="Download Excel" >
                                                <RiFileExcel2Line className='downloan-icon' onClick={downloadExcel} />
                                            </Tooltip>
                                        </Space>
                                        <Space wrap>
                                            <Tooltip title="Print" >
                                                <AiOutlinePrinter className='downloan-icon' onClick={handlePrint} />
                                            </Tooltip>
                                        </Space> */}
                                    </div>
                                </div>
                            </div>
                            <div className="btn-group d-flex input-searching-main pt-3 pl-3 ps-3" role="group">
                                <div className="buttonexport" id="buttonlist">
                                    {/* <button className="btn btn-add" onClick={() => setProjectNew(true)}> <i className="fa fa-plus" /> Add Project</button> */}
                                </div>
                                {/* <div className='searching-input'>
                                    <input type="text" className='form-control' placeholder='Search here'
                                    />
                                </div> */}

                            </div>
                            <div className='addition-deduction' >
                                <Tabs defaultActiveKey="Addition"  >
                                    <TabPane tab="Addition" key="1" >
                                        <AdditionsMaster />
                                    </TabPane>
                                    {/* <TabPane tab="Overtime" key="2">
                                        < OvertimeMaster />
                                    </TabPane> */}
                                    <TabPane tab="Deduction" key="3">
                                        < DeducationMAster />
                                    </TabPane>
                                </Tabs>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PayrollitemsMain