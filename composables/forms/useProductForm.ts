import {
  minLength,
  numeric,
  required,
  url,
  maxLength,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export const useProductForm = (emit: (arg0: string) => void) => {
  const isEditing = ref(false)
  const state = reactive({
    id: null,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
  })
  const error = ref('')

  const rules = {
    title: { required, minLength: minLength(5) },
    price: { required, numeric, price: (value: number) => value > 10 },
    category: { required, minLength: minLength(3), maxLength: maxLength(20) },
    description: { required, minLength: minLength(10) },
    image: { required, url, minLength: minLength(5) },
  }

  const v$ = useVuelidate(rules, state)

  const resetForm = () => {
    state.id = null
    state.title = ''
    state.price = 0
    state.category = ''
    state.description = ''
    state.image = ''
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    error.value = null
    v$.value.$reset()
  }

  const submitForm = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid) return
    try {
      console.log('OK')
      if (isEditing.value) {
        console.log('Editing', state)
        await $fetch('/api/data/item', {
          method: 'PATCH',
          body: { id: state.id, item: state },
        })
      } else {
        await $fetch('/api/data/item', {
          method: 'POST',
          body: { item: { ...state, rating: 0, count: 0 } },
        })
      }
      emit('productSaved')
      emit('closeModal')
      resetForm()
    } catch (err) {
      console.error('Ошибка при сохранении:', err)
      error.value = 'Ошибка при сохранении данных'
    }
  }

  const setFormData = (data: {
    id: null
    title: string
    price: number
    category: string
    description: string
    image: string
  }) => {
    console.log('Данные из даты:', data)
    isEditing.value = true
    state.id = data.id
    state.title = data.title
    state.price = data.price
    state.category = data.category
    state.description = data.description
    state.image = data.image
  }

  return {
    state,
    error,
    v$,
    isEditing,
    submitForm,
    resetForm,
    setFormData,
  }
}
