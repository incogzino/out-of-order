import React, { useState, useEffect } from 'react';
import getReview from './getReviewsApi';
import { createReview } from '@/app/NewReview/[id]/addReviewsApi';
import Form from './form';
// import Image from '@public/JM.PNG';


interface ReviewPageProps{

    params: {id: string}
} 

async function App({ params }: ReviewPageProps) {
    

    // API gets fetched 

    const id = params.id
    console.log(id)
 
    const review = await getReview(params.id)
    console.log(review)



    {/* Review card */ }

    return (

        <div className="review-card-container">

            <div className="card">
                
                <span>{review.customer}</span>
                <br />
                <span>{review.productName}</span>
                <br />
                <span>{review.comment}</span>
            </div>
            <Form productId={params.id} />
     </div>
    )

        
}

export default App;