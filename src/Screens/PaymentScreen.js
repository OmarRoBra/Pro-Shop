
import React,{useState} from 'react'
import {Form,Button,Col } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Forms from '../components/Items/Forms'
import {savePaymentMethod} from '../actions/cartActions'
import CheckOutSteps from '../components/Items/CheckOutSteps'
function PaymentScreen({history}) {
    const dispatch = useDispatch();
    const ShippingAdress = useSelector(state => state.cart)
    const {shippingAdress}=ShippingAdress
   
     if(!shippingAdress){
         history.push('/shipping')
     }
     const [paymentMethod,setPaymentMethod]=useState('PayPal')
    
    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
    }
    return (
        <Forms>
        <CheckOutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
          <Form.Check
          type='radio'
          label='PayPal or Credit Card'
          id='PayPal'
          name='paymentMethod'
          value='Paypal'
          checked
          onClick={(e)=>setPaymentMethod(e.target.value)}
          />
          <Form.Check
          type='radio'
          label='Stripe'
          id='Stripe'
          name='paymentMethod'
          value='Stripe'
          onClick={(e)=>setPaymentMethod(e.target.value)}
          />
          </Col>
              </Form.Group>
         
           <Button type='submit' variant='primary'>Pay</Button>
      
        </Form>
    </Forms>
 )
    
}

export default PaymentScreen
{/* <Col>
<Form.Check
type='radio'
label='PayPal or Credit Card'
id='PayPal'
name='paymentMethod'
value='Paypal'
onChange={(e)=>setPaymentMethod(e.target.value)}
> </Form.Check>  

</Col> */}