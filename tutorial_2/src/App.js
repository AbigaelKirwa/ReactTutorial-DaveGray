import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useStoreActions } from 'easy-peasy'


function App() {
  const setPosts = useStoreActions((actions)=>actions.setPosts)
  const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts")

  useEffect(()=>{
      setPosts(data)
  },[data, setPosts])
  return (
    <div className="App">
        <Header title="React JS Blog"/>
          <Nav/>
          <Routes>
            <Route path='/' element={<Home fetchError={fetchError} isLoading={isLoading}/>}/>
            <Route path='/post' Component={NewPost}/>
            <Route path='/post/:id' Component={PostPage}/>
            <Route path='/edit/:id' Component={EditPost}/>
            <Route path='/about' Component={About}/>
            <Route path='*' Component={Missing}/>
          </Routes>
        <Footer/> 
    </div>
  );
}

export default App;
