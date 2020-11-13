import {PRODUCTS_FAILS,PRODUCT_SUCESS,PRODUCT_LIST_REQUEST,
PRODUCTS_DELETE_FAILS,PRODUCT_DELETE_SUCESS,PRODUCT_DELETE_REQUEST,
PRODUCTS_CREATE_FAILS,PRODUCTS_CREATE_RESET,PRODUCT_CREATE_SUCESS,PRODUCT_CREATE_REQUEST,
PRODUCTS_UPDATE_FAILS,PRODUCTS_UPDATE_RESET,PRODUCT_UPDATE_SUCESS,PRODUCT_UPDATE_REQUEST} from '../consts/productConsts'

export const productReducer=(state={products:[]},action)=>{ 
 
  switch(action.type){
      

        case PRODUCT_LIST_REQUEST:
        return{loading:true,products:[]}


        case PRODUCT_SUCESS:
        return{loading:false,products:action.payload,success:true}
        
  
        case PRODUCTS_FAILS:
            return{loading:false,error:action.payload}

        default:
                return state
      }
      
}

export const productDeleteReducer=(state={},action)=>{ 

  switch(action.type){
      

        case PRODUCT_DELETE_REQUEST:
        return{loading:true}


        case PRODUCT_DELETE_SUCESS:
        return{loading:false,success:true}
        
  
        case PRODUCTS_DELETE_FAILS:
            return{loading:false,error:action.payload}

        default:
                return state
      }
      
}
export const createProductReducer=(state={},action)=>{ 
  switch(action.type){
        case PRODUCT_CREATE_REQUEST:
        return{loading:true}
        case PRODUCT_CREATE_SUCESS:
        return{loading:false,product:action.payload,success:true}
        case PRODUCTS_CREATE_FAILS:
            return{loading:false,error:action.payload}
        case PRODUCTS_CREATE_RESET:
          return{}

        default:
                return state
      }
      
}
export const productUpdateReducer=(state={},action)=>{ 
  switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
        return{loading:true}
        case PRODUCT_UPDATE_SUCESS:
        return{loading:false,product:action.payload,success:true}
        case PRODUCTS_UPDATE_FAILS:
            return{loading:false,error:action.payload}
        case PRODUCTS_UPDATE_RESET:
          return{product:{}}

        default:
                return state
      }
      
}