import React from "react";
import { useState,useEffect } from "react";
import { Container,Row,Col,Button,Collapse,Table } from "react-bootstrap";

export default function ViewProduct()
{
    const [open, setOpen] = useState(false);
    const [products,setProducts] = useState([]);
    const [page,setPage] = useState(0);

    useEffect(()=>{
        fetchProducts();
    },[page])

    let fetchProducts = ()=>{
        fetch("http://localhost:8080/products?page="+page).then(Response=>{
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

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <Button
                    onClick={() => {setOpen(!open);fetchProducts()}}
                    aria-controls="view-products"
                    aria-expanded={open}
                >
                View Products
                </Button>    
                    </Col>
                   
                </Row>
                
                
                <Container>                   
                    <Row>
                        <Col>
                        <Collapse in={open}>                            
                    <div id="view-products">
                    <br />
                    <br />
                    <Row>
                    <Col>
                    <Button onClick={()=>fetchProducts()}>Refresh</Button>
                    </Col>
                    <Col>
                    <Button onClick={()=> setPage(page+1)}>Next</Button>    
                    </Col>
                    <Col>
                    <Button onClick={()=> {if(page<0) {setPage(0)} else setPage(page-1)}}>Previous</Button>    
                    </Col>
                    </Row>
                    <br />                    
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>productName</th>
                            <th>price</th>                            
                            <th>sku</th>                            
                            <th>quantity</th>                            
                        </tr>
                    </thead>                    
                    <tbody>                      
                    {products.map(function(product,i)
                    {
                        return(
                    <tr key={i}>
                        <td>{product.id}</td>
                        <td>{product.productName}</td>
                        <td>{product.price}</td>
                        <td>{product.sku}</td>
                        <td>{product.quantity}</td>
                    </tr>
                        )
                        
                    }
                    )}
                                       
                    </tbody>
                    </Table>

                    </div>
                    
                </Collapse>
                        </Col>
                    </Row>
                </Container>
                
            </Container>
        </div>
    );
}