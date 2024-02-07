import React from 'react'
import { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFilePdf } from 'react-icons/fa';
import { RiFileExcel2Line } from 'react-icons/ri';
import { AiOutlinePrinter } from 'react-icons/ai';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import { Space, Tooltip } from 'antd';
import LeaveForm from './LeaveForm';
import LeaveTable from './LeaveTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            <LeaveForm onHide={props.onHide} />
        </Modal>
    );
}
const Leave = () => {
    const [newdata, setNewData] = React.useState(false)
    const [searchInput, setSearchInput] = useState("")

    //   const generatePDF = () => {
    //     const doc = new jsPDF();
    //     const companyName = localStorage.getItem('CRMCompanyName') || 'Your Company Name'; // Retrieve company name from Local Storage
    //     doc.setFont('Arial', 'bold');
    //     doc.text(` ${companyName}`, 70, 10);
    //     doc.setFontSize(13)
    //     const leftMargin = 15;
    //     doc.text(`Total Record :- ${data.length}`, leftMargin, 20);
    //     doc.text('Category List', leftMargin, 25);
    //     const tableData = data.map((item, index) => [
    //         index + 1,
    //         item.ProjectName ? item.ProjectName : '-',
    //         item.CategoryName ? item.CategoryName : '-',
    //         item.IsActive ? item.IsActive : 'false'
    //     ]);
    //     doc.autoTable({
    //         head: [['No', 'Project Name', 'Category Name', 'Status']],
    //         body: tableData,
    //         startY: 30,
    //     });

    //     doc.save('CategoryList.pdf');
    // };
    // const downloadExcel = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(data);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     XLSX.writeFile(workbook, 'Category.xlsx');
    // };
    // const handlePrint = () => {
    //     const companyName = localStorage.getItem('CRMCompanyName') || 'Your Company Name';
    //     const printContent = `
    //       <html>
    //         <head>
    //           <title>Print</title>
    //           <style>
    //             body {
    //               font-family: Arial, sans-serif;
    //             }
    //             table {
    //               border-collapse: collapse;
    //               width: 100%;
    //             }
    //             th, td {
    //               border: 1px solid black;
    //               padding: 8px;
    //               text-align: left;
    //             }
    //             th {
    //               background-color: #f2f2f2;
    //             }
    //             p{
    //                 font-size: 25px;
    //                 font-weight:700;
    //                 text-align: center;
    //             }
    //           </style>
    //         </head>
    //         <body>
    //         <p> ${companyName}</p>
    //         <hr/>
    //         <div>
    //         <b>Total Record :- </b>${data.length}
    //         </div>
    //           <h4>Category List</h4>
    //           <table>
    //             <thead>
    //               <tr> 
    //                 <th>No</th> 
    //                 <th>Project Name</th>
    //                 <th>Category Name</th>
    //                 <th>Status</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               ${data.map((item, index) =>
    //         `
    //                 <tr>
    //                 <td>${index + 1}</td>
    //                   <td>${item.ProjectName ? item.ProjectName : '-'}</td>
    //                   <td>${item.CategoryName ? item.CategoryName : '-'}</td>
    //                   <td>${item.IsActive ? item.IsActive : 'false'}</td>                   
    //                 </tr>
    //               `).join('')}
    //             </tbody>
    //           </table>
    //         </body>
    //       </html>
    //     `;
    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.open();
    //     printWindow.document.write(printContent);
    //     printWindow.document.close();

    //     // Trigger print after the content is loaded in the new tab
    //     printWindow.print();
    // };

    useEffect(() => {
        // Function to handle keypress event
        function handleKeyPress(event) {
            if (event.key === 'F2') {
                setNewData(true);
            }
        }

        // Add event listener for keypress
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    return (
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
                                <h1>Leave Management</h1>
                                {/* <small>Category List</small> */}
                            </div>
                        </div>
                    </section>
                    {/* leave-count-section-start */}
                    {/* <div className='card-main-counter'>
                        <Row>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-present'>
                                    <div className='card-text-section'>
                                        <h4>Today Presents</h4>
                                        <h3>12 /60</h3>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-planned'>
                                    <div className='card-text-section'>
                                        <h4>Planned Leaves</h4>
                                        <h3>8<span style={{ fontSize: "12px" }}> Today</span></h3>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-unplanned'>
                                    <div className='card-text-section'>
                                        <h4>Unplanned Leaves</h4>
                                        <h3>0<span style={{ fontSize: "12px" }}> Today</span></h3>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6}>
                                <div className='card-section-main-pending'>
                                    <div className='card-text-section'>
                                        <h4>Pending Requests</h4>
                                        <h3>12</h3>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div> */}
                    {/* leave-count-section-end */}

                    <section className="content">
                        <div className="row">
                            <div className="col-lg-12 pinpin">
                                <div className="card lobicard" data-sortable="true">
                                    <div className="card-header">
                                        <div className='title-download-section'>
                                            <div className="card-title custom_title">
                                                <h4 className='report-heading'>Leave List</h4>
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
                                            <Button className="btn btn-add rounded-2" onClick={() => setNewData(true)}>
                                                <i className="fa fa-plus" /> Add Leave [F2]
                                            </Button>
                                            <NewData
                                                show={newdata}
                                                onHide={() => setNewData(false)}
                                            />
                                        </div>
                                        <div className='searching-input'>
                                            <input type="text" className='form-control' placeholder='Search here' onChange={(event) => { setSearchInput(event.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <LeaveTable searchInput={searchInput} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Leave