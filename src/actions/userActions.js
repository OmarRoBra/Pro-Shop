import {USER_LOGIN_FAILS,USER_LOGIN_SUCESS,USER_LOGIN_REQUEST,USER_LOGOUT,USER_REGISTER_FAILS,USER_REGISTER_REQUEST,USER_REGISTER_SUCESS,
    USER_DATA_REQUEST,USER_DATA_FAILS,USER_DATA_SUCESS,
    USER_UPDATE_REQUEST,USER_UPDATE_FAILS,USER_UPDATE_RESET,USER_UPDATE_SUCESS} from '../consts/userConsts'
import clienteAxios from '../config/axios'
export const login=(email,password)=>async(dsipatch)=>{
    try {
        dsipatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json',
            },
        }

        const {data}= await clienteAxios.post('/api/v1/auth/login',{email,password},config)
        console.log(data)
        dsipatch({
            type:USER_LOGIN_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dsipatch({
            type:USER_LOGIN_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

export const register=(name,email,password)=>async(dsipatch)=>{
    try {
        dsipatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json',
            },
        }

        const {data}= await clienteAxios.post('/api/v1/auth/register',{name,email,password},config)
        console.log(data)
        dsipatch({
            type:USER_LOGIN_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dsipatch({
            type:USER_LOGIN_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}
export const userDetails=(id)=>async(dsipatch,getState)=>{
    try {
        dsipatch({
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
        dsipatch({
            type:USER_DATA_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dsipatch({
            type:USER_DATA_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}


export const update=(userData)=>async(dsipatch,getState)=>{
    try {
        dsipatch({
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
        dsipatch({
            type:USER_UPDATE_SUCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log(error)
        dsipatch({
            type:USER_UPDATE_FAILS,
            payload:error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
    }
}

 export const logOut=()=>async(dsipatch)=>{
     localStorage.removeItem('userInfo')
     dsipatch({type:USER_LOGOUT})
 }
