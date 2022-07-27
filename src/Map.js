import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { app } from './firebase_config.js';
import { getDatabase, ref, onValue, set } from "firebase/database";


const center = { lat: 41.1533, lng: 20.1683}
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
  showNewPost() {
    setStyle({display: "grid", transform: "translateY(-100%)"});
  }
  }));

 const Map = () => {
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
    googleMapsApiKey: "AIzaSyCA9KbGjLsOpXOf-kPIR0M4k6e739poCI0",
    libraries: ['places'],
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
  const [style, setStyle] = useState({transform: "translateY(50%)"});

  if (!isLoaded) return <div>Loading...</div>

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
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
    destiantionRef.current.value = ''
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


  
  function showNewPost() {
    setStyle({display: "grid", transform: "translateY(-100%)"});
  }

  function hideNewPost() {
    setStyle({display: "none"});
    console.log("it's calling it")
  }

  return (
      <div id='NewPost' style={style}>
        <div id='new-post-form' onSubmit={() => writePost(posts.length + 1, from, to, time, date, price)}>
            <Autocomplete><input type='text' placeholder='Origin' ref={originRef} className="new-post-input" value={from} onChange={(event) => setFrom(event.target.value)}/></Autocomplete>
            <Autocomplete><input type='text' placeholder='Destination' ref={destiantionRef} className="new-post-input" onKeyUp={calculateRoute} value={to} onChange={(event) => setTo(event.target.value)}/></Autocomplete>
            <input type='text' placeholder='Time' className="new-post-input" value={time} onChange={(event) => setTime(event.target.value)}/>
            <input type='text' placeholder='Date' className="new-post-input" value={date} onChange={(event) => setDate(event.target.value)}/>
            <input type='text' placeholder='Price' className="new-post-input" value={price} onChange={(event) => setPrice(event.target.value)}/>
            {/* <button  type='submit' onClick={calculateRoute}>Calculate Route</button> */}
            {/* <button onClick={clearRoute}>x</button> */}
          {/* <p>Distance: {distance} </p>
          <p>Duration: {duration} </p> */}
        </div>
        <GoogleMap
          id='google-map'
          center={center}
          zoom={10}
          mapContainerStyle={{ width: '100%', height: '95%', borderRadius: 10, alignSelf: "center"}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />{directionsResponse && ( <DirectionsRenderer directions={directionsResponse} /> )}
        </GoogleMap>
        <button class='book-button post' onClick={hideNewPost}>Post</button>
      </div>
  )
}

export default Map