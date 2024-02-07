import React from 'react'
import { Timeline, Tag } from 'antd';
import { SmileOutlined, ClockCircleOutlined } from '@ant-design/icons';

const PunchLog = () => {
    return (
        <div>
            <Timeline
                items={[
                    {
                        children: (
                            <>
                                <div className='log-history-data'>
                                    <p className='log-date'>Punch In At</p>
                                    <p className='assignby-name'> <ClockCircleOutlined /><span> 10.05 AM</span></p>
                                </div>
                            </>
                        ),
                    },
                    {
                        color: 'gray',
                        children: (
                            <>
                                <div className='log-history-data'>
                                    <p className='log-date'>Punch Out At</p>
                                    <p className='assignby-name'> <ClockCircleOutlined /><span> 01.00 PM</span></p>
                                </div>
                            </>
                        ),
                    },
                    {
                        color: 'gray',
                        children: (
                            <>
                                <div className='log-history-data'>
                                    <p className='log-date'>Punch In At</p>
                                    <p className='assignby-name'> <ClockCircleOutlined /><span> 01.35 PM</span></p>
                                </div>
                            </>
                        ),
                    },
                    {
                        color: 'gray',
                        children: (
                            <>
                                <div className='log-history-data'>
                                    <p className='log-date'>Punch Out At</p>
                                    <p className='assignby-name'> <ClockCircleOutlined /><span> 3.55 PM</span></p>
                                </div>
                            </>
                        ),
                    },
                    {
                        color: 'gray',
                        children: (
                            <>
                                <div className='log-history-data'>
                                    <p className='log-date'>Punch In At</p>
                                    <p className='assignby-name'> <ClockCircleOutlined /><span> 4.15 PM</span></p>
                                </div>
                            </>
                        ),
                    },
                    {
                        color: 'red',
                        children: (
                            <>
                                <div className='log-history-data'>
                                    <p className='log-date'>Punch Out At</p>
                                    <p className='assignby-name'> <ClockCircleOutlined /><span> 6.50 PM</span></p>
                                </div>
                            </>
                        ),
                    },
                ]}
            />
        </div>
    )
}

export default PunchLog