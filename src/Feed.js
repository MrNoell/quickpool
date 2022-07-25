function Post() {
    return (
        <div className="post-container">
            <div className="div1">Name</div>
            <div className="div2">Location</div>
            <div className="div3">Time</div>
            <div className="div4">Date</div>
            <div className="div5">Price</div>
            <div className="div6">Button</div>
        </div>
    )
    //loc, time, date, price, button
}

function Feed() {
    return (
        <div className="feed">
            <h1>Find a trip</h1>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Feed