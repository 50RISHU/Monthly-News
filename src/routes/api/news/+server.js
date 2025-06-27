// src/routes/api/news/+server.js
import { json } from '@sveltejs/kit';
import axios from 'axios';

const API_KEY = 'ed60fef9dc86497a85f272223b27283f';
const BASE_URL = 'https://newsapi.org/v2/everything';

export async function GET({ url }) {
	const query = url.searchParams.get('q') || 'india';
	const today = new Date();
	const oneMonthAgo = new Date(today);
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

	const from = oneMonthAgo.toISOString().split('T')[0];

	try {
		const response = await axios.get(BASE_URL, {
			params: {
				q: query,
				from: from,
				sortBy: 'publishedAt',
				apiKey: API_KEY
			}
		});

		return json(response.data.articles);
	} catch (error) {
		console.error('Error fetching news:', error.response?.data || error.message);
		return json({ error: 'Failed to fetch news' }, { status: 500 });
	}
}
