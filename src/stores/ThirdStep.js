import { ref } from 'vue'
import { defineStore } from 'pinia'
import ValidationsInput from '@/composables/validations'
import { useVuelidate } from '@vuelidate/core'    

export const useThirdStep = defineStore('ThirdStep', () => {

  const infos = ref({
    password: '',
  })
  
  const rules = {
    password: ValidationsInput.Required('Campo obrigatório.')
  }

  var v$ = useVuelidate(rules, infos, { $lazy: true })
  
  return { infos, v$ }
})
