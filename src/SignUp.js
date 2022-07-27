import { useState, useEffect } from 'react'

import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from './firebase_config.js';

const Users = () => {
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


  const writeUser = (userId, name, email, password) => {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      password: password
    });
  }

  useEffect(() => {
    readUsers()
  }, [])

  return (
    <>
      <form onSubmit={() => writeUser(users.length + 1, name, email, password)}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      {users.map(
        user => (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        )
      )}
    </>
  )
}

export default Users;