import React from 'react'
import { Table } from 'antd'

const RecruitmentTable = () => {
    const columns = [
        {
          title: 'Department',
        },
        {
            title: 'Position',
        },
        {
            title:'Vacancy',
        },
        {
            title:'Applicants',
        },
        {
            title:'Start Date',
        },
        {
            title:'End Date',
        },
    ]
  return (
    <div>
        <Table columns={columns}/>
    </div>
  )
}

export default RecruitmentTable