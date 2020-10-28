import React,{useEffect} from 'react';
import {useDispatch,useSelector} from  'react-redux'
import {Row,Col} from  'react-bootstrap'
import Products from '../components/Items/Products'
import {listProducts} from '../actions/productActions'
import Loader from '../components/loader'
import Message from '../components/message'
const Homescreen = () => {
    const dispatch = useDispatch()
   //Se crea una variable producstList que jala el state del reducer productstList
   //en este caso jala lo que es el estado del loading, error y products
    const productsList=useSelector(state=>state.productsList)
    const{loading,error,products}=productsList

    useEffect(() => {
        //Lista productos es un acción de porductos que viene de otro archivo
      dispatch(listProducts())
    }, [dispatch])

    return ( 
        <div>
            <h1>Latest Products</h1>
            {loading?(<Loader/>): error?<Message variant='danger'>{error}</Message>:(


<Row>
{products.map((product)=>(
    <Col key={product._id} sm={12} md={6} lt={4} xl={3}>
        <Products product={product} />
    </Col>
))}
</Row>
            )  }
           
        </div>
     );
}
 
export default Homescreen;