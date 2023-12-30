import FirstStep from '@/components/form/FirstStep.vue'
import SecondStep from '@/components/form/SecondStep.vue'
import ThirdStep from '@/components/form/ThirdStep.vue'
import FourthStep from '@/components/form/FourthStep.vue'
import { ref } from 'vue'

export const stepComponents = ref({
    1: {
        component: FirstStep, 
        title: 'Seja bem vindo(a)'
    },
    2: {
        component: SecondStep, 
        title: ``
    },
    3: {
        component: ThirdStep, 
        title: 'Senha de acesso'
    },
    4: {
        component: FourthStep, 
        title: 'Revise suas informações'
    },
})