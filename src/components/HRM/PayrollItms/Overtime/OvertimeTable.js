import React from 'react'
import { Table } from 'antd';

const OvertimeTable = () => {
  const columns = [
    // ... (other columns)
    {
      title: 'Employee Name',
      dataIndex: 'EmployeeName',

    },
    {
      title: 'Rate',
      dataIndex: 'Rate',
      key: 'status',
      fixed: 'right',
      width: 120,
      align: ['center'],

  },
   
  {
    title: 'Action',
    fixed: 'right',
    align: 'center',
    width: 120
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

export default OvertimeTable