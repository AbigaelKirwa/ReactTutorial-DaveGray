import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import DataProvider from './context/DataContext'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Header title="React JS Blog"/>
        <DataProvider>
          <Nav/>
          <Routes>
            <Route path='/' Component={Home}/> 
            <Route path='/post' Component={NewPost}/>
            <Route path='/post/:id' Component={PostPage}/>
            <Route path='/edit/:id' Component={EditPost}/>
            <Route path='/about' Component={About}/>
            <Route path='*' Component={Missing}/>
          </Routes>
        </DataProvider>
        <Footer/> 
    </div>
  );
}

export default App;
