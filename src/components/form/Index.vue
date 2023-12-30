<script setup>
    import { onMounted, watch, ref  } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    
    import FirstStep from './FirstStep.vue'
    import SecondStep from './SecondStep.vue'
    import ThirdStep from './ThirdStep.vue'
    import FourthStep from './FourthStep.vue'

    import { useFirstStep } from '@/stores/FirstStep'
    import { usePfStep } from '@/stores/PfStep'
    import { usePjStep } from '@/stores/PjStep'
    import { useThirdStep } from '@/stores/ThirdStep'

    const storeFirstStep = useFirstStep()
    const storePfStep = usePfStep()
    const storePjStep = usePjStep()
    const storeThirdStep = useThirdStep()

    const route = useRoute()
    const router = useRouter()

    const stepComponents = ref({
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

    const stepComponent = ref()

    function setComponent(){
        const step = Number(route.params.step)
        stepComponent.value = stepComponents.value[step]
        document.title = stepComponent.value.title
    }

    watch(() => route.params.step, () => {
        setComponent()
    })

    watch(() => storeFirstStep.infos.type, (value) => {
        if(value == 'pj'){
            stepComponents.value[2].title = 'Pessoa Jurídica'
            return
        }

        stepComponents.value[2].title = 'Pessoa Fisíca'
    })
    
    onMounted(() => {
        stepComponents.value[2].title = 'Pessoa Jurídica'
        setComponent()
    })

    async function nextStep() {
        const step = Number(route.params.step)
        var isFormCorrect = null

        switch (step) {
            case 1:
                isFormCorrect = await storeFirstStep.v$.$validate()
                break
                
            case 2:
                isFormCorrect = await (
                    storeFirstStep.infos.type === 'pj' ? 
                    storePjStep.v$.$validate() : 
                    storePfStep.v$.$validate()
                )
                break

            case 3:
                isFormCorrect = await storeThirdStep.v$.$validate()
                break

            case 4: 
                var first = await storeFirstStep.v$.$validate()
                var second = isFormCorrect = await (
                    storeFirstStep.infos.type === 'pj' ? 
                    storePjStep.v$.$validate() : 
                    storePfStep.v$.$validate()
                )
                var third = await storeThirdStep.v$.$validate()

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

    function resetStores(){        
        storePjStep.v$.$reset()
        storePfStep.v$.$reset()
        storeThirdStep.v$.$reset()
    }
</script>

<template>
    <section class="page-main">
        <p class="page-main__steps">
            Etapa <span>{{ route.params.step }}</span> de 4
        </p>
        <h1 class="page-main__title">
            {{ stepComponent?.title }}
        </h1>
        <form
            class="page-main__form"
            @submit.prevent="nextStep()"
        >
            <component 
                :is="stepComponent?.component" 
            />
            <div class="page-main__form__buttons">
                <router-link
                    @click="resetStores()"
                    v-if="Number(route.params.step) > 1"
                    :to="`/formulario/${Number(route.params.step) - 1}`"
                    class="page-main__form__buttons--prev"
                >
                    <button>
                        Voltar
                    </button>
                </router-link>
    
                <button 
                    type="submit"
                    class="page-main__form__buttons--next"
                >
                    Continuar
                </button>
            </div>
        </form>
    </section>
</template>

<style scoped lang="scss">
@import '@/assets/style/mixins/button.scss';
    .page-main {
        &__steps {
            span {
                color: $color-primary;
            }
        }

        &__form {
            margin-top: 1rem;
            &__buttons {
                margin-top: 1rem;
                display: flex;
                gap: 8px;
                bottom: 0;
    
                &--prev {
                    text-decoration: none;
                    max-width: 50%;
                    width: 100%;
                    
                    button {
                        @include button-secondary();
                    }
                }
    
                &--next {
                    max-width: 100%;
                    @include button-primary();
                }
            }
        }
    }
</style>
