<script>
	import NewsCard from '$lib/NewsCard.svelte';
	import { onMount } from 'svelte';
	import { fetchNews, removeDuplicateArticles, fetchQuotes } from '$lib/index.js';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'animate.css';

	let articles = [];
	let isLoading = true;
	let error = null;
	let searchNews = 'india';

	async function loadNews() {
		isLoading = true;
		error = null;
		try {
			const results = await fetchNews(searchNews);
			articles = removeDuplicateArticles(results);
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	onMount(loadNews);

	async function handleSearch(event) {
		event.preventDefault();
		await loadNews();
	}

	let quotes_data = '';
	let isLoading2 = true;
	async function quotes() {
		let error = null;
		isLoading2 = true;
		try {
			quotes_data = await fetchQuotes();
			console.log(quotes_data);
		} catch (err) {
			error = err.message;
			console.error('Fetch error:', error);
		} finally {
			isLoading2 = false;
		}
	}

	onMount(quotes);
</script>

<main>
	<h1 class="text-center m-3 animate__animated animate__pulse">Monthly News</h1>

	<div class="container mb-3">
		<div class="card">
			<div class="card-header">Quote For Day</div>
			<div class="card-body">
				<figure>
					{#if isLoading2}
						<div class="d-flex justify-content-center">
							<div class="spinner-border" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					{:else}
						<blockquote class="blockquote">
							<p>{quotes_data.quote}</p>
						</blockquote>
						<figcaption class="blockquote-footer">
							<i>{quotes_data.author}</i>
						</figcaption>
					{/if}
				</figure>
			</div>
		</div>
	</div>

	<div class="container">
		<form class="d-flex" role="search" on:submit|preventDefault={handleSearch}>
			<input
				class="form-control me-2"
				type="search"
				placeholder="Search"
				aria-label="Search"
				bind:value={searchNews}
			/>
			<button class="btn btn-outline-success" type="submit">Search</button>
		</form>
	</div>

	<div class="container mt-4">
		<div class="row">
			<div class="col-12">
				<div class="masonry">
					{#if isLoading}
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					{:else}
						{#each articles as article (`${article.url}-${article.publishedAt}`)}
							<NewsCard {article} />
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.masonry {
		column-count: 3;
		column-gap: 1rem;
	}

	@media (max-width: 992px) {
		.masonry {
			column-count: 2;
		}
	}

	@media (max-width: 576px) {
		.masonry {
			column-count: 1;
		}
	}
</style>
