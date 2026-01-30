import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 129.99,
        image: 'https://picsum.photos/seed/headphones/200',
        description: 'High-fidelity wireless headphones with active noise cancellation for immersive listening.'
    },
    {
        id: '2',
        name: 'Smartwatch Series 5',
        price: 199.99,
        image: 'https://picsum.photos/seed/smartwatch/200',
        description: 'Advanced fitness smartwatch with heart rate monitoring, GPS, and sleep tracking.'
    },
    {
        id: '3',
        name: 'Ergonomic Laptop Stand',
        price: 45.99,
        image: 'https://picsum.photos/seed/laptopstand/200',
        description: 'Adjustable aluminum laptop stand designed to improve posture and cooling.'
    },
    {
        id: '4',
        name: 'Mechanical Gaming Keyboard',
        price: 89.99,
        image: 'https://picsum.photos/seed/keyboard/200',
        description: 'Compact mechanical keyboard with RGB backlighting and responsive blue switches.'
    },
    {
        id: '5',
        name: '7-in-1 USB-C Hub',
        price: 39.99,
        image: 'https://picsum.photos/seed/usbhub/200',
        description: 'Versatile USB-C adapter with HDMI, SD card reader, and high-speed USB ports.'
    },
    {
        id: '6',
        name: '1080p Streaming Webcam',
        price: 59.99,
        image: 'https://picsum.photos/seed/webcam/200',
        description: 'Full HD webcam with built-in noise-reducing microphone for clear video calls.'
    }
];
