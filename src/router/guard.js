import { useFirstStep } from '@/stores/FirstStep'
import { usePfStep } from '@/stores/PfStep'
import { usePjStep } from '@/stores/PjStep'
import { useThirdStep } from '@/stores/ThirdStep'

export const setupPiniaRouterPlugin = (router) => {
    const storeFirstStep = useFirstStep()
    const storePfStep = usePfStep()
    const storePjStep = usePjStep()
    const storeThirdStep = useThirdStep()

    router.beforeEach(async (to, from, next) => {
        const step = Number(to.params.step)

        if ( step == 2 && storeFirstStep.infos.email.length < 1 ) {
            return next({name: 'step', params: {step: 1}})
        }

        if (
            step == 3 && storePfStep.infos.name.length < 1 && 
            step == 3 && storePjStep.infos.corporateReason.length < 1
        ) {
            return next({name: 'step', params: {step: 2}})
        }

        if(step == 4 && storeThirdStep.infos.password.length < 1){
            return next({name: 'step', params: {step: 3}})
        }

        if(to.name == 'step' && ![1,2,3,4].includes(step)){
            return next({name: 'step', params: {step: 1}})
        }

        if(Number(from.params.step) !== 4 && to.name == 'success'){
            return next({name: 'step', params: {step: 1}})
        }

        next()
    })
}