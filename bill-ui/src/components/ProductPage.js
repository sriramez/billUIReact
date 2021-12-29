import React from "react";
import {Alert } from "react-bootstrap"
import CreateProduct from "./CreateProduct";
import ViewProduct from "./ViewProduct";

function ProductPage()
{
    return (
        <div>
             <Alert>Click here to create a new Product.</Alert>
            <CreateProduct />
            <br />                    
            <br />
            <Alert>Click here to view all Products.</Alert>
            <ViewProduct />
          
        </div>
    )
}

export default ProductPage;