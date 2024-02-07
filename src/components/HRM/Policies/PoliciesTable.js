import React from 'react'
import { Table } from 'antd';

const PoliciesTable = () => {
    const columns = [
        // ... (other columns)
        {
            title: 'Policy Name',
            dataIndex: 'Policy Name',

        },
        {
            title: 'Department',
            // dataIndex: 'Subject',
            // key: 'Subject',
            // fixed: 'right',
            // width: 120,
            align: ['center'],

        },
        {
            title: 'Description',
            // dataIndex: 'Place',
            // key: 'Place',
            // fixed: 'right',
            // width: 120,
            align: ['center'],

        },
        {
            title: 'Date ',
            // dataIndex: 'Department',
            // key: 'Department',
            // fixed: 'right',
            // width: 120,
            align: ['center'],

        },
    
        {
            title: 'Action',
            // fixed: 'right',
            align: 'center',
            // width: 120
        }
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

export default PoliciesTable