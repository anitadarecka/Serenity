import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";
import notifSound from "../assets/notif.mp4";

const chatContext = createContext({});

export function ChatProvider({ children }) {
  const { Provider } = chatContext;

  const [chatActive, setChatActive] = useState(false);
  const [notification, setNotification] = useState();

  const sound = () => {
    new Audio(notifSound).play();
  };

  return (
    <Provider
      value={{
        chatActive,
        setChatActive,
        notification,
        setNotification,
        sound,
      }}
    >
      {children}
    </Provider>
  );
}

ChatProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export const useChat = () => useContext(chatContext);
