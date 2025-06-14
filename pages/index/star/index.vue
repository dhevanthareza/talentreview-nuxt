<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <h2 class="mb-3">My STAR</h2>
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
          <!-- END : Inline Form -->
        </div>
      </div>
      <section>
        <div class="card">
          <div class="card-header -4 mb-3">
            <h5 class="card-title mb-3">List of STAR</h5>
            <div class="row">
              <!-- Left toolbar -->
              <div class="col-md-6 d-flex gap-1 align-items-center mb-3">
                <NuxtLink
                  :to="{ name: 'index-star-create' }"
                  class="btn btn-primary hstack gap-2 align-self-center"
                >
                  <i class="psi-add fs-5"></i>
                  <span class="vr"></span>
                  Add New
                </NuxtLink>
                <button class="btn btn-icon btn-outline-light">
                  <i class="pli-printer fs-5"></i>
                </button>
              </div>
              <!-- END : Left toolbar -->

              <!-- Right Toolbar -->
              <div
                class="col-md-6 d-flex gap-1 align-items-center justify-content-md-end mb-3"
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
              <!-- END : Right Toolbar -->
            </div>
          </div>

          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="text-center">Subject/Related KPI</th>
                  <th>STAR Narration</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="star in filteredStars" :key="star.id">
                  <td>
                    <a
                      class="btn-link"
                      href="#"
                      @click.prevent="viewStar(star)"
                    >
                      {{ star.subject }}
                    </a>
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
                    <div
                      class="badge d-block"
                      :class="getStatusClass(star.status)"
                    >
                      {{ star.status }}
                    </div>
                  </td>
                  <td>{{ star.year }}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button
                        class="btn btn-outline-primary"
                        @click="editStar(star)"
                        title="Edit"
                      >
                        <i class="pli-pencil"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger"
                        @click="deleteStar(star.id)"
                        title="Delete"
                      >
                        <i class="pli-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

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

// Load STAR data from localStorage
const loadStars = () => {
  try {
    const savedStars = localStorage.getItem("stars");
    if (savedStars) {
      stars.value = JSON.parse(savedStars);
    } else {
      stars.value = [];
    }
  } catch (error) {
    console.error("Error loading STAR data:", error);
    stars.value = [];
  }
  filterStars();
};

// Filter stars based on year and search query
const filterStars = () => {
  let filtered = [...stars.value];

  // Filter by year
  if (selectedYear.value) {
    filtered = filtered.filter((star) => star.year === selectedYear.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (star) =>
        star.subject.toLowerCase().includes(query) ||
        star.narration.toLowerCase().includes(query) ||
        star.status.toLowerCase().includes(query)
    );
  }

  filteredStars.value = filtered;
  currentPage.value = 1; // Reset to first page when filtering
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

const paginatedStars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredStars.value.slice(start, end);
});

// Update filteredStars to use paginated data
watch([selectedYear, searchQuery, currentPage], () => {
  if (selectedYear.value || searchQuery.value) {
    filterStars();
  }
});

// Pagination methods
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

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

// Action methods
const viewStar = (star) => {
  // Navigate to view page or show modal
  navigateTo(`/star/${star.id}`);
};

const editStar = (star) => {
  // Navigate to edit page
  navigateTo(`/star/${star.id}/edit`);
};

const deleteStar = (starId) => {
  if (confirm("Are you sure you want to delete this STAR?")) {
    stars.value = stars.value.filter((star) => star.id !== starId);

    // Update localStorage
    if (process.client) {
      localStorage.setItem("stars", JSON.stringify(stars.value));
    }

    filterStars();
  }
};

// Initialize on mount
onMounted(() => {
  loadStars();
});

// Update filteredStars to show paginated results
watch(
  [filteredStars, currentPage],
  () => {
    // This will trigger reactivity for the template
  },
  { immediate: true }
);

useHead({
  title: "My STAR - TalentReview",
});
</script>
