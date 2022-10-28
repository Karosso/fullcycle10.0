import { useRef } from 'react';
import io from 'socket.io-client';
const API_URL = process.env.REACT_APP_API_URL as string;

const useSocketIO = () => {
  const socketIORef = useRef<SocketIOClient.Socket>();

  const connect = () => {
    if (!socketIORef.current?.connected) {
      socketIORef.current = io.connect(API_URL);
      socketIORef.current.on("connect", () => console.log("[SOCKET_IO][CONNECTED]"));
    }
  }

  return {
    socketIORef,
    connect
  }
}

export default useSocketIO;