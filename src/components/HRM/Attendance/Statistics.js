import React from 'react'
import { Progress,Card, Col, Row, Statistic } from 'antd';

const Statistics = () => {
  return (
    <div className='statistic-main'>
        <Card bordered={false} size='small' className='m-2' >
            <p>Today</p>
         <Progress  percent={30} status="active" size='small' format={() => <div style={{  fontSize: '12px' }}>3/8 hr</div>}/>
        </Card>
         <Card bordered={false} size='small' className='m-2'>
            <p>This Week</p>
    <Progress percent={50} size='small' className='w-100' status="active" format={() =><div style={{  fontSize: '12px' }}>28/40 hr</div>}/>
            </Card>
            <Card bordered={false} size='small' className='m-2'>
                <p>This month</p>
    <Progress percent={70} status="exception" format={() =><div style={{  fontSize: '12px' }}>90/160 hr</div>}/>
            </Card>
            <Card bordered={false} size='small' className='m-2'>
                <p>OverTime</p>
    <Progress percent={100} size='small' format={() => <div style={{  fontSize: '12px' }}>5</div>} />
            </Card>
    </div>
  )
}

export default Statistics