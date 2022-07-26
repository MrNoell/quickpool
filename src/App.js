import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Feed from './Feed.js';
import NewPost from './NewPost.js';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <li>
            <Link to="/">Feed</Link>
          </li>
          <li>
            <Link to="/newPost">New Post</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </nav>

        <Routes>
          <Route index element={<Feed />} />
          <Route path={"newPost/"} element={<NewPost />} />
          <Route path={"profile/"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
