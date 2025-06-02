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
            >
              <option selected="">klik untuk memilih</option>
              <option value="1">2020</option>
              <option value="2">2021</option>
              <option value="3">2022</option>
              <option value="3">2023</option>
              <option value="3">2024</option>
              <option value="3">2025</option>
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
                  :to="{name: 'index-star-create'}"
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
                  />
                </div>
              </div>
              <!-- END : Right Toolbar -->
            </div>
          </div>

          <div class="card-body">
            <div class="table-responsove">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">Subject/Related KPI</th>
                    <th>STAR Naration</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a class="btn-link" href="#">Subject number 1</a></td>
                    <td>
                      Lorem ipsum dolor sit amet. Sed placeat obcaecati ex
                      molestiae molestiae in minima velit est debitis
                      praesentium
                    </td>
                    <td>
                      <span class="text-muted"
                        ><i class="demo-pli-clock"></i> Oct 22, 2021</span
                      >
                    </td>
                    <td class="fs-5">
                      <div class="badge d-block bg-success">Approved</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a class="btn-link" href="#">Subject number 2</a></td>
                    <td>
                      Lorem ipsum dolor sit amet. Sed placeat obcaecati ex
                      molestiae molestiae in minima velit est debitis
                      praesentium
                    </td>
                    <td>
                      <span class="text-muted"
                        ><i class="demo-pli-clock"></i> Oct 24, 2021</span
                      >
                    </td>
                    <td class="fs-5">
                      <div class="badge d-block bg-warning">Need Revised</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a class="btn-link" href="#">Subject number 3</a></td>
                    <td>
                      Lorem ipsum dolor sit amet. Sed placeat obcaecati ex
                      molestiae molestiae in minima velit est debitis
                      praesentium
                    </td>
                    <td>
                      <span class="text-muted"
                        ><i class="demo-pli-clock"></i> Oct 24, 2021</span
                      >
                    </td>
                    <td class="fs-5">
                      <div class="badge d-block bg-gray">Submitted</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav class="text-align-center mt-5" aria-label="Table navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link">Previous</a>
                </li>
                <li class="page-item active" aria-current="page">
                  <span class="page-link">1</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item disabled">
                  <a class="page-link" href="#">...</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup></script>
