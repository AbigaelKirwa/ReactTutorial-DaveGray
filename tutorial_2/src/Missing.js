import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
         <h2>Post not found</h2>
          <p>Well this is dissapointing!</p>
          <p>
            <Link to="/">Click to visit our Home page</Link>
          </p>
    </main>
  )
}

export default Missing