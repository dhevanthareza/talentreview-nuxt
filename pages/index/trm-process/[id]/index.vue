<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item">
            <NuxtLink to="/trm-process">Talent Review</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Detail</li>
        </ol>
      </nav>

      <div v-if="!talent" class="alert alert-danger">
        Talent data not found
      </div>

      <template v-else>
        <div class="row">
          <!-- Basic Information -->
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Basic Information</h5>
                
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td class="fw-bold">Nopeg</td>
                      <td>{{ talent.nopeg }}</td>
                    </tr>
                    <tr>
                      <td class="fw-bold">Name</td>
                      <td>{{ talent.name }}</td>
                    </tr>
                    <tr>
                      <td class="fw-bold">Current Position</td>
                      <td>{{ talent.position }}</td>
                    </tr>
                    <tr>
                      <td class="fw-bold">Tenure</td>
                      <td>{{ talent.tenure }}</td>
                    </tr>
                    <tr>
                      <td class="fw-bold">Category</td>
                      <td>{{ getCategoryName(talent.category) }}</td>
                    </tr>
                    <tr>
                      <td class="fw-bold">Score</td>
                      <td>
                        <div class="badge bg-success fs-6">
                          {{ talent.score }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Competencies -->
          <div class="col-md-8 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Competencies</h5>
                <div class="mb-4">
                  <h6 class="fw-bold">Technical Skills</h6>
                  <div class="d-flex flex-wrap gap-2">
                    <span
                      v-for="comp in talent.competencies"
                      :key="comp"
                      class="badge bg-primary"
                    >
                      {{ comp }}
                    </span>
                  </div>
                </div>

                <div class="mb-4">
                  <h6 class="fw-bold">Performance History</h6>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Score</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="perf in talent.performance" :key="perf.year">
                          <td>{{ perf.year }}</td>
                          <td>{{ perf.score }}</td>
                          <td>
                            <div 
                              class="badge"
                              :class="getPerformanceClass(perf.rating)"
                            >
                              {{ perf.rating }}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="mb-4">
                  <h6 class="fw-bold">Career Development</h6>
                  <ul class="list-unstyled">
                    <li v-for="(pos, index) in talent.careerPath" :key="index" class="mb-3">
                      <div class="d-flex align-items-center gap-2">
                        <i class="pli-arrow-right fs-5"></i>
                        <div>
                          <div class="fw-bold">{{ pos.role }}</div>
                          <div class="text-muted small">{{ pos.timeline }}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const talent = ref(null)

const categories = [
  { id: 'IT', name: 'Information Technology' },
  { id: 'MK', name: 'Marketing' },
  { id: 'FN', name: 'Finance' },
  { id: 'AC', name: 'Accounting' }
]

// Load talent data
onMounted(() => {
  if (process.client) {
    const talents = JSON.parse(localStorage.getItem('trm-talents') || '[]')
    const foundTalent = talents.find(t => t.id.toString() === route.params.id)
    
    if (foundTalent) {
      // Add mock performance and career data if not present
      talent.value = {
        ...foundTalent,
        performance: foundTalent.performance || [
          { year: 2023, score: 85, rating: 'Outstanding' },
          { year: 2022, score: 82, rating: 'Excellent' },
          { year: 2021, score: 78, rating: 'Good' }
        ],
        careerPath: foundTalent.careerPath || [
          { role: 'Senior Technical Lead', timeline: 'Projected 2024' },
          { role: foundTalent.position, timeline: 'Current' },
          { role: 'Junior Developer', timeline: '2020-2022' }
        ]
      }
    }
  }
})

// Utility functions
const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const getPerformanceClass = (rating) => {
  switch (rating.toLowerCase()) {
    case 'outstanding':
      return 'bg-success'
    case 'excellent':
      return 'bg-primary'
    case 'good':
      return 'bg-info'
    default:
      return 'bg-secondary'
  }
}

useHead({
  title: talent.value?.name 
    ? `${talent.value.name} - TalentReview` 
    : 'Talent Detail - TalentReview'
})
</script>