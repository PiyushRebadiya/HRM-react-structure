import React from 'react'
import { Tooltip, Table } from 'antd';

const PayrollTable = () => {
  const columns = [
    // ... (other columns)
    {
      title: 'Employee Name',
      dataIndex: 'EmployeeName',

    },
    {
      title: 'Email',
      dataIndex: 'Email',

    },
    
    {
      title: 'Role',
      dataIndex: 'Role',
      // render: statusTemplate,
      // width:150
    },
    {
      title: 'Salary Date',
      dataIndex: 'Salary Date',
      // render: statusTemplate,
      // width:150
    },
    {
      title: 'Status',
      // render: actionTemplate,
      // width: 200
    },
    {
      title: 'Action',
      // render: actionTemplate,
      // width: 200
    }
    // ... (other columns)
  ];
  return (
    <>
      <div className="table-responsive">
        <Table columns={columns} size='small'>
        </Table>
      </div>
    </>
  )
}

export default PayrollTable