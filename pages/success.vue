<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.svg" alt="" />
            </div>
            <div class="form-contribute">
              <div class="title-form text-center">
                Lời cảm ơn
              </div>
              <div class="content-form text-center">
                Cảm ơn bạn đã góp phần phát triển <br />
                những Tài Năng Việt
              </div>
              <div class="btn-defaut text-center mb-3">
                <NuxtLink to="#" class='text-uppercase'>
                  Thông tin quỹ
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      price: 200000
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style lang="scss" scoped>
.form-contribute {
  background: #f5f5f5;
  padding: 20px;
  .title-form {
    text-transform: uppercase;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content-form {
    font-size: 25px;
    margin-top: 40px;
    margin-bottom: 120px;
  }
}

@media only screen and (max-width: 550px) {
}
</style>
