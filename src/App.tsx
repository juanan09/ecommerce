import { useState } from 'react';
import { ProductCatalog } from './features/product-catalog/components/ProductCatalog';
import { ShoppingCart } from './features/shopping-cart/ShoppingCart';
import { LoginDemo } from './features/auth/LoginDemo';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import { ToastProvider, useToast } from './context/ToastContext';
import type { Product } from '@/shared/types';

const MainLayout = () => {
  const { itemCount, addItem } = useCart();
  const { addToast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    addToast(`Added ${product.name} to cart`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* Screen Reader Live Region for Cart Updates */}
      <div className="sr-only" aria-live="polite" role="status">
        {itemCount > 0 ? `Shopping cart updated. Total items: ${itemCount}` : 'Shopping cart is empty'}
      </div>

      {/* Login Sidebar Overlay */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 w-full h-full bg-black/30 backdrop-blur-sm transition-opacity cursor-default"
            onClick={() => setIsLoginOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Authentication Testing</h2>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                aria-label="Close login"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <LoginDemo />
          </div>
        </div>
      )}

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

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              Login Demo
            </button>

            <div
              className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 text-gray-700"
              role="button"
              tabIndex={0}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full min-w-[18px] min-h-[18px] border-2 border-white" aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </div>
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
    <ToastProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
