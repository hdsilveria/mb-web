import { ref } from 'vue'
import { defineStore } from 'pinia'
import ValidationsInput from '@/composables/validations'
import { useVuelidate } from '@vuelidate/core'    

export const usePfStep = defineStore('PfStep', () => {

  const infos = ref({
    name: '',
    cpf: '',
    date: '',
    phone: ''
  })
  
  const rules = {
    name: ValidationsInput.Required('Campo obrigatório.'),
    cpf: {
      ...ValidationsInput.Required('Campo obrigatório.'),
      ...ValidationsInput.MinLength('CPF deve ter 11 digitos', 14)
    },
    date: ValidationsInput.Required('Campo obrigatório.'),
    phone: {
      ...ValidationsInput.Required('Campo obrigatório.'),
      ...ValidationsInput.MinLength('Telefone deve ter 11 digitos', 15)
    },
  }

  var v$ = useVuelidate(rules, infos, { $lazy: true })

  return { infos, v$ }
})
