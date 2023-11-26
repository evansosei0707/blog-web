import { createStore, action, thunk, computed } from "easy-peasy";
import client from "./api/post";


export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    search: "",
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    postBody: "",
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    postTitle: "",
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    editTitle: "",
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: "",
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    getPostCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
       return(id) => state.posts.find((post) => (post.id).toString() === id)}),
    savePost: thunk( async (actions, newPost, Helpers) => {
        const { posts } = Helpers.getState();
        try {
            const response = await client.post('/blog' , newPost);
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle('');
            actions.setPostBody(''); 
            } catch (err) {
              console.log(err.message);
            }
    }),
    deletePost: thunk( async (actions, id, Helpers) => {
        const { posts } = Helpers.getState();
        try {
            const postsList = posts.filter(post => post.id !== id);
            await client.delete(`/blog/${id}`);
            actions.setPosts(postsList);
            } catch (err) {
              console.log(err.message);
            }
    }),
    editPost: thunk( async (actions, updatedPost, Helpers) => {
            const { posts } = Helpers.getState()
            const { id } = updatedPost;
            try {
            const response = await client.put(`/blog/${id}`, updatedPost);
            actions.setPosts( posts.map(post => (post.id).toString() === id ? {...response.data} : post));
               // actions.setEditTitle('');   
               // actions.setEditBody('');   
            } catch (err) {   
                console.log(err.message);
            }
            
        })


});