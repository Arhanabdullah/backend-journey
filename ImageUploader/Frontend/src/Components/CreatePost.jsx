import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CreatePost = () => {

    const navigate = useNavigate();
    const submitHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        await axios.post('http://localhost:3000/create-post', formData)
        .then((res)=>{
            console.log(res);
            navigate('/feed')
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    return (
        <div className='create-post-section sm:h-screen md:h-screen w-full m-auto flex flex-col items-center gap-5'>
            <h1>Create Post</h1>
            <form onSubmit={submitHandler} >
                <input type="file" name='image' required accept='image/*' />
                <input type="text" name='caption' placeholder='Enter Caption' required />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost
