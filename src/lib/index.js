// place files you want to import through the `$lib` alias in this folder.
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchNews(searchNews = 'india') {
	const today = new Date();
	console.log('Current Date:', today.toLocaleDateString());

	const oneMonthAgo = new Date(today);
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
	console.log('One Month Ago:', oneMonthAgo.toLocaleDateString());

	const url = `https://newsapi.org/v2/everything?q=${searchNews}&from=${oneMonthAgo.toLocaleDateString()}&sortBy=publishedAt&apiKey=ed60fef9dc86497a85f272223b27283f`;

	const response = await axios.get(url);
	return response.data.articles;
}

const QUOTES_API_URL = 'https://dummyjson.com/quotes/random';

export async function fetchQuotes() {
	const response = await axios.get(QUOTES_API_URL);
	return response.data;
}

export function removeDuplicateArticles(articles) {
	const seen = new Set();
	return articles.filter((article) => {
		const key = `${article.url}-${article.publishedAt}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
