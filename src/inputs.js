import { Fragment, Component } from 'preact';
import {useRef} from 'preact/hooks';

const Inputs = (props) => {

	const inputText = useRef(null);

	function checkEnter(e) {
		if (e.key === "Enter") {
			props.sendAction(inputText.current.value);
			inputText.current.value = "";
		}
	}

	return (
		<div class="input">
			<input onKeyPress={checkEnter} ref={inputText} type="text" />
			<button onClick={()=>{
				props.sendAction(inputText.current.value);
				inputText.current.value = "";
			}}>send</button>
		</div>
	);
}
export default Inputs;
