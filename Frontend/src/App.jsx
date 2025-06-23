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
      const res = await axios.get("/api/get-names"); // ✅ uses Vite proxy
      setMessage(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  async function handleSubmit() {
    if (text === "") return;

    try {
      await axios.post("/api/add-names", { name: text }); // ✅ uses Vite proxy
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
        {message.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
