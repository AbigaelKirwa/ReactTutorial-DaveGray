import {createStore, action, thunk, computed} from 'easy-peasy'
import api from './api/posts'

export default createStore({
    posts:[],
    setPosts:action((state, payload)=>{
        state.posts = payload
    }),
    postTitle:"",
    setPostTitle:action((state,payload)=>{
        state.postTitle = payload
    }),
    postBody:"",
    setPostBody:action((state, payload)=>{
        state.postBody = payload
    }),
    editTitle:"",
    setEditTitle:action((state,payload)=>{
        state.editTitle = payload
    }),
    editBody:"",
    setEditBody:action((state, payload)=>{
        state.editBody = payload
    }),
    search:"",
    setSearch:action((state, payload)=>{
        state.search = payload
    }),
    searchResults:[],
    setSearchResults:action((state, payload)=>{
        state.searchResults = payload
    }),
    postCount:computed((state)=>state.posts.length),
    getPostById:computed((state)=>{
        return (id)=>state.posts.find((post)=> parseInt(post.id) === parseInt(id))
    }),
    savePost: thunk(async(actions, newPost, helpers)=>{
        const {posts} = helpers.getState();
        try{
            const response = await api.post("/posts", newPost)
            actions.setPosts([...posts, response.data])
            actions.setPostBody('')
            actions.setPostTitle('')
        }
        catch(err){
        console.log(err.response.data)
        }
    }),
    deletePost: thunk(async(actions, id, helpers)=>{
        const {posts} = helpers.getState()
        try{
            await api.delete(`/posts/${id}`)
            actions.setPosts(posts.filter(post=> post.id !== id))
        } catch(err){
            console.log(err.response.data)
        }
    }),
    editPost: thunk(async(actions, updatePost, helpers)=>{
        const {posts} = helpers.getState()
        const {id} = updatePost;
        try{
            const response = await api.put(`/posts/${parseInt(id)}`, updatePost)
            actions.setPosts(posts.map((post)=>parseInt(post.id) === parseInt(id) ? {...response.data} : post))
            actions.setEditTitle('')
            actions.setEditBody('')
        }catch(err){
            console.log(err.response.data)
            console.log(err.response.status)
        }
    })

})
