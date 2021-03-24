import { Fragment, Component } from 'preact';
import { useState, useRef } from 'preact/hooks';

const NewChatScreen = (props) => {

	const nickRef = useRef(null);

	return (
		<div class="newchatscreen">
			{
				(() => {
					if (props.seeking) {
						return (
							<Fragment>
								<strong>Finding a groupchat...</strong>
								<img src="loading.gif" />
								<button onClick={() => {props.cancelSearch();}}>Cancel search</button>
							</Fragment>
						);
					}
					else {
						return (
							<Fragment>
								<label>Your nickname:</label>
								<input type="text" ref={nickRef} />
								<button onClick={() => {props.requestNewChat(nickRef.current.value);}}>Request new groupchat</button>
							</Fragment>
						);
					}
				})()
			}
		</div>
	);
}

export default NewChatScreen;
