import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const FeedPost = () => {

    const [posts, setposts] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/posts')
        .then((res)=>{
            setposts(res.data.posts)
            
        })
    },[])
    return (
        <section className='feed-post-section'>
            {
            posts.length > 0 ?
            posts.map((post) => {
                return (
                    <div className='feed-post'>
                        <img src={post.image} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                )
            })
            : <h2>No Posts Available</h2>
        }

        </section>
    )
}

export default FeedPost
