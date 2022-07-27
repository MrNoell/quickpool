import Feed from "./Feed";
import profile_picture from "./img/profile_picture.jpg"

function Profile() {
    return (
        <div className="profile">
            <div className="profile-img-container">
                <img src={profile_picture} className="profile-picture"/>
            </div>
            <div className="profile-name-container">
                <h1 className="profile-name">Rick Astley</h1>
            </div>
            <div className="profile-contact-container">
                <p>mockemail@gmail.com<br/>Born Oct 1999<br/>Joined Mar 2015</p>
                <button onClick={() => {}} className="book-button">Edit Profile</button>
            </div>
            <div className="profile-history-container">
                <h2>History (20)</h2>
                {/* <Feed /> */}
            </div>
        </div>
    )
}

export default Profile