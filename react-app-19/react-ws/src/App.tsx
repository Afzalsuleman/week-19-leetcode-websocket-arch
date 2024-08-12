import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message,setMessage] = useState("");
  const [sm,setSm] = useState("");
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket);
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMessage(message.data)
    }
    return () => newSocket.close();
  }, [])
  if (!socket) {
    return
    <div>
      loading...
    </div>
  }
  return (
    <> 
    <input onChange={(e)=>{
      setSm(e.target.value)
    }}></input>
    <button onClick={() =>{
      socket.send(sm)
    }}>send</button>
  {message}
    </>
  )
}

export default App
