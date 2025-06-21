// import { useState, useEffect } from "react";

// function Login({ onLogin }) {
//   const [username, setusername] = useState("");
//   const [psswrd, setpsswrd] = useState("");
//   const [saveduser, setsaveduser] = useState("");

//   // check if a cookie exists---
//   useEffect(() => {
//     const cookieArr = document.cookie.split("; "); //get it and turn into an array format
//     const userCookie = cookieArr.find((row) => row.startsWith("username=")); //search for cookie with username
//     if (userCookie) {
//       const userValue = userCookie.split("=")[1]; //then again array it and gets usename at position 1
//       setsaveduser(decodeURIComponent(userValue)); //user was there before
//     }
//   }, []);

//   //for newusers
//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username && psswrd) {
//       document.cookie = `username=${encodeURIComponent(username)};
//       path=/; max-age=604800`;//remember for 7 days

//       setsaveduser(username);
//       setusername("");
//       setpsswrd("");
//     } else {
//       alert("please enter the credentials!!");
//     }
//   };
//   const delcookie = () => {//logout function 
//     document.cookie = "username=; path=/; max-age=0";//to delete the current user
//     setsaveduser("");
//   };
//   if (saveduser) {
//   return (
//     <div>
//       <h2>Welcome, {saveduser}!</h2>
//       <button onClick={delcookie}>Logout</button>
//     </div>
//   );
// }


//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <h1>Login</h1>
//         <input
//           type="text"
//           placeholder="Enter Username"
//           value={username}
//           autoComplete="username"
//           onChange={(e) => setusername(e.target.value)}
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="password"
//           placeholder="Enter Your Password"
//           value={psswrd}
//           onChange={(e) => setpsswrd(e.target.value)}
//           required
//         />
//         <br />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
// export default Login;
