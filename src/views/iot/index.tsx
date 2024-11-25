'use client'

import { Layout, Card, Image, Badge, Statistic, Row, Col } from 'antd';
import { CameraOutlined, BarChartOutlined } from '@ant-design/icons';
import TrafficLight from '@/components/traffic-light';


const { Content } = Layout;

// Định nghĩa type cho status
type TrafficLightStatus = 'red' | 'yellow' | 'green';

interface TrafficLightData {
    id: string;
    location: string;
    status: TrafficLightStatus;
    timeRemaining: number;
    imageUrl: string;
    prediction: {
        confidence: number;
        nextStatus: TrafficLightStatus;
    };
}

const mockData: TrafficLightData[] = [
    {
        id: '1',
        location: 'Ngã tư Lê Văn Lương',
        status: 'red',
        timeRemaining: 30,
        imageUrl: '/sample-traffic-1.jpg',
        prediction: {
            confidence: 95.5,
            nextStatus: 'green'
        }
    },
    {
        id: '2',
        location: 'Ngã tư Nguyễn Trãi',
        status: 'green',
        timeRemaining: 45,
        imageUrl: '/sample-traffic-2.jpg',
        prediction: {
            confidence: 85.2,
            nextStatus: 'yellow'
        }
    },
];

export default function Home() {
    return (
        <Layout>
            <Content className="mt-16 p-8 bg-gray-100">
                <Row className="mb-8" align="middle" justify="space-between">
                    <Col>
                        <h1 className="text-3xl font-bold">Bảng Điều Khiển Đèn Giao Thông</h1>
                    </Col>
                    <Col>
                        <Badge count={mockData.length} showZero>
                            <span className="text-lg">Tổng số điểm giám sát</span>
                        </Badge>
                    </Col>
                </Row>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockData.map((light) => (
                        <Card
                            key={light.id}
                            className="shadow-lg hover:shadow-xl transition-shadow"
                            title={
                                <div className="flex items-center justify-between">
                                    <span className="font-bold">{light.location}</span>
                                    <Badge 
                                        status={light.status === 'red' ? 'error' : light.status === 'yellow' ? 'warning' : 'success'}
                                        text={light.status.toUpperCase()}
                                    />
                                </div>
                            }
                        >
                            <div className="space-y-4">
                                <div className="relative">
                                    <Image
                                        src={light.imageUrl}
                                        alt={`Traffic at ${light.location}`}
                                        className="rounded-lg"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Badge count={<CameraOutlined style={{ color: '#fff' }} />} />
                                    </div>
                                </div>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic
                                            title="Thời gian còn lại"
                                            value={light.timeRemaining}
                                            suffix="giây"
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic
                                            title="Độ chính xác"
                                            value={light.prediction.confidence}
                                            suffix="%"
                                            prefix={<BarChartOutlined />}
                                        />
                                    </Col>
                                </Row>

                                <TrafficLight {...light} />
                            </div>
                        </Card>
                    ))}
                </div>
            </Content>
        </Layout>
    );
}