
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar';
import AddProduct from './components/addProduct';
import ViewProduct from './components/viewProduct';
import ProductState from './context/productState';
import UpdateModal from './components/updateModal';
import ViewCustomer from './components/customer/viewCustomer';
import CustomerState from './context/customerState';
import UpdateCustomer from './components/customer/updateCustomer';



function App() {
  return (
  
  <CustomerState>
<ProductState>

    <BrowserRouter>
    <div className='flex'>
    <Sidebar/>
    
    <Routes>
    <Route path="/addProduct" element={<AddProduct/>}/>
    <Route path="/viewProduct" element={<ViewProduct/>}/>
    <Route path="/update" element={<UpdateModal/>}/>
    <Route path="/viewCustomers" element={<ViewCustomer/>}/>
    <Route path="/updateCustomers" element={<UpdateCustomer/>}/>
    </Routes>
    </div>
    </BrowserRouter>
</ProductState>
    </CustomerState>
  );
}

export default App;
