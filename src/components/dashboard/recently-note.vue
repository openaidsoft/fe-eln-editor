<template>
  <div class="card border-0 text-truncate">
    <div class="row p-0">
      <div class="dash-card-header text-gray-500">
        <span><i class="fas fa-file-alt dash-card-header-icon"></i></span>
        <b class="mb-3 ms-2">최근 작업한 노트목록</b>
      </div>
      <div class="col-md-6 dash-first-box-card-body">
        <div class="note-thumbnail">
          <div class="note-thumbnail-img">
            <img src="/images/note-thumbnail.png" alt="" style="width: 100%; height: 150px" />
          </div>
          <div class="note-thumbnail-detail">
            <p>등록일 : 2022/01/09</p>
            <p>마지막 수정일 : 2022/01/10</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-0">
        <div class="card border-0 text-truncate mb-3 bg-gray-800 text-white">
          <div class="dash-first-box-card-body">
            <table class="table recently-note-table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                </tr>
              </thead>
              <tbody>
                <tr class="active">
                  <th scope="row">1</th>
                  <td>친환경소재 연구개발 1</td>
                  <td>Jacob</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>친환경소재 연구개발 2</td>
                  <td>Mark</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>친환경소재 연구개발 3</td>
                  <td>Larry</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>친환경소재 연구개발 4</td>
                  <td>Larry</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>친환경소재 연구개발 5</td>
                  <td>Larry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "recently-note",
};
</script>

<style lang="scss">
.note-thumbnail {
  padding: 10px;
  &-img {
    margin-bottom: 10px;
  }
  &-detail {
    font-size: 12px;
    font-weight: bold;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 8px;
    background: #f0f0f0;
    padding: 10px;
    & p {
      margin-bottom: 0px;
    }
  }
}

.recently-note-table {
  & td:hover {
    cursor: pointer;
    font-size: 0.85rem;
  }

  & .active {
    color: blue;
    font-weight: bold;
  }
}
</style>
