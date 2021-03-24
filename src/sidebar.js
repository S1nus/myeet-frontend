import { Fragment, Component } from 'preact';
import ChatListing from './chatlisting';
import NewChatButton from './newchatbutton';

const Sidebar = (props) => {

	return (
		<div class="sidebar">
		{(() => {
			return(props.chats.map((x) => {
				if (x != props.currentChat) {
					return (<ChatListing chatClicked={props.chatClicked} chat={x} current={false}>{x.UserChat.people.join(", ")}</ChatListing>);
				}
				else {
					return (<ChatListing chatClicked={props.chatClicked} chat={x} current={true}>{x.UserChat.people.join(", ")}</ChatListing>);
				}
			}
			));
		})()}
		<NewChatButton onClick={props.newChatAction} />
		</div>
	);
}
export default Sidebar;
