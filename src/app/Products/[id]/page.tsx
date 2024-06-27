import React, { useState, useEffect } from 'react';
import getProduct from './getProductsApi';
import { Style } from 'util';
import Link from 'next/link';
import styles from './page.module.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";



interface ProductPageProps{

    params: {id: string}
} 

async function App({ params }: ProductPageProps) {

    // API gets fetched 

    const id = params.id
    console.log(id)
 
    const product = await getProduct(params.id)
    console.log(product)

    
    {/* Product card */ }


    return (

        <div className="product-card-container">

            <div className="card">
                <img src={product.image} /> 
                <br />
                <span>{product.productName}</span>
                <br />
                <span>Price: £{product.price}</span>
                <br />
                <Link href={`/Checkout/${id}`}>
                <button className={styles.button56} role="button">
                    Buy Now 
                </button>
                </Link>
                <hr />

            

            {/* Display product information in a dropdown */}

            <details style = {{color: 'white'}}>
                <summary>Product Info</summary>
                <table>
                    <tbody>
                        <tr>
                            <td>Item</td>
                            <td>{product.Item}</td>
                        </tr>
                        <tr>
                            <td>Release Date:</td>
                            <td>{product.releaseDate}</td>
                        </tr>
                        
                        <tr>
                            <Link href={`/Reviews/${product.productId}`}>
                            <h3 className='review-link'style={{ textDecoration: "none!important" }}></h3>
                            <button className={styles.button56} role="button">
                                View the reviews for this product 
                            </button>
                            </Link>
                            
                        </tr>
                    </tbody>
                </table>
            </details>
            </div>
        </div>
    )
}

export default App;