import { CartProvider } from './context/CartContext';
import { ProductCatalog } from './features/product-catalog/ProductCatalog';
import { ShoppingCart } from './features/shopping-cart/ShoppingCart';
import { Toast } from './shared/components/Toast';
import { useState } from 'react';

function App() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ShopSimple
              </span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6 text-gray-600 dark:text-gray-300">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Products</li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Cart</li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="pb-20">
          <ProductCatalog />
          <div className="my-12 border-t border-gray-200 dark:border-gray-700 mx-4"></div>
          <ShoppingCart />
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopSimple. All rights reserved.</p>
          </div>
        </footer>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
