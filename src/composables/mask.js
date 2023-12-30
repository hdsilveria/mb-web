import { reactive } from 'vue'

export const cnpjMask = reactive({
    mask: "##.###.###/####-##",
    eager: true
})

export const cpfMask = reactive({
    mask: "###.###.###-##",
    eager: true
})

export const phoneMask = reactive({
    mask: "(##) #####-####",
    eager: true
})