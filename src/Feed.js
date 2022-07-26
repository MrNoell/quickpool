import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';

function Post() {
    const [posts, setPosts] = useState([])

    const readPosts = () => {
        const db = getDatabase(app);
        const dbRef = ref(db, 'posts/');
        onValue(dbRef, (snapshot) => {
            const dbTable = snapshot.val();
            const newPosts = []
            dbTable.forEach((dbItem) => {
                newPosts.push(dbItem)
            })
            setPosts(newPosts)
        })
    }

    useEffect(() => {
        readPosts()
    }, [])

    return (
        <>
            {
                posts.map(
                    post => (
                        <div className="post-container">
                            <div className="div1">{post.name}</div>
                            <div className="div2">{post.from} - {post.to}</div>
                            <div className="div3">{post.time}</div>
                            <div className="div4">{post.date}</div>
                            <div className="div5">{post.price}</div>
                            <div className="div6"><button>Book</button></div>
                        </div>
                    )
                )
            }
        </>

    )
    //loc, time, date, price, button
}

function Feed() {
    return (
        <div className="feed">
            <Post />
        </div>
    )
}

export default Feed