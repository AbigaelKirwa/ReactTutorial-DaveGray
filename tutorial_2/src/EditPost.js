import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPost = ({posts, handleEdit, editTitle, editBody, setEditTitle, setEditBody}) => {
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