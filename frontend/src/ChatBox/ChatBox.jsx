import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import svg from "./assets/chat.svg";
import ContainerChat from "./ContainerChat";

function ChatBox() {
  const { chatActive, setChatActive, notification, setNotification, sound } =
    useChat();
  const socket = socketIO.connect(import.meta.env.VITE_BACKEND_URL);
  const [showNotification, setShowNotification] = useState(false);
  const { loginData } = useAuth();
  const handleShowPopup = () => {
    setChatActive(!chatActive);
    setShowNotification(false);
  };
  useEffect(() => {
    socket.on("newNotif", (notif) => {
      setNotification(notif);
    });
  }, [socket]);
  useEffect(() => {
    if (
      notification &&
      !chatActive &&
      loginData.data.id !== notification.from_user_id &&
      notification.to_user_id === loginData.data.id
    ) {
      setShowNotification(true);
      sound();
    }
  }, [notification]);

  return (
    <div>
      <div className="fixed bottom-5 right-5 bg-violet-two h-16 w-16 rounded-full flex justify-center items-center z-50">
        <img
          src={svg}
          alt="chat"
          className="w-full h-full cursor-pointer"
          onClick={handleShowPopup}
          role="presentation"
        />
        {showNotification && (
          <div className="absolute right-1 top-0 w-[14px] h-[14px] bg-btn-notification rounded-full" />
        )}
      </div>
      {chatActive && <ContainerChat loginData={loginData} />}
    </div>
  );
}

export default ChatBox;
