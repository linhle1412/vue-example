<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-12 py-3">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.png" alt="" />
            </div>
            <div class="d-flex justify-content-center">
              <div class="fund-box">
                <div class="title-line-box"><span>{{$t('total_fund')}}</span></div>
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
                    <div class="title-line-box"><span>{{$t('sponsored')}}</span></div>
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
                    <div class="title-line-box"><span>{{$t('remain_fund')}}</span></div>
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
                <NuxtLink :to="localePath('talent-sponsorship')">
                  {{$t('sponsored_talent')}}
                </NuxtLink>
              </div>
            </div>
            
            <div class="row justify-content-center">
              <div class="px-2 d-flex justify-content-end">
                <NuxtLink :to="localePath('contribute')">
                  <div class="info-group">
                    {{$t('nav.contribute')}}
                  </div>
                </NuxtLink>
              </div>
              <div class="px-2 d-flex justify-content-center">
                <NuxtLink :to="localePath('rank')">
                  <div class="info-group">
                    {{$t('nav.rank')}}
                  </div>
                </NuxtLink>
              </div>
              <div class="px-2 d-flex justify-content-start">
                <NuxtLink :to="localePath('talent')">
                  <div class="info-group">
                    {{$t('talent_info')}}
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
  head() {
    return {
      title: 'Quỹ Phát triển tài năng Việt',
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        {
          hid: "og:title",
          property: "og:title",
          content: "Quỹ Phát triển tài năng Việt"
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://quyphattrientainangviet.akadigital.vn"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Quỹ Phát triển tài năng Việt"
        },
        {
          hid: "description",
          name: "description",
          content: "Quỹ Phát triển tài năng Việt"
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article"
        },
        {
          hid: "og:image",
          property: "og:image",
          content: '/icon.jpg'
        },
        {
          hid: 'image',
          name: 'image',
          content: '/icon.jpg'
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '1109570683188671'
        },
      ],
    }
   
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
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-basis: auto;
  border-top-color: transparent;
}
.title-line-box {
  position: absolute;
  font-size: 28px;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  top: 0;
  left: 0;
  text-transform: uppercase;
  width: 100%;
  display: flex;
  span {
    margin: 0 20px;
    margin-top: -23px;
  }
  &::after, &::before {
    content: '';
    border: 1px solid transparent;
    border-top-color: #3a3a3a;
  }
  &::after {
    border-top-right-radius: 17px;
    flex: 1 1;
    border-left: none;
  }
  &::before {
    border-top-left-radius: 17px;
    flex: 1 1;
    border-right: none
  }
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
  border-top-color: transparent;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-basis: auto;
  padding: 2.5rem 1.7rem;
  margin: 1.5rem 0rem 2.5rem 0rem;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
  .title-line-box{
    font-size: 22px;
    span {
      margin-top: -15px;
    }
    &::after {
      border-top-right-radius: 17px;
      flex: 1 1;
    }
    &::before {
      border-top-left-radius: 17px;
      flex: 1 1;
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
}
</style>
