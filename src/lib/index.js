// place files you want to import through the `$lib` alias in this folder.
import axios from 'axios';

const QUOTES_API_URL = 'https://dummyjson.com/quotes/random';

const today = new Date();
console.log('Current Date:', today.toLocaleDateString());
const oneMonthAgo = new Date(today);
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
console.log('One Month Ago:', oneMonthAgo.toLocaleDateString());

export async function fetchNews(searchNews = 'india') {
	const response = await fetch(`/api/news?q=${searchNews}`);
	const data = await response.json();
	return data;
}


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
