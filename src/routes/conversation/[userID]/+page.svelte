<script lang="ts">
import { onDestroy, onMount } from 'svelte';
import {session} from '../../../stores/session'
import { CheckCircle, Icon } from "svelte-hero-icons";
  import { formatRelativeTime, generateUniqueId, getTimestampWithOffset } from '$lib/utils';
  import FirstLetterImage from '../FirstLetterImage.svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { WS_ENDPOINT } from '$lib/setup';
  import { extractMessage } from '../../../utils';

let socket: WebSocket;




export let data;


function getUserInfoById(userId : number) {
    const user = data.conversations?.users.find(user => user.id === userId);
    if (user) {
        return {
            name: user.name,
            email: user.email
        };
    }
    return null; // User not found
}

let messages: any[] = []

onMount(() => {

    //hadle the recieved props  
    if(data.currentUser){
      session.login(data.currentUser)
    }

    if (data.conversations?.conversations) {
      messages = data.conversations.conversations.map((item) => ({
        senderName: item.Sender.name,
        message: item.Content,
        timestamp: item.Timestamp,
        recieverName: item.Receiver.name,
        id: item.ID,
      }));
    }
  
    
    socket = new WebSocket(WS_ENDPOINT);

    socket.onopen = (event) => {
     // console.log('WebSocket connection opened:', event);
    };

    socket.onmessage = (event) => {

      if(extractMessage(event.data).receiver || extractMessage(event.data).sender == Number(data.currentUser?.id)){
        const extractedMesage = extractMessage(event.data)
       
        const newMessageTotification = `new message from ${getUserInfoById(extractedMesage.sender)?.name }`
        if(Number(data.requestedUrl) == Number(extractedMesage.sender) ){
           toast.success(newMessageTotification)
        }
       
        
      const newMessage = {
      senderName: getUserInfoById(extractedMesage.sender)?.name  ,
      message: extractedMesage.message,
      timestamp: extractedMesage.time,
      recieverName: getUserInfoById(extractedMesage.receiver)?.name, 
      id: extractedMesage.id,
    };
    messages = [...messages, newMessage];

     }
    };

    socket.onclose = (event) => {
     // console.log('WebSocket connection closed:', event);
    };
  });

  function sendMessage(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }
  onDestroy(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  });

    let textfield = ""

   async function handleSendMessage(event: { preventDefault: () => void; }) {
    event.preventDefault();
        const message = textfield.trim()
         if(!message) return

        textfield = ""
        let messageBody = {message: message, sender: data.currentUser?.id, receiver : Number(data.requestedUrl) , time:   getTimestampWithOffset(), id : generateUniqueId() }
        let messageString = JSON.stringify(messageBody)
        
        sendMessage(messageString)
    }

    function formatLinks(text : string) {
  var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  return text.replace(urlPattern, "<a href='\$1' class='text-teal-600 font-bold mx-1' target='_blank'>\$1</a>");
}


</script>

<svelte:head>
  <title>Chat with {getUserInfoById(Number(data.requestedUrl))?.name}</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <button
    class="bg-gray-400 rounded-md my-4 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow flex items-center space-x-2"
    on:click={() => window.history.back()}
  >
    <svg
      class="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </button>
  <Toaster />
  <div
    class="h-[65vh] shadow-lg overflow-y-auto scrollbar scrollbar-thumb-indigo-100 scrollbar-track-gray-100"
  >
    <ul role="list" class="space-y-6 mx-4">
      {#each messages as conversation (conversation.id)}
        <li class="relative flex gap-x-4">
          <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
            <div class="w-px bg-gray-200" />
          </div>
          <FirstLetterImage word={conversation.senderName} />
          <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
            <div class="flex justify-between gap-x-4">
              <div class="py-0.5 text-xs leading-5 text-gray-500">
                <span class="font-lg font-bold text-gray-900"
                  >{conversation.senderName}</span
                >
                {formatRelativeTime(conversation.timestamp)}
              </div>

              {#if conversation.senderName == data.currentUser?.name}
                <span class="text-green-500">
                  <Icon src={CheckCircle} class="w-5 h-5 mr-1" />
                </span>
              {/if}
            </div>
            <p class="text-sm leading-6 text-gray-500 break-all">
              {@html formatLinks(conversation.message)}
            </p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <!-- New comment form -->
  <div class="mt-6 flex gap-x-3">
    <img
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt=""
      class="h-6 w-6 flex-none rounded-full bg-gray-50"
    />

    <form on:submit={handleSendMessage} class="relative flex-auto">
      <div
        class="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
      >
        <label for="comment" class="sr-only">Add your comment</label>
        <input
          bind:value={textfield}
          class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Add your comment..."
          required
          id="textfield"
          name="textfield"
          type="text"
        />
      </div>

      <div
        class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2"
      >
        <div class="flex items-center space-x-5">
          <div class="flex items-center">
            <button
              type="button"
              class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Attach a file</span>
            </button>
          </div>
          <div class="flex items-center" />
        </div>
        <button
          type="submit"
          class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >Send</button
        >
      </div>
    </form>
  </div>
</section>

<style>
  .message-link {
    @apply text-indigo-600 font-bold mx-1;
  }
</style>

