<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }
</script>

<div class="modal" on:click={closeModal}>
  <div class="modal-content" on:click|stopPropagation>
    <button class="close-button" on:click={closeModal}>&times;</button>
    <slot />
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
