'use client'

import { Layout, Card, Image, Badge, Statistic, Row, Col } from 'antd';
import { CameraOutlined, BarChartOutlined } from '@ant-design/icons';
import TrafficLight from '@/components/traffic-light';
import { useEffect, useState } from 'react';
import serviceIot from '@/services/iot';


const { Content } = Layout;

type TrafficLightStatus = 'red' | 'yellow' | 'green';

interface TrafficLightData {
    timestamp: string;
    image_urls: {
        lane1: string;
        lane2: string;
    };
    predicted_timing: {
        green1: number;
        green2: number;
        yellow1: number;
        yellow2: number;
    };
    weather_conditions: {
        temperature: number;
        humidity: number;
    };
    traffic_analysis: {
        lane1_counts: {
            motorbike: number;
        };
        lane2_counts: {
            motorbike: number;
        };
        total_vehicles: {
            car: number;
            motorbike: number;
            bus: number;
            truck: number;
        };
    };
}

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const TrafficLightDot = ({ color }: { color: 'red' | 'yellow' | 'green' }) => (
    <div 
        className={`w-4 h-4 rounded-full inline-block mr-2`}
        style={{ 
            backgroundColor: color === 'red' ? '#ff4d4f' : 
                           color === 'yellow' ? '#faad14' : 
                           '#52c41a'
        }}
    />
);

