import { ref } from 'vue'
import { defineStore } from 'pinia'
import ValidationsInput from '@/composables/validations'
import { useVuelidate } from '@vuelidate/core'    

export const usePjStep = defineStore('PjStep', () => {

  const infos = ref({
    corporateReason: '',
    cnpj: '',
    date: '',
    phone: ''
  })
  
  const rules = {
    corporateReason: ValidationsInput.Required('Campo obrigatório.'),
    cnpj:  {
      ...ValidationsInput.Required('Campo obrigatório.'),
      ...ValidationsInput.MinLength('CNPJ deve ter 14 digitos', 18)
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
