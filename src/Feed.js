import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, set, update} from "firebase/database";
import { app } from './firebase_config.js';
import Map from './Map.js';

function Post(props) {
    // const [disable, setDisable] = useState(false);



    // const [booked, setBooked] = useState("Book")

    // function bookRide() {
    //     setBooked("Booked")
    // }

    const updatePost = (index) => {
        const db = getDatabase(app);
        update(ref(db, 'posts/' + index), {
            isBooked: true
        });
        
    }

    return (
        <div className="post-container">
            <div className="div1">{props.name}</div>
            <div className="div2">{props.from} - {props.to}</div>
            <div className="div3">{props.time}</div>
            <div className="div4">{props.date}</div>
            <div className="div5">{props.price}</div>
            <div className="div6"><button onClick={() => updatePost(props.index)} disabled={props.isBooked} className="book-button">{props.isBooked ? "Booked" : "Book"}</button></div>
        </div>
    )
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
            <h1>Find a trip</h1>
            {
                posts.map(
                    (post, index) => (
                        <Post index={index} name={post.name} from={post.from} to={post.to} time={post.time} date={post.date} price={post.price} isBooked={post.isBooked}/>
                    )
                )
            }
            <div className='newPost'>+</div>
            <Map/>
        </div>
    )
}

export default Feed