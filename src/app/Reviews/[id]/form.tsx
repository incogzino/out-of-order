"use client"
import { createReview } from "@/app/NewReview/[id]/addReviewsApi";
import { useState } from "react";
import { ReviewData } from "./getReviewsApi";
export default function Form({ productId }: { productId: string }) {

    const [customer, setCustomer] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    async function createHandler() {
        const response = await createReview(productId,customer,comment);
        console.log(response)
    }

    return (
        <div className="review-card-container">

            <div className="card"> 
              <form>
                <span>Name:</span>
                <input type="text" id="customer" onChange={(e) => setCustomer(e.target.value)}/>
                <br />
                <span>Product review:</span>
                <input type="text" id="comment" onChange={(e) => setComment(e.target.value)}/>
                <button onClick={createHandler}> </button>
                </form>      
            </div>
     </div>
        
        
    )
}

