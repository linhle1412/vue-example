<template>
  <div class="page-index bg-form">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan-larger.svg" alt="" />
            </div>
            <div class="page-title text-center">
              Bảng vinh danh đóng góp
            </div>
            <div class="tab-contribute">
              <div class="infor-fund-table">
                <div class="header-table">
                  <div class="row">
                    <div class="col-sm-12 col-md-7">
                      <div class="d-flex">
                        <div
                          class="tab tab-customer"
                          :class="{ active: tabActive === 1 }"
                          @click.prevent="setTabActive(1)"
                        >
                          Cá nhân
                        </div>

                        <div
                          class="tab tab-store"
                          :class="{ active: tabActive === 2 }"
                          @click.prevent="setTabActive(2)"
                        >
                          Cửa hàng
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-5">
                      <div class="search-bar">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <b-input id="search_text" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="head-title-table d-none d-lg-block">
                  <div class="d-flex">
                    <div class="w-10">Xếp hạng</div>
                    <div class="w-90">
                      <div class="row">
                        <div v-if="tabActive === 1" class="col-3">
                          Thành viên
                        </div>
                        <div v-if="tabActive === 2" class="col-4">
                          Thành viên
                        </div>
                        <div
                          v-if="tabActive === 1"
                          class="col-2 text-lg-center"
                        >
                          <span class="pl-9x">SĐT</span>
                        </div>
                        <div
                          v-if="tabActive === 1"
                          class="col-3 text-lg-center"
                        >
                          <span class="pl-9x"
                            >Ngày đóng góp
                            <i class="fa fa-sort" aria-hidden="true" @click="sort('date')"></i
                          ></span>
                        </div>
                        <div
                          v-if="tabActive === 2"
                          class="col-4 text-lg-center"
                        >
                          <span class="pl-9x"
                            >Ngày đóng góp
                            <i
                              class="fa fa-sort"
                              aria-hidden="true"
                              @click="sort('date')"
                            ></i
                          ></span>
                        </div>
                        <div class="col-4 text-lg-right">
                          Số tiền đóng góp
                          <i
                            class="fa fa-sort"
                            @click="sort('total')"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="dataFunds.entities && dataFunds.entities.length > 0">
                  <div
                    v-for="(item, index) in sortedCats "
                    :key="index"
                    class="content-table"
                  >
                    <div class="w-10">
                      <div class="stt-box">{{ item.rank }}</div>
                    </div>
                    <div class="w-90">
                      <div class="name-box">
                        <div class="row items-center">
                          <div class="col">
                            <div class="row">
                              <div
                                class="'col-md-12 name-customer"
                                :class="{
                                  'col-lg-3': tabActive === 1,
                                  'col-lg-4': tabActive === 2
                                }"
                              >
                                {{ item.name }}
                              </div>
                              <div
                                v-if="tabActive === 1"
                                class="col-md-12 col-lg-2 text-lg-center"
                              >
                                {{ item.code }}
                              </div>
                              <div
                                v-if="tabActive === 1"
                                class="col-md-12 col-lg-3 text-lg-center"
                              >
                                {{ item.date }}
                              </div>
                              <div
                                v-if="tabActive === 2"
                                class="col-md-12 col-lg-4 text-lg-center"
                              >
                                {{ item.date }}
                              </div>
                              <div class="col-md-12 col-lg-4 total-money">
                                {{ item.total | money }}₫
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-bottom"></div>
  </div>
</template>

<script>
export default {
  layout: "default",
  filters: {
    formatPrice(value) {
      const valueFormat = new Intl.NumberFormat("vi-VN").format(value);
      return valueFormat + "₫";
    }
  },
  async fetch() {
  },
  data() {
    return {
      dataFunds: {
        entities: [
          {
            rank: 1,
            name: "Steve",
            code: "0962xxxx68",
            date: "22/06/2021",
            total: 592000
          },
          {
            rank: 2,
            name: "Nghĩa Đinh",
            code: "0345xxxx03",
            date: "10/06/2021",
            total: 307000
          }
        ]
      },

      currentSort: "date",
      currentSortDir: "asc",
      tabActive: 1
    };
  },
  computed: {
    sortedCats:function() {
    return this.dataFunds.entities.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
  },
  methods: {
    setTabActive(index) {
      this.tabActive = index;
      this.currentPage = 1;
    },
    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    }
  },
  head() {}
};
</script>

<style lang="scss" scoped>
.section-fullscreen {
  width: 100%;
}
.w-10 {
  width: 16%;
  @media (min-width: 992px) {
    width: 12%;
  }
}
.w-90 {
  width: 85%;
  @media (min-width: 992px) {
    width: 88%;
  }
}
.sub-section-heading {
  text-transform: uppercase;
  font-size: 24px;
  font-family: "Yeseva One", sans-serif;
  font-weight: normal;
  margin: 3.2px 0;
  @media (min-width: 992px) {
    font-size: 3rem;
  }
}
.infor-fund-table {
  min-height: 70rem;
  padding: 3rem 24px;
  background: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.08);
  .content-table {
    display: flex;
    width: 100%;
    margin-top: 8px;
  }
}
.tab {
  width: 148px;
  padding: 10px 34px;
  font-size: 19px;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif;
  letter-spacing: 0;
  text-align: center;
  //   &.tab-store {
  //     margin: 0 24px;
  //   }
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: #ffcb05;
  }
  @media (max-width: 992px) {
    width: 50%;
    max-width: 14.8rem;
    padding: 8px 24px;
    font-size: 16px;
    &.tab-store {
      margin-left: 14px;
    }
  }
}
.head-title-table {
  padding: 20px 0 16px 0;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
}
.total-money {
  color: #ffcb05;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-top: 0.4rem;
  @media (min-width: 992px) {
    text-align: right;
    font-size: 18px;
    margin-top: 0;
  }
}

