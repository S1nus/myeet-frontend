import { Fragment, Component } from 'preact';
import { useState , useEffect, useRef } from 'preact/hooks';

const Header = (props) => {

	const [note, setNote] = useState(false);

	function toggleNotes() {
		setNote(!note);
		props.notesAction();
	}

	return (
		<div class="header">
			<img class="logo" onclick={props.logoAction} src="logo1.png" />
			{
			(() => {
				if (note) {
					return (<img class="notification" onclick={toggleNotes} src="bell.png" />)
				}
				else {
					return (<img class="notification" onclick={toggleNotes} src="bell2.png" />)
				}
			})()
			}
		</div>
	);
}
export default Header;
