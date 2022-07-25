import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [name, setName] = useState("")

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

    const writePost = (postId, from, to, time, date, price, name) => {
        const db = getDatabase(app);
        set(ref(db, 'posts/' + postId), {
            from: from,
            to: to,
            time: time,
            date: date,
            price: price,
            name: name,
            isBooked: false
        });
    }

    useEffect(() => {
        readPosts()
    }, [])

    return (
        <>
            <form onSubmit={() => writePost(posts.length + 1, from, to, time, date, price, name)}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    </label>
                    <label>
                        From:
                        <input type="text" value={from} onChange={(event) => setFrom(event.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        To:
                        <input type="text" value={to} onChange={(event) => setTo(event.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Time:
                        <input type="text" value={time} onChange={(event) => setTime(event.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input type="text" value={date} onChange={(event) => setDate(event.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
                    </label>
                </div>

                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
            {posts.map(
                post => (
                    <div>
                        <p>{post.from}</p>
                        <p>{post.to}</p>
                        <p>{post.time}</p>
                        <p>{post.date}</p>
                        <p>{post.price}</p>
                        <p>{post.name}</p>
                    </div>
                )
            )}
        </>
    )
}

export default Posts;