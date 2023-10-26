
import './App.css'
import Navbar from './components/layout/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import ListCustomer from './components/petCare/ListCustomer';
import { Route, Routes } from 'react-router-dom';
import CreateCustomer from './components/petCare/CreateCustomer';
import EditCustomer from './components/petCare/EditCustomer';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path='/' element={<ListCustomer />} />
          <Route path='/customer/create' element={<CreateCustomer />} />
          <Route path='/customer/edit/:customerId' element={<EditCustomer />} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App
