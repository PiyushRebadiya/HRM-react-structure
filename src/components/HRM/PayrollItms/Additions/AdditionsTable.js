import React from 'react'
import {  Table } from 'antd';

const AdditionsTable = () => {
  const columns = [
    // ... (other columns)
    {
      title: 'Incentive',
      dataIndex: 'Incentive',

    },
   
    {
      title: 'Salary Amount',
      dataIndex: 'Salary Amount',
      // render: statusTemplate,
      // width:150
    },
    {
      title: 'HRA',
      // render: actionTemplate,
      // width: 200
    },
    {
      title: 'OT',
      // render: actionTemplate,
      // width: 200
    },
    {
      title: 'DA',
      // render: actionTemplate,
      // width: 200
    },
    {
      title: 'Medical Allowance ',
      // render: actionTemplate,
      // width: 200
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

export default AdditionsTable