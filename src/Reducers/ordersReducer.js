import {ORDER_CREATE_FAILS,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCESS,
    ORDER_GET_FAILS,ORDER_GET_REQUEST,ORDER_GET_SUCESS,
ORDER_PAY_FAILS,ORDER_PAY_REQUEST,ORDER_PAY_SUCESS,ORDER_PAY_RESET} from '../consts/orderConts'
export const orderReducer=(state={},action)=>{
    console.log(state.cartItems)
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{loading:true,...state}
        case ORDER_CREATE_SUCESS:
            return{loading:false, orders:action.payload,success:true}   
        case ORDER_CREATE_FAILS:
            return{loading:false, error:action.payload}     
            default:
                return state
        }
  }
  export const getOrderReducer=(state={loading:true,shippingAdress:{},orderItems:[]},action)=>{
    console.log(state.cartItems)
    switch(action.type){
        case ORDER_GET_REQUEST:
            return{loading:true,...state}
        case ORDER_GET_SUCESS:
            return{loading:false, orders:action.payload}   
        case ORDER_GET_FAILS:
            return{loading:false, error:action.payload}     
            default:
                return state
        }
  }
  export const payOrderReducer=(state={},action)=>{
    console.log(state.cartItems)
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return{loading:true,...state}
        case ORDER_PAY_SUCESS:
            return{loading:false,sucess:true, orders:action.payload}   
        case ORDER_PAY_FAILS:
            return{loading:false, error:action.payload}     
        case ORDER_PAY_RESET:
            return{}
            default:
                return state
        }
  }