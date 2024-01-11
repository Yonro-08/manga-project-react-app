import { InputHTMLAttributes } from "react";

import c from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
	return (
		<label className={c.container}>
			<input name="" className={c.input} {...props} />
		</label>
	);
}

export default Input;
