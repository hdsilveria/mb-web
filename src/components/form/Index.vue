<script setup>
    import { onMounted, watch, ref  } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    
    import { useFirstStep } from '@/stores/FirstStep'
    import { usePfStep } from '@/stores/PfStep'
    import { usePjStep } from '@/stores/PjStep'
    import { useThirdStep } from '@/stores/ThirdStep'
    
    import { stepComponents } from '@/utils/steps'
    import validateAndNavigate from '@/utils/validateAndNavigate'

    const storeFirstStep = useFirstStep()
    const storePfStep = usePfStep()
    const storePjStep = usePjStep()
    const storeThirdStep = useThirdStep()

    const route = useRoute()
    const router = useRouter()
    const stepComponent = ref()

    function setComponent(){
        stepComponent.value = stepComponents.value[Number(route.params.step)]
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
        validateAndNavigate(
            Number(route.params.step), 
            {
                storeFirstStep,
                storePfStep,
                storePjStep,
                storeThirdStep,
            }, 
            router
        )
    }

    function resetStores() {
    [
        storePjStep, 
        storePfStep, 
        storeThirdStep
    ].forEach(store => {
        store.v$.$reset()
    })
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
                font-weight: 700;
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
