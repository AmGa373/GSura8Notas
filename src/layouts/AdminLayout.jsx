import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function AdminLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;