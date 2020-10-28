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
      </Container>
      </main>
      </Switch>
      <Footer/>
    
    </Router>
   
  );
}

export default App;
