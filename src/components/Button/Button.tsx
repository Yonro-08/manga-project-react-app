import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

import c from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={classNames(
				{ [c.button]: true },
				className ? { [className]: true } : {}
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
