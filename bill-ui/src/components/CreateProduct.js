import { Alert } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"; 
import { Collapse,Spinner } from "react-bootstrap";

function CreateProduct()
{
    const [open, setOpen] = useState(false);
    const [productName,setProductName] = useState("");
    const [price,setPrice] = useState(0);
    const [sku,setSku] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [alertVar,setAlertVar] = useState("");
    const [validationStatus,setValidation] = useState(false);

    let handleChange = function()
    {
        if(validateInput())
        {
            createProductInDb();
        }

        
    };

    let createProductInDb = function()
    {
        
            fetch("http://localhost:8080/products",{
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({id:0,productName:productName,price:price,sku:sku,quantity:quantity}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            
            .then(Response => {
                console.log(Response.ok)
                if(Response.ok)
                {
                    return Response.json();
                }else{
                 throw new Error();   
                }
            })            
            .then(data=>{console.log(data);setValidation(false);setAlertVar(productName+" created successfully")})
            .catch(()=>{
                setAlertVar("failed to create product");
                setValidation(false);
            })  
            

         
    }

    let validateInput = function()
    {        
        if(productName==="")
        {
            setAlertVar("Product name is Empty");
            return false;
        }            
        else if(price===0)
        {
            setAlertVar("price is Empty");
            return false;
        }
        else if(sku==="")
         {  
            setAlertVar("sku is Empty");  
            return false
         }   
        else if(quantity===0)
        {
            setAlertVar("quantity is Empty");
            return false;          
        }            
        else
        {
            setValidation(true);
            return true;
        }
            
        
    };

  return (
    <div>
    <br />
    <Container>
        <>
        <Button
        onClick={() => setOpen(!open)}
        aria-controls="create-product"
        aria-expanded={open}
      >
        Create Product
      </Button>
      <Collapse in={open}>
        <div id="create-product">
            <Container>
                <br/>
                <br/>
            <form>
                <Row>
                    <Col><label>Product Name:</label></Col>
                    <Col><input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}}/></Col>
                </Row>
                <Row>
                    <br />
                </Row>
                 <Row>
                     <Col><label> Price:</label></Col>
                     <Col><input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}/></Col>
                 </Row>
                 <Row>
                    <br />
                </Row>
                 <Row>
                    <Col><label>Sku:</label></Col>
                    <Col><input type="text" value={sku} onChange={(e)=>{setSku(e.target.value)}}/></Col>
                </Row>
                <Row>
                    <br />
                </Row>
                <Row>
                    <Col><label>quantity:</label></Col>
                    <Col><input type="text" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/></Col>
                </Row>
                <Row>
                    <br />
                </Row>
                 <Row>
                     <Col>
                     <Button variant="dark" onClick={handleChange}>Create</Button>
                     </Col>
                 </Row>
                 
            </form>
            <br />
            <br />
            {validationStatus?(<Spinner animation="border" variant="primary" />):(alertVar==="" ? <Alert variant="primary">Enter the details</Alert>:<Alert variant="primary">{alertVar}</Alert>)}

            </Container>
            
        </div>
      </Collapse>
    </>
    </Container>
    </div>
  );
}

export default CreateProduct;


