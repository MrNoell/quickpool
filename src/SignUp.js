import { useState, useEffect } from 'react'

import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';

const SignUp = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

//   const readPosts = () => {
//     const db = getDatabase(app);
//     const dbRef = ref(db, 'posts/');
//     onValue(dbRef, (snapshot) => {
//       const dbTable = snapshot.val();
//       const newPosts = []
//       dbTable.forEach((dbItem) => {
//         newPosts.push(dbItem)
//       })
//       setPosts(newPosts)
//     })
//   }

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

  //function: if a user exists in the database, navigate them to the home screen
  //else, add them to the database and navigate them to home

//

  const writeUser = (userId, name, email, password) => {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      password: password
    });
  }

  const execute = () => {
    //readUsers();
    const isFound = users.some(user => {
    console.log(user);
      if (user.name === name && user.password === password && user.email === email) {
        console.log('array contains object with this specific name');
    //display alert showing to return to the Login Page
      }

      console.log('user does not exist.');
      writeUser(users.length + 1, name, email, password);
  });}


  useEffect(() => {
    readUsers()
  }, [])

  return (
    <div class="sign-up-container">
      <h1> Sign Up </h1>
      <form onSubmit={() => execute() } class="sign-up-form">
            <input type="text" placeholder='Name' class="authentication-input" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder='E-Mail' class="authentication-input" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="text" placeholder='Password' class="authentication-input" value={password} onChange={(event) => setPassword(event.target.value)} />
          <input type="submit" value="Submit" class="book-button authenticate-button" />
      </form>
      {/* {users.map(
        user => (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        )
      )} */}
    </div>
  )
}

export default SignUp;