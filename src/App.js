import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CurrentWarehouse from './pages/CurrentWarehouse/CurrentWarehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import Inventory from './pages/Inventory/Inventory';
import CurrentInventoryItem from './pages/CurrentInventoryItem/CurrentInventoryItem';
import AddInventoryItem from './pages/AddInventoryItem/AddInventoryItem';
import EditInventoryItem from './pages/EditInventoryItem/EditInventoryItem';
import DeleteInventoryItem from './pages/DeleteInventoryItem/DeleteInventoryItem';

import Header from './components/Header/Header';

import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/warehouses' element={<Home />} />
        <Route path='/warehouses/add-warehouse' element={<AddWarehouse />} />
        <Route path='/warehouses/:id' element={<CurrentWarehouse />} />
        <Route path='/warehouses/edit-warehouse/:id' element={<EditWarehouse />} />
        <Route path='/inventories' element={<Inventory />} />
        <Route path='/inventories/inventory/:id' element={<CurrentInventoryItem />} />
        <Route path='/inventories/add-inventory-item' element={<AddInventoryItem />} />
        <Route path='/inventories/delete-inventory-item/:id' element={<DeleteInventoryItem />} />
        <Route path='/inventories/edit-inventory-item/:id' element={<EditInventoryItem />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
