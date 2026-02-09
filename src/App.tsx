import { ProductCatalog } from './features/product-catalog/components/ProductCatalog';
import { ShoppingCart } from './features/shopping-cart/ShoppingCart';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import type { Product } from '@/shared/types';

const MainLayout = () => {
  const { itemCount, addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-lg bg-opacity-90">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Simple Product Shop</h1>
          </div>

          <div className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full min-w-[18px] min-h-[18px] border-2 border-white">
                {itemCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <ProductCatalog onAddToCart={handleAddToCart} />
          </div>

          <div className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24">
            <ShoppingCart />
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}

export default App;
