<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <h2 class="mb-3">Talent Review</h2>
      <div class="card mb-3">
        <div class="card-body">
          <!-- Inline Form -->
          <div class="form-floating mb-3">
            <!-- Replace existing select with Multiselect -->
            <div class="mb-3">
              <label class="form-label">Job Categories</label>
              <Multiselect
                v-model="selectedCategory"
                :options="positions"
                :searchable="true"
                value="id"
                label="name"
                placeholder="Choose your category"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-12">
              <label class="form-label">Kompetensi yang dicari</label>
              <Multiselect
                v-model="selectedCompetencies"
                mode="tags"
                :options="availableCompetencies"
                :searchable="true"
                placeholder="Select competencies"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-12">
              <label class="form-label">Nilai rata-rata minimum</label>
              <input
                type="number"
                v-model="minValue"
                class="form-control"
                min="0"
                max="1000"
              />
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" @click="filterTalents">
              Search
            </button>
          </div>
        </div>
      </div>

      <section>
        <div class="card">
          <div class="card-header mt-3">
            <h5 class="card-title">List of Talent</h5>
          </div>

          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th>Action</th>
                    <th>Nopeg</th>
                    <th>Name</th>
                    <th>Posisi saat ini</th>
                    <th>Lama</th>
                    <th>Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(talent, index) in paginatedTalents"
                    :key="talent.id"
                  >
                    <td class="text-center">{{ startIndex + index + 1 }}</td>
                    <td class="text-center text-nowrap">
                      <NuxtLink
                        :to="`/trm-process/${talent.id}`"
                        class="btn btn-icon btn-sm btn-primary btn-hover"
                      >
                        <i class="pli-information fs-5"></i>
                      </NuxtLink>
                    </td>
                    <td>{{ talent.nopeg }}</td>
                    <td>{{ talent.name }}</td>
                    <td>{{ talent.position }}</td>
                    <td>
                      <span class="text-muted">
                        <i class="demo-pli-clock"></i> {{ talent.tenure }}
                      </span>
                    </td>
                    <td class="text-right">{{ talent.scores.join(', ') }}</td>
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
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";

const selectedCategory = ref(null);
const selectedCompetencies = ref([]);
const competencies = ref([]);
const minValue = ref("");
const talents = ref([]);
const filteredTalents = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

// Define unique positions from CSV
const positions = [
  { value: "30313889", name: "Manager Channel Digitalization Operation" },
  { value: "30313894", name: "Sr Officer I Digital Operation" },
  { value: "30313890", name: "Sr Officer II Digitalization Project" },
  { value: "30313898", name: "Sr Officer I Support" },
  { value: "30313895", name: "Officer II Monitoring & Evaluation" },
  { value: "30313896", name: "Jr Officer I Monitoring & Evaluation" },
  { value: "30313897", name: "Officer II Data Compliance" },
  { value: "30313891", name: "Officer II Standard & Planning" },
  { value: "30313892", name: "Officer II Roll Out" },
  { value: "30313893", name: "Jr Officer II Roll Out" },
  { value: "30313899", name: "Officer I Data Analyst" },
  { value: "30313900", name: "Officer II Data Enhancement" },
];

// Replace the existing categories array with positions
const categories = positions;

// Define competencies mapping
const competenciesMap = {
  30313889: [
    "HSSE General",
    "HC Integrated",
    "Strategic & Business Management",
    "Risk Fundamental",
  ],
  30313894: ["Digital Operation", "System Integration", "Business Process"],
  30313890: [
    "Project Management",
    "Digital Transformation",
    "Change Management",
  ],
  30313898: ["Data Analysis", "Problem Solving", "Technical Support"],
  30313895: ["Performance Monitoring", "Data Analysis", "Process Evaluation"],
  30313896: ["Performance Analysis", "Data Collection", "Basic Monitoring"],
  30313897: ["Data Governance", "Compliance Management", "Risk Management"],
  30313891: [
    "Process Planning",
    "Standard Operating Procedure",
    "Quality Management",
  ],
  30313892: [
    "Implementation Management",
    "Change Management",
    "System Deployment",
  ],
  30313893: ["Basic Implementation", "User Training", "Documentation"],
  30313899: [
    "Advanced Data Analysis",
    "Data Visualization",
    "Statistical Analysis",
  ],
  30313900: ["Data Quality", "Data Enhancement Methods", "Data Cleaning"],
};

// Available competencies computed property
const availableCompetencies = computed(() => {
  if (selectedCategory.value) {
    return competenciesMap[selectedCategory.value] || [];
  }
  return Object.values(competenciesMap).flat();
});

