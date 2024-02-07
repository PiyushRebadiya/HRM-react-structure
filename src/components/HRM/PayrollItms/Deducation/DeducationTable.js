import React from 'react'
import { Table } from 'antd';

const DeducationTable = () => {
  const columns = [
    // ... (other columns)
    {
      title: 'Employee Name',
      // dataIndex: 'EmployeeName',

    },
    {
      title: 'TDS',
      // dataIndex: 'TDS',

    },
    {
      title: 'PF',
      // dataIndex: 'PF',

    },
    {
      title: 'PT',
      // dataIndex: 'PT',

    },
    {
      title: 'Action',
      // dataIndex: 'PT',

    },
  ]
  return (
    <>
      <div className="table-responsive">
        <Table columns={columns} size='small'>
        </Table>
      </div>
    </>
  )
}

export default DeducationTable