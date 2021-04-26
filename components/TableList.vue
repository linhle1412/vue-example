<template>
  <div>
    <div class="card-row row bg-white mb-3 mx-0">
      <div class="col-md-2 font-weight-bold stt">{{ index }}</div>
      <div class="col-md-4 font-weight-bold name">{{ name }}</div>
      <div class="col-md-2 detail"><a :href="link">Chi tiết</a></div>
      <div class="col-md-4 price">{{ price | money }}<u>đ</u></div>
    </div>
    <div class="card-row-mobile row bg-white mb-3 mx-0">
      <div class="col-2 font-weight-bold stt">{{ index }}</div>
      <div class="col-10">
        <p class="name">{{ name }}</p>
        <p class="detail"><a :href="link">Chi tiết</a></p>
        <p class="price">{{ price | money }}<u>đ</u></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: ["index", "name", "link", "price"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.card-row {
  border-radius: 12px;
  align-items: center;
  display: flex;
  .stt {
    position: relative;
    padding: 12px 30px;
    &:after {
      content: "";
      right: 25px;
      top: 0;
      width: 2px;
      height: 100%;
      position: absolute;
      background-color: #f5f5f5;
    }
  }
  .name {
    padding: 0;
  }
  .detail {
    font-family: "Roboto Condensed", sans-serif;
    text-align: center;
    a {
      color: #000;
      border-bottom: 1px solid;
      &:hover {
        text-decoration: none;
      }
    }
  }
  .price {
    color: #ffcb05;
    font-weight: 700;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 20px;
    text-align: right;
  }
}
.card-row-mobile {
  display: none;
  align-items: center;
  border-radius: 15px;
  .stt {
    text-align: center;
  }

  .col-10 {
    padding-top: 10px;
    padding-bottom: 10px;
    &:before {
      content: "";
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      position: absolute;
      background-color: #f5f5f5;
    }
    p {
      margin-bottom: 0;
    }
    .detail {
      font-family: "Roboto Condensed", sans-serif;
      a {
        color: #000;
        border-bottom: 1px solid;
        &:hover {
          text-decoration: none;
        }
      }
    }
    .price {
      color: #ffcb05;
      font-weight: 500;
      font-family: "Roboto Condensed", sans-serif;
      font-size: 18px;
    }
  }
}
@media only screen and (max-width: 550px) {
  .card-row {
    display: none;
  }
  .card-row-mobile {
    display: flex;
  }
}
</style>
