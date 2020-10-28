  import clienteAxios from '../config/axios'
  import {CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADRESS,CART_SAVE_PAYMENT} from '../consts/cartConsts'

  export const addToCart=(id,qty)=>async(dispacth,getState)=>{
      const{data}=await clienteAxios.get(`/api/v1/products/${id}`)
       console.log(data)
      dispacth({
          type:CART_ADD_ITEM,
          payload:{
              product:data.data._id,
              name:data.data.name,
              image:data.data.image,
              price:data.data.price,
              stock:data.data.stock,
              qty
          }
      })
      localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
  }

  export const removeFromCart=(id)=>async(dispacth,getState)=>{
       dispacth({
           type:CART_REMOVE_ITEM,
           payload:id
       })
       localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
  }
  export const saveShippingAdress=(address)=>async(dispacth,getState)=>{
    dispacth({
        type:CART_SAVE_SHIPPING_ADRESS,
        payload:address
    })
    localStorage.setItem('shippingAdress',JSON.stringify(getState().cart.shippingAdress))
}
export const savePaymentMethod=(data)=>async(dispacth,getState)=>{
    dispacth({
        type:CART_SAVE_PAYMENT,
        payload:data
    })
    localStorage.setItem('paymentMethod',JSON.stringify(getState().cart.paymentMethod))
}