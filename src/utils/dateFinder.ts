export const doToday = (timestamp: number) => {
	const now = new Date();
	const date = new Date(timestamp);

	return (
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear()
	);
};

export const doInFuture = (timestamp: number) => {
	const now = new Date();
	const date = new Date(timestamp);

	return (
		date.getMonth() >= now.getMonth() &&
		date.getFullYear() >= now.getFullYear() &&
		date.getDate() > now.getDate()
	);
};
