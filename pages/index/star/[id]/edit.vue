<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item"><NuxtLink to="/star">My STAR</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">Edit</li>
        </ol>
      </nav>
      
      <div v-if="!star" class="alert alert-danger">
        STAR entry not found
      </div>

      <template v-else>
        <div class="card mb-3">
          <div class="card-body">
            <!-- Inline Form -->
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="formData.year"
                :class="{ 'is-invalid': errors.year }"
              >
                <option value="">klik untuk memilih</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <label for="floatingSelect">Pilih tahun penilaian</label>
              <div class="invalid-feedback" v-if="errors.year">
                {{ errors.year }}
              </div>
            </div>
          </div>
        </div>

        <section>
          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <form @submit.prevent="handleSubmit">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control bg-gray-100"
                        id="floatingInput"
                        placeholder="Subject number one"
                        v-model="formData.subject"
                        :class="{ 'is-invalid': errors.subject }"
                      />
                      <label for="floatingInput">Subject / Related KPI</label>
                      <div class="invalid-feedback" v-if="errors.subject">
                        {{ errors.subject }}
                      </div>
                    </div>

                    <div class="form-floating mb-3">
                      <textarea
                        class="form-control bg-gray-100"
                        placeholder="Describe the situation"
                        id="situationTextarea"
                        style="height: 140px"
                        v-model="formData.situation"
                        :class="{ 'is-invalid': errors.situation }"
                      ></textarea>
                      <label for="situationTextarea">Situation (Situasi)</label>
                      <div class="invalid-feedback" v-if="errors.situation">
                        {{ errors.situation }}
                      </div>
                    </div>

                    <div class="form-floating mb-3">
                      <textarea
                        class="form-control bg-gray-100"
                        placeholder="Describe the task"
                        id="taskTextarea"
                        style="height: 140px"
                        v-model="formData.task"
                        :class="{ 'is-invalid': errors.task }"
                      ></textarea>
                      <label for="taskTextarea">Task (Tantangan)</label>
                      <div class="invalid-feedback" v-if="errors.task">
                        {{ errors.task }}
                      </div>
                    </div>

                    <div class="form-floating mb-3">
                      <textarea
                        class="form-control bg-gray-100"
                        placeholder="Describe your actions"
                        id="actionTextarea"
                        style="height: 140px"
                        v-model="formData.action"
                        :class="{ 'is-invalid': errors.action }"
                      ></textarea>
                      <label for="actionTextarea">Action (Tindakan)</label>
                      <div class="invalid-feedback" v-if="errors.action">
                        {{ errors.action }}
                      </div>
                    </div>

                    <div class="form-floating mb-3">
                      <textarea
                        class="form-control bg-gray-100"
                        placeholder="Describe the results"
                        id="resultTextarea"
                        style="height: 140px"
                        v-model="formData.result"
                        :class="{ 'is-invalid': errors.result }"
                      ></textarea>
                      <label for="resultTextarea">Result (Hasil)</label>
                      <div class="invalid-feedback" v-if="errors.result">
                        {{ errors.result }}
                      </div>
                    </div>

                    <div class="col-12 pt-4">
                      <button class="btn btn-primary" type="submit">
                        Save Changes
                      </button>
                      <NuxtLink to="/star" class="btn btn-secondary ms-2">
                        Cancel
                      </NuxtLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const star = ref(null)
const formData = ref({
  year: '',
  subject: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  status: ''
})
const errors = ref({})

// Load STAR data on mount
onMounted(() => {
  if (process.client) {
    const stars = JSON.parse(localStorage.getItem('stars') || '[]')
    star.value = stars.find(s => s.id.toString() === route.params.id)
    
    if (star.value) {
      // Split narration into STAR components if needed
      const narrationParts = star.value.narration?.split('\n\n') || []
      
      formData.value = {
        year: star.value.year,
        subject: star.value.subject,
        situation: narrationParts[0] || star.value.situation || '',
        task: narrationParts[1] || star.value.task || '',
        action: narrationParts[2] || star.value.action || '',
        result: narrationParts[3] || star.value.result || '',
        status: star.value.status
      }
    }
  }
})

const validateForm = () => {
  const newErrors = {}
  
  if (!formData.value.year) newErrors.year = 'Please select a year'
  if (!formData.value.subject) newErrors.subject = 'Subject is required'
  if (!formData.value.situation) newErrors.situation = 'Situation is required'
  if (!formData.value.task) newErrors.task = 'Task is required'
  if (!formData.value.action) newErrors.action = 'Action is required'
  if (!formData.value.result) newErrors.result = 'Result is required'
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return
  
  if (process.client) {
    const stars = JSON.parse(localStorage.getItem('stars') || '[]')
    const index = stars.findIndex(s => s.id.toString() === route.params.id)
    
    if (index !== -1) {
      // Update the STAR entry
      stars[index] = {
        ...stars[index],
        ...formData.value,
        narration: `${formData.value.situation}\n\n${formData.value.task}\n\n${formData.value.action}\n\n${formData.value.result}`
      }
      
      // Save back to localStorage
      localStorage.setItem('stars', JSON.stringify(stars))
      
      // Navigate back to index
      router.push('/star')
    }
  }
}

// Set page title
useHead({
  title: 'Edit STAR - TalentReview'
})
</script>