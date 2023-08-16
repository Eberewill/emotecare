<script>
// @ts-nocheck

	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
  //import { user } from '../../stores/index.js';
    import {user} from '../../stores/index'
  import { session } from '../../stores/session';
	export let data;
	$:{
        const newUser = data.props;
        session.login(newUser?.user)
		user.set(newUser?.user)
    }

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	{#if data.props}
  <main>
    <h1>Welcome {data.props.user.name}!</h1>
    <p>Here is your full payload:</p>
    <pre>{JSON.stringify(data.props, null, 2)}</pre>
    <a href="/" class="block">View Todos</a>
    <a href="/sign-out">Log Out</a>
  </main>
{/if}
</section>

<style>
	
</style>
