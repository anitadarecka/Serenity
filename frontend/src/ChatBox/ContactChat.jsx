import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useChat } from "../contexts/ChatContext";

function ContactChat({ socket, contacts, active, setActive }) {
  const joinChat = (chat, userId) => {
    socket.emit("join_room", chat);
    setActive({ to_user_id: userId, chat_id: chat });
  };
  const { notification, setNotification, sound } = useChat();
  const handleOnclick = (chat, id) => {
    joinChat(chat, id);
    if (chat === notification.chat_id) {
      setNotification();
    }
  };
  const [isActive, setIsActive] = useState("");
  useEffect(() => {
    if (active && notification) {
      setIsActive(active.chat_id);
      if (active.chat_id === notification.chat_id) {
        setNotification();
      }
    }
  }, [active, notification]);
  useEffect(() => {
    if (notification && active) {
      if (active.chat_id !== notification.chat_id) {
        sound();
      }
    }
  }, [notification]);
  return (
    <div className="w-full h-[18%] bg-background-lighty rounded-t-2xl flex gap-6 justify-center items-center p-3">
      {contacts &&
        contacts.map((el) => {
          return (
            <div
              key={el.id}
              className="flex flex-col justify-center items-center"
            >
              <div
                className="relative w-[50px] h-[50px] bg-gray-300 rounded-full text-2xl text-gray-500 flex justify-center items-center cursor-pointer"
                role="presentation"
                onClick={() => handleOnclick(el.chat, el.id)}
              >
                {notification &&
                  el.chat === notification.chat_id &&
                  isActive &&
                  el.chat !== isActive && (
                    <div className="absolute right-1 top-0 w-[10px] h-[10px] bg-btn-notification rounded-full" />
                  )}
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${el.image}`}
                  alt="avatar"
                />
              </div>
              <div className="text-sm text-gray-700 flex text-center ">
                {`${el.firstname} ${el.lastname}`}
              </div>
            </div>
          );
        })}
    </div>
  );
}

ContactChat.propTypes = {
  active: PropTypes.shape({
    chat_id: PropTypes.number.isRequired,
  }).isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      chat: PropTypes.number.isRequired,
    })
  ).isRequired,
  setActive: PropTypes.func.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default ContactChat;
