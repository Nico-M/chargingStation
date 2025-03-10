<template>
    <div class="column-header">
        {{ title }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>()
</script>

<style scoped>

</style>