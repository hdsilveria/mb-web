<script setup>
  import { usePfStep } from '@/stores/PfStep'
  import { cpfMask, phoneMask } from '@/composables/mask'
  import { vMaska } from "maska"


  const store = usePfStep()
</script>

<template>
  <div class="pf-form">
    <div class="pf-form__input">
      <label for="name">Nome</label>
      <input
        id="name"
        type="text" 
        v-model="store.infos.name"
        @blur="store.v$.name.$touch"
        :class="{ 'has-error': store.v$.name?.$errors.length > 0 }"
      >
      <div class="input-errors" v-for="error of store.v$.name?.$errors" :key="error.$uid">
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
    <div class="pf-form__input">
      <label for="cpf">CPF</label>
      <input
        id="cpf"
        type="text"
        v-maska:[cpfMask]
        v-model="store.infos.cpf"
        @blur="store.v$.cpf.$touch"
        :class="{ 'has-error': store.v$.cpf?.$errors.length > 0 }"
      >
      <div class="input-errors" v-for="error of store.v$.cpf?.$errors" :key="error.$uid">
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
    <div class="pf-form__input--date">
      <label for="date">Data de nascimento</label>
      <input
        id="date"
        type="date" 
        v-model="store.infos.date"
        @blur="store.v$.date.$touch"
        :class="{ 'has-error': store.v$.date?.$errors.length > 0 }"
      >
      <div class="input-errors" v-for="error of store.v$.date?.$errors" :key="error.$uid">
        <span class="error-msg">{{ error.$message }}</span>
      </div>
    </div>
    <div class="pf-form__input">
      <label for="phone">Telefone</label>
      <input
        id="phone" 
        type="text"
        v-maska:[phoneMask]
        v-model="store.infos.phone"
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

.pf-form {
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
