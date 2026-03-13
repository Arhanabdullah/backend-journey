import React from 'react'
import { Routes, Route } from 'react-router-dom'
const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<h2>Home Page</h2>}></Route>
                <Route path='/about' element={<h2>About Page</h2>}></Route>
            </Routes>
        </div>
    )
}

export default App
