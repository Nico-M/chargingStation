<template>
  <div class="mini-circle"></div>
</template>

<style scoped>
.mini-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #060f10;
  border: 2px solid var(--base-color);
}

/* Add hover effect */
.mini-circle:hover {
  background-color: var(--base-bg-color);
  border-color: #888;
}
</style>
