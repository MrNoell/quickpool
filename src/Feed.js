import { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { app } from './firebase_config.js';
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'

const center = { lat: 41.1533, lng: 20.1683 }

function Post(props) {
    const updatePost = (index) => {
        const db = getDatabase(app);
        update(ref(db, 'posts/' + index), {
            isBooked: true
        });
    }

    return (
        <>
            <div className="post-container">
                <div className="div1"><div class='circle'></div>{props.name}</div>
                <div className="div2">{props.from} → {props.to}</div>
                <div className="div3">{props.time}</div>
                <div className="div4">{props.date}</div>
                <div className="div5">{props.price}</div>
                <div className="div6"><button onClick={() => updatePost(props.index)} disabled={props.isBooked} className="book-button">{props.isBooked ? "Booked" : "Book"}</button></div>
            </div>
        </>
    )
}

function Feed() {
    const [nameSearch, setNameSearch] = useState("");

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

    getCurrentLocation(center);

    const [posts, setPosts] = useState([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")

    const writePost = (postId, from, to, time, date, price) => {
        const db = getDatabase(app);
        set(ref(db, 'posts/' + postId), {
            from: from,
            to: to,
            time: time,
            date: date,
            price: price,
            name: "Bollano",
            isBooked: false
        });
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDp26-C8mLKJkUHwpCklhaAt2YN0gqUbkk",
        libraries: ['places'],
    })

    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()
    const [style, setStyle] = useState({ transform: "translateY(-100%)", transition: "transform 0s ease-in-out" });

    if (!isLoaded) return <div>Loading...</div>

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    function getCurrentLocation(center) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {
                latitude,
                longitude
            } = position.coords;
            center.lat = position.coords.latitude;
            center.lng = position.coords.longitude;
        }, () => {
            console.log("Failed to get Location")
        });
    }

    function toggleNewPost() {
        let styleDuplicate = { ...style };
        styleDuplicate.transform = (style.transform == "translateY(50%)") ? "translateY(-100%)" : "translateY(50%)";
        styleDuplicate.transition = "transform 0.45s ease-in-out"
        setStyle(styleDuplicate)
    }
    return (
        <div className="feed">

            <form className="search">
                <div>
                    <input type="text" value={nameSearch} onChange={(event) => { setNameSearch(event.target.value) }} className="search-input" placeholder="Filter by name" />
                </div>
            </form>

            {
                posts.filter((post, index) => {
                    if (nameSearch === "" || (post && post.name && post.name.toLowerCase().includes(nameSearch.toLowerCase()))) {
                        return <Post index={index} name={post.name} from={post.from} to={post.to} time={post.time} date={post.date} price={post.price} isBooked={post.isBooked} />
                    }
                }).map((post, index) => {
                    return (
                        <Post index={index} name={post.name} from={post.from} to={post.to} time={post.time} date={post.date} price={post.price} isBooked={post.isBooked} />
                    )
                })
            }

            <button className='newPost' onClick={toggleNewPost}>+</button>
            
            <form id='NewPost' style={style} onSubmit={() => writePost(posts.length + 1, from, to, time, date, price)}>
                <button type="button" class='exit' onClick={toggleNewPost}>✖</button>
                <div id='new-post-form'>
                    <Autocomplete><input type='text' placeholder='Origin' ref={originRef} className="new-post-input" value={from} onChange={(event) => setFrom(event.target.value)} /></Autocomplete>
                    <Autocomplete><input type='text' placeholder='Destination' ref={destinationRef} className="new-post-input" onKeyUp={calculateRoute} value={to} onChange={(event) => setTo(event.target.value)} /></Autocomplete>
                    <input type='text' placeholder='Time' className="new-post-input" value={time} onChange={(event) => setTime(event.target.value)} />
                    <input type='text' placeholder='Date' className="new-post-input" value={date} onChange={(event) => setDate(event.target.value)} />
                    <input type='text' placeholder='Price' className="new-post-input" value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <GoogleMap
                    id='google-map'
                    center={center}
                    zoom={10}
                    mapContainerStyle={{ width: '100%', height: '100%', borderRadius: 10, alignSelf: "center" }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    <Marker position={center} />{directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}
                </GoogleMap>
                <button type="submit" class='book-button post' onClick={toggleNewPost}>Post</button>
            </form> 
        </div>
    )
}

export default Feed