.stt-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-family: "Yeseva One", sans-serif;
  font-weight: normal;
  background: #fff;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  &::after {
    content: "";
    right: 0;
    width: 2px;
    height: 100%;
    position: absolute;
    background-color: #f5f5f5;
  }
  @media (min-width: 992px) {
    font-size: 18px;
  }
}
.name-box {
  background-color: #fff;
  padding: 12px 24px 12px 12px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  > div {
    height: 100%;
  }
}
.name-customer {
  font-size: 14px;
  font-family: "Yeseva One", sans-serif;
  font-weight: normal;
  @media (min-width: 992px) {
    font-size: 18px;
  }
}
.avatar {
  width: 3.2px;
  height: 3.2px;
  border-radius: 50%;
  margin: 0 12px 0 24px;

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
  }
}
.paging-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  ul {
    display: flex;
    width: 20px;
  }
}
.bg-sport {
  position: relative;
  width: 100%;
  height: 220px;
  margin-top: 4rem;
  background: url(/images/funds/bg_kid.png) center bottom no-repeat;
  background-size: cover;
  @media (min-width: 580px) {
    &:after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      height: 20px;
      width: 100%;
      background: #efeeec;
    }
    height: 50rem;
  }
  @media (min-width: 992px) {
    height: 68rem;
  }
  @media (min-width: 1690px) {
    height: 80rem;
  }
}
.athletes-block {
  background: #efeeec;
  padding: 20px 0;
  .sub-top-title {
    font-size: 3rem;
    font-family: "Yeseva One", sans-serif;
    font-weight: normal;
  }
  .title-block {
    font-size: 3rem;
    font-family: "Yeseva One", sans-serif;
    font-weight: normal;
  }
  .athletes-name {
    font-family: "Yeseva One", sans-serif;
    font-weight: normal;
    font-size: 24px;
    margin-top: 3rem;
    text-transform: capitalize;
    @media (min-width: 992px) {
      margin-top: 0;
    }
  }

  .athletes-infor {
    margin-top: 3.2px;
    .athletes-job {
      margin: 16px 0;
      font-size: 16px;
      font-family: "Yeseva One", sans-serif;
      font-weight: normal;
      @media (min-width: 992px) {
        font-size: 20px;
      }
    }
    .athletes-avatar {
      width: 100%;
      height: auto;
      img {
        max-width: 80%;
      }
    }
    @media (min-width: 992px) {
      margin-top: 5rem;
      .athletes-avatar {
        width: 50rem;
        height: auto;
        width: auto;
        max-width: 50rem;
        overflow: hidden;
        max-height: 50rem;
      }
    }
    .athletes-profile {
      white-space: pre-wrap;
      font-family: "Roboto Condensed", sans-serif;
      font-size: 18px;
      line-height: 24px;
      font-weight: normal;
    }
  }
  .slider-row {
    margin: 7rem 0 0 0;
  }
  .total-final {
    margin: 4rem 0;
    .total-title {
      font-family: "Oswald", sans-serif;
      font-size: 3rem;
      line-height: 1.5;
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .total-number {
      font-family: "MicrobrewSoftOneD", sans-serif;
      font-size: 10rem;
    }
    .symboy-total {
      padding: 0 14px 2.5rem 14px;
    }
  }
  .custom-swiperjs {
    position: relative;
    .swiper-btn-next,
    .swiper-btn-prev {
      top: 35%;
    }
    .swiper-btn-next {
      right: -1rem;
    }
    .swiper-btn-prev {
      left: -1rem;
    }
    @media (min-width: 992px) {
      .swiper-btn-next {
        right: -20px;
      }
      .swiper-btn-prev {
        left: -20px;
      }
      .col-md-5,
      .col-md-6 {
        padding-left: 12px;
        padding-right: 12px;
      }
    }
    .athletes-slider-container {
      display: flex;
      justify-content: center;
      width: 90%;
      .swiper-wrapper {
        margin-left: auto;
        margin-right: auto;
      }
      .athletes-slide-item {
        .slide-name {
          width: 24rem;
          margin-top: 20px;
          font-family: "Roboto Condensed", sans-serif;
          font-size: 20px;
          line-height: 28px;
          font-weight: normal;
          text-transform: uppercase;
        }
        .slide-image {
          width: 24rem;
          height: 24rem;
          border-radius: 50%;
          background: #fff;
          background-size: cover;
          object-fit: cover;
          background-repeat: no-repeat;
          img {
            object-fit: contain;
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}
// .text-sliver {
//   color: $color-silver;
// }
.items-center {
  align-items: center;
}
.search-bar {
  position: relative;
  i {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translate(0%, -50%);
  }
  #search_text {
    width: 100%;
    font-size: 19px;
    color: #000;
    background-color: transparent;
    border: none;
    padding-left: 40px;
    border-bottom: 2px solid #888;
    transition: all 0.25s;
    border-radius: 0;
    &:focus {
      border-color: #ffcb05;
      box-shadow: unset;
    }
  }
}
</style>
