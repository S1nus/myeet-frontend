import { Fragment, Component } from 'preact';
import Message from './message';
import { useEffect, useState } from 'preact/hooks';

const Messages = (props) => {

	return (
		<div ref={props.messageBoxRef} class="messages">
			{
				(() => {
					return(
						props.messages.map(x => {
							if (x.from != "me") {
								return (
									<Message from={x.ChatMessage.from}>{x.ChatMessage.text}</Message>
								)
							}
							else {
								console.log(x);
								return (
									<Message from="me">{x.ChatMessage.text}</Message>
								)
							}
						})
					)
				})()
			}
		</div>
	);
}
export default Messages;
