import { Fragment, Component } from 'preact';
import Header from './header';
import Messages from './messages';
import Inputs from './inputs';
import NewChatScreen from './newchatscreen';
import Welcome from './welcome'; 

const MainPanel = (props) => {

	return (
		<div class="mainpanel">
			<Header notesAction={props.notesAction} logoAction={props.logoAction} />
			{(() => {
				if (props.panelMode == "newchat") {
					return (
						<Fragment>
						<NewChatScreen requestNewChat={props.requestNewChat} cancelSearch={props.cancelSearch} seeking={props.seeking} />
						</Fragment>
					)
				}
				else if (props.panelMode == "welcome") {
					return(
						<Welcome />
					)
				}
				else if (props.panelMode == "chat") {
					return (
						<Fragment>
						<Messages messageBoxRef={props.messageBoxRef} messages={props.messages} />
						<Inputs sendAction={props.sendAction} />
						</Fragment>
					)
				}
			})()}
		</div>
	);
}
export default MainPanel;
