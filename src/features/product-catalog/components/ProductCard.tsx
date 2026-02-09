import { useState } from 'react';
import type { Product } from '../../../shared/types';
import { formatPrice } from '../../../shared/utils';

export interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        onAddToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
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
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2
                        ${isAdded
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        }`}
                >
                    {isAdded ? (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Added!
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
