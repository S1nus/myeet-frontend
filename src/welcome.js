import { Fragment, Component } from 'preact';

const Welcome = () => {
	return (
		<Fragment>
		<div class="welcome">
			<h1>Welcome to Myeet!</h1>
			<p>Click the plus sign on the left to create a new groupchat with strangers!</p>
			<p><em>Groupchat size is currently just two people because there aren't yet enough users on the site, but we will soon raise it to three!</em></p>
			<h2>Latest update:</h2>
			<ul>
				<li>Audible notifications! (Click the bell near the top to toggle them!)</li>
				<li>Press <em>Enter</em> to send message</li>
				<li>Automatically scroll to new messages</li>
			</ul>
			<h2>Features coming soon:</h2>
			<ul>
				<li>Improved mobile site</li>
				<li>Rename groupchats</li>
				<li>Change message colors</li>
				<li>Mobile app someday?</li>
			</ul>
			<h2>Suggestions or bug reports</h2>
			<p>Email me at <a href="mailto:connor@s1nus.com">connor@s1nus.com</a></p>
		</div>
		</Fragment>
	);
}
export default Welcome;
