<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import {session} from '../stores/session'
    import { user } from '../stores';
  import { onMount } from 'svelte';
  import FirstLetterImage from './conversation/FirstLetterImage.svelte';




   export let data;
   let profiles : any = []

   onMount(() => {


    if(data.currentUser){
      session.login(data.currentUser)
    }


    if(data.usersRes?.users){
      profiles = data.usersRes?.users
    }
   })

	
</script>

<svelte:head>
	<title>Home | {$session.user?.name}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1 class="text-4xl font-bold mb-6 text-center">
    <span class="block text-indigo-500">Welcome, {$session.user?.name}!</span>
    <span class="block text-gray-700 text-lg mt-2">
      Get ready to connect and chat with other awesome users!
    </span>
  </h1>
  

<div class="h-screen shadow-lg overflow-y-auto scrollbar scrollbar-thumb-indigo-100 scrollbar-track-gray-100">
	<ul role="list" class="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
 
	 	{#each profiles as person (person.name)}
		  <li class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
			<div class="flex min-w-0 gap-x-4">
        <FirstLetterImage word={person.name} />
			  <div class="min-w-0 flex-auto">
				<p class="text-sm font-semibold leading-6 text-gray-900">
				  <a href={`conversation/${person.id}`}>
					<span class="absolute inset-x-0 -top-px bottom-0"></span>
					{person.name}
				  </a>
				</p>
				<p class="mt-1 flex text-xs leading-5 text-gray-500">
				  <a href="mailto:{person.email}" class="relative truncate hover:underline">{person.email}</a>
				</p>
			  </div>
			</div>
			<div class="flex shrink-0 items-center gap-x-4">
			  <div class="hidden sm:flex sm:flex-col sm:items-end">
				<p class="text-sm leading-6 text-gray-900">{"user"}</p>
				{#if person.lastSeen}
				  <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime={person.lastSeenDateTime}>{person.lastSeen}</time></p>
				{/if}
			  </div>
			  <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
			  </svg>
			</div>
		  </li>
		{/each}
	  </ul>
</div>

</section>

	
<style>
</style>
