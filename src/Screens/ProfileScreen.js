
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import{Form,Button, Col,Row,Table} from 'react-bootstrap'
import {useDispatch,useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import Forms from '../components/Items/Forms'
import {update,userDetails} from '../actions/userActions'
import {userOrders} from '../actions/orderActions'
function ProfileScreen({location,history}) {
   
 
     const dispatch = useDispatch();
     const userData=useSelector(state => state.userDetail)
     const{loading,error,userdata}=userData

     const userUpdate=useSelector(state => state.userUpdated)
     const{sucess}=userUpdate

     const userLogin=useSelector(state => state.user)
     const{userInfo}=userLogin

     const ordersUser=useSelector(state => state.userOrders)
     const{loading:loadingOrders,error:errorOrders,orders}=ordersUser

     const [email,saveEmail]=useState()
     const[password,savePassword]=useState()
     const[name,saveName]=useState()
     const[password2,savePassword2]=useState()
     const [message,saveMessage]=useState()

     useEffect(()=>{
        if(!userInfo)
        {
            history.push('/signin')
        }else{
            if(!userdata.name){
                dispatch(userDetails('user'))
                dispatch(userOrders())
            }else{
                saveEmail(userdata.email)
                saveName(userdata.name)
            }     
        }

    },[history,userInfo,userdata,dispatch])
   
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==password2){
         saveMessage('passwords do not macth')
        }else{
            dispatch(update({id:userInfo._id,name,email,password}))

        }
        
    }
    return (
        <Row>
            <Col md={3}>
            <h1>User Info</h1> 
    {error && <Message variant='danger'>{message}</Message>}
    {sucess && <Message variant='success'>'Usuario Actualizado</Message>}
    {loading && <Loader/>}
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
                  <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder='Your Name here'
                value={name}
                name='name'
                onChange={(e)=>saveName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                  <Form.Label>Email Adress</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                name='email'
                onChange={(e)=>saveEmail(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='password'
                value={password}
                name='password'
                onChange={(e)=>savePassword(e.target.value)}
                >

                </Form.Control>
              </Form.Group>

              <Form.Group controlId='password2'>
                  <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='password'
                value={password2}
                name='password'
                onChange={(e)=>savePassword2(e.target.value)}
                >
                     </Form.Control>
              </Form.Group>
             <Button type='submit' variant='primary'>
                Update User
             </Button>
          </Form>
          <Row className='py-3'>
          </Row>
            </Col>
            <Col md={9}>
            <h1>Orders</h1>
            {loadingOrders ?<Loader/>:errorOrders ? <Message variant='danger'>{errorOrders}</Message>:(
                <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>TOTAL</th>
                         <th>PAID</th>
                         <th>DELIVERED</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order=>(
                         <tr key={order._id}>
                             <td>{order._id}</td>
                             <td>{order.totalPrice}</td>
                             <td>{order.isPaid ? (
                                 order.paidAt.substring(0,10)):
                                 (<i className="fas fa-times" style={{color:'red'}}></i>)
                             }</td>
                             <td>{order.isDelivered ? (
                                 order.deliveredAt.substring(0,10)):
                                 (<i className="fas fa-times" style={{color:'red'}}></i>)
                             }</td>
                             <td>
                                 <LinkContainer to={`/order/${order._id}`}>
                                     <Button variant='ligth'>Details</Button>
                                 </LinkContainer>
                             </td>
                         </tr>
                     ))}
                 </tbody>
                </Table>
            )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
