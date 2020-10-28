import {PRODUCTS_FAILS,PRODUCT_SUCESS,PRODUCT_LIST_REQUEST,PRODUCTS_DETAIL_FAILS,
    PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCESS} from '../consts/productConsts'
import clienteAxios from '../config/axios'



export const listProducts=()=> async(dispatch)=>{

    try {
        //Llama a produclits ya quue esta acción tiene un array vacío que refresca la lista 
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data}=await clienteAxios.get('/api/v1/products')
        console.log(data.data)
        dispatch({
            type:PRODUCT_SUCESS,
            payload:data.data
        })
    } catch (error) {
        dispatch({
            type:PRODUCTS_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
        
    }

}
export const detailedProdcut=(id)=>async(dispatch)=>{
    try {
         //Llama a produclits ya quue esta acción tiene un array vacío que refresca la lista 
         dispatch({type:PRODUCT_DETAIL_REQUEST})
         const {data}=await clienteAxios.get(`/api/v1/products/${id}`)
         console.log(data.data)
         dispatch({
             type:PRODUCT_DETAIL_SUCESS,
             payload:data.data
         })
     } catch (error) {
         dispatch({
             type:PRODUCTS_DETAIL_FAILS,
             payload:error.response && error.response.data.message
             ?error.response.data.message
             :error.message
         }) 
    }

}