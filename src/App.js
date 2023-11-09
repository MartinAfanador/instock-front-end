import './App.scss';
import ItemDetails from './components/ItemDetails/ItemDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import DeleteWarehouse from './pages/DeleteWarehouse/DeleteWarehouse';
import CurrentWarehouse from './pages/CurrentWarehouse/CurrentWarehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import Inventory from './pages/Inventory/Inventory';
import CurrentInventoryItem from './pages/CurrentInventoryItem/CurrentInventoryItem';
import AddInventoryItem from './pages/AddInventoryItem/AddInventoryItem';
import EditInventoryItem from './pages/EditInventoryItem/EditInventoryItem';
import DeleteInventoryItem from './pages/DeleteInventoryItem/DeleteInventoryItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-warehouse' element={<AddWarehouse />} />
        <Route path='/warehouse/:id' element={<CurrentWarehouse />} />
        <Route path='/edit-warehouse/:id' element={<EditWarehouse />} />
        <Route path='/delete-warehouse/:id' element={<DeleteWarehouse />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/inventory/:id' element={<CurrentInventoryItem />} />
        <Route path='/add-inventory-item' element={<AddInventoryItem />} />
        <Route path='/delete-inventory-item/:id' element={<DeleteInventoryItem />} />
        <Route path='/edit-inventory-item/:id' element={<EditInventoryItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
