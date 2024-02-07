import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { Table, Tag, Space, Dropdown, Menu, Tooltip } from 'antd';
import { Offcanvas } from 'react-bootstrap';
import { FaRegEye } from "react-icons/fa";
import HolidayForm from './HolidayForm';
import axiosPrivateHttp from '../../../server/axios/axiosPrivateHttp';
import moment from 'moment';
import { fetchHolidayList } from '../../../redux/actions/holidays-list-api';
import { useDispatch, useSelector } from 'react-redux';

const timerDuration = 2000;

function EditData(props) {
  const { selectedRow, fetchData, getCategoryData } = props
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >

      <HolidayForm onHide={props.onHide} selectedRow={selectedRow} />
    </Modal>
  );
}
const HolidayTable = ({ searchInput }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      position: ['bottomCenter']
    },
  });
  const [isEditHoliday, setIsEditHoliday] = useState(false);

  const dispatch = useDispatch()
  const holidayList = useSelector((state) => state.holidayList.data);
  const companyId = useSelector((state) => state?.user?.data?.CompanyId);



  const searchData = holidayList?.filter((item) => {
    const searchTermLowerCase = searchInput.toLowerCase();
    const lowerCaseHoliDate = moment(item.HolidayDate).format('DD/MM/YYYY').toLowerCase();
    return (
      (item.HolidayName && item.HolidayName.toLowerCase().includes(searchTermLowerCase)) ||
      (lowerCaseHoliDate && lowerCaseHoliDate.includes(searchTermLowerCase)) ||
      (item.IsActive && item.IsActive.toString().toLowerCase().includes(searchTermLowerCase))
    );
  });
  const toggleEditModal = () => {
    setIsEditHoliday(!isEditHoliday);
  }

  useEffect(() => {
    dispatch(fetchHolidayList(companyId))
  }, [companyId]);

  const fetchUpdateHolidayListById = async (id) => {
    try {
      const response = await axiosPrivateHttp.get(`/api/HRM/GetHolidayListById?HolidayId=${id}`);
      if (response.data) {
        toggleEditModal();
        setSelectedRow(response.data);
      }
      return false
    }
    catch (error) {
    }
  }

  const updateData = async (rowData) => {
    fetchUpdateHolidayListById(rowData.HolidayId);
  }

  const showAlert = (rowData) => {
    const id = rowData.HolidayId
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHolidayHandler(id)
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

  const deleteHolidayHandler = async (id) => {
    try {
      const response = await axiosPrivateHttp.get(`/api/HRM/DeleteHoliday?HolidayId=${id}`);
      if (response.data.Success) {
        dispatch(fetchHolidayList(companyId));
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
      console.log(error)
    }
  }

  const actionTemplate = (rowData) => {
    return (
      <div className="action-btn">
        <Tooltip title='Edit'>
          <button type="button" className="btn btn-add action_btn btn-sm rounded-2" onClick={() => updateData(rowData)}><i className="fa fa-pencil fs-4" /></button>
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
    const statusColor = getStatusColor(rowData);

    return <Tag color={statusColor}>{rowData ? 'Active' : 'Inactive'}</Tag>;
  };
  const columns = [
    // ... (other columns)
    {
      title: 'Title',
      dataIndex: 'HolidayName',

    },
    {
      title: 'Date',
      dataIndex: 'HolidayDate',
      render: (value) => <p className='m-0'>{moment(value).format('DD/MM/YYYY')}</p>
    },
    {
      title: 'Status',
      dataIndex: 'IsActive',
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

export default HolidayTable