export default function Home() {

    const [data, setData] = useState<TrafficLightData[]>([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    
    useEffect(()=> {
        console.log('fetching data')
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                console.log('API URL:', process.env.NEXT_PUBLIC_API_ENDPOINT)
                const response = await serviceIot.getLatestAnalysis()
                console.log('API Response:', response)
                const dataArray = Array.isArray(response) ? response : [response]
                setData(dataArray)
            } catch (error) {
                console.error('Detailed error:', {
                    //@ts-ignore
                    message: error.message,
                    //@ts-ignore
                    response: error.response?.data,
                    //@ts-ignore
                    status: error.response?.status,
                    //@ts-ignore
                    config: error.config
                })
                //@ts-ignore
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // Thêm interval để fetch data định kỳ
        const interval = setInterval(fetchData, 5000) // fetch every 30 seconds
        return () => clearInterval(interval)
    }, [])
    // console.log('daata lijne 79----', data)

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <Layout>
            <Content className="mt-16 p-8 bg-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <Row className="mb-8" align="middle" justify="space-between">
                        <Col>
                            <h1 className="text-3xl font-bold">Bảng Điều Khiển Đèn Giao Thông</h1>
                        </Col>
                        <Col>
                            {/* <Badge count={data.length} showZero> */}
                                {/* <span className="text-lg">Tổng số điểm giám sát</span> */}
                            {/* </Badge> */}
                        </Col>
                    </Row>
                    
                    <div className="grid grid-cols-1 gap-6">
                        {data.map((item, index) => (
                            <Card
                                key={index}
                                className="shadow-lg hover:shadow-xl transition-shadow"
                                title={
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold">Điểm giám sát {index + 1}</span>
                                        <Badge status="processing" text="ĐANG HOẠT ĐỘNG" />
                                    </div>
                                }
                            >
                                <Row gutter={32}>
                                    {/* Lane 1 */}
                                    <Col span={12}>
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <Image
                                                    src={`${BASE_IMAGE_URL}/${item.image_urls.lane1.split('/').pop()}`}
                                                    alt="Lane 1"
                                                    className="rounded-lg"
                                                    width={500}
                                                    height={300}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <Badge count={<CameraOutlined style={{ color: '#fff' }} />} />
                                                </div>
                                            </div>
                                            
                                            <Row gutter={16}>
                                                <Col span={8}>
                                                    <Statistic
                                                        title={
                                                            <div className="flex items-center">
                                                                <TrafficLightDot color="red" />
                                                                <span>Đèn đỏ</span>
                                                            </div>
                                                        }
                                                        value={item.predicted_timing.green2 + item.predicted_timing.yellow2}
                                                        suffix="giây"
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <Statistic
                                                        title={
                                                            <div className="flex items-center">
                                                                <TrafficLightDot color="green" />
                                                                <span>Đèn xanh</span>
                                                            </div>
                                                        }
                                                        value={item.predicted_timing.green1}
                                                        suffix="giây"
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <Statistic
                                                        title={
                                                            <div className="flex items-center">
                                                                <TrafficLightDot color="yellow" />
                                                                <span>Đèn vàng</span>
                                                            </div>
                                                        }
                                                        value={item.predicted_timing.yellow1}
                                                        suffix="giây"
                                                    />
                                                </Col>
                                            </Row>

                                            <Card size="small" title="Thống kê làn 1">
                                                <Statistic 
                                                    title="Xe máy" 
                                                    value={item.traffic_analysis.lane1_counts.motorbike} 
                                                />
                                            </Card>
                                        </div>
                                    </Col>

                                    {/* Lane 2 */}
                                    <Col span={12}>
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <Image
                                                    src={`${BASE_IMAGE_URL}/${item.image_urls.lane2.split('/').pop()}`}
                                                    alt="Lane 2"
                                                    className="rounded-lg"
                                                    width={500}
                                                    height={300}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <Badge count={<CameraOutlined style={{ color: '#fff' }} />} />
                                                </div>
                                            </div>

                                            <Row gutter={16}>
                                                <Col span={8}>
                                                    <Statistic
                                                        title={
                                                            <div className="flex items-center">
                                                                <TrafficLightDot color="red" />
                                                                <span>Đèn đỏ</span>
                                                            </div>
                                                        }
                                                        value={item.predicted_timing.green1 + item.predicted_timing.yellow1}
                                                        suffix="giây"
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <Statistic
                                                        title={
                                                            <div className="flex items-center">
                                                                <TrafficLightDot color="green" />
                                                                <span>Đèn xanh</span>
                                                            </div>
                                                        }
                                                        value={item.predicted_timing.green2}
                                                        suffix="giây"
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <Statistic
                                                        title={
                                                            <div className="flex items-center">
                                                                <TrafficLightDot color="yellow" />
                                                                <span>Đèn vàng</span>
                                                            </div>
                                                        }
                                                        value={item.predicted_timing.yellow2}
                                                        suffix="giây"
                                                    />
                                                </Col>
                                            </Row>

                                            <Card size="small" title="Thống kê làn 2">
                                                <Statistic 
                                                    title="Xe máy" 
                                                    value={item.traffic_analysis.lane2_counts.motorbike} 
                                                />
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Weather conditions */}
                                <div className="mt-8 space-y-6">
                                    <Card className="bg-gray-50">
                                        <Row gutter={32}>
                                            <Col span={12}>
                                                <Statistic
                                                    title="Nhiệt độ"
                                                    value={item.weather_conditions.temperature}
                                                    suffix="°C"
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic
                                                    title="Độ ẩm"
                                                    value={item.weather_conditions.humidity}
                                                    suffix="%"
                                                />
                                            </Col>
                                        </Row>
                                    </Card>

                                    <Card className="bg-gray-50" title="Thống kê tổng phương tiện">
                                        <Row gutter={[32, 16]}>
                                            <Col span={6}>
                                                <Statistic title="Ô tô" value={item.traffic_analysis.total_vehicles.car} />
                                            </Col>
                                            <Col span={6}>
                                                <Statistic title="Xe máy" value={item.traffic_analysis.total_vehicles.motorbike} />
                                            </Col>
                                            <Col span={6}>
                                                <Statistic title="Xe buýt" value={item.traffic_analysis.total_vehicles.bus} />
                                            </Col>
                                            <Col span={6}>
                                                <Statistic title="Xe tải" value={item.traffic_analysis.total_vehicles.truck} />
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Content>
        </Layout>
    );
}