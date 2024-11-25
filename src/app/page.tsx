import Iot from "@/views/iot";

// for data static
// export const metadata: Metadata = {
//     title: 'Laptop Application',
//     description: 'Laptop Application manage laptop in shop',
// }


//  for data dynamic
export async function generateMetadata() {
    return {
        title: `Laptop website`,
        description:
            'This is sell laptop',
        openGraph: {
            title: `Laptop website`,
            description:
                'This is sell laptop',
            url: `https://staging.rocketlaunch.fun`,
            type: 'website',
            images: [
                {
                    url: 'https://testnet.rocketlaunch.fun/rocket_launch.jpg',
                    width: 800,
                    height: 600,
                    alt: 'Rocket Launch Image'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `Laptop website`,
            description:
                'This is sell laptop',
            images: 'https://testnet.rocketlaunch.fun/rocket_launch.jpg'
        }
    };
}




export default Iot;




export const runtime = 'edge';