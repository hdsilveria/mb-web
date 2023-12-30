<script setup>
  import { useFirstStep } from '@/stores/FirstStep'

  const store = useFirstStep()
</script>

<template>
  <div class="form-email">
    <div class="form-email__input">
      <label for="email">Endereço de email</label>
      <input 
        type="text"
        id="email" 
        v-model="store.infos.email"
        @blur="store.v$.email.$touch"
        :class="{ 'has-error': store.v$.email?.$errors.length > 0 }"
      >
      <div 
        class="input-errors" 
        v-for="error of store.v$.email?.$errors" 
        :key="error.$uid"
      >
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>

    <div class="form-email__input--radio">
      <div>
        <input 
          type="radio" 
          id="pj" 
          value="pj" 
          name="type"
          v-model="store.infos.type"
        >
        <label for="pj">Pessoa Juridica</label>
      </div>
      <div>
        <input 
          type="radio" 
          id="pf" 
          value="pf" 
          name="type"
          v-model="store.infos.type"
        >
        <label for="pf">Pessoa fisica</label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .form-email {
    &__input {
      margin-bottom: 0.5rem;
      &--radio {
        display: flex;
        gap: 8px;
        margin-bottom: 0.5rem;
      }
    }
  }

</style>
