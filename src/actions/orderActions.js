import clienteAxios from '../config/axios'
import {ORDER_CREATE_FAILS,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCESS,
    ORDER_GET_FAILS,ORDER_GET_REQUEST,ORDER_GET_SUCESS,
ORDER_PAY_FAILS,ORDER_PAY_REQUEST,ORDER_PAY_SUCESS,ORDER_OFUSER_FAILS,
ORDER_OFUSER_REQUEST,ORDER_OFUSER_SUCESS,
ORDERS_ADMIN_FAILS,ORDERS_ADMIN_REQUEST,ORDERS_ADMIN_SUCCESS,
ORDER_DELIVERED_FAILS,ORDER_DELIVERED_REQUEST,ORDER_DELIVERED_SUCESS} from '../consts/orderConts'

export const createOrder=(order)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const{user:{userInfo}}=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }
      

        const {data}= await clienteAxios.post(`/api/v1/orders`,order,config)
        console.log(data)
        dispatch({
            type:ORDER_CREATE_SUCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDER_CREATE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const detailOrder=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_GET_REQUEST
        })
        const{user:{userInfo}}=getState()

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }
       

        const {data}= await clienteAxios.get(`/api/v1/orders/${id}`,config)
        console.log(data)
        dispatch({
            type:ORDER_GET_SUCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDER_GET_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const payOrder=(orderId,paymentResult)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })
        const{user:{userInfo}}=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }
      

        const {data}= await clienteAxios.put(`/api/v1/orders/${orderId}/pay`,paymentResult,config)
        console.log(data)
        dispatch({
            type:ORDER_PAY_SUCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDER_PAY_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const userOrders=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_OFUSER_REQUEST
        })
        const{user:{userInfo}}=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }
      

        const {data}= await clienteAxios.get(`/api/v1/orders/myorders`,config)
        console.log(data)
        dispatch({
            type:ORDER_OFUSER_SUCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDER_OFUSER_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const adminOrders=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDERS_ADMIN_REQUEST
        })
        const{user:{userInfo}}=getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }
      

        const {data}= await clienteAxios.get(`/api/v1/orders`,config)
        console.log(data)
        dispatch({
            type:ORDERS_ADMIN_SUCCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDERS_ADMIN_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVERED_REQUEST
      })
  
     
        const{user:{userInfo}}=getState()
     
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await clienteAxios.put(`/api/v1/orders/${order._id}/delivered`, {}, config)
  
      dispatch({
        type: ORDER_DELIVERED_SUCESS,
        payload: data,
      })
    } catch (error) {
        console.log(error)
        dispatch({
            type:ORDER_DELIVERED_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
  }