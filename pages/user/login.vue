<template>
  <div id="root" class="root front-container">
    <section id="content" class="content">
      <div
        class="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center"
      >
        <div class="content__wrap">
          <!-- Login card -->
          <div class="card shadow-lg login-box">
            <div class="card-body">
              <div class="text-center">
                <h1 class="h3">Account Login</h1>
                <p>Sign In to your account</p>
              </div>

              <form class="mt-4" @submit.prevent="handleLogin">
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    autofocus
                    id="Username"
                    v-model="loginForm.username"
                    required
                  />
                </div>

                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="loginForm.password"
                    required
                  />
                </div>

                <div class="form-check">
                  <input
                    id="_dm-loginCheck"
                    class="form-check-input"
                    type="checkbox"
                    v-model="loginForm.remember"
                  />
                  <label for="_dm-loginCheck" class="form-check-label">
                    Remember me
                  </label>
                </div>

                <div class="d-grid mt-5">
                  <button
                    class="btn btn-primary btn-lg"
                    type="submit"
                    :disabled="isLoading"
                  >
                    <span
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    {{ isLoading ? "Signing In..." : "Sign In" }}
                  </button>
                </div>
              </form>

              <div class="d-flex justify-content-between mt-4">
                <NuxtLink
                  to="/user/forgot-password"
                  class="btn-link text-decoration-none"
                >
                  Forgot password ?
                </NuxtLink>
                <NuxtLink
                  to="/user/register"
                  class="btn-link text-decoration-none"
                >
                  New account
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const { login } = useAuth()

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Login with any credentials (accepts anything for mockup)
    login(loginForm.value)

    // Redirect to dashboard
    await navigateTo('/')
    
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: 'Login - TalentReview',
  bodyAttrs: {
    class: 'login-background'
  }
})
</script>