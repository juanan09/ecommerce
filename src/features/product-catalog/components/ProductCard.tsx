import { useState } from 'react';
import type { Product } from '../../../shared/types';
import { formatPrice } from '../../../shared/utils';

export interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleAddToCart = async () => {
        if (status === 'loading' || status === 'success') return;

        setStatus('loading');

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 600));

        try {
            onAddToCart(product);
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const getProductButtonLabel = () => {
        switch (status) {
            case 'idle':
                return `Add ${product.name} to cart`;
            case 'loading':
                return 'Adding to cart';
            case 'success':
                return 'Added to cart';
            case 'error':
            default:
                return 'Failed to add to cart';
        }
    };

    return (
        <div data-testid="product-card" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold text-gray-900 ml-2">{formatPrice(product.price)}</span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <button
                    onClick={handleAddToCart}
                    disabled={status === 'loading' || status === 'success'}
                    aria-label={getProductButtonLabel()}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2
                        ${status === 'idle' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' : ''}
                        ${status === 'loading' ? 'bg-gray-400 text-white cursor-wait' : ''}
                        ${status === 'success' ? 'bg-green-600 text-white shadow-md' : ''}
                        ${status === 'error' ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' : ''}
                    `}
                >
                    {status === 'idle' && (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Add to Cart
                        </>
                    )}
                    {status === 'loading' && (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                        </>
                    )}
                    {status === 'success' && (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Added!
                        </>
                    )}
                    {status === 'error' && (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Failed
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
