import {createStore,combineReducers,applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer} from './Reducers/productReducers'
import {productDetail } from './Reducers/productDetailReducer'
import {cartReducer} from './Reducers/cartsReducer'
import {userReducer,registerReducer,DataReducer,updateReducer} from './Reducers/userReducer'
import {orderReducer,getOrderReducer,payOrderReducer} from './Reducers/ordersReducer'

//Con combine reducers combinamos todos estos
//ya que redux solo admite un solo STORE
const reducer =  combineReducers({
    productsList:productReducer,
    productDetails:productDetail,
    cart:cartReducer,
    user:userReducer,
    registro:registerReducer,
    userDetail:DataReducer,
    userUpdated:updateReducer,
    order:orderReducer,
    orderDetail:getOrderReducer,
    payment:payOrderReducer
})
//revisamos si existe algun registro dentro del local storage si existe este sera el valor inicial de nuestro state
const cartItemsStorage= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
const  userInLocalStorage= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :null

const shippingLocalStorage=localStorage.getItem('shippingAdress') ?JSON.parse(localStorage.getItem('shippingAdress')):{}
const paymentFromStorage=localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')):{}
//Este será el estado inicial de nmuestro STORE
const initialState={
      cart:{cartItems:cartItemsStorage, shippingAdress:shippingLocalStorage,paymentMethod:paymentFromStorage},
      user:{userInfo:userInLocalStorage},
};
//El middleware que se aplicara en el store en este caso será REDUX DEV TOOLS
const middleware=[thunk];

//Creación del STORE
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
