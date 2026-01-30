import { ProductCatalog } from './features/product-catalog/components/ProductCatalog';
import type { Product } from './shared/types';

function App() {
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Simple Product Shop</h1>
        </div>
      </header>

      <main>
        <ProductCatalog onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}

export default App;
