<script setup>
  import { ref, onMounted, shallowRef, watch } from 'vue'
  import { useFirstStep } from '@/stores/FirstStep'
  import PfStep from './PfStep.vue'
  import PjStep from './PjStep.vue'

  const store = useFirstStep()

  const typeComponents = {
    'pj': PjStep,
    'pf': PfStep,
  }

  const ComponentRender = ref()

  function setComponent(){
    ComponentRender.value = typeComponents[store.infos.type]
  }

  watch(() => store.infos.type, () => {
    setComponent()
  })

  const markedComponent = shallowRef(ComponentRender);

  onMounted(() => {
    setComponent()
  })

</script>

<template>
  <component 
    :is="markedComponent" 
  />
</template>

<style scoped>

</style>
