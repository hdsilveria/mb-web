<script setup>

import Form from '@/components/form/Index.vue'
import { onBeforeUnmount, onMounted } from 'vue'

const confirmReload = (event) => {
    const confirmationMessage = 'Tem certeza que deseja sair? As alterações não salvas serão perdidas.'
    event.returnValue = confirmationMessage
    return confirmationMessage
}

onMounted(() => {
    window.addEventListener('beforeunload', confirmReload)
})

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', confirmReload)
})


</script>

<template>
    <Form />
</template>

<style scoped>

</style>
