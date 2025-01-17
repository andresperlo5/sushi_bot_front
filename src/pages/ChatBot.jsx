import { useState, useRef, useEffect } from "react";
import clientAxios from "../helpers/clientAxios";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import "../css/ChatBot.css";
import Swal from "sweetalert2";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [faqs, setFaqs] = useState([])
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const getFaqs = async () => {
    try {
      const res = await clientAxios.get('/faqs')
      setFaqs(res.data.allQuestions)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al obtener las preguntas frecuentes",
      });
    }
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { sender: "user", text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let config = {}

      if (inputMessage.toLowerCase() === 'menu') {
        config = {
          responseType: "blob"
        };
      }

      const res = await clientAxios.post("/faqs/searchAnswer", { question: inputMessage }, config);

      if (res.headers["content-type"] === "application/pdf") {
        setTimeout(() => {
          const botMessage = { sender: "bot", text: 'Descargando el PDF...' };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        }, 1000);
        setTimeout(() => {
          const blob = new Blob([res.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "menu-sushi.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          const botMessage = { sender: "bot", text: 'Menu Descargado' };
          setMessages((prev) => [...prev, botMessage]);
          return
        }, 2000);
      }


      const botMessage = { sender: "bot", text: res.data.response };
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      const botError = { sender: "bot", text: "Lo siento, algo salió mal. Inténtalo más tarde." };
      setMessages((prev) => [...prev, botError]);
    }

    setInputMessage("");
  };

  const handleOptionQuestion = (idFaq) => {
    if (idFaq !== '0') {
      const res = faqs.find((faq) => faq._id === idFaq)
      const userMessage = { sender: "user", text: res.question };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setTimeout(() => {
        const botMessage = { sender: "bot", text: res.answer };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 2000);
    }
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getFaqs()
  }, [])

  return (
    <div>
      <div className="position-fixed bottom-0 end-0 bot">
        <img
          src="https://static.wixstatic.com/media/55d1d0_774dd340d53b43fab4182fd4f484fcb0~mv2.gif"
          alt="Chat Bot"
          onClick={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            Chat Bot
            <button className="close-btn" onClick={() => setIsChatOpen(false)}>
              ✖
            </button>

          </div>
          <Form.Select
            value={0}
            className="bg-nular select-form-bot"
            onChange={(e) => handleOptionQuestion(e.target.value)}
          >
            <option value="0">Preguntas Frecuentes</option>
            {faqs.map((faq) => (
              <option value={faq._id} key={faq._id}>
                {faq.question}
              </option>
            ))}
          </Form.Select>
          <div className="chat-body" ref={chatBodyRef}>
            {
              messages.length ?
                messages.map((message, index) => (
                  <p
                    key={index}
                    className={message.sender === "user" ? "chat-message-user" : "chat-message-bot"}
                  >
                    {message.text}
                  </p>
                ))
                :
                <p>¡Hola! ¿En qué puedo ayudarte?</p>

            }
            {isTyping && (
              <p className="chat-message-bot typing-indicator">
                <span>.</span><span>.</span><span>.</span>
              </p>
            )}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
