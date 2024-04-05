import React from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { useStoreState, useStoreActions} from 'easy-peasy'


const PostPage = () => {
  const navigate = useNavigate()
  const params = useParams();
  const id = params.id
  const deletePost = useStoreActions((actions)=>actions.deletePost)
  const getPostById = useStoreState((state)=>state.getPostById)
  const post = getPostById(id)
  const handleDelete = (id) =>{
    deletePost(id)
    navigate('/')
  }

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