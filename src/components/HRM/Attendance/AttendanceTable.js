import React, { useState, useEffect } from 'react';
import { Table, Space,Tag } from 'antd';

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState({});


  // Function to toggle user presence/absence
  const toggleAttendance = (date, userId) => {
    setAttendance((prevAttendance) => {
      const newAttendance = { ...prevAttendance };
      if (!newAttendance[date]) {
        newAttendance[date] = {};
      }
      newAttendance[date][userId] = !newAttendance[date][userId];
      return newAttendance;
    });
  };

  // Sample user data
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id:4, name: 'User 4' },
    { id:5 , name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'User 7' },
    { id: 8, name: 'User 8' },
    // Add more users as needed
  ];

  // Sample dates for the current month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${currentMonth + 1}/${formattedDay}`;
  });

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'user',
      fixed: 'left',
      width:100,
      key: 'user',
    },
    ...dates.map((date) => ({
      title: date,
      dataIndex: date,
      width:80,
      align:'center',
      key: date,
      render: (text, record) => (
        <Space size="middle">
          <span
            style={{ cursor: 'pointer', color: attendance[date]?.[record.userId] ? <Tag color='green'><i class="fa fa-check" aria-hidden="true"></i></Tag> : <Tag color='red'><i class="fa fa-times" aria-hidden="true"></i></Tag> }}
            onClick={() => toggleAttendance(date, record.userId)}
          >
            {attendance[date]?.[record.userId] ? <Tag color='green'><i class="fa fa-check" aria-hidden="true"></i></Tag> : <Tag color='red'><i class="fa fa-times" aria-hidden="true"></i></Tag>}
          </span>
        </Space>
      ),
    })),
  ];

  const data = users.map((user) => ({
    key: user.id,
    user: user.name,
    userId: user.id,
    ...dates.reduce((acc, date) => {
      acc[date] = date; // Use any data you want for each cell
      return acc;
    }, {}),
  }));

  return <Table columns={columns} dataSource={data} pagination={false} scroll={{x:1300}}/>;
};

export default AttendanceTable;
