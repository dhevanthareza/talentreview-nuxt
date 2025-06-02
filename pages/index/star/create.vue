<template>
  <div class="content__boxed">
    <div class="content__wrap">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">My STAR</a></li>
          <li class="breadcrumb-item active" aria-current="page">New</li>
        </ol>
      </nav>
      <div class="card mb-3">
        <div class="card-body">
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
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control bg-gray-100"
                    id="floatingInput"
                    placeholder="Subject number one"
                  />
                  <label for="floatingInput">Subject / Related KPI</label>
                </div>
                <!-- Floating label on input field -->
                <div class="form-floating mb-3">
                  <textarea
                    class="form-control bg-gray-100"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style="height: 140px"
                  ></textarea>
                  <label for="floatingTextarea2">Situation (Situasi)</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control bg-gray-100"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style="height: 140px"
                  ></textarea>
                  <label for="floatingTextarea2">Task (Tantangan)</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control bg-gray-100"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style="height: 140px"
                  ></textarea>
                  <label for="floatingTextarea2">Action (Tindakan)</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control bg-gray-100"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style="height: 140px"
                  ></textarea>
                  <label for="floatingTextarea2">Result (Hasil)</label>
                </div>
                <input
                  id="_dm-fileInput"
                  class="form-control bg-gray-100"
                  type="file"
                />
                <div class="col-12 pt-4">
                  <button class="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
                <!-- END : Floating label on input field -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
</script>