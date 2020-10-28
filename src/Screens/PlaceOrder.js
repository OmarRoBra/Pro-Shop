import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button,Row,ListGroup,Card,Col,Image } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Forms from '../components/Items/Forms' 
import CheckOutSteps from '../components/Items/CheckOutSteps'
import {createOrder} from '../actions/orderActions'
export function PlaceOrder({history}) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAdress}=cart           //ACUMULADOR/ITERADOR

    cart.ItemsPrice=cart.cartItems.reduce((acc,item)=>acc + item.price * item.qty,0)
    cart.shippingPrice=15
    console.log(cart.shippingPrice)
    cart.taxPrice=Number((0.15*cart.ItemsPrice).toFixed(2))
    cart.totalPrice=(Number(cart.ItemsPrice) + Number (cart.shippingPrice )+(cart.taxPrice)).toFixed(2)
    console.log(cart)

    const orderCreate=useSelector(state=>state.order)
    const {orders,success,error}=orderCreate

    console.log(orderCreate)
    const clickHandler=(e)=>{
        e.preventDefault();
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAdress:cart.shippingAdress,
            paymentMethod:cart.paymentMethod,
            taxPrice:cart.taxPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice
        }))
        
    }
    
    useEffect(() => {
        if(success){
            history.push(`/order/${orders._id}`)
        }
      
    }, [history,success])
    return (
        <>
          <CheckOutSteps step1 step2 step3 step4 />  
          <Row>
              <Col md={8}>
                  <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h2>Shipping</h2>
                      <p>
                          <strong>Adress:</strong>
                          {shippingAdress.adress},  {cart.shippingAdress.city}{' '}
                          {cart.shippingAdress.postalCode},{' '}
                          {cart.shippingAdress.country}
                      </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <strong>Method: </strong>
                      {cart.paymentMethod}
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <h2>Summary Products</h2>
                      <ListGroup>
                          {cart.cartItems.map((item,index)=>(
                              <ListGroup.Item key={index}>
                                  <Row>
                                      <Col md={1}>
                                          <Image src={item.image} fluid rounded/>
                                      </Col>
                                      <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                                      </Col>
                                      <Col md={4}>
                                          {item.qty} X ${item.price} = $ {item.qty * item.price}
                                      
                                      </Col>
                                     
                                  </Row>
                              </ListGroup.Item>
                              
                          )) }
                      </ListGroup>
                      
                  </ListGroup.Item>
                  </ListGroup>
              </Col>
              <Col md={4}>
              <Card>
             <ListGroup variant='flush'>
             <ListGroup.Item>
             <h2>Order Summary</h2>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Items: </Col>
                          <Col>${cart.ItemsPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Shipping: </Col>
                          <Col>${cart.shippingPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Tax: </Col>
                          <Col>${cart.taxPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Total: </Col>
                          <Col>${cart.totalPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Button type='button' className='btn-block' disabled={cart.cartItems===0} onClick={clickHandler}>Pay</Button>
                 </Row>
             </ListGroup.Item>
              </ListGroup>
             </Card>
            </Col>
          </Row>
        </>
    )
}

export default PlaceOrder