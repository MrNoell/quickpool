import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Feed from './Feed.js';
import NewPost from './NewPost.js';
import Profile from './Profile';
import logo from './img/logo.png';
import SignUp from './SignUp';
import LogIn from './LogIn';

function App() {
  console.log()
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <li>
            <Link to="/Feed"><img src={logo} className="logo"/></Link>
          </li>
          <li>
            <Link to="/Feed">Feed</Link>
          </li>
          <li>
            <Link to="/newPost">New Post</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </nav>

        <Routes>
          <Route index element={<SignUp />} />
          <Route path={"newPost/"} element={<NewPost />} />
          <Route path={"profile/"} element={<Profile />} />
          <Route path={"Feed/"} element={<Feed/>}/>
          <Route path={"logIn/"} element={<LogIn/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;