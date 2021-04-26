<template>
  <div class="row mx-0 mb-3">
    <div class="col-md-3 col-12  pl-lg-0">
      <div class="talent-list-img"></div>
    </div>
    <div class="col-md-9 col-12 talent-list-content">
      <div class="talent-list-title">
        <img width="30px" src="~/assets/images/medal-icon.png" alt="" /> Nguyễn
        thanh Hải
      </div>
      <div class="talent-list-des">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      <div class="talent-list-btn">
        <NuxtLink to="#">
          Chi tiết
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: ["image", "name", "des", "link"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.talent-list-content{
    padding: 15px;
    background: #fff;
    margin: 0;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
}
.talent-list-img {
  background: url("~/assets/images/default-image.jpg") no-repeat center;
  width: 100%;
  padding-bottom: 100%;
  background-size: cover;
  border-radius: 15px;
}
.talent-list-title {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 15px;
  img {
    background: #ffcb05;
  }
}
.talent-list-des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 15px;
}
.talent-list-btn{
    a {
      color: #000;
      border-bottom: 1px solid;
      font-weight: bold;
      &:hover {
        text-decoration: none;
      }
    }
}
@media only screen and (max-width: 550px) {
  .col-md-3{
      padding: 0;
      margin-bottom: 15px;
  }
}
</style>
