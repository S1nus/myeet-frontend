import { Fragment, Component } from 'preact';

const Message = ({children, from}) => {
	return (
		<Fragment>
			{
				(() => {
					if (from != "me") {
						return(
							<div class="message theirs">
								<label>{from}</label><br />
								<div class="bubble">
									{children}
								</div>
							</div>
						);
					}
					else if (from =="me") {
						return(
							<div class="message mine">
								<div class="bubble">
									{children}
								</div>
							</div>
						);
					}
				})()
			}
		</Fragment>
	);
}
export default Message;
