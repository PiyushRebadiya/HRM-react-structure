import React from 'react'
import { Table } from 'antd';

const AnnouncementTable = () => {
    const columns = [
        // ... (other columns)
        {
            title: 'Date',
            dataIndex: 'Date',

        },
        {
            title: 'Subject',
            // dataIndex: 'Subject',
            // key: 'Subject',
            // fixed: 'right',
            // width: 120,
            align: ['center'],

        },
        {
            title: 'Announcement Type',
            // dataIndex: 'Department',
            // key: 'Department',
            // fixed: 'right',
            // width: 120,
            align: ['center'],

        },
        {
            title: 'Place',
            // dataIndex: 'Place',
            // key: 'Place',
            // fixed: 'right',
            // width: 120,
            align: ['center'],

        },
        {
            title: 'Description ',
            // dataIndex: 'Descripation',
            // key: 'Descripation',
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

export default AnnouncementTable