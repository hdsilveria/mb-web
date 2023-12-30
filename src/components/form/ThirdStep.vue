<script setup>
  import { useThirdStep } from '@/stores/ThirdStep'

  const store = useThirdStep()
</script>

<template>
  <div>
    <div>
      <label for="password">Sua senha</label>
      <input
        id="password"
        type="password" 
        v-model="store.infos.password"
        @blur="store.v$.password.$touch"
        :class="{ 'has-error': store.v$.password?.$errors.length > 0 }"
      >
      <div 
        class="input-errors" 
        v-for="error of store.v$.password?.$errors" 
        :key="error.$uid"
      >
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
