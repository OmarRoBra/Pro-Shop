import React,{useState,useEffect} from 'react'
import clienteAxios from '../config/axios'
import {Link} from 'react-router-dom'
import {PayPalButton} from 'react-paypal-button-v2'
import {Button,Row,ListGroup,Card,Col,Image } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {detailOrder, payOrder,deliverOrder} from '../actions/orderActions'
import Message from '../components/message'
import Loader from '../components/loader'
import {ORDER_PAY_RESET,ORDER_DELIVERED_RESET} from '../consts/orderConts'


export function OrderScreen({match,history}) {
    const orderId= match.params.id

    const[sdkReady,setSDKReady]=useState(false)

    const dispatch = useDispatch()
    
    const payed= useSelector(state => state.payment)
    const {sucess,loading:loadingPay}=payed         

    const delivered= useSelector(state => state.deliverOrder)
    const {sucess:deliveredSuccess,loading:deliveredLoading}=delivered

    const detailUser= useSelector(state=>state.user)
    const {userInfo}=detailUser

    const orderDetails= useSelector(state => state.orderDetail)
    const {error,orders,loading}=orderDetails          
   
    
    useEffect(() => {
        if(!userInfo){
            history.push('/signin')
        }
        
        const addPayPalScript= async()=>{
            const {data:clientId}= await clienteAxios.get('/api/config/paypal')
            console.log(clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}` 
            script.async = true
            script.onload=()=>{
                setSDKReady(true)
            }
            document.body.appendChild(script)

        }
        
        if(!orders ||sucess || deliveredSuccess|| orders._id !== orderId){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVERED_RESET})
            dispatch(detailOrder(orderId))
            console.log(orders)
        }else if(!orders.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSDKReady(true)
            }
        }
    
      
    }, [dispatch,orderId,sucess,orders,history,deliveredSuccess])
    if(!loading) orders.ItemsPrice=orders.orderItems.reduce((acc,item)=>acc + item.price * item.qty,0)
    
    const sucessPayment =(paymentResult)=>{
      console.log(paymentResult)
      dispatch(payOrder(orderId,paymentResult))
    }
    const deliverHandler=()=>{
        dispatch(deliverOrder(orders))
    }
return loading?<Loader /> : error ? <Message variant='danger'>{error}</Message>
: <> <h1>Order {orders.id}</h1>
 <Row>
              <Col md={8}>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <h2>User</h2>
                          <p><strong>Name</strong>{orders.user.name}</p> 
                          <p><a href={`mailto:${orders.user.email}`}>{orders.user.email} </a></p>

                      <p>
                          <strong>Adress:</strong>
                          {orders.shippingAdress.adress},  {orders.shippingAdress.city}{' '}
                          {orders.shippingAdress.postalCode},{' '}
                          {orders.shippingAdress.country}
                      </p>
                      {orders.isDelivereded? <Message variant='success'>Delivered on {orders.deliveredAt}</Message>:<Message variant='danger'>Not Delivered Yet</Message> }
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <p>
                      <strong>Method: </strong>
                      {orders.paymentMethod}
                      </p>
                   {orders.isPaid ? <Message variant='success'>Paid on {orders.paidAt}</Message>:<Message variant='danger'>Not paid Yet</Message> }
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <h2>Summary Products</h2>
                      <ListGroup>
                          {orders.orderItems.map((item,index)=>(
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
                          <Col>${orders.ItemsPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Shipping: </Col>
                          <Col>${orders.shippingPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Tax: </Col>
                          <Col>${orders.taxPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Row>
                     <Col>Total: </Col>
                          <Col>${orders.totalPrice}</Col>
                 </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                
             </ListGroup.Item>
             {!orders.isPaid &&(
                 <ListGroup.Item>
                     {loadingPay && <Loader/>}
                     {!sdkReady ?(
                         <Loader/>):(<PayPalButton
                         amount={orders.totalPrice}
                         onSuccess={sucessPayment}
                         >
                            
                            </PayPalButton>)
                     }
                 </ListGroup.Item>
             )}
             {userInfo.isAdmin && orders.isPaid && !orders.isDelivered && (
                 <ListGroup.Item>
                     <Button type ='button' className='btn btn-block' onClick={deliverHandler}>
                         Mark as Delivered
                     </Button>
                 </ListGroup.Item>
             )}
              </ListGroup>
             </Card>
            </Col>
          </Row>
</>

}

export default OrderScreen