import {PRODUCTS_FAILS,PRODUCT_SUCESS,PRODUCT_LIST_REQUEST,PRODUCTS_DETAIL_FAILS,
    PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCESS,
    PRODUCTS_DELETE_FAILS,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCESS,
    PRODUCTS_CREATE_FAILS,PRODUCTS_CREATE_RESET,PRODUCT_CREATE_SUCESS,PRODUCT_CREATE_REQUEST,
    PRODUCTS_UPDATE_FAILS,PRODUCTS_UPDATE_RESET,PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCESS} from '../consts/productConsts'
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

export const deleteById=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const{
            user:{userInfo}
        }=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
        }

        const {data}= await clienteAxios.delete(`/api/v1/products/${id}`,config)
        dispatch({
                type:PRODUCT_DELETE_SUCESS,
                payload:data
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type:PRODUCTS_DELETE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const createProduct=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })

        const{
            user:{userInfo}
        }=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
        }

        const {data}= await clienteAxios.post(`/api/v1/products/`,{},config)
        dispatch({
                type:PRODUCT_CREATE_SUCESS,
                payload:data
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type:PRODUCTS_CREATE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const updateProduct=(product)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })

        const{
            user:{userInfo}
        }=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
        }

        const {data}= await clienteAxios.put(`/api/v1/products/${product._id}`,product,config)
        dispatch({
                type:PRODUCT_UPDATE_SUCESS,
                payload:data
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type:PRODUCTS_UPDATE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}