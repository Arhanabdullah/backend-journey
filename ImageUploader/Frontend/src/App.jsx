import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreatePost from './Components/CreatePost'
import FeedPost from './Components/FeedPost'
const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<CreatePost />}></Route>
                <Route path='/feed' element={<FeedPost />}></Route>
            </Routes>
        </div>
    )
}

export default App
