import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate= useNavigate()
  const {width} = useWindowSize()

  const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts")

  useEffect(()=>{
    setPosts(data)
  },[data])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const id = posts.length ? (parseInt(posts[posts.length-1].id)+1).toString() : "1"
    const datetime =  format(new Date(), "MMMM dd yyyy pp" )
    const newPost = {id, title:postTitle, datetime, body:postBody}
    try{
      const response = await api.post("/posts", newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostBody('')
      setPostTitle('')
      navigate('/')
    }
    catch(err){
      console.log(err.response.data)
    }
  }

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

  useEffect(()=>{
    const filteredResults = posts.filter(post=>
        ((post.body).toLowerCase()).includes((search).toLowerCase())
        ||
        ((post.title).toLowerCase()).includes((search).toLowerCase())
      )
      setSearchResults(filteredResults.reverse())
  }, [posts, search])

  return (
    <div className="App">
      <Header title="React JS Blog" width={width}/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home fetchError={fetchError} isLoading={isLoading} posts={searchResults}/>}/> 
        <Route path='/post' element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} postBody={postBody} setPostTitle={setPostTitle} setPostBody={setPostBody}/>}/>
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit}/>}/>
        <Route path='/edit/:id' element={<EditPost posts={posts} editBody= {editBody} editTitle={editTitle} setEditTitle={setEditTitle} setEditBody={setEditBody} handleEdit={handleEdit}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/> 
    </div>
  );
}

export default App;
