import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/hooks/useUserContext";
import { FaTrashAlt, FaHeart, FaRegHeart } from "react-icons/fa"; 
import type { ImageCell } from "@/core/types";

export const CartView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart, favorites, toggleFavorite, setCart } = useUserContext();

  const cartItems = Array.from(cart.values());

  const subtotal = cartItems.reduce((sum, item) => {
    const priceStr = item.secondaryText ? item.secondaryText.replace('$', '') : '4.99';
    const priceNum = parseFloat(priceStr) || 4.99 ; 
    return sum + priceNum;
  }, 0);
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  const handleEmptyCart = () => {
    if (setCart) {
      setCart(new Map(null)); 
    } else {
      cartItems.forEach(item => toggleCart(item));
    }
  };
  return (
    <section className="mx-auto max-w-7xl space-y-6 p-8 text-white">
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition text-sm"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        
          <button 
            onClick={handleEmptyCart}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition text-sm font-semibold"
          >
            Empty Cart
          </button>
        
      </div>

      <h1 className="text-4xl font-bold">Cart</h1>

      {cart.size === 0 ? (
        <p className="mt-10 text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b border-gray-800 bg-gray-900 text-gray-400 text-sm">
                  <th className="p-4 w-2/5">Items</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800 text-sm">
                {cartItems.map((item: ImageCell) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition">

                    <td className="p-4 flex items-center space-x-4">
                     <img 
                        src={item.imagePath.startsWith('http') 
                        ? item.imagePath 
                        : `https://image.tmdb.org/t/p/w500${item.imagePath}`
                        } 
                        alt={item.primaryText}
                        className="h-16 w-12 object-cover rounded shadow"
                        />
                      <span className="font-medium truncate max-w-[200px]">
                        {item.primaryText}
                      </span>
                    </td>

                    <td className="p-4 text-gray-400">{item.type}</td>
                    <td className="p-4 font-medium">{item.secondaryText}</td>
                    <td className="p-4">

                      <div className="flex items-center justify-center space-x-4 text-lg">
                        <button 
                          onClick ={()=>{if(!favorites.has(item.id))
                            {toggleFavorite(item);} 
                            toggleCart(item)
                        }} 
                          className="hover:scale-110 transition"
                        >
                            {favorites.has(item.id) ? (
                                <FaHeart className="text-blue-500" />
                            ) : (
                                <FaRegHeart className="text-gray-400" />
                            )}
                        </button>
                        
                        <button 
                          onClick={() => toggleCart(item)}
                          className="text-gray-400 hover:text-red-500 hover:scale-110 transition"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/30 text-sm">
            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-gray-400 font-medium">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 p-4">
              <span className="text-gray-400 font-medium">Taxes (13%)</span>
              <span className="font-semibold">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between bg-gray-900/60 p-4 rounded-b-lg">
              <span className="text-white font-bold text-base">Total</span>
              <span className="text-blue-400 font-bold text-base">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};