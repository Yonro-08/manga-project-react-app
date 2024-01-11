export interface BookmarkData {
	endpoint: string;
	title: string;
	url: string;
	category: string;
}

export interface UserData {
	_id: string;
	avatar: string;
	token: string;
	username: string;
	createdAt: string;
	updatedAt: string;
	bookmarks: BookmarkData[];
}
