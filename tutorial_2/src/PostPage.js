import React from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'
import api from './api/posts'


const PostPage = () => {
  const {posts, setPosts} = useContext(DataContext)
  const handleDelete = async (id) =>{
    try{
        await api.delete(`/posts/${id}`)
        const postList = posts.filter(post=> post.id !== id)
        setPosts(postList)
        navigate("/")
    } catch(err){
        console.log(err.response.data)
    }
  }
  const navigate = useNavigate()
  const params = useParams();
  const id = params.id
  const post = posts.find(post=>(parseInt(post.id)) === parseInt(id))
  return (
    <main className='PostPage'>
        <article className='post'>
            {
              post && 
              <>
                <h2>{post.title}</h2>
                <p className='postDate'>{post.datetime}</p>
                <p className='postBody'>{post.body}</p>
                <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete Post</button>
                <Link to={`/edit/${post.id}`}>
                  <button className='editButton'>Edit Post</button>
                </Link>
              </>
            }
            {
              !post &&
              <>
                <h2>Post not found</h2>
                <p>Well this is dissapointing!</p>
                <p>
                  <Link to="/">Click to visit our Home page</Link>
                </p>
              </>
            }
        </article>
    </main>
  )
}

export default PostPage