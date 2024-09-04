<script>
// @ts-nocheck

  import { enhance } from '$app/forms';
  import { writable } from 'svelte/store';

  // Stores for image preview and upload state
  export let form;
  let imageUrl = writable(''); // Store the image URL
  let imagePreview = writable(null); // Store the image preview URL
  let fileInput; // Reference to the file input

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.set(reader.result); // Set preview image
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.set(null);
    }
  }

  function handleUpload(formData) {
    // Reset the input and preview
    fileInput.value = ''; 
    imagePreview.set(null);
    imageUrl.set(formData.uploaded); // Update with uploaded URL
  }

  // Svelte action to handle the form enhancement
  // let enhanceAction = enhance({
  //   applyAction: ({ form }) => {
  //     handleUpload(form);
  //   }
  // });
</script>

<form
use:enhance
action="?/upload"
method="POST"
enctype="multipart/form-data"
>
  <input
  class="browseButton"
    type="file"
    name="file"
    bind:this={fileInput}
    on:change={handleFileChange}
    required
  />
  {#if $imagePreview}
    <div class="image-preview">
      <img src={$imagePreview} alt="Preview" />
    </div>
    <button class="uploadButton">Upload</button>
  {/if}

  {#if form}
    <p>Uploaded <a href={form.uploaded}>{form.uploaded}</a></p>
  {/if}
</form>

<style>
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    margin-top: 10px;
  }
</style>
