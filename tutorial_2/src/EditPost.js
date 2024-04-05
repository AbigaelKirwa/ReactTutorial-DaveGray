import React, { useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useStoreActions, useStoreState } from 'easy-peasy'

const EditPost = () => {
    const navigate= useNavigate()
    const params = useParams();
    const id = params.id
    
    const editTitle = useStoreState((state)=>state.editTitle);
    const setEditTitle = useStoreActions((action)=>action.setEditTitle)

    const editBody = useStoreState((state)=>state.editBody)
    const setEditBody = useStoreActions((action)=>action.setEditBody)
    const editPost = useStoreActions((action)=>action.editPost)

    const getPostById= useStoreState((state)=>state.getPostById)
    const post = getPostById(id)

    useEffect(()=>{
      if(post){
          setEditTitle(post.title)
          setEditBody(post.body)
      } 
  }, [post, setEditTitle, setEditBody])

    const handleEdit = (id)=>{
      const datetime =  format(new Date(), "MMMM dd yyyy pp" )
      const updatePost = {id, title:editTitle, datetime, body:editBody}
      editPost(updatePost)
      navigate(`/post/${id}`)
    }

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