import React from 'react';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import  {Container} from 'react-bootstrap'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Homescreen from './Screens/Homescreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import Register from './Screens/Register'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrder from './Screens/PlaceOrder'
import OrderScreen from './Screens/OrderScreen'
import UserList  from './Screens/UserList'
import ProductAdmin from './Screens/ProductAdmin'
import ProductEdit from './Screens/PorductEdit'
import OrderList from './Screens/Orderlist'
  function App() {
  return (
    <Router>
      <Header/>
      <Switch>
    <main className="py-3">
      <Container>
      <Route exact path='/' component={Homescreen} /> 
      <Route exact path='/product/:id' component={ProductScreen} />
      <Route exact path='/cart/:id?' component={CartScreen} />
      <Route exact path='/signIn' component={LoginScreen} /> 
      <Route exact path='/register' component={Register}/>
      <Route exact path='/profile' component={ProfileScreen}/>
      <Route exact path='/shipping' component={ShippingScreen}/>
      <Route exact path ='/payment' component={PaymentScreen}/>
      <Route exact path='/placeorder' component={PlaceOrder}/>
      <Route exact path='/order/:id?' component={OrderScreen}/>
      <Route exact path='/admin/userList' component={UserList}/>
      <Route exact path='/admin/products' component={ProductAdmin} />
      <Route exact path ='/admin/products/:id/edit' component={ProductEdit} />
      <Route exact path ='/admin/orders' component={OrderList} />
      </Container>
      </main>
      </Switch>
      <Footer/>
    
    </Router>
   
  );
}

export default App;
