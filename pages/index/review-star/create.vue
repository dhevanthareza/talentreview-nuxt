<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item"><NuxtLink to="/review-star">Review STAR</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">Create</li>
        </ol>
      </nav>

      <div class="card mb-3">
        <div class="card-body">
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              v-model="star.year"
            >
              <option value="">Select year</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <label for="floatingSelect">Tahun penilaian</label>
          </div>
        </div>
      </div>

      <section>
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    v-model="star.subject"
                  />
                  <label for="floatingInput">Subject / Related KPI</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="situationTextarea"
                    style="height: 140px"
                    v-model="star.situation"
                  ></textarea>
                  <label for="situationTextarea">Situation (Situasi)</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="taskTextarea"
                    style="height: 140px"
                    v-model="star.task"
                  ></textarea>
                  <label for="taskTextarea">Task (Tantangan)</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="actionTextarea"
                    style="height: 140px"
                    v-model="star.action"
                  ></textarea>
                  <label for="actionTextarea">Action (Tindakan)</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="resultTextarea"
                    style="height: 140px"
                    v-model="star.result"
                  ></textarea>
                  <label for="resultTextarea">Result (Hasil)</label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Resume</h5>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="employeeInput"
                    v-model="star.employeeName"
                  />
                  <label for="employeeInput">Employee Name</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="commentsTextarea"
                    style="height: 140px"
                    v-model="star.comments"
                  ></textarea>
                  <label for="commentsTextarea">Comments</label>
                </div>

                <div class="col-12">
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="saveStar"
                    :disabled="!isValid"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

// Initialize empty star object
const star = ref({
  year: '',
  subject: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  employeeName: '',
  comments: '',
  status: 'Draft'
})

// Generate years for dropdown (current year and previous 2 years)
const currentYear = new Date().getFullYear()
const years = [currentYear, currentYear - 1, currentYear - 2]

// Validate form
const isValid = computed(() => {
  return star.value.year &&
         star.value.subject &&
         star.value.situation &&
         star.value.task &&
         star.value.action &&
         star.value.result &&
         star.value.employeeName
})

// Save STAR
const saveStar = () => {
  if (process.client) {
    const stars = JSON.parse(localStorage.getItem('stars-review') || '[]')
    
    // Create new STAR entry
    const newStar = {
      ...star.value,
      id: Date.now(),
      createdDate: new Date().toISOString(),
      narration: `Situation: ${star.value.situation}\n\nTask: ${star.value.task}\n\nAction: ${star.value.action}\n\nResult: ${star.value.result}`
    }
    
    stars.push(newStar)
    localStorage.setItem('stars-review', JSON.stringify(stars))
    
    // Redirect to list
    router.push('/review-star')
  }
}

useHead({
  title: 'Create STAR - TalentReview'
})
</script>