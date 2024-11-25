import { Layout } from 'antd';

const Footer = () => {
    return (
        <Layout.Footer className="bg-gray-800 text-white text-center py-6">
            <div className="space-y-2">
                <p className="text-lg font-semibold">Hệ Thống Quản Lý Đèn Giao Thông Thông Minh © 2024</p>
                {/* <p className="text-sm">Trường Đại học ABC - Khoa Công nghệ Thông tin</p>
                <div className="text-sm text-gray-400">
                    <p>Địa chỉ: 123 Đường XYZ, Quận ABC, TP.HCM</p>
                    <p>Liên hệ: (028) 1234 5678 | Email: support@trafficmanagement.edu.vn</p>
                </div> */}
            </div>
        </Layout.Footer>
    );
};

export default Footer;
