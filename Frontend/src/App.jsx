// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [text, setText] = useState("");
//   const [message, setMessage] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   async function getData() {
//     try {
//       const res = await axios.get("/get-names"); // ✅ uses Vite proxy
//       setMessage(res.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   }

//   async function handleSubmit() {
//     if (text === "") return;

//     try {
//       await axios.post("/add-names", { name: text }); // ✅ uses Vite proxy
//       setText("");
//       getData();
//     } catch (err) {
//       console.error("Failed to send message", err);
//     }
//   }

//   return (
//     <div>
//       <h1>Node Message App</h1>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type message..."
//       />
//       <button onClick={handleSubmit}>Send</button>

//       <ul>
//         {message.map((item, index) => (
//           <li key={index}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await axios.get("/get-names"); // ✅ Vite proxy endpoint
      console.log("API response:", res.data);

      // Ensure it's an array
      if (Array.isArray(res.data)) {
        setMessage(res.data);
      } else {
        console.error("Expected an array but got:", res.data);
        setMessage([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage([]);
    }
  }

  async function handleSubmit() {
    if (text.trim() === "") return;

    try {
      await axios.post("/add-names", { name: text }); // ✅ Vite proxy endpoint
      setText("");
      getData();
    } catch (err) {
      console.error("Failed to send message", err);
    }
  }

  return (
    <div>
      <h1>Node Message App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSubmit}>Send</button>

      <ul>
        {Array.isArray(message) && message.length > 0 ? (
          message.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))
        ) : (
          <li>No messages available</li>
        )}
      </ul>
    </div>
  );
}

export default App;

