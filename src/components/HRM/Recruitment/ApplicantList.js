import React from 'react'
import { Table } from 'antd'

const ApplicantList = () => {
    const columns = [
        {
          title: 'Candidate Name',
        },
        {
            title: 'Department',
        },
        {
            title:'Position',
        },
        {
            title:'Experiance',
        },
        {
            title:'Expected Salary',
        },
        {
            title:'Interview Date',
        },
    ]
  return (
    <div>
        <Table columns={columns}/>
    </div>
  )
}

export default ApplicantList