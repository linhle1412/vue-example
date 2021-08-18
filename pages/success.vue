<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.png" alt="" />
            </div>
            <div class="form-contribute">
              <div class="img-form text-center">
                <img src="~/assets/images/img-success.png" alt="">
              </div>
              <div class="title-form text-center">
                Thanh toán thành công
              </div>
              <div class="content-form text-center">
                Cảm ơn bạn đã góp vào Quỹ Phát Triển Tài Năng Việt. <br />
                Hành động nhỏ - Ý nghĩa lớn của bạn đã giúp cho các tài năng <br/>
                mở rộng cơ hội trong tương lai
              </div>
              <div class="btn-defaut text-center mb-4">
                <NuxtLink to="/bang-vinh-danh" class='text-uppercase'>
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
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.form-contribute {
  background: #f5f5f5;
  padding: 20px;
  .img-form{
    width: 120px;
    margin: 20px auto 30px auto;
    img{
      width: 100%;
    }
  }
  .title-form {
    text-transform: uppercase;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 15px;
    font-family: "Yeseva One", sans-serif;
  }
  .content-form {
    font-size: 22px;
    margin-bottom: 60px;
  }
}

@media only screen and (max-width: 550px) {
}
</style>
