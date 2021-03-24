import VMessage from './vmessage';

class VChat {
	
	constructor(name) {
		this.name = name;
		this.messages = [];
	}

	newMessage(from, when, text) {
		this.messages.push(new VMessage(from, when, text));
	}

}

export default VChat;
