import React, { useEffect } from "react";
import { Container,Button,Collapse, Col, Row ,Table} from "react-bootstrap";
import { useState } from "react";

export default function CreateBill()
{

const [ open, setOpen] = useState(false);
const [customers,setCustomers] = useState([]);
const [products,setProducts] = useState([]);

const [selectedCustomer,setSelectedCustomer] = useState(1);
const [selectedProduct,setSelectedProduct] = useState(1);
const [quantity,setQuantity] = useState(0);

const [productsToAdd,setProductsToAdd] = useState([]);

useEffect(()=>{

},[]);



let fetchCustomers = ()=>{
    fetch("http://localhost:8080/customers?page=0").then(Response=>{
        if(Response.ok)
        {
            return Response.json()
        }else{
            throw new Error();
        }
    }).catch((Error)=>{
      console.log(Error);
    }).then(Data=>{
                  
        setCustomers(Data);
        console.log(customers);
    })
};

let fetchProducts = ()=>{
    fetch("http://localhost:8080/products?page=0").then(Response=>{
        if(Response.ok)
        {
            return Response.json()
        }else{
            throw new Error();
        }
    }).catch((Error)=>{
      console.log(Error);
    }).then(Data=>{
                  
        setProducts(Data);
        console.log(products);
    })
    

}


let addProductsToList=()=>{
    let productObj = {
        "productId": selectedProduct,
        "quantity": quantity
    }
    setProductsToAdd(prevState=>[...prevState,productObj]);

}

let submitBill=()=>{
    fetch("http://localhost:8080/bills?customerId="+selectedCustomer,{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(productsToAdd),
        headers: {
            "Content-type": "application/json"
        }
    }).then(Response => {
        console.log(Response.ok)
        if(Response.ok)
        {
            return Response.json();
        }else{
         throw new Error();   
        }
    })            
    .then(data=>{console.log(data);})

}


  return (
      <div>
<Container>
        
            <Button
                onClick={() => {setOpen(!open);fetchCustomers();fetchProducts();console.log(open)}}
                aria-controls="create-bill"
                aria-expanded={open}
            >
            Create Bill
            </Button>
</Container>
<Container>
            <Collapse in={open}>
                <div id="create-bill">                    
                <Container>
                    <br/>
                    <br/>
                        <form>
                            <Row>
                                <Col><label>Select Customer</label></Col><Col><select value={selectedCustomer} onChange={(e)=>{setSelectedCustomer(e.target.value);console.log(selectedCustomer)}}> {customers.map(function(customer,index){return (<option key={index} value={customer.id}>{customer.customerName}</option>)})}</select></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>Select Product</Col><Col><select value={selectedProduct} onChange={(e)=>{ setSelectedProduct(e.target.value);console.log(selectedProduct)}}> {products.map(function(product,index){ return (<option key={index} value={product.id}>{product.productName}</option>)})}</select></Col>
                            </Row>
                            <Row>
                                <Col>Quantity</Col><Col><input onChange={(e)=>{setQuantity(e.target.value)}} type="number" value={quantity} /></Col>                                
                            </Row>
                            <Row>
                                <Col><Button onClick={addProductsToList}>Add product</Button></Col>
                            </Row>
                            <Row>
                                <Col><Button onClick={submitBill}>submit</Button></Col>
                            </Row>
                        </form>
                        <Row>
                            <Col>
                            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ProductId</th>
                            <th>Quantity</th>                            
                        </tr>
                    </thead>                    
                    <tbody>        

                    {productsToAdd.map(function(product,i)
                    {
                        return(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{product.productId}</td>
                        <td>{product.quantity}</td>
                    </tr>
                        )
                        
                    }
                    )}
                                       
                    </tbody>
                    </Table>

                            </Col>
                        </Row>
                </Container>
                </div>
            </Collapse>
        
  </Container>
      </div>
    
  )  
}