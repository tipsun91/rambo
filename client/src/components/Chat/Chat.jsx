/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { addMessage } from '../../store/chatReducer/reducer';
import './Chat.css';
import Messages from './Messages';

function Chat() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');

  const { user } = useSelector((state) => state.user); // подключаем юзера из реакт редакса

  useEffect(() => {
    fetch('http://localhost:4000/api/chat')
      .then((data) => data.json())
      .then((data) => setHistory(data));
  }, []);

  function connect() {
    socket.current = new WebSocket('ws://localhost:4000');

    socket.current.onopen = () => {
      console.log('Socket открыт');
      setConnected(true);
      const message = {
        event: 'connection',
        username: user.name,
        id: user.id,
      };
      setUsername(user.name);
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
      console.log(message);
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    };
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    const message = {
      username: user.name,
      message: value,
      mess_id: v4(),
      event: 'message',
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
    dispatch(addMessage(event.target.messText.value));
  };

  if (!connected) {
    return (
      <button onClick={connect} type="button">Войти</button>
    );
  }

  return (
    <div className="center nes-container is-rounded">
      <h1>
        <span className="blue">OUR</span>
        {' '}
        <span className="yellow">COMMUNITY</span>
      </h1>
      <form className="form" onSubmit={sendMessage}>
        <input value={value} onChange={(e) => setValue(e.target.value)} type="text" name="messText" />
        <button type="submit">Отправить</button>
      </form>
      <div>
        <div className="messages">
          {messages.map((mess) => (
            <div key={mess.id}>
              {mess.event === 'connection'
                ? (
                  <div className="message">
                    Пользователь
                    {' '}
                    {mess.username}
                    {' '}
                    подключился
                  </div>
                )
                : (
                  <div className="message" key={v4()}>
                    {mess.username}
                    :
                    {mess.message}
                  </div>
                )}
            </div>
          ))}
          {history.chats.map((message) => (
            <div className="message">
              {message.User.name}
              :
              {message.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
