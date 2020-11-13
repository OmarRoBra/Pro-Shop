import {ORDER_CREATE_FAILS,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCESS,
    ORDER_GET_FAILS,ORDER_GET_REQUEST,ORDER_GET_SUCESS,
ORDER_PAY_FAILS,ORDER_PAY_REQUEST,ORDER_PAY_SUCESS,ORDER_PAY_RESET,
ORDER_OFUSER_FAILS,ORDER_OFUSER_REQUEST,ORDER_OFUSER_SUCESS,ORDER_OFUSER_RESET,
ORDERS_ADMIN_FAILS,ORDERS_ADMIN_REQUEST,ORDERS_ADMIN_SUCCESS,ORDERS_ADMIN_RESET,
ORDER_DELIVERED_FAILS,ORDER_DELIVERED_REQUEST,ORDER_DELIVERED_RESET,ORDER_DELIVERED_SUCESS} from '../consts/orderConts'
export const orderReducer=(state={},action)=>{
    
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
  export const getOrdersOfUser=(state={orders:[]},action)=>{
   
    switch(action.type){
        case ORDER_OFUSER_REQUEST:
            return{loading:true,...state}
        case ORDER_OFUSER_SUCESS:
            return{loading:false,sucess:true, orders:action.payload}   
        case ORDER_OFUSER_FAILS:
            return{loading:false, error:action.payload} 
        case ORDER_OFUSER_RESET:
            return{orders:[]}     
            default:
                return state
        }
  }
  export const getAdminOrders=(state={orders:[]},action)=>{
    switch(action.type){
        case ORDERS_ADMIN_REQUEST:
            return{loading:true,...state}
        case ORDERS_ADMIN_SUCCESS:
            return{loading:false,sucess:true, orders:action.payload}   
        case ORDERS_ADMIN_FAILS:
            return{loading:false, error:action.payload} 
        case ORDERS_ADMIN_RESET:
            return{orders:[]}     
            default:
                return state
        }  
  }
  export const deliveredOrderReducer=(state={},action)=>{

    switch(action.type){
        case ORDER_DELIVERED_REQUEST:
            return{loading:true,...state}
        case ORDER_DELIVERED_SUCESS:
            return{loading:false,sucess:true}   
        case ORDER_DELIVERED_FAILS:
            return{loading:false, error:action.payload}     
        case ORDER_DELIVERED_RESET:
            return{}
            default:
                return state
        }
  }