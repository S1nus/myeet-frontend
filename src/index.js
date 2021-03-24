import './style';
import { h , Fragment, Component } from 'preact';
import Sidebar from './sidebar';
import MainPanel from './mainpanel';
import { useState , useEffect, useRef } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import WaitingForServerScreen from './waitingforserver';

import VMessage from './models/vmessage';
import VChat from './models/vchat';

console.log("Getting identity...");
let identity = localStorage.getItem("uuid");
if (identity == null) {
	localStorage.setItem("uuid", uuidv4());
}
identity = localStorage.getItem("uuid");
console.log(identity);

const App = () => {

	let sidebar = true;

	const [chats, _setChats] = useState([]);
	const [currentChat, _setCurrentChat] = useState(null);
	const [messages, setMessages] = useState(null);
	const [isWaitingForServer, setIsWaitingForServer] = useState(true);
	const [mainPanelMode, setMainPanelMode] = useState("welcome");
	const [queueScroll, setQueueScroll] = useState(false);

	const [seekingChat, setSeekingChat] = useState(false);
	const [notesOn, setNotesOn] = useState(false);
	const notesOnRef = useRef(notesOn);

	const webSocket = useRef(null);
	const chatsRef = useRef(chats);
	const currentChatRef = useRef(currentChat);
	const messagesRef = useRef(messages);
	const messageBoxRef = useRef(null);


	const chatNotification = useRef(null);
	const messageNotification = useRef(null);

	const goToWelcome = () => {
		setMainPanelMode("welcome");
	};

	const toggleNotes = () => {
		notesOnRef.current = !notesOn;
		setNotesOn(!notesOn);
	};

	const newMessage = (text) => {
		try {
			let message = {
				ChatMessage: {
					message_text: text,
					client_id: identity,
					chat_id: currentChat.UserChat.id
				}
			}
			webSocket.current.send(
				JSON.stringify(message)
			);
			let new_chat = chatsRef.current.map(x => {
				console.log(x.UserChat.id);
				if (x.UserChat.id != currentChat.UserChat.id) {
					return(x);
				}
				else {
					console.log(x);
					let to_replace = x;
					to_replace.UserChat.messages.push(
						{ChatMessage: {from: "me", text: text, when: Date.now()}}
					);
					return (to_replace);
				}
			});
			console.log("New chat!");
			console.log(new_chat);
			setChats(new_chat);
		}
		catch (err) {
			console.log("failed to send:");
			console.log(err);
		}
	}

	const selectChat = (chat) => {
		setMainPanelMode("chat");
		setCurrentChat(chat);
		setMessages(chat.UserChat.messages);
	}

	const setChats = (chats) => {
		_setChats(chats);
		chatsRef.current = chats;
	}

	const setCurrentChat = (chat) => {
		_setCurrentChat(chat);
		currentChatRef.current = chat;
	}

	const requestNewChat = (nickname) => {
		setSeekingChat(true);
		let message = JSON.stringify({
			NewChatRequest : {
				client_id: identity,
				client_nick: nickname,
			}
		});
		webSocket.current.send(message);
	}

	const cancelSearch = () => {
		setSeekingChat(false);
		let message = JSON.stringify({
			CancelChatRequest: {
				client_id: identity
			}
		});
		webSocket.current.send(message);
	}

	useEffect(() => {
		webSocket.current = new WebSocket('ws://localhost:8081');
		webSocket.current.onopen = function () {
			webSocket.current.send(JSON.stringify({Auth : { client_id : identity }})); 
		};

		// Log errors
		webSocket.current.onerror = function (error) {
			console.log('WebSocket Error ' + error);
		};

		// Log messages from the server
		webSocket.current.onmessage = function (e) {
			setIsWaitingForServer(false);

			try {
				let parsed = JSON.parse(e.data);
				console.log(parsed);
				let message_type = Object.keys(parsed)[0];
				switch (message_type) {
					case "UserChatList":
						let ucl = parsed.UserChatList;
						console.log(ucl.new_chat);
						setChats(ucl.user_chats);
						if (ucl.new_chat != null) {
							if(notesOnRef.current) {
								chatNotification.current.currentTime = 0;
								chatNotification.current.play();
							}
							chatsRef.current.map(x => {
								if (x.UserChat.id == ucl.new_chat) {
									selectChat(x);
									setSeekingChat(false);
								}
							});
						}
						break;
					case "ChatMessage":
						console.log("Chat Message Received");
						if (notesOnRef.current) {
							messageNotification.current.currentTime = 0;
							messageNotification.current.play();
						}
						let new_chats = chatsRef.current.map(x => {
							if (parsed.ChatMessage.chat_id != x.UserChat.id) {
								return(x);
							}
							else {
								let updated_gc = x;
								updated_gc.UserChat.messages.push(parsed);
								return(updated_gc);
							}
						});
						setChats(new_chats);
						if (parsed.ChatMessage.chat_id == currentChatRef.current.UserChat.id) {
							setQueueScroll(true);
						}
						else {
							console.log("not equal");
						}
						break;
					default:
						console.log("unknown mesage type. sus");
				}
			}
			catch (error) {
				console.log(error);
			}

		};
}, []);

	useEffect(() => {
		console.log("chats updated");
		try {
			messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
			setQueueScroll(false);
		}
		catch {

		}
	}, [queueScroll]);

	return (
		<div class="container">
			<audio ref={messageNotification}>
				<source src="juntos-607.mp3" type="audio/mpeg" />
				<source src="juntos-607.oga" type="audio/ogg" />
			</audio>
			<audio ref={chatNotification}>
				<source src="done-for-you-612.mp3" type="audio/mpeg" />
				<source src="done-for-you-612.oga" type="audio/ogg" />
			</audio>
			{
				(() => {
					if (!isWaitingForServer) {
						return (
								<Fragment>
								<Sidebar newChatAction={()=>{setMainPanelMode("newchat"); setCurrentChat({});}} chatClicked={selectChat} currentChat={currentChat} chats={chats} />
							<MainPanel messageBoxRef={messageBoxRef} notesAction={toggleNotes} logoAction={goToWelcome} requestNewChat={requestNewChat} cancelSearch={cancelSearch} seeking={seekingChat} currentChat={currentChat} panelMode={mainPanelMode} messages={messages} sendAction={newMessage} />
								</Fragment>
						);
					}
					else {
						return(
							<WaitingForServerScreen />
						);
					}
				})()
			}
		</div>
	);
}
export default App;
