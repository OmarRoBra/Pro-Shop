import React,{useEffect} from 'react'
import{Link} from 'react-router-dom'
import{Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/message'
import {addToCart,removeFromCart} from '../actions/cartActions'
export const CartScreen = ({match,location,history}) => {
    //match esd parte del router de react y sirve para obtener información de las rutas de este
    //en este caso usamos match para obtener el parametro de id dentro de la URL
    const productId= match.params.id
    //location tambien viene de parte del router de react y este es la url exacta de donde se encuentra la página
    // este busca el signo de interrogacion y devuelve lo que hay después
    //le otorgamos a la variable qty el segundo valor del arra que obtuvimos al hacer split al query que era "qty=1"
    //dejando así la cantidad de este como qty 
    const qty=location.search ? Number(location.search.split('=')[1]) : 1

     const dispatch = useDispatch()
     //obtengo el state cart del store.js con use selector
     const cart= useSelector(state=>state.cart)
     //selecciono de este  state la información en cartItem
     const {cartItems}=cart
     console.log(cartItems)
      useEffect(()=>{
         if(productId){
             dispatch(addToCart(productId,qty))
         }
     },[dispatch,productId,qty])


     const removesFromCart=(id)=>{ 
         dispatch(removeFromCart(id))
     }
     const checkoutHandler = () => {
        history.push('/signin?redirect=shipping')
      }
    return (
        <Row>
        <Col md={8}>
            <h1>Shopping cart</h1>
            {cartItems.length===0 ?(<Message>Tu Carrito está Vacio <Link to='/'>Go back</Link> </Message>):(
                
                <ListGroup variant='flush'>
                {cartItems.map(item=>(
                    <ListGroup.Item key={item.product}>
                      <Row>
                          <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded ></Image>
                          </Col>
                          <Col md={3}>
                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                <Col md={2}>$ :{item.price}</Col>
                <Col md={2}>
                <Form.Control as ='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                {/* Toma el array de Stock mapeandolo y haciendo cada uno de los elementos un select
                                   en este por eejemplo cada cantidad de stock que saca la pinta como una opción del select */}
                                    {[...Array(item.stock ).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                </Form.Control>
                </Col>
                <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>
                    removesFromCart(item.product)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                </Col>
                      </Row> 
                    </ListGroup.Item>
                ))}
            </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        {/* Esta funcion es una high order array method que hace que acumule los valores (en este caso qty) los sume regresando el total de estos */}
                        <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0 ) })</h2>
                        $ {cartItems.reduce((acc,item)=>acc+item.qty * item.price,0)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Button type='button' className='btn-block' disabled={cartItems.length===0?true:false} onClick={checkoutHandler}>Buy</Button>
                     </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    
    </Row>
    )
}

export default CartScreen