import RightContentBody from "../RightContentBody";
import RightContentHeader from "../RightContentHeader";

import c from "./RightContent.module.scss";

const RightContent = () => {
	return (
		<div className={c.container}>
			<RightContentHeader />
			<RightContentBody />
		</div>
	);
};

export default RightContent;
