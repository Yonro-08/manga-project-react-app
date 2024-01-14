import c from "./DmcaPage.module.scss";

interface DmcaPageProps {}

function DmcaPage({}: DmcaPageProps) {
	return (
		<div className={c.dmcaPage}>
			<div className="container">
				<div className={c.container}>
					<div>
						Digital Millennium Copyright Act ("DMCA") Policy remanga.org is an
						online service provider as defined in the Digital Millennium
						Copyright Act. We provide legal copyright owners with the ability to
						self-publish on the internet by uploading, storing and displaying
						various media utilizing our services. We do not monitor, screen or
						otherwise review the media which is uploaded to our servers by users
						of the service. We take copyright violation very seriously and will
						vigorously protect the rights of legal copyright owners. If you are
						the copyright owner of content which appears on the remanga.org
						website and you did not authorize the use of the content you must
						notify remanga.org in writing in order for us to identify the
						allegedly infringing content and take action. I. DESIGNATED AGENT
						The Company's Designated Agent to receive notification of alleged
						infringement under the DMCA is:
					</div>
					<span>Email: abuse@remanga.org</span>
					<div>
						Upon receipt of proper notification of claimed infringement, Company
						will follow the procedures outlined herein and in the DMCA.
					</div>
					<div>II. COMPLAINT NOTICE PROCEDURES FOR COPYRIGHT OWNERS</div>
					<div>
						The following elements must be included in your copyright
						infringement claim:
					</div>
					<div>III. NOTICE AND TAKE DOWN</div>
					<div>
						Procedure: It is expected that all users of any part of the Company
						system will comply with applicable copyright laws. However, if the
						Company receives proper notification of claimed copyright
						infringement it will respond expeditiously by removing, or disabling
						access to, the material that is claimed to be infringing or to be
						the subject of infringing activity provided all such claims have
						been investigated and determined to be valid by Company in Company's
						sole and absolute discretion. Company will comply with the
						appropriate provisions of the DMCA in the event a counter
						notification is received.
					</div>
					<div>IV. REPEAT INFRINGES</div>
					<div>
						Under appropriate circumstances, Company may, in its discretion,
						terminate authorization of users of its system or network who are
						repeat infringes.
					</div>
					<div>V. ACCOMMODATION OF STANDARD TECHNICAL MEASURES</div>
					<div>
						It is Company policy to accommodate and not interfere with standard
						technical measures it determines are reasonable under the
						circumstances, i.e., technical measures that are used by copyright
						owners to identify or protect copyrighted works.
					</div>
				</div>
			</div>
		</div>
	);
}

export default DmcaPage;
