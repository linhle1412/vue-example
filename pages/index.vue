<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-12 py-3">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.svg" alt="" />
            </div>
            <div class="d-flex justify-content-center">
              <div class="fund-box">
                <div class="title-line-box">Tổng Giá Trị Quỹ</div>
                <div class="value-fund-box text-center">
                  {{(totalFund || 0) | money}}
                </div>
                <sup>VNĐ</sup>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="d-flex justify-content-end">
                  <div class="fund-box-row">
                    <div class="title-line-box">Đã tài trợ</div>
                    <div class="value-fund-box text-center">
                      {{(sponsored || 0) | money}}
                    </div>
                    <sup>VNĐ</sup>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="d-flex justify-content-start">
                  <div class="fund-box-row">
                    <div class="title-line-box">Quỹ còn lại</div>
                    <div class="value-fund-box text-center">
                      {{(remained || 0) | money}}
                    </div>
                    <sup>VNĐ</sup>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <div class='btn-sponsor'>
                <NuxtLink to="/tai-nang-nhan-tai-tro">
                    Tài năng đã nhận tài trợ
                </NuxtLink>
              </div>
            </div>
            
            <div class="row justify-content-center">
              <div class="px-2 d-flex justify-content-end">
                <NuxtLink to="/dong-gop">
                  <div class="info-group">
                    Đóng góp
                  </div>
                </NuxtLink>
              </div>
              <div class="px-2 d-flex justify-content-center">
                <NuxtLink to="/thong-tin-quy">
                  <div class="info-group">
                    Thông tin quỹ
                  </div>
                </NuxtLink>
              </div>
              <div class="px-2 d-flex justify-content-start">
                <NuxtLink to="/tai-nang">
                  <div class="info-group">
                    Thông tin các tài năng
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
import { mapState, mapActions } from "vuex";


export default {
  layout: "default",
  data() {
    return {
      interval: null
    };
  },
  created() {
    this.$store.dispatch('fetchFund')
  },
  mounted() {
    this.interval = setInterval(() => {
      this.$store.dispatch('fetchFund')
    }, 5000);
  },
  computed:{
    ...mapState(['totalFund', 'sponsored', 'remained']),
  },
  methods: {
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  
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
  height: 8px;
  width: 100%;
  top: 50%;
  left: 0;
  z-index: -1;
  background-color: #ffda4a;
}
.fund-box .value-fund-box {
  display: flex;
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
  top: 1.5rem;
  left: auto;
  right: 1.5rem;
  letter-spacing: normal;
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
  @media screen and (max-width: 576px) {
    width: 100%;
  }
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
    font-family: "MicrobrewSoftOneD", sans-serif;
    font-size: 2.8rem;
    line-height: normal;
    letter-spacing: -2px;
    position: relative;
    top: 20rem;
    top: 0;
  }
  sup{
    position: absolute;
    font-family: "MicrobrewSoftOneD", sans-serif;
    font-size: 1rem;
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
  font-size: 18px;
  color: #000;
  height: 65px;
  margin-bottom: 20px;
  background: url("~/assets/images/stroke.svg") no-repeat;
  background-size: 100%;
  min-width: 240px;
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
  border: 1px solid #000;
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
  @media screen and (max-width: 576px) {
    width: 100%;
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
