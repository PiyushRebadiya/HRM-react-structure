import React from 'react'
import { Progress, Button, Card, Statistic } from 'antd';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SmileOutlined, ClockCircleOutlined } from '@ant-design/icons';



const PunchInOut = () => {

    const [punchIn, setPunchIn] = useState(false);
    return (
        <div>
            <div className='card-entry-main-section'>
                <Row>
                    <Col>
                        {/* <div className='card-break-section'>
                            <div className='card-break-text-section'>
                            <p>punchIn Time</p>
                            </div>
                        </div> */}
                        <Card bordered={false} size='small'>
                            <Statistic
                                title="Punch In Time"
                                size="small"
                                value={10.05}
                                precision={2}
                                valueStyle={{
                                    color: 'red',
                                }}
                                prefix={<ClockCircleOutlined />}
                                suffix="AM"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className='d-flex justify-content-center'>
                <Progress type="circle" percent={8} format={(percent) => `${percent} Hours`} size={200} />

            </div>
            <div className='d-flex justify-content-center p-4'>
                {
                    punchIn == true ? (<Button onClick={() => { setPunchIn(false) }}>Punch Out</Button>) : (<Button onClick={() => { setPunchIn(true) }}>Punch In</Button>)
                }

            </div>
            <div className='card-entry-main-section'>
                <Row>
                    <Col lg={6}>
                        {/* <div className='card-break-section'>
                            <div className='card-break-text-section'>
                                <p>Break</p>
                                <p>15 min</p>
                            </div>
                        </div> */}
                          <Card bordered={false} size='small'>
                            <Statistic
                                title="Break"
                                size="small"
                                value={15.00}
                                precision={2}
                                valueStyle={{
                                    color: 'orange',
                                }}
                                prefix={<ClockCircleOutlined />}
                                suffix="Min"
                            />
                        </Card>
                    </Col>
                    <Col lg={6}>
                        {/* <div className='card-break-section'>
                            <div className='card-break-text-section'>
                                <p>Overtime</p>
                                <p>5 min</p>
                            </div>
                        </div> */}
                          <Card bordered={false} size='small'>
                            <Statistic
                                title="OverTime"
                                size="small"
                                value={10}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                prefix={<ClockCircleOutlined />}
                                suffix="Min"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default PunchInOut