
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar';
import AddProduct from './components/addProduct';
import ViewProduct from './components/viewProduct';
import ProductState from './context/productState';
import UpdateModal from './components/updateModal';
import ViewCustomer from './components/customer/viewCustomer';



function App() {
  return (
  
  
<ProductState>

    <BrowserRouter>
    <div className='flex'>
    <Sidebar/>
    <ViewCustomer/>
    <Routes>
    <Route path="/addProduct" element={<AddProduct/>}/>
    <Route path="/viewProduct" element={<ViewProduct/>}/>
    <Route path="/update" element={<UpdateModal/>}/>
    </Routes>
    </div>
    </BrowserRouter>
</ProductState>
    
  );
}

export default App;
