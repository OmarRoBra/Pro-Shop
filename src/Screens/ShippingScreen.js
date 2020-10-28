import React,{useState} from 'react'
import {Form,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Forms from '../components/Items/Forms'
import {saveShippingAdress} from '../actions/cartActions'
import CheckOutSteps from '../components/Items/CheckOutSteps'
function ShippingScreen({history}) {

    const dispatch = useDispatch();
    const ShippingAdress = useSelector(state => state.cart)
    const {shippingAdress}=ShippingAdress
   
    const [address,setAdress]=useState(shippingAdress.address)
    const [city,setCity]=useState(shippingAdress.city)
    const [postalCode,setPostalCode]=useState(shippingAdress.postalCode)
    const [country,setCountry]=useState(shippingAdress.country)
   

    
    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(saveShippingAdress({address,city,postalCode,country}))
      history.push('/payment')
    }
    return (
       <Forms>
           <CheckOutSteps step1 step2/>
           <h1>Shipping</h1>
           <Form onSubmit={submitHandler}>
           <Form.Group >
                  <Form.Label> Adress:</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter your Adress'
                value={address}
                name='adress'
                required
                onChange={(e)=>setAdress(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='city'>
                  <Form.Label> City:</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter your city'
                value={city}
                name='city'
                required
                onChange={(e)=>setCity(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='postalCode'>
                  <Form.Label> Postal Code:</Form.Label>
                <Form.Control
                type='number'
                placeholder='Enter your postal code'
                value={postalCode}
                name='postalCode'
                required
                onChange={(e)=>setPostalCode(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='country'>
                  <Form.Label>Country :</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter your Adress'
                value={country}
                name='country'
                required
                onChange={(e)=>setCountry(e.target.value)}
                >
                </Form.Control>
              </Form.Group>


              <Button type='submit' variant='primary'>Pay</Button>
         
           </Form>
       </Forms>
    )
}

export default ShippingScreen
