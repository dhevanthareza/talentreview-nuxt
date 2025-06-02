<template>
  <div class="content__boxed bg-gray-100 pt-3">
    <p class="mx-3">EMPLOYEE PROFILE</p>
  </div>

  <div class="content__boxed bg-gray-500 pt-3 px-3">
    <div class="d-flex">
      <div class="flex-shrink-0">
        <img
          class="img-sm rounded-circle"
          :src="user?.avatar || '/images/10.png'"
          alt="Profile Picture"
          loading="lazy"
        />
      </div>
      <div class="flex-grow-1 ms-3">
        <div class="mb-1">
          <a href="#" class="h6 btn-link">{{ user?.name }}</a>
        </div>
        <p class="mb-0">{{ user?.id }} &#x2022; {{ user?.position }}</p>
        <p>
          {{ user?.unit }} &#x2022; {{ user?.company }} &#x2022;
          {{ user?.department }}
        </p>
      </div>
    </div>
  </div>

  <div class="content__boxed">
    <div class="content__wrap">
      <div class="row">
        <div class="col-md-12">
          <!-- General Info Tab -->
          <div class="tab-base">
            <ul class="nav nav-callout" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#_dm-coTabsBaseHome"
                  type="button"
                  role="tab"
                >
                  GENERAL INFO
                </button>
              </li>
            </ul>

            <div class="tab-content">
              <div
                id="_dm-coTabsBaseHome"
                class="tab-pane fade show active"
                role="tabpanel"
              >
                <div class="row gx-5 gy-5 gy-md-0">
                  <div class="col-md-3">
                    <ol class="list-group list-group-borderless mt-4">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Age</div>
                          <small>42 Years</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Age of Retirement</div>
                          <small>56 Years</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Gender</div>
                          <small>Male</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Service of years</div>
                          <small>18 Years</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Business Group</div>
                          <small>Pemasaran</small>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div class="col-md-3">
                    <ol class="list-group list-group-borderless mt-4">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Company</div>
                          <small>Pertamina Patra Niaga</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Personnel Area</div>
                          <small>Jakarta</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">
                            Personnel Sub Area
                          </div>
                          <small>Jakarta Pusat</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Function</div>
                          <small>Marketing & Sales</small>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div class="col-md-3">
                    <ol class="list-group list-group-borderless mt-4">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Division</div>
                          <small>Digital Channel</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Department</div>
                          <small>Channel Operations</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Position</div>
                          <small>Manager</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Directorate</div>
                          <small>Marketing</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">Business Group</div>
                          <small>Downstream</small>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div class="col-md-3">
                    <ol class="list-group list-group-borderless mt-4">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">PRL JAB</div>
                          <small>PRL JAB 20</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">
                            Duration of PRL JAB
                          </div>
                          <small>5 Years</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">PRL BS</div>
                          <small>PRL BS 18</small>
                        </div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="me-auto">
                          <div class="h6 text-head mb-1">
                            Duration of PRL BS
                          </div>
                          <small>3 Years</small>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content__boxed">
    <div class="content__wrap">
      <div class="row">
        <div class="col-md-12">
          <!-- History Skill Group Tab -->
          <div class="tab-base">
            <ul class="nav nav-callout" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#_dm-coTabsBasehistory"
                  type="button"
                  role="tab"
                >
                  HISTORY SKILL GROUP
                </button>
              </li>
            </ul>

            <div class="tab-content">
              <div
                id="_dm-coTabsBasehistory"
                class="tab-pane fade show active"
                role="tabpanel"
              >
                <div class="row">
                  <div class="col-6">
                    <div class="alert alert-primary" role="alert">
                      293492374 Marketing, Sales & Commercial
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="alert alert-primary" role="alert">
                      3535434 Information & Communication Technology
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="alert alert-primary" role="alert">
                      324234234 Coorporate Communication & Relation Man
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="alert alert-primary" role="alert">
                      3534534 Competencies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getUser } = useAuth();

const user = ref(null);

onMounted(() => {
  user.value = getUser();
});

useHead({
  title: "Employee Profile - TalentReview",
});
</script>
