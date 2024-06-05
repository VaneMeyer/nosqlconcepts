import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import InputBox from "./InputBox";
//import "../assets/ChatWindow.css" // For custom styles

/* const API_KEY = process?.env?.GEMINI_API_KEY
console.log(process.env.GEMINI_API_KEY) */
const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Header = () => {
  return (
    <div className="header">
      <h1 id="chat-header"></h1>
    </div>
  );
};

const ChatWindow = ({ task, partialSolution }) => {
  task = "testtask Calculate 4+5";
  partialSolution = "4+5 = 9";
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const user = localStorage.getItem("token");
  useEffect(() => {
    // Auto-scroll to the bottom of the chat container when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (partialSolution) => {
    if (!partialSolution) {
      return;
    }
    // Update messages with the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: `This is the question of ${task}.of this partial solution${partialSolution}`,
        sender: `user`,
        timestamp: new Date(),
      },
    ]);
    setLoading(true);
    try {
      const result = await model.generateContent(partialSolution);
      const text = result.response.text();
      console.log(100, text);
      // Check if the response is code before updating messages
      const isCode = text.includes("```");
      // Update messages with the AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
          isCode, // Add a flag to identify code snippets
        },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("generateContent error: ", error);
    }
  };

  return (
    <div className={`chat-window`}>
      <Header />

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "ai"}`}
          >
            {message.isCode ? (
              <MDEditor.Markdown
                source={message.text}
                style={{ whiteSpace: "pre-wrap" }}
              />
            ) : (
              <>
                <p className="message-text">{message.text}</p>
                <span
                  className={`time ${
                    message.sender === "user" ? "user" : "ai"
                  }`}
                >
                  {message.timestamp
                    ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss")
                    : ""}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      <InputBox
        sendMessage={sendMessage}
        solution={partialSolution}
        loading={loading}
      />
    </div>
  );
};

export default ChatWindow;
