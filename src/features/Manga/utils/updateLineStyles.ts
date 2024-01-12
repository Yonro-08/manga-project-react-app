export const updateLineStyles = (
	page: boolean,
	lineRef: HTMLDivElement,
	linkRef: HTMLAnchorElement,
	navigationRef: HTMLDivElement
) => {
	const navigationReact = navigationRef.getBoundingClientRect();

	if (page) {
		const buttonRect = linkRef.getBoundingClientRect();

		lineRef.style.transform = `translateX(${
			buttonRect.left - navigationReact.left + 16
		}px)`;
		lineRef.style.width = `${buttonRect.width - 32}px`;
	}

	if (page) {
		const buttonRect = linkRef.getBoundingClientRect();
		lineRef.style.transform = `translateX(${
			buttonRect.left - navigationReact.left + 16
		}px)`;
		lineRef.style.width = `${buttonRect.width - 32}px`;
	}
};
