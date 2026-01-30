import { MOCK_PRODUCTS } from '../../../shared/data/products';
import type { Product } from '../../../shared/types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
    onAddToCart: (product: Product) => void;
}

export const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};
