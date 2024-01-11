import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

import c from "./DropDown.module.scss";

interface DropDownProps {
	classContainer?: string;
	classBurger?: string;
	value: ReactNode;
	burgerContent: ReactNode;
	isBurgerOnTop?: boolean;
}

const DropDown = ({
	classContainer = "",
	classBurger = "",
	value,
	burgerContent,
	isBurgerOnTop = false,
}: DropDownProps) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [position, setPosition] = useState<"bottom" | "top">("top");
	const ref = useRef<HTMLDivElement>(null);
	const refBurger = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsActive((prev) => !prev);
		if (!refBurger.current || !ref.current) return;
		if (!isBurgerOnTop) return;

		const { bottom } = ref.current.getBoundingClientRect();
		const spaceFromBottom = window.innerHeight - bottom;

		const height = refBurger.current.clientHeight;

		setPosition(spaceFromBottom > height ? "top" : "bottom");
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				refBurger.current &&
				!refBurger.current.contains(event.target as Node)
			)
				setIsActive(false);
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={classNames(
				{ [c.container]: true },
				{ [classContainer]: true }
			)}
			onClick={handleClick}
			ref={ref}
		>
			{value}
			<div
				className={classNames({ [c.burger]: true }, { [classBurger]: true })}
				ref={refBurger}
				data-is-burger-on-top={isBurgerOnTop}
				data-active={isActive}
				style={
					isBurgerOnTop
						? {
								[position]: "0",
								transform: `translateY(${
									(position === "bottom" ? false : isActive ? "40px" : "0px") ||
									(position === "top" ? false : isActive ? "-40px" : "0px")
								})`,
						  }
						: {}
				}
			>
				{burgerContent}
			</div>
		</div>
	);
};

export default DropDown;
