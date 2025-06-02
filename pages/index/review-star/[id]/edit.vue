<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item">
            <NuxtLink to="/review-star">Review STAR</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Review</li>
        </ol>
      </nav>

      <div v-if="!star" class="alert alert-danger">STAR entry not found</div>

      <template v-else>
        <div class="card mb-3">
          <div class="card-body">
            <div class="form-floating mb-3">
              <select
                class="form-select bg-gray-400"
                id="floatingSelect"
                v-model="star.year"
                disabled
              >
                <option :value="star.year">{{ star.year }}</option>
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
                      class="form-control bg-gray-400"
                      id="floatingInput"
                      v-model="star.subject"
                      disabled
                    />
                    <label for="floatingInput">Subject / Related KPI</label>
                  </div>

                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control bg-gray-400"
                      id="situationTextarea"
                      style="height: 140px"
                      v-model="star.situation"
                      disabled
                    ></textarea>
                    <label for="situationTextarea">Situation (Situasi)</label>
                  </div>

                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control bg-gray-400"
                      id="taskTextarea"
                      style="height: 140px"
                      v-model="star.task"
                      disabled
                    ></textarea>
                    <label for="taskTextarea">Task (Tantangan)</label>
                  </div>

                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control bg-gray-400"
                      id="actionTextarea"
                      style="height: 140px"
                      v-model="star.action"
                      disabled
                    ></textarea>
                    <label for="actionTextarea">Action (Tindakan)</label>
                  </div>

                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control bg-gray-400"
                      id="resultTextarea"
                      style="height: 140px"
                      v-model="star.result"
                      disabled
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
                      class="form-control bg-gray-400"
                      id="employeeInput"
                      v-model="star.employeeName"
                      disabled
                    />
                    <label for="employeeInput">Employee Name</label>
                  </div>

                  <div class="form-group mb-3">
                    <label for="employeeInput">Competencies</label>
                    <Multiselect
                      label="Competencies"
                      v-model="star.skills"
                      mode="tags"
                      :disabled="star.status !== 'Submitted'"
                      :options="availableSkills"
                      :searchable="true"
                      placeholder="Select skills"
                    />
                  </div>

                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control"
                      :class="{ 'bg-gray-400': star.status !== 'Submitted' }"
                      id="commentsTextarea"
                      style="height: 140px"
                      v-model="comments"
                      :disabled="star.status !== 'Submitted'"
                    ></textarea>
                    <label for="commentsTextarea">Comments</label>
                  </div>

                  <div v-if="star.status === 'Submitted'" class="col-12">
                    <button
                      class="btn btn-primary me-2"
                      type="button"
                      style="width: 120px"
                      @click="updateStatus('Approved')"
                    >
                      Approve
                    </button>
                    <button
                      class="btn btn-dark"
                      type="button"
                      style="width: 120px"
                      @click="updateStatus('Rejected')"
                    >
                      Reject
                    </button>
                  </div>

                  <div v-else class="alert alert-info">
                    Status: <strong>{{ star.status }}</strong>
                  </div>
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
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";

const route = useRoute();
const router = useRouter();
const star = ref(null);
const comments = ref("");

// Add available skills options
const availableSkills = [
  "Leadership",
  "Agile Methodologies",
  "Team Management",
  "Process Improvement",
  "Project Management",
  "Digital Transformation",
  "Change Management",
  "System Implementation",
  "Training & Development",
  "Customer Service",
  "Negotiation",
  "Cost Management",
  "Vendor Management",
  "Analytics",
  "Process Automation",
];

// Load STAR data on mount
onMounted(() => {
  if (process.client) {
    const stars = JSON.parse(localStorage.getItem("stars-review") || "[]");
    star.value = stars.find((s) => s.id.toString() === route.params.id);

    if (star.value) {
      // Split narration into STAR components if needed
      const narrationParts = star.value.narration?.split("\n\n") || [];

      star.value = {
        ...star.value,
        situation: narrationParts[0]?.replace("Situation: ", "") || "",
        task: narrationParts[1]?.replace("Task: ", "") || "",
        action: narrationParts[2]?.replace("Action: ", "") || "",
        result: narrationParts[3]?.replace("Result: ", "") || "",
      };

      comments.value = star.value.comments || "";
    }
  }
});

// Update the updateStatus function to handle array of skills
const updateStatus = (newStatus) => {
  if (process.client && star.value) {
    const stars = JSON.parse(localStorage.getItem("stars-review") || "[]");
    const index = stars.findIndex((s) => s.id.toString() === route.params.id);

    if (index !== -1) {
      stars[index] = {
        ...stars[index],
        status: newStatus,
        comments: comments.value,
        skills: star.value.skills, // Ensure skills array is saved
        reviewedDate: new Date().toISOString(),
      };

      localStorage.setItem("stars-review", JSON.stringify(stars));
      router.push("/review-star");
    }
  }
};

useHead({
  title: "Review STAR - TalentReview",
});
</script>

<style>
.multiselect {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.multiselect.is-disabled {
  background-color: #e9ecef;
  opacity: 1;
}

.multiselect-option.is-selected {
  background: #0d6efd;
  color: white;
}

.multiselect-option.is-pointed {
  background: #e9ecef;
  color: #212529;
}
</style>
