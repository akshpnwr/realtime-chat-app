/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// Create the SocketContext
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContext = createContext();

// Create the SocketContext Provider component
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // Connect to the socket server
      // https://chat-application-sm9b.onrender.com"
      ("");
      const socket = io("http://localhost:5000/", {
        query: { userId: authUser._id },
      }); // Replace with your server URL

      // Set the socket in the state
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      // Clean up the socket connection on component unmount
      return () => {
        socket.disconnect();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
