import { ref } from 'vue'
import { defineStore } from 'pinia'
import ValidationsInput from '@/composables/validations'
import { useVuelidate } from '@vuelidate/core'    

export const useFirstStep = defineStore('FirstStep', () => {
  const infos = ref({
    email: '',
    type: 'pj'
  })
  
  const rules = {
    email: {
      ...ValidationsInput.Required('Campo obrigatório.'),
      ...ValidationsInput.Email('Digite um email valido')
    }
  }

  var v$ = useVuelidate(rules, infos, { $lazy: true})
  
  
  return { infos, v$ }
})
