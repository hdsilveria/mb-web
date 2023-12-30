<script setup>

import Success from '@/components/success/Index.vue'
import { onMounted } from 'vue'

onMounted(() => {
    document.title = 'Sucesso!'
})

</script>

<template>
    <Success />
</template>

<style scoped>

</style>
