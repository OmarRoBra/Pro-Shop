import {USER_LOGIN_FAILS,USER_LOGIN_SUCESS,USER_LOGIN_REQUEST,USER_LOGOUT,USER_REGISTER_FAILS,USER_REGISTER_REQUEST,USER_REGISTER_SUCESS,
    USER_DATA_REQUEST,USER_DATA_FAILS,USER_DATA_SUCESS,
    USER_UPDATE_REQUEST,USER_UPDATE_FAILS,USER_UPDATE_RESET,USER_UPDATE_SUCESS,USER_DATA_RESET,
    USER_LIST_FAILS,USER_LIST_REQUEST,USER_LIST_SUCESS,USER_LIST_RESET,USER_DELETE_FAILS,USER_DELETE_REQUEST,USER_DELETE_SUCESS,
    USER_UPDATES_FAILS,USER_UPDATES_REQUEST,USER_UPDATES_RESET,USER_UPDATES_SUCESS} from '../consts/userConsts'
    import {ORDER_OFUSER_RESET} from '../consts/orderConts'
import clienteAxios from '../config/axios'
export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json',
            },
        }

        const {data}= await clienteAxios.post('/api/v1/auth/login',{email,password},config)
        console.log(data)
        dispatch({
            type:USER_LOGIN_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_LOGIN_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const register=(name,email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json',
            },
        }

        const {data}= await clienteAxios.post('/api/v1/auth/register',{name,email,password},config)
        console.log(data)
        dispatch({
            type:USER_LOGIN_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_LOGIN_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const userDetails=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_DATA_REQUEST
        })
        const{user:{userInfo}}=getState()
        console.log(userInfo)

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }
        console.log(userInfo.token)

        const {data}= await clienteAxios.get(`/api/v1/auth/user`,config)
        console.log(data)
        dispatch({
            type:USER_DATA_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_DATA_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const update=(userData)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_UPDATE_REQUEST
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

        const {data}= await clienteAxios.put('/api/v1/auth/user',userData,config)
        console.log(data)
        dispatch({
            type:USER_UPDATE_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_UPDATE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
 export const logOut=()=>async(dispatch)=>{
     localStorage.removeItem('userInfo')
     dispatch({type:USER_LOGOUT})
     dispatch({type:USER_DATA_RESET})
     dispatch({type:ORDER_OFUSER_RESET})
     dispatch({type:USER_LIST_RESET})
     
 }
 export const userList=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })
        const{user:{userInfo}}=getState()
        console.log(userInfo)

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }

        const {data}= await clienteAxios.get(`/api/v1/auth/`,config)

        dispatch({
            type:USER_LIST_SUCESS,
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_LIST_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const deleteThatUser=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_DELETE_REQUEST
        })
        const{user:{userInfo}}=getState()
        console.log(userInfo)

        const config ={
            headers:{
                'Content-Type':'application/json',
                //Establece en las cabeceras el token
                Authorization:`Bearer ${userInfo.token}`
            },
            
        }

        const {data}= await clienteAxios.delete(`/api/v1/auth/${id}`,config)
        console.log(data)
        dispatch({
            type:USER_DELETE_SUCESS,
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_DELETE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const updateById=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_UPDATES_REQUEST
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

        const {data}= await clienteAxios.put(`/api/v1/auth/${user._id}`,user,config)
        dispatch({ type:USER_UPDATES_SUCESS })
        dispatch({
                type:USER_DATA_SUCESS,
                payload:data
            })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_UPDATES_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}