import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { PropTypes } from "prop-types";
import api from "@services/api";
import MessageChat from "./MessageChat";
import ContactChat from "./ContactChat";

const socket = socketIO.connect(import.meta.env.VITE_BACKEND_URL);

function ContainerChat({ loginData }) {
  const [contacts, setContacts] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [active, setActive] = useState();
  useEffect(() => {
    api
      .get("/chats", { withCredentials: true })
      .then((res) => {
        setContacts(res.data);
        socket.emit("join_room", res.data[0].chat);
        setActive({ to_user_id: res.data[0].id, chat_id: res.data[0].chat });
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-[28%] h-[70%] bg-white fixed right-5 bottom-28 rounded-2xl flex flex-col items-center ring-2 ring-gray-300 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.7)] z-50">
      {contacts && (
        <ContactChat
          socket={socket}
          contacts={contacts}
          active={active}
          setActive={setActive}
        />
      )}
      {active !== undefined && (
        <MessageChat
          socket={socket}
          typingStatus={typingStatus}
          setTypingStatus={setTypingStatus}
          active={active}
          loginData={loginData}
        />
      )}
    </div>
  );
}

ContainerChat.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  loginData: PropTypes.object.isRequired,
};

export default ContainerChat;
