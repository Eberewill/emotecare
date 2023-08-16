<script lang="ts">
    export let word: string;
  
    function getFirstLetterImage(word: string): string {
      const firstLetter = word.charAt(0).toUpperCase();
      const imageUrl = `https://dummyimage.com/100x100/007bff/ffffff&text=${firstLetter}`;
      return imageUrl;
    }
  </script>
  
  <img  class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
  src={getFirstLetterImage(word)} alt={word} />
  