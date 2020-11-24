import axios from 'axios'

const clienteAxios= axios.create({
    baseURL:'https://pro-shop-practice.herokuapp.com/'
})

export default clienteAxios;
