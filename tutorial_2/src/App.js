import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { format } from 'date-fns'


function App() {
  const [posts, setPosts] = useState([
    {
      id:1,
      title:"My first Post",
      datetime:"July 01 2021 11:17:36 AM",
      body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id:2,
      title:"My second Post",
      datetime:"August 01 2021 11:17:36 AM",
      body:"Curabitur et enim lacinia leo porttitor tempor vel a leo"
    },
    {
      id:3,
      title:"My third Post",
      datetime:"September 01 2021 11:17:36 AM",
      body:"Ut ut euismod elit, vel porttitor neque."
    },
    {
      id:4,
      title:"My fourth Post",
      datetime:"January 01 2021 11:17:36 AM",
      body:"Donec id sodales ligula. Proin suscipit,"
    }
  ])

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate= useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length-1].id+1 : 1
    const datetime =  format(new Date(), "MMMM dd yyyy pp" )
    const newPost = {id, title:postTitle, datetime, body:postBody}
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostBody('')
    setPostTitle('')
    navigate('/')
  }

  const handleDelete = (id) =>{
    const postList = posts.filter(post=> post.id !== id)
    setPosts(postList)
    navigate("/")
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
      <Header title="React JS Blog"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home posts={searchResults}/>}/> 
        <Route path='/post' element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} postBody={postBody} setPostTitle={setPostTitle} setPostBody={setPostBody}/>}/>
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/> 
    </div>
  );
}

export default App;
