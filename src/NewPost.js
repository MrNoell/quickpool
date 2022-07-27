
import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';
import { useNavigate } from 'react-router-dom'

function NewPost() {
    const [posts, setPosts] = useState([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [name, setName] = useState("")

    const writePost = (postId, from, to, time, date, price) => {
        const db = getDatabase(app);
        set(ref(db, 'posts/' + postId), {
            from: from,
            to: to,
            time: time,
            date: date,
            price: price,
            name: "Rick Astley",
            isBooked: false
        });
    }

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
        <div>
            <form onSubmit={() => writePost(posts.length + 1, from, to, time, date, price, name)} className="newpost-form-container">
                <div>
                    <label>
                        From:
                        <input type="text" value={from} onChange={(event) => setFrom(event.target.value)} className="newpost-input"/>
                    </label>
                </div>
                <div>
                    <label>
                        To:
                        <input type="text" value={to} onChange={(event) => setTo(event.target.value)} className="newpost-input"/>
                    </label>
                </div>
                <div>
                    <label>
                        Time:
                        <input type="text" value={time} onChange={(event) => setTime(event.target.value)} className="newpost-input" />
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input type="text" value={date} onChange={(event) => setDate(event.target.value)} className="newpost-input" />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} className="newpost-input" />
                    </label>
                </div>

                <div>
                    <input type="submit" value="Submit" className="book-button" />
                </div>
            </form>
        </div>
    )
}

export default NewPost