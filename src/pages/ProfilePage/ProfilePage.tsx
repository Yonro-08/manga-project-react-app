import c from "./ProfilePage.module.scss";

interface ProfilePageProps {}

function ProfilePage({}: ProfilePageProps) {
	return (
		<section className={c.profilePage}>
			<div className="container">
				<div className={c.container}>ProfilePage</div>
			</div>
		</section>
	);
}

export default ProfilePage;
