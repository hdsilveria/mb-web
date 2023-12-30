
export default async function validateAndNavigate(step, stores, router){
    var isFormCorrect = null

    switch (step) {
        case 1:
            isFormCorrect = await stores.storeFirstStep.v$.$validate()
            break
            
        case 2:
            isFormCorrect = await (
                stores.storeFirstStep.infos.type === 'pj' ? 
                stores.storePjStep.v$.$validate() : 
                stores.storePfStep.v$.$validate()
            )
            break

        case 3:
            isFormCorrect = await stores.storeThirdStep.v$.$validate()
            break

        case 4: 
            var first = await stores.storeFirstStep.v$.$validate()
            var second = isFormCorrect = await (
                stores.storeFirstStep.infos.type === 'pj' ? 
                stores.storePjStep.v$.$validate() : 
                stores.storePfStep.v$.$validate()
            )
            var third = await stores.storeThirdStep.v$.$validate()

            const validations = [first, second, third]

            if(!validations.includes(false)){
                return router.push({ name: 'success'})
            }
        default:
            break
    }

    if (!isFormCorrect) {
        return
    }

    router.push({ name: 'step', params: { step: step + 1} })
}