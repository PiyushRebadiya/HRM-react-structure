import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import "../../../asset/css/Style.css"
import Swal from 'sweetalert2';
import { Tag } from 'antd';
import { Table, Tooltip } from 'antd';
import EventForm from './EventForm';

function EditData(props) {
    const { selectedrow, fetchData, getEventData } = props
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <EventForm rowData={selectedrow} onHide={props.onHide} fetchData={fetchData} getEventData={getEventData} />
        </Modal>
    );
}

const EventTable = ({ searchinput, insertData, onData, getEventData }) => {
    React.useEffect(() => {
        insertData.current = fetchData
    }, [])
    const [data, setData] = useState([])
    const [selectedrow, setSelectedRow] = useState([])
    const [editshow, setEditShow] = React.useState(false);
    const [logShow, setLogShow] = React.useState(false);
    const [logtno, setLogTNo] = useState('')
    const role = localStorage.getItem('CRMRole')
    const token = localStorage.getItem("CRMtoken")
    const companyId = localStorage.getItem("CRMCompanyId")
    const URL = process.env.REACT_APP_API_URL
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomCenter']
        },
    });

    const fetchData = async () => {
        // try {
        //     const res = await axios.get(URL + `/api/Master/ProcessList?CompanyId=${companyId}`, {
        //         headers: { Authorization: `bearer ${token}` }
        //     })
        //     setData(res.data)
        //     onData(res.data)
        // } catch (error) {
        //     console.log(error)
        // }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const filteredData = data.filter((item) => {
        // const searchTermLowerCase = searchinput.toLowerCase();
        // return (
        //     (item.SubCategoryName && item.SubCategoryName.toLowerCase().includes(searchTermLowerCase)) ||
        //     (item.ProcessName && item.ProcessName.toLowerCase().includes(searchTermLowerCase))
        // );
    });
    const updateData = async (rowData) => {
        // const id = rowData.Id
        // try {
        //     const res = await axios.get(URL + `/api/Master/ProcessById?Id=${id}`, {
        //         headers: { Authorization: `bearer ${token}` }
        //     })
        //     setSelectedRow(res.data)
        //     setEditShow(true)
        // } catch (error) {
        //     console.log(error)
        // }
    }
    const showAlert = (rowData) => {
        const id = rowData.Id
        const timerDuration = 2000; 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            timerProgressBar: true,
            onClose: () => {
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    timer: timerDuration,
                    timerProgressBar: true,
                    showConfirmButton: true,
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Your file is safe.',
                    icon: 'error',
                    timer: timerDuration,
                    timerProgressBar: true,
                    showConfirmButton: true,
                });
            }
        });
    };

    const deleteData = async (id) => {
        // try {
        //     const res = await axios.get(URL + `/api/Master/DeletProcess?Id=${id}`, {
        //         headers: { Authorization: `bearer ${token}` },
        //     })
        //     fetchData()
        //     getProcessData()
        // } catch (error) {
        //     console.log(error)
        // }
    }
    // const sortData = (column) => {
    //     let sortedData = [...filteredData];
    //     if (column === sortColumn) {
    //         // If clicking the same column, toggle the sorting order
    //         sortedData.reverse();
    //         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    //     } else {
    //         // If clicking a different column, sort in ascending order by default
    //         sortedData.sort((a, b) => {
    //             return a[column].localeCompare(b[column]);
    //         });
    //         setSortOrder('asc');
    //         setSortColumn(column);
    //     }
    //     setData(sortedData);
    // };

    const actionTemplate = (rowData) => {
        return (
            <div className="action-btn">
                <Tooltip title='Edit'>
                    <button type="button" className="btn btn-add action_btn btn-sm rounded-2" onClick={() => { updateData(rowData) }}><i className="fa fa-pencil fs-4" /></button>
                </Tooltip>
                <Tooltip title='Delete'>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => { showAlert(rowData) }}><i className="fa fa-trash-o fs-4" /> </button>
                </Tooltip>
            </div>
        );
    };

    const getStatusColor = (isActive) => {
        return isActive ? 'green' : 'red';
    };

    const statusTemplate = (rowData) => {
        // console.log(rowData, "Ankit");
        const statusColor = getStatusColor(rowData);
        // console.log(statusColor, "statusColor")

        return <Tag color={statusColor}>{rowData ? 'Active' : 'Inactive'}</Tag>;
    };

    const columns = [
        // ... (other columns)
        {
            title: 'Event Name',
            // dataIndex: 'SubCategoryName',
        },
        {
            title: 'Start date',
            // dataIndex: 'ProcessName',
        },
        {
            title: 'End date',
            // dataIndex: 'ProcessName',
        },
        {
            title: 'Place',
            // dataIndex: 'ProcessName',
        },
        {
            title: 'Remark',
            // dataIndex: 'ProcessName',
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            render: actionTemplate,
            width: 150
        }

    ];
    const totalRecords = filteredData.length; // Assuming filteredData is the data array

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    }
    const TotalRecordFooter = () => (
        <div>
            <h5><b>Total Records: </b>{totalRecords}</h5>
        </div>
    );
    return (
        <div>
            <div className="table-responsive ">
                <Table columns={columns} size='small' bordered dataSource={filteredData} pagination={tableParams.pagination}
                    onChange={handleTableChange} footer={TotalRecordFooter} />
            </div>
            {
                selectedrow ?
                    <EditData
                        show={editshow}
                        onHide={() => setEditShow(false)}
                        selectedrow={selectedrow}
                        fetchData={fetchData}
                        getEventData={getEventData}
                    /> : null
            }
            {/* <TaskLogHistory
                show={logShow}
                onHide={() => setLogShow(false)}
                logtno={logtno}
            /> */}
        </div>
    )
}

export default EventTable