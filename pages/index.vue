<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-12 mx-auto py-3">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.svg" alt="" />
            </div>
            <div class="d-flex justify-content-center">
              <div class="fund-box">
                <!-- <div class="title-line-box">Tổng Giá Trị Quỹ</div> -->
                <div class="value-fund-box text-center">
                  {{totalFund | money}}
                </div>
                <sup>VNĐ</sup>
              </div>
            </div>
            <div class="row btn-row">
              <div class="col-md-6 col-12 col-lg-6">
                <div class="d-flex justify-content-center">
                  <div class="fund-box-row">
                    <div class="title-line-box">Đã tài trợ</div>
                    <div class="value-fund-box text-center">
                      <!-- {{sponsored}} -->
                    </div>
                    <sup>VNĐ</sup>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12 col-lg-6">
                <div class="d-flex justify-content-center">
                  <div class="fund-box-row">
                    <div class="title-line-box">Quỹ còn lại</div>
                    <div class="value-fund-box text-center">
                        <!-- {{cash}} -->
                    </div>
                    <sup>VNĐ</sup>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <div class='btn-sponsor'>
                <NuxtLink to="/">
                    Tài năng đã nhận tài trợ
                </NuxtLink>
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
import { mapState } from 'vuex'

export default {
  layout: "default",
  computed:{
    ...mapState(['totalFund']),
  }
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
.btn-row{
    padding-left: 6rem;
    padding-right: 6rem;
}
.fund-box-row{
  min-width: 246px;
  position: relative;
  border: 1px solid #3a3a3a;
  border-radius: 1.6rem;
  display: flex;
  justify-content: center;
  flex-basis: auto;
  padding: 2.5rem 1.7rem;
  margin: 1.5rem 0rem 2.5rem 0rem;
  .title-line-box{
    position: absolute;
    top: -18px;
    font-size: 22px;
    line-height: normal;
    padding: 0 1rem;
    font-family: "Oswald", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    z-index: 1;
    &:after{
      content: "";
      position: absolute;
      height: 10px;
      width: 100%;
      top: 50%;
      left: 0;
      z-index: -1;
      background-color: #ffda4a;
    }
  }
  .value-fund-box{
    display: flex;
    overflow: hidden;
    font-family: "MicrobrewSoftOneD", sans-serif;
    font-size: 3rem;
    line-height: normal;
    letter-spacing: -2px;
    position: relative;
    top: 20rem;
    top: 0;
  }
  sup{
    position: absolute;
    font-family: "MicrobrewSoftOneD", sans-serif;
    font-size: 0.7rem;
    top: 2.3rem;
    left: auto;
    right: 0.5rem;
    letter-spacing: normal;
  }
}
.info-group {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: #000;
  height: 56px;
  margin-bottom: 4rem;
  background: url("~/assets/images/stroke.svg") no-repeat;
  background-size: contain;
}
.group-btn a:hover {
  text-decoration: none;
}
.btn-sponsor{
  text-align: center;
  margin-bottom: 2.5rem;
  transform: skew(-15deg);
  -webkit-transform: skew(-15deg);
  -moz-transform: skew(-15deg);
  border: 2px solid #000;
  display: inline-block;
  a{
    color: #000;
    font-size: 25px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 20px 100px;
    transform: skew(15deg);
    -webkit-transform: skew(15deg);
    -moz-transform: skew(15deg);
    display: inline-block;
    &:hover{
      text-decoration: none;
    }
  }
}
@media only screen and (max-width: 550px) {
  .content img {
    width: 100%;
  }
  .fund-box {
    min-width: 100%;
  }
  .fund-box .title-line-box:after {
    background-image: linear-gradient(to right, #f3c924, #fdda4e);
  }
  .fund-box {
    padding: 2rem 2.5rem;
  }
  .fund-box .value-fund-box {
    font-size: 3rem;
  }
  .fund-box-row .value-fund-box {
    font-size: 2.8rem;
  }
  .info-group {
    background-position: center;
  }
  .btn-sponsor a{
    padding: 20px 5px;
    font-size: 22px;
  }
  .fund-box-row .title-line-box:after{
        background-image: linear-gradient(to right, #f3c924, #fad133);
  }
}
</style>
