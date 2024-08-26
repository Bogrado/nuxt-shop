import LoginForm from '~/components/forms/loginForm.vue'
import RegisterForm from '~/components/forms/registerForm.vue'
import AdminProductForm from '~/components/forms/AdminProductForm.vue'
import AppConfirm from '~/components/forms/AppConfirm.vue'

export const formsContainer = {
  login: LoginForm,
  register: RegisterForm,
  createItem: AdminProductForm,
  editItem: AdminProductForm,
  deleteItem: AppConfirm
}
