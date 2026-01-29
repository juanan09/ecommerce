import React from 'react';
import type { Product } from '../../../shared/types';
import { formatPrice } from '../../../shared/utils';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-start gap-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain bg-gray-50 rounded" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700">{formatPrice(product.price)}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
                Add to Cart
            </button>
        </div>
    );
};
