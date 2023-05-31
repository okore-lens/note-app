import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const uploadProfilePicture = async (
	imageUri: string,
	fileName: string,
	path: string
) => {
	const response = await fetch(imageUri);
	const blobFile = await response.blob();

	const storage = getStorage();

	const imageRef = ref(storage, `${path}/${fileName}`);

	const result = await uploadBytes(imageRef, blobFile);

	const url = await getDownloadURL(result.ref);

	return url;
};

export default uploadProfilePicture;
