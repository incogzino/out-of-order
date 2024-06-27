"use client"
import React, { useEffect, useState } from 'react';
import getProduct from '../../Products/[id]/getProductsApi';

interface CheckoutPageProps {
    params: { id: string };
}

const PayPalButton: React.FC<{ product: any }> = ({ product }) => {
    console.log(product)
    const createOrder = async () => {
        const response = await fetch('http://localhost:8080/payments/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: product.productId }),
            
        });

        if (!response.ok) {
            throw new Error(`Error creating order: ${response.statusText}`);
        }

        const data = await response.json();
        return data.id; // Return the order ID
    };

    const onApprove = async (data: { orderID: string }) => {
        const response = await fetch('http://localhost:8080/payments/capture-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId: data.orderID }),
        });

        if (!response.ok) {
            throw new Error(`Error capturing payment: ${response.statusText}`);
        }

        await response.json();
        alert('Transaction completed');
    };

    return (
        <div className="checkout-card-container">
            <div className="card">
                <img src={product.image} alt={product.productName} />
                <br />
                <span>{product.productName}</span>
                <br />
                <span>Price: £{product.price}</span>
                <br />
                <button
                    onClick={async () => {
                        try {
                            const orderId = await createOrder();
                            window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
                        } catch (error) {
                            console.error('Error creating order:', error);
                        }
                    }}
                >
                    Pay with PayPal
                </button>
            </div>
        </div>
    );
};

const App: React.FC<CheckoutPageProps> = ({ params }) => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProduct(params.id);
                setProduct(fetchedProduct);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return <PayPalButton product={product} />;
};

export default App;