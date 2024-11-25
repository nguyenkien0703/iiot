'use client'

import { Layout } from 'antd';
import TrafficLight from '@/components/traffic-light';


const { Content } = Layout;

// Định nghĩa type cho status
type TrafficLightStatus = 'red' | 'yellow' | 'green';

const mockData: {
    id: string;
    location: string;
    status: TrafficLightStatus;
    timeRemaining: number;
}[] = [
    {
        id: '1',
        location: 'Ngã tư Lê Văn Lương',
        status: 'red',
        timeRemaining: 30
    },
    {
        id: '2',
        location: 'Ngã tư Nguyễn Trãi',
        status: 'green',
        timeRemaining: 45
    },
    // Thêm nhiều đèn giao thông khác...
];

export default function Home() {
    return (
        <Layout className="">
            <Content className="mt-16 p-8">
                <h1 className="text-2xl font-bold mb-8">Bảng Điều Khiển Đèn Giao Thông</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockData.map((light) => (
                        <TrafficLight key={light.id} {...light} />
                    ))}
                </div>
            </Content>
        </Layout>
    );
}