import React from 'react'
import { Table } from 'antd'
import { useState,useEffect } from 'react'
import axios from 'axios'

const EmployeeAL = () => {
    const [data, setData ] = useState([])
    const token = localStorage.getItem('CRMtoken')
    const URL = process.env.REACT_APP_API_URL
    const CustId = localStorage.getItem('CRMCustId')
    const CompanyId = localStorage.getItem('CRMCompanyId')

    const fetchData = async () => {
        try {
          const res = await axios.get(URL + `/api/Master/GetEmpList?CustId=${CustId}&CompanyId=${CompanyId}`, {
            headers: { Authorization: `bearer ${token}` },
          });
          setData(res.data);
          console.log(res.data,'dataatata');
        } catch (error) {
          // Handle error
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
const columns = [
    {
        title:'Employee Name',
        render:(text,record)=>{
            return(
                <p>{record.FirstName} {record.LastName}</p>
            )
        },
    },
    {
        title:'Punch In',
    },
    {
        title:'Punch Out',
    },
    {
        title:'Break Time',
    },
]
  return (
    <div>
        <Table columns={columns} dataSource={data} size='small'/>
    </div>
  )
}

export default EmployeeAL