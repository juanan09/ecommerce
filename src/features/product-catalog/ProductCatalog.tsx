import React, { useEffect, useState } from 'react';
import type { Product } from '../../shared/types';
import { ProductCard } from './components/ProductCard';
import { Skeleton } from '../../shared/components/Skeleton';
import { useCart } from '../../context/CartContext';
import { Button } from '../../shared/components/Button'; // Assuming we might want a refresh button or similar

export const ProductCatalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={fetchProducts}>Try Again</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Product Catalog</h1>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={`param-skeleton-${index}`} className="flex flex-col space-y-3">
                            <Skeleton height="200px" className="rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton height="24px" width="80%" className="rounded" />
                                <Skeleton height="16px" className="rounded" />
                                <Skeleton height="16px" width="60%" className="rounded" />
                                <div className="flex justify-between mt-4">
                                    <Skeleton height="24px" width="30%" className="rounded" />
                                    <Skeleton height="36px" width="40%" className="rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
