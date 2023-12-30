<script setup>
    import { useFirstStep } from '@/stores/FirstStep'
    import { usePfStep } from '@/stores/PfStep'
    import { usePjStep } from '@/stores/PjStep'
    import { useThirdStep } from '@/stores/ThirdStep'
    import { ref } from 'vue'

    const storeFirstStep = useFirstStep()
    const storePfStep = usePfStep()
    const storePjStep = usePjStep()
    const storeThirdStep = useThirdStep()

    const infos = ref({
        ...storeFirstStep.infos,
        ...(storeFirstStep.infos.type === 'pf' ? 
            { ...storePfStep.infos } : 
            { ...storePjStep.infos }
        ),
        ...storeThirdStep.infos
    })
</script>

<template>
    <section>
        <h1>Obrigado!</h1>
        <pre>{{ infos }}</pre>
    </section>
</template>

<style scoped>

</style>
