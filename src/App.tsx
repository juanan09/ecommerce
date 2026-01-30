import { ProductCard } from './features/product-catalog/components/ProductCard';

function App() {
  const mockProduct = {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop'
  };

  const handleAddToCart = (product: typeof mockProduct) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Featured Product</h1>
      <div className="w-full max-w-sm">
        <ProductCard
          product={mockProduct}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default App;
