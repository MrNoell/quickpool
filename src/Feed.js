import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';

function Post(props) {
    return (
        <div className="post-container">
            <div className="div1">{props.name}</div>
            <div className="div2">{props.from} - {props.to}</div>
            <div className="div3">{props.time}</div>
            <div className="div4">{props.date}</div>
            <div className="div5">{props.price}</div>
            <div className="div6"><button>Book</button></div>
        </div>
    )
    //loc, time, date, price, button
}

function Feed() {
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
        <div className="feed">
            <h1>Find a trip:</h1>
            {
                posts.map(
                    post => (
                        <Post name={post.name} from={post.from} to={post.to} time={post.time} date={post.date} price={post.date}/>
                    )
                )
            }
        </div>
    )
}

export default Feed