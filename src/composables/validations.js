import { email, required, minLength, helpers } from '@vuelidate/validators'

class ValidationsInput {
    Required(message){
        return {
            required: helpers.withMessage(message, required),
        }
    }

    Email(message){
        return {
            email: helpers.withMessage(message, email),
        }
    }

    MinLength(message, minimum){
        return {
            minLength: helpers.withMessage(message, minLength(minimum))
        }
    }

    GetErrorMessage(field, fieldValidations){
        const errors = []
        const validator = fieldValidations.value[field]
      
        if (!validator?.$dirty) return errors
      
        if (validator.$error) {
            Object.keys(validator).forEach((validationKey) => {
                if (validator[validationKey].$invalid) {
                    errors.push(validator[validationKey].$message)
                }
            })
        }
      
        return errors
    }

    handleBlur(v$, field){
        v$.value[field].$touch()
    }
}

export default new ValidationsInput()