const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/theme/theme`;

// Service để gửi theme và uuid lên backend
export async function saveThemeToBackend(uuid: string, theme: string) {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ uuid, theme }),
	});
	if (!res.ok) {
		throw new Error('Lưu theme thất bại');
	}
	return res.json();
}