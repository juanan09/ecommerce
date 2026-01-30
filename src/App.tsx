import { ProductCatalog } from './features/product-catalog/components/ProductCatalog';
import { CartItem, CartSummary } from './features/shopping-cart/components';
import type { Product, CartItem as CartItemType } from '@/shared/types';

function App() {
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  const mockProduct: Product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality noise cancelling headphones',
    image: 'https://placehold.co/200'
  };

  const mockCartItem: CartItemType = {
    product: mockProduct,
    quantity: 2
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Simple Product Shop</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12 space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Catalog</h2>
          <ProductCatalog onAddToCart={handleAddToCart} />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6 border-b pb-4">Cart Components Preview</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-medium text-gray-500 mb-2">Cart Item</h3>
              <div className="border rounded-lg overflow-hidden">
                <CartItem
                  item={mockCartItem}
                  onUpdateQuantity={(qty) => console.log('Update quantity:', qty)}
                  onRemove={() => console.log('Remove item')}
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-2">Cart Summary</h3>
              <CartSummary
                subtotal={599.98}
                discount={20}
                total={579.98}
                itemCount={2}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
