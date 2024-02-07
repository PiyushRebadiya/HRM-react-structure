import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { Table, Tag, Space, Dropdown, Menu, Tooltip } from 'antd';
import LeaveForm from './LeaveForm';
import { fetchLeaveList } from '../../../redux/actions/leave-list-api'
import { useDispatch, useSelector } from 'react-redux';
import axiosPrivateHttp from '../../../server/axios/axiosPrivateHttp'
const timerDuration = 2000;
function EditData(props) {
    const { selectedRow, fetchData, getCategoryData } = props
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <LeaveForm onHide={props.onHide} selectedRow={selectedRow} />
        </Modal>
    );
}
const LeaveTable = ({ searchInput }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isEditHoliday, setIsEditHoliday] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomCenter']
        },
    });
    const dispatch = useDispatch()
    const leaveList = useSelector((state) => state.leaveList.data)
    const companyId = useSelector((state) => state?.user?.data?.CompanyId);


    const searchData = leaveList?.filter((item) => {
        const searchTermLowerCase = searchInput.toLowerCase();
        return (
            (item.LeaveTypeFName && item.LeaveTypeFName.toLowerCase().includes(searchTermLowerCase)) ||
            (item.CarryForward && item.CarryForward.toString().toLowerCase().includes(searchTermLowerCase)) ||
            (item.YearlyLimit && item.YearlyLimit.toString().toLowerCase().includes(searchTermLowerCase)) ||
            (item.Monthly && item.Monthly.toString().toLowerCase().includes(searchTermLowerCase)) ||
            (item.Quarterly && item.Quarterly.toString().toLowerCase().includes(searchTermLowerCase)) ||
            (item.Description && item.Description.toLowerCase().includes(searchTermLowerCase)) ||
            (item.ConsiderWeeklyOff && item.ConsiderWeeklyOff.toString().toLowerCase().includes(searchTermLowerCase)) ||
            (item.ConsiderHoliday && item.ConsiderHoliday.toString().toLowerCase().includes(searchTermLowerCase))
        );
    });
    const toggleEditModal = () => {
        setIsEditHoliday(!isEditHoliday);
    }
    useEffect(() => {
        dispatch(fetchLeaveList(companyId))
    }, [])
    const updateData = async (rowData) => {
        fetchUpdateLeavelistById(rowData.LeaveTypeId, rowData.Cguid)
    }
    const fetchUpdateLeavelistById = async (id, Cguid) => {
        try {
            const response = await axiosPrivateHttp.get(`/api/HRM/LeaveTypeById?LeaveTypeId=${id}&Cguid=${Cguid}`)
            if (response.data) {
                toggleEditModal();
                setSelectedRow(response.data);
            }
            return false
        } catch (error) {

        }

    }
    const showAlert = (rowData) => {
        const id = rowData.LeaveTypeId
        // 4000 milliseconds = 4 seconds
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            // timer: timerDuration,
            timerProgressBar: true,
            onClose: () => {
                // Optional: Perform any action when the timer expires
                // console.log('Timer expired');
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteLeaveHandler(id)
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

    const deleteLeaveHandler = async (id) => {
        try {
            const response = await axiosPrivateHttp.get(`/api/HRM/DeleteType?LeaveTypeId=${id}`)
            if (response.data.Success) {
                dispatch(fetchLeaveList(companyId))
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    timer: timerDuration,
                    timerProgressBar: true,
                    showConfirmButton: true,
                });
            }
        } catch (error) {
        }
    }

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
    const getStatusColor = (rowData) => {
        return rowData ? 'green' : 'red';
    };

    const statusTemplate = (rowData) => {
        const statusColor = getStatusColor(rowData);
        // console.log(statusColor, "statusColor")

        return <Tag color={statusColor}>{rowData ? 'Yes' : 'No'}</Tag>;
    };
    const columns = [
        // ... (other columns)
        {
            title: 'Leave Type',
            dataIndex: 'LeaveTypeFName',
        },
        {
            title: 'Carry Forward',
            dataIndex: 'CarryForward',

        },
        {
            title: 'Yearly Limit',
            dataIndex: 'YearlyLimit',
        },
        {
            title: 'Monthly Limit',
            dataIndex: 'Monthly',
        },
        {
            title: 'Quarterly Limit',
            dataIndex: 'Quarterly',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
        },
        {
            title: 'Consider Weekly',
            dataIndex: 'ConsiderWeeklyOff',
            render: statusTemplate,
            width: 150
        },
        {
            title: 'Consider Holiday',
            dataIndex: 'ConsiderHoliday',
            render: statusTemplate,
            width: 150
        },
        {
            title: 'Action',
            fixed: 'right',
            align: 'center',
            render: actionTemplate,
            width: 200
        }
    ];
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    }
    // const totalRecords = filteredData.length;

    const TotalRecordFooter = () => (
        <div>
            {/* <h5><b>Total Records: </b>{totalRecords}</h5> */}
        </div>
    );

    return (
        <div>
            <Table columns={columns} size='small' bordered dataSource={searchData} pagination={tableParams.pagination}
                onChange={handleTableChange} footer={TotalRecordFooter} />
            {/* 
            {
                selectedRow ?
                    <EditData
                        show={editshow}
                        onHide={() => setEditShow(false)}
                        selectedRow={selectedRow}
                    /> : null
            } */}
            {
                isEditHoliday ?
                    <EditData
                        show={isEditHoliday}
                        onHide={toggleEditModal}
                        selectedRow={selectedRow}
                    /> : null
            }
        </div>
    )
}

export default LeaveTable