// Load or mock talent data
const loadTalents = () => {
  if (process.client) {
    try {
      const savedTalents = localStorage.getItem("trm-talents");
      if (savedTalents) {
        talents.value = JSON.parse(savedTalents);
      } else {
        // Mock data with correct position references
        talents.value = [
          // Manager Channel Digitalization Operation
          {
            id: 1,
            nopeg: "12345",
            name: "Bambang Wijaya",
            position: "Manager Channel Digitalization Operation",
            positionId: "30313889",
            tenure: "2 Tahun, 5 Bulan",
            scores: [7, 8, 8],
            competencies: ["HSSE General", "HC Integrated", "Strategic & Business Management", "Risk Fundamental"],
          },
          {
            id: 2,
            nopeg: "12346",
            name: "Dewi Kusuma",
            position: "Manager Channel Digitalization Operation",
            positionId: "30313889",
            tenure: "3 Tahun, 2 Bulan",
            scores: [8, 7, 8],
            competencies: ["HSSE General", "HC Integrated", "Strategic & Business Management", "Risk Fundamental"],
          },
          {
            id: 3,
            nopeg: "12347",
            name: "Agus Santoso",
            position: "Manager Channel Digitalization Operation",
            positionId: "30313889",
            tenure: "1 Tahun, 8 Bulan",
            scores: [6, 7, 7],
            competencies: ["HSSE General", "HC Integrated", "Strategic & Business Management", "Risk Fundamental"],
          },

          // Sr Officer I Digital Operation
          {
            id: 4,
            nopeg: "12348",
            name: "Ratna Sari",
            position: "Sr Officer I Digital Operation",
            positionId: "30313894",
            tenure: "2 Tahun, 1 Bulan",
            scores: [7, 7, 8],
            competencies: ["Digital Operation", "System Integration", "Business Process"],
          },
          {
            id: 5,
            nopeg: "12349",
            name: "Budi Santoso",
            position: "Sr Officer I Digital Operation",
            positionId: "30313894",
            tenure: "1 Tahun, 11 Bulan",
            scores: [6, 8, 7],
            competencies: ["Digital Operation", "System Integration", "Business Process"],
          },
          {
            id: 6,
            nopeg: "12350",
            name: "Sri Wahyuni",
            position: "Sr Officer I Digital Operation",
            positionId: "30313894",
            tenure: "2 Tahun, 3 Bulan",
            scores: [7, 7, 7],
            competencies: ["Digital Operation", "System Integration", "Business Process"],
          },

          // Sr Officer II Digitalization Project
          {
            id: 7,
            nopeg: "12351",
            name: "Andi Pratama",
            position: "Sr Officer II Digitalization Project",
            positionId: "30313890",
            tenure: "1 Tahun, 6 Bulan",
            scores: [6, 7, 8],
            competencies: ["Project Management", "Digital Transformation", "Change Management"],
          },
          {
            id: 8,
            nopeg: "12352",
            name: "Nina Wulandari",
            position: "Sr Officer II Digitalization Project",
            positionId: "30313890",
            tenure: "2 Tahun, 4 Bulan",
            scores: [7, 8, 7],
            competencies: ["Project Management", "Digital Transformation", "Change Management"],
          },
          {
            id: 9,
            nopeg: "12353",
            name: "Rudi Hermawan",
            position: "Sr Officer II Digitalization Project",
            positionId: "30313890",
            tenure: "1 Tahun, 9 Bulan",
            scores: [7, 7, 8],
            competencies: ["Project Management", "Digital Transformation", "Change Management"],
          },

          // Sr Officer I Support
          {
            id: 10,
            nopeg: "12354",
            name: "Siti Nurhayati",
            position: "Sr Officer I Support",
            positionId: "30313898",
            tenure: "2 Tahun, 7 Bulan",
            scores: [6, 7, 7],
            competencies: ["Data Analysis", "Problem Solving", "Technical Support"],
          },
          // Add more entries following the same pattern for each position...
        ];
        localStorage.setItem("trm-talents", JSON.stringify(talents.value));
      }
      filterTalents();
    } catch (error) {
      console.error("Error loading talents:", error);
      talents.value = [];
    }
  }
};

// Watch for category changes
watch(selectedCategory, (newCategory) => {
  if (newCategory) {
    // Auto-select all competencies for selected job category
    selectedCompetencies.value = competenciesMap[newCategory] || [];
  } else {
    // Reset competencies when category is cleared
    selectedCompetencies.value = [];
  }
});

// Remove @change="filterTalents" from both Multiselect components
// Only filter when Search button is clicked
const filterTalents = () => {
  let filtered = [...talents.value];

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (t) => t.positionId === selectedCategory.value
    );
  }

  if (minValue.value) {
    filtered = filtered.filter(
      (t) =>
        (t.scores.reduce((a, b) => a + b, 0) / t.scores.length) >= parseInt(minValue.value)
    );
  }

  if (selectedCompetencies.value.length > 0) {
    filtered = filtered.filter((t) =>
      selectedCompetencies.value.some((sc) =>
        t.competencies.some((tc) => tc.toLowerCase().includes(sc.toLowerCase()))
      )
    );
  }

  filteredTalents.value = filtered;
  currentPage.value = 1;
};

// Pagination computed properties
const totalPages = computed(() =>
  Math.ceil(filteredTalents.value.length / itemsPerPage)
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);

const paginatedTalents = computed(() =>
  filteredTalents.value.slice(startIndex.value, startIndex.value + itemsPerPage)
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

// Page navigation
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Initialize
onMounted(() => {
  loadTalents();
  // Don't call filterTalents here anymore
  filteredTalents.value = talents.value;
});

useHead({
  title: "Talent Review - TalentReview",
});
</script>

<style>
/* Custom styles to match your theme */
.multiselect {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.multiselect.is-active {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #86b7fe;
}

.multiselect-option.is-selected {
  background: #0d6efd;
  color: white;
}

.multiselect-option.is-pointed {
  background: #e9ecef;
  color: #212529;
}

.multiselect-search {
  padding: 0.5rem;
}

.multiselect-placeholder {
  color: #6c757d;
}
</style>
