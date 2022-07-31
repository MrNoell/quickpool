import { useState, useEffect } from 'react'

import { BrowserRouter, Link, useNavigate, Routes, Route } from 'react-router-dom';

import Feed from './Feed.js';

import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';

const SignUp = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

const readUsers = () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'users/');
    onValue(dbRef, (snapshot) => {
      const dbTable = snapshot.val();
      const newUsers = []
      dbTable.forEach((dbItem) => {
        newUsers.push(dbItem)
      })
      setUsers(newUsers)
    })
  }

  const writeUser = (userId, name, email, password) => {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      password: password
    });
  }

  const execute = () => {
    let isFound = false

    users.forEach(user => {
      console.log(user);
      console.log(name)
      console.log(password)
      console.log(email)
      if (user.name === name && user.password === password && user.email === email) {
        isFound = true
        console.log('array contains object with this specific name');
      } else {
        console.log('user does not exist.');
      }
    })

    if (!isFound) {
      writeUser(users.length + 1, name, email, password);
      navigate("/Feed");
    }
  }


  useEffect(() => {
    readUsers()
  }, [])

  return (
    <div class="sign-up-container">
      <h1> Sign Up </h1>
      <form onSubmit={() => execute() } class="sign-up-form">
            <input type="text" placeholder='Name' class="authentication-input" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder='E-Mail' class="authentication-input" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder='Password' class="authentication-input" value={password} onChange={(event) => setPassword(event.target.value)} />
          <input type="submit" value="Submit" class="book-button authenticate-button" />
      </form>
    </div>
  )
}

export default SignUp;