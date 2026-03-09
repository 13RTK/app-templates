import { Outlet } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
