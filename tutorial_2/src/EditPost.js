import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'
import api from './api/posts'
import { format } from 'date-fns'

const EditPost = () => {
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const navigate= useNavigate()
    const {posts, setPosts} = useContext(DataContext)
    const handleEdit = async (id)=>{
        const datetime =  format(new Date(), "MMMM dd yyyy pp" )
        const updatePost = {id, title:editTitle, datetime, body:editBody}
        const post = posts.find((post)=>parseInt(post.id) === parseInt(id))
        console.log(parseInt(post.id))
        console.log(parseInt(id))
        try{
          const response = await api.put(`/posts/${parseInt(id)}`, updatePost)
          setPosts(posts.map((post)=>parseInt(post.id) === parseInt(id) ? {...response.data} : post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
        }catch(err){
          console.log(err.response.data)
          console.log(err.response.status)
    
        }
    }
    const {id} = useParams()
    const post = posts.find((post)=>parseInt(post.id) === parseInt(id))

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        } 
    }, [post, setEditTitle, setEditBody])
  return (
    <main className='NewPost'>
        {editTitle && 
            <>
                <h2>New Post</h2>
                <form className='newPostForm' onSubmit={(e)=>{e.preventDefault(); handleEdit(id)}}>
                    <label htmlFor='postTitle'>New Title</label>
                    <input
                    id='editTitle'
                    type='text'
                    required
                    value={editTitle}
                    onChange={(e)=>setEditTitle(e.target.value)}
                    />
                    <label htmlFor='editBody'>New Body</label>
                    <textarea
                    id='editBody'
                    required
                    value={editBody}
                    onChange={(e)=>setEditBody(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </>
        }
        {
            !editTitle && 
            <>
                <h2>Post not found</h2>
                <p>Well this is dissapointing!</p>
                <p>
                  <Link to="/">Click to visit our Home page</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditPost