import {PRODUCTS_FAILS,PRODUCT_SUCESS,PRODUCT_LIST_REQUEST,PRODUCTS_DETAIL_FAILS,
  PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCESS} from '../consts/productConsts'

export const productReducer=(state={products:[]},action)=>{ 
  console.log(state)
  switch(action.type){
      

        case PRODUCT_LIST_REQUEST:
        return{loading:true,products:[]}


        case PRODUCT_SUCESS:
        return{loading:false,products:action.payload}
        
  
        case PRODUCTS_FAILS:
            return{loading:false,error:action.payload}

        default:
                return state
      }
      
}

