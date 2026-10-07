import { Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default App;