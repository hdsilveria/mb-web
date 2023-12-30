<script setup>
  import { usePjStep } from '@/stores/PjStep'
  import { cnpjMask, phoneMask } from '@/composables/mask'
  import { vMaska } from "maska"

  const store = usePjStep()
</script>

<template>
  <div class="pj-form">
    <div class="pj-form__input">
      <label for="corporateReason">Razão Social</label>
      <input 
        id="corporateReason"
        type="text" 
        v-model="store.infos.corporateReason"
        @blur="store.v$.corporateReason.$touch"
        :class="{ 'has-error': store.v$.corporateReason?.$errors.length > 0 }"
      >
      <div 
        class="input-errors" 
        v-for="error of store.v$.corporateReason?.$errors" 
        :key="error.$uid"
      >
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
    <div class="pj-form__input">
      <label for="cnpj">CNPJ</label>
      <input
        id="cnpj"
        type="text"
        v-maska:[cnpjMask]
        v-model="store.infos.cnpj"
        @blur="store.v$.cnpj.$touch"
        :class="{ 'has-error': store.v$.cnpj?.$errors.length > 0 }"
      >
      <div 
        class="input-errors" 
        v-for="error of store.v$.cnpj?.$errors" 
        :key="error.$uid"
      >
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
    <div class="pj-form__input--date">
      <label for="date">Data de abertura</label>
      <input
        id="date"
        type="date" 
        v-model="store.infos.date"
        @blur="store.v$.date.$touch"
        :class="{ 'has-error': store.v$.date?.$errors.length > 0 }"
      >
      <div 
        class="input-errors" 
        v-for="error of store.v$.date?.$errors" 
        :key="error.$uid"
      >
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
    <div class="pj-form__input">
      <label for="phone">Telefone</label>
      <input
        id="phone"
        type="text" 
        v-model="store.infos.phone"
        v-maska:[phoneMask]
        @blur="store.v$.phone.$touch"
        :class="{ 'has-error': store.v$.phone?.$errors.length > 0 }"
      >
      <div 
        class="input-errors" 
        v-for="error of store.v$.phone?.$errors" 
        :key="error.$uid"
      >
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.pj-form {
  &__input, &__input--date {
    &--date {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    margin-bottom: 0.8rem;
  }
}

</style>
