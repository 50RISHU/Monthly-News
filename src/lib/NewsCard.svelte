<script>
	export let article;
	import 'animate.css';
	import axios from 'axios';
	import { onMount } from 'svelte';



</script>

<div class="card news-card animate__animated animate__backInUp">
	<img src={article.urlToImage} class="card-img-top" alt="news" />
	<div class="card-body">
		<p class="card-text">Date : {article.publishedAt}</p>
		<h5 class="card-title">{article.title}</h5>
		<p class="card-text">{article.description}</p>
		<a href={article.url} target="_blank" class="btn btn-primary btn-sm">Read Full News</a>
	</div>
	<div class="card-footer text-muted">
		<p class="mb-0">Author: {article.author || 'Unknown'}</p>
		<p class="mb-0">Source: {article.source.name}</p>
	</div>
</div>

<style>
	:root {
		--animate-duration: 800ms;
		--animate-delay: 0.9s;
	}

	.news-card {
		display: inline-block;
		width: 100%;
		margin-bottom: 1rem;
		break-inside: avoid;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		background-color: #fff;
	}

	.card-img-top {
		object-fit: cover;
		width: 100%;
		height: 200px;
	}
</style>
