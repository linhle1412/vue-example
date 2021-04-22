<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.svg" alt="" />
            </div>
            <div class="content text-center mb-4">
              <img src="~/assets/images/tagline.svg" alt="" />
            </div>
            <div class="d-flex justify-content-center">
              <div class="fund-box">
                <div class="title-line-box">Tổng Giá Trị Quỹ</div>
                <div class="value-fund-box text-center">
                  3.682.938.000
                </div>
                <sup>VNĐ</sup>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-4 group-btn">
                <NuxtLink to="/">
                  <div class="info-group">
                    Thông tin quỹ
                  </div>
                </NuxtLink>
              </div>
              <div class="col-lg-4 col-md-4 group-btn">
                <NuxtLink to="/">
                  <div class="info-group">
                    Cửa hàng đóng góp
                  </div>
                </NuxtLink>
              </div>
              <div class="col-lg-4 col-md-4 group-btn">
                <NuxtLink to="/">
                  <div class="info-group">
                    Tài năng ương mầm
                  </div>
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
  layout: "default"
};
</script>

<style lang="scss" scoped>

.fund-box {
  min-width: 30rem;
  position: relative;
  padding: 2rem 4rem;
  margin: 1.5rem 4rem 3rem 4rem;
  border: 1px solid #3a3a3a;
  border-radius: 1.6rem;
  display: flex;
  justify-content: center;
  flex-basis: auto;
}
.fund-box .title-line-box {
  position: absolute;
  top: -1.5rem;
  font-size: 28px;
  line-height: normal;
  padding: 0 2rem;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  z-index: 1;
}
.fund-box .title-line-box:after {
  content: "";
  position: absolute;
  height: 6px;
  width: 100%;
  top: 50%;
  left: 0;
  z-index: -1;
  background-color: #ffda4a;
}
.fund-box .value-fund-box {
  display: flex;
  overflow: hidden;
  font-family: "MicrobrewSoftOneD", sans-serif;
  font-size: 6.2rem;
  line-height: normal;
  letter-spacing: -2px;
  position: relative;
  top: 20rem;
  top: 0;
}
.fund-box sup {
    position: absolute;
    font-family: "MicrobrewSoftOneD", sans-serif;
    font-size: 1.5rem;
    top: 2.5rem;
    left: auto;
    right: 1.5rem;
    letter-spacing: normal;
}
.info-group{
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-family: "Oswald",sans-serif;
    font-size: 20px;
    color: #000;
    height: 56px;
    margin-bottom: 4rem;
    background: url('~/assets/images/stroke.svg') no-repeat;
    background-size: contain;
}
.group-btn a:hover{
  text-decoration: none;
}
@media only screen and (max-width: 550px) {
  .content img{
    width: 100%;
  }
  .fund-box{
    min-width: 100%;
  }
  .bg-leaf{
    background-image:unset ;
  }
  .fund-box .title-line-box:after{
    background-image: linear-gradient(to right, #f3c924 , #fdda4e);
  }
  .fund-box{
    padding: 2rem 2.5rem;
  }
  .fund-box .value-fund-box{
    font-size: 2.5rem;
  }
  .info-group{
    background-position: center;
  }
}
</style>
