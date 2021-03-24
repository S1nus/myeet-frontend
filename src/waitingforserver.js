import { Fragment, Component } from 'preact';

const WaitingForServerScreen = () => {
	return (
		<div class="waitingforserver">
			<h1>Waiting for server</h1>
			<img src="loading.gif" />
		</div>
	);
}
export default WaitingForServerScreen;
