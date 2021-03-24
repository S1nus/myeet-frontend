import { Fragment, Component } from 'preact';

const NewChatButton = (props) => {
	return (
		<img onClick={props.onClick} src="circleplus.png" class="newchatbutton" />
	);
}
export default NewChatButton;
