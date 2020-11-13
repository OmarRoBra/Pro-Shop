import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,Button,ListGroup,Card,Form } from 'react-bootstrap'
import {useDispatch,useSelector} from  'react-redux'
import {detailedProdcut} from '../actions/productActions'
import Rating from '../components/Items/Rating'
export const ProductScreen = ({history,match}) => {

       const [qty,setQty]=useState(1)
   
   const dispatch=useDispatch();
   const producDetail=useSelector(state=>state.productDetails)
    const{product}=producDetail

   useEffect(() => {
       dispatch(detailedProdcut(match.params.id))
   }, [dispatch,match])

   const savetoCart=()=>{
       history.push(`/cart/${match.params.id}?qty=${qty}`)
   }

    return (
        <>
        <Link className='btn btn-dark my-3' to="/">Go Back</Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
              <ListGroup variant="flush">
                  <ListGroup.Item>
                   <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h3>Price $: {product.price} </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                   Description {product.description}
                  </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={3}>
              <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <Row>
                         <Col>
                         Price:
                         </Col>
                      <Col><strong> ${product.price}</strong></Col>
                     </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                         <Col>
                         Stock:
                         </Col>
                        <Col>{product.stock > 0 ? "Available" : "Out of stock"}</Col>
                     </Row>
                    </ListGroup.Item>

                    {product.stock>0&&(
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                <Form.Control as ='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                {/* Toma el array de Stock mapeandolo y haciendo cada uno de los elementos un select
                                   en este por eejemplo cada cantidad de stock que saca la pinta como una opción del select */}
                                    {[...Array(product.stock ).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button className="btn-block" type='button'  onClick={savetoCart} disabled={product.stock===0?true:false}  > 
                           Add to cart
                        </Button>
                    </ListGroup.Item>
                  </ListGroup>
              </Card>
          </Col >
    
        </Row>
        </>
    )
}
export default ProductScreen;