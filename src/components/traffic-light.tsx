import { Card } from 'antd';

interface TrafficLightProps {
    id: string;
    location: string;
    status: 'red' | 'yellow' | 'green';
    timeRemaining: number;
}

const TrafficLight = ({ id, location, status, timeRemaining }: TrafficLightProps) => {
    return (
        <Card className="w-64 shadow-lg">
            <div className="text-center">
                <h3 className="text-lg font-bold mb-2">{location}</h3>
                <div className="flex justify-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-full ${status === 'red' ? 'bg-red-600' : 'bg-red-200'}`} />
                    <div className={`w-8 h-8 rounded-full ${status === 'yellow' ? 'bg-yellow-400' : 'bg-yellow-200'}`} />
                    <div className={`w-8 h-8 rounded-full ${status === 'green' ? 'bg-green-600' : 'bg-green-200'}`} />
                </div>
                <p className="text-xl font-bold">{timeRemaining}s</p>
            </div>
        </Card>
    );
};

export default TrafficLight;