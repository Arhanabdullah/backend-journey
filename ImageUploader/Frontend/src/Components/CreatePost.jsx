import React from 'react'

const CreatePost = () => {
    return (
        <section className='create-post-section'>
            <h1>Create Post</h1>
            <form >
                <input type="file" name='image' required accept='image/*' />
                <input type="text" name='caption' placeholder='Enter Caption' required />
                <button>Submit</button>
            </form>
        </section>
    )
}

export default CreatePost
