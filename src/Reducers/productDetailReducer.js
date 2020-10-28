import {PRODUCTS_FAILS,PRODUCT_SUCESS,PRODUCT_LIST_REQUEST,PRODUCTS_DETAIL_FAILS,
    PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCESS} from '../consts/productConsts'

    export const productDetail=(state={product:{}},action)=>{
        switch(action.type){
      
      
          case PRODUCT_DETAIL_REQUEST:
            return{loading:true,...state}
          case PRODUCT_DETAIL_SUCESS:
            return{loading:false, product:action.payload}  
          
          case PRODUCTS_DETAIL_FAILS:
              return{loading:false,error:action.payload}
      
          default:
                  return state
        }
        
      }