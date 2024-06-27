export interface ProductData {
    productId: string
    image: string
    productName: string;
    price: string;
    info: {
      Item: string;
      Available: boolean;
      releaseDate: string;
    };
  }
  
  export default async function getProduct(productId: string): Promise<ProductData> {
  
    console.log("gets called")
          const res = await fetch( `http://127.0.0.1:8080/products/${productId}`)
          if (!res.ok) {
              throw new Error(`failed to fetch user ${productId}`)
          }
  
          return res.json() as Promise<ProductData>
      }
  