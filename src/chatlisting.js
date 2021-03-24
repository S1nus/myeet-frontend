import { Fragment, Component } from 'preact';

const ChatListing = (props) => {
	if (!props.current) {
		return (
			<div onClick={() => {props.chatClicked(props.chat)}} class="chatlisting">
				{props.children}
			</div>
		);
	}
	else {
		return (
			<div onClick={() => {props.chatClicked(props.chat)}} class="chatlisting selected">
				{props.children}
			</div>
		);
	}
}
export default ChatListing;
