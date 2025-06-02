<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <h2 class="mb-3">Review Star</h2>
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Tahun Penilaian</h5>

          <!-- Inline Form -->
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="selectedYear"
              @change="filterStars"
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
          </div>
        </div>
      </div>
      <section>
        <div class="card">
          <div class="card-header -4 mb-3">
            <h5 class="card-title mb-3">List of STAR Review</h5>
            <div class="row">
              <!-- Right Toolbar -->
              <div
                class="col-md-6 ms-auto d-flex gap-1 align-items-center justify-content-md-end mb-3"
              >
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    class="form-control"
                    autocomplete="off"
                    v-model="searchQuery"
                    @input="filterStars"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Year</th>
                    <th>Subject/Related KPI</th>
                    <th>STAR Narration</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="star in filteredStars" :key="star.id">
                    <td>{{ star.employeeName }}</td>
                    <td>{{ star.year }}</td>
                    <td>
                      {{ star.subject }}
                    </td>
                    <td>
                      <div class="text-truncate" style="max-width: 300px">
                        {{ star.narration }}
                      </div>
                    </td>
                    <td>
                      <span class="text-muted">
                        <i class="demo-pli-clock"></i>
                        {{ formatDate(star.submittedDate) }}
                      </span>
                    </td>
                    <td class="fs-5">
                      <NuxtLink
                        :to="`/review-star/${star.id}/edit`"
                        class="text-decoration-none"
                      >
                        <div
                          class="badge d-block cursor-pointer"
                          :class="getStatusClass(star.status)"
                        >
                          {{ star.status }}
                        </div>
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav
              v-if="totalPages > 1"
              class="text-align-center mt-5"
              aria-label="Table navigation"
            >
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a
                    class="page-link"
                    @click.prevent="changePage(currentPage - 1)"
                    >Previous</a
                  >
                </li>
                <li
                  v-for="page in visiblePages"
                  :key="page"
                  class="page-item"
                  :class="{ active: currentPage === page }"
                >
                  <a class="page-link" @click.prevent="changePage(page)">{{
                    page
                  }}</a>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <a
                    class="page-link"
                    @click.prevent="changePage(currentPage + 1)"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const selectedYear = ref("");
const searchQuery = ref("");
const stars = ref([]);
const filteredStars = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

// Load STAR data from localStorage with mockup data if empty
const loadStars = () => {
  if (process.client) {
    try {
      const savedStars = localStorage.getItem("stars-review");
      if (savedStars) {
        stars.value = JSON.parse(savedStars);
      } else {
        // Mockup data with split STAR fields and skills
        stars.value = [
          {
            id: 1,
            employeeName: "John Anderson",
            subject: "Increased Team Productivity",
            situation: "Team was struggling with meeting sprint deadlines",
            task: "Implement new agile methodologies",
            action: "Conducted workshops and introduced daily standups",
            result: "40% improvement in sprint completion rate",
            narration: "Situation: Team was struggling with meeting sprint deadlines\n\nTask: Implement new agile methodologies\n\nAction: Conducted workshops and introduced daily standups\n\nResult: 40% improvement in sprint completion rate",
            submittedDate: "2023-05-15",
            status: "Approved",
            year: "2023",
            skills: ["Leadership", "Agile Methodologies", "Team Management", "Process Improvement"]
          },
          {
            id: 2,
            employeeName: "Sarah Mitchell",
            subject: "Customer Support Enhancement",
            situation: "High customer complaint rate",
            task: "Reduce response time and improve satisfaction",
            action: "Implemented new ticketing system and trained team",
            result: "65% reduction in complaint resolution time",
            narration: "Situation: High customer complaint rate\n\nTask: Reduce response time and improve satisfaction\n\nAction: Implemented new ticketing system and trained team\n\nResult: 65% reduction in complaint resolution time",
            submittedDate: "2023-06-01",
            status: "Need Revised",
            year: "2023",
            skills: ["Customer Service", "System Implementation", "Training & Development"]
          },
          {
            id: 3,
            employeeName: "Michael Chang",
            subject: "Cost Optimization Project",
            situation: "Department overspending on software licenses",
            task: "Audit and optimize software usage",
            action: "Conducted usage analysis and negotiated with vendors",
            result: "Annual savings of $50,000",
            narration: "Situation: Department overspending on software licenses\n\nTask: Audit and optimize software usage\n\nAction: Conducted usage analysis and negotiated with vendors\n\nResult: Annual savings of $50,000",
            submittedDate: "2023-05-28",
            status: "Submitted",
            year: "2023",
            skills: ["Negotiation", "Cost Management", "Vendor Management", "Analytics"]
          },
          {
            id: 4,
            employeeName: "Dewi Kusuma",
            subject: "Digital Transformation Initiative",
            situation: "Manual processes causing delays in reporting",
            task: "Digitize key business processes",
            action: "Led cross-functional team to implement digital solutions",
            result: "Reduced reporting time by 75%",
            narration: "Situation: Manual processes causing delays in reporting\n\nTask: Digitize key business processes\n\nAction: Led cross-functional team to implement digital solutions\n\nResult: Reduced reporting time by 75%",
            submittedDate: "2023-07-15",
            status: "Approved",
            year: "2023",
            skills: ["Digital Transformation", "Change Management", "Project Management", "Process Automation"]
          }
        ];
        localStorage.setItem("stars-review", JSON.stringify(stars.value));
      }
    } catch (error) {
      console.error("Error loading STAR review data:", error);
      stars.value = [];
    }
  }
  filterStars();
};

// Filter stars based on year and search query
const filterStars = () => {
  let filtered = [...stars.value];

  if (selectedYear.value) {
    filtered = filtered.filter((star) => star.year === selectedYear.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (star) =>
        star.employeeName.toLowerCase().includes(query) ||
        star.subject.toLowerCase().includes(query) ||
        star.narration.toLowerCase().includes(query) ||
        star.status.toLowerCase().includes(query) ||
        star.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }

  filteredStars.value = filtered;
  currentPage.value = 1;
};

// Pagination computed properties
const totalPages = computed(() =>
  Math.ceil(filteredStars.value.length / itemsPerPage)
);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Utility methods
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-success";
    case "need revised":
      return "bg-warning";
    case "submitted":
      return "bg-secondary";
    case "rejected":
      return "bg-danger";
    default:
      return "bg-gray";
  }
};

// View method
const viewStar = (star) => {
  navigateTo(`/review-star/${star.id}`);
};

// Pagination methods
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Initialize
onMounted(() => {
  loadStars();
});

// Watch for changes
watch([selectedYear, searchQuery, currentPage], () => {
  if (selectedYear.value || searchQuery.value) {
    filterStars();
  }
});

useHead({
  title: "Review STAR - TalentReview",
});
</script>
