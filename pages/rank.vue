<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 pb-5">
            <div class="py-5">
              <div class="logo text-center">
                <img src="~/assets/images/slogan.png" class="thumb" alt="" />
              </div>
            </div>
            <div class="page-title text-center">
              {{$t('rank_title')}}
            </div>
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="tab-contribute">
                  <div class="infor-fund-table">
                    <div class="header-table">
                      <div class="row">
                        <div class="col-sm-12 col-md-7">
                          <div class="d-flex">
                            <div
                              class="tab"
                              v-for="(tab, index) in tabs"
                              :key="index"
                              :class="{ active: tabActive === (index + 1) }"
                              @click="setTabActive(index + 1)"
                            >
                              {{tab[$i18n.locale]}}
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-5">
                          <div class="search-bar">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <b-input
                              id="search_text"
                              v-model="searchKey"
                              @input="onSearch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="head-title-table d-none d-lg-block">
                      <div class="d-flex">
                        <div class="w-10">{{$t('stt')}}</div>
                        <div class="w-90">
                          <div class="row">
                            <div v-if="tabActive === 1" class="col-4">
                              {{$t('member')}}
                            </div>
                            <div v-if="tabActive === 2" class="col-4">
                              {{$t('organization')}}
                            </div>
                            <div v-if="tabActive === 3" class="col-8">
                              {{$t('store')}}
                            </div>
                            <div
                              v-if="tabActive === 1 || tabActive === 2"
                              class="col-2 text-lg-center"
                            >
                              <span class="pl-9x">{{$t('sdt')}}</span>
                            </div>
                            <div
                              v-if="tabActive === 1 || tabActive === 2"
                              class="col-3 text-lg-center p-0"
                            >
                              <span class="pl-9x"
                                >{{$t('contribute_at')}}
                                <div class="btn-sort" @click="onSort('updated_at')">
                                  <img src="~/assets/images/sort.png" alt="" />
                                </div>
                              </span>
                            </div>

                            <div
                              class="text-lg-right pl-0"
                              :class="{
                                'col-3': tabActive === 1 || tabActive === 2,
                                'col-4': tabActive === 3
                              }"
                            >
                              {{$t('contribute_amount')}}
                              <div class="btn-sort" @click="onSort('amount')">
                                <img src="~/assets/images/sort.png" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="head-title-table d-lg-none">
                      <div class="d-flex">
                        <div class="col-6 text-lg-center p-0">
                          <span v-if="tabActive === 1 || tabActive === 2" class="pl-9x"
                            >{{$t('contribute_at')}}
                            <div class="btn-sort" @click="onSort('updated_at')">
                              <img src="~/assets/images/sort.png" alt="" />
                            </div>
                          </span>
                        </div>

                        <div class="text-right col-6 p-0">
                          {{$t('contribute_amount')}}
                          <div class="btn-sort" @click="onSort('amount')">
                            <img src="~/assets/images/sort.png" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="isLoading" class="table-loading">
                      <div
                        class="table-loading-row"
                        v-for="index in 10"
                        :key="index"
                      ></div>
                    </div>
                    <div v-else-if="dataFunds && dataFunds.length > 0">
                      <div
                        v-for="(item, index) in dataFunds"
                        :key="item.rank + '-' + index"
                        class="content-table"
                      >
                        <div class="w-10">
                          <div class="stt-box">{{ item.rank }}</div>
                        </div>
                        <div class="w-90">
                          <div class="name-box">
                            <div class="row items-center">
                              <div class="col">
                                <div class="row align-items-center">
                                  <div
                                    class="col-md-12 name-customer"
                                    :class="{
                                      'col-lg-4': tabActive === 1 || tabActive === 2,
                                      'col-lg-8': tabActive === 3
                                    }"
                                  >
                                    {{
                                      tabActive === 1 || tabActive === 2 ? item.fullname : item.name
                                    }}
                                  </div>
                                  <div
                                    v-if="tabActive === 1 || tabActive === 2"
                                    class="col-md-12 col-lg-2 text-lg-center"
                                  >
                                    {{ item.phone }}
                                  </div>
                                  <div
                                    v-if="tabActive === 1 || tabActive === 2"
                                    class="col-md-12 col-lg-3 text-lg-center"
                                  >
                                    {{ new Date(item.updated_at) | date }}
                                  </div>
                                  <div
                                    class="col-md-12 total-money"
                                    :class="{
                                      'col-lg-3': tabActive === 1 || tabActive === 2,
                                      'col-lg-4': tabActive === 3
                                    }"
                                  >
                                    {{ item.amount | money }}₫
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center my-5">{{$t('empty_data')}}</div>
                    <pagination
                      v-if="dataFunds && dataFunds.length > 0"
                      v-model="currentPage"
                      :page-count="pageCount"
                      :page-range="6"
                    >
                    </pagination>
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
import { mapState, mapActions } from "vuex";
import {debounce} from 'debounce';
export default {
  layout: "default",
  data() {
    return {
      isLoading: true,
      tabActive: 1,
      tabs: [
        {
          vi: 'Cá nhân',
          en: 'Individual'
        },
        {
          vi: 'Tổ chức',
          en: 'Organization'
        },
        {
          vi: 'Café Ông Bầu',
          en: 'Ông Bầu Café',
        },
      ],
      searchKey: "",
      sortBy: "",
      sortValue: "desc",
      totalPage: 0,
      currentPage: 1,
      pagination: {
        page: 0,
        perpage: 10,
      },
      filters: [],
      orders: [
        {
          rule: 'amount',
          op: 'desc'
        }
      ],
    };
  },
  computed: {
    ...mapState(["shops", "customers"]),
    dataFunds() {
      let data = this.tabActive === 1  || this.tabActive === 2 ? this.customers : this.shops;
      return data;
    },
    pageCount() {
      return Math.ceil(this.totalPage / this.pagination.perpage)
    },
    query() {
      let _filters = [...this.filters]

      if (this.tabActive == 1 || this.tabActive == 2) {
        _filters = [...this.filters, {
          rule: 'type',
          op: '=',
          value: this.tabActive == 1 ? 'personal' : 'organization'
        }]
      }
      return {...this.pagination, filters: _filters, orders: this.orders}
      
    }
  },

  watch: {
    currentPage(nVal) {
      this.pagination.page = nVal - 1
      this.fetchData()
    }
  },

  created() {
    this.setTabActive(1);
  },

  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(["fetchRankPerson", "fetchRankStore"]),
    async fetchData() {
      this.isLoading = true;
      try {
        if (this.tabActive == 1 || this.tabActive == 2) {
          this.totalPage = await this.fetchRankPerson(this.query);
        } else {
          this.totalPage = await this.fetchRankStore(this.query);
        }
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
    onSearch: debounce(async function() {
      this.currentPage = 1
      if (this.tabActive == 1 || this.tabActive == 2) {
        this.filters = [{
          rule: 'fullname',
          op: 'like',
          value: this.searchKey
        }]
      } else {
        this.filters = [{
          rule: 'name',
          op: 'like',
          value: this.searchKey
        }]
      }
      this.fetchData()
    }, 300),

    onSort(key) {
      this.sortValue = this.sortValue === "asc" ? "desc" : "asc";
      this.sortBy = key;
      this.orders = [{
        rule: this.sortBy,
        op: this.sortValue
      }]
      this.fetchData();
    },
    setTabActive(index) {
      this.tabActive = index;
      this.searchKey = "";
      this.orders = [];
      this.filters = [];
      this.currentPage = 1;
      this.fetchData();
    },
  }
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
  min-height: 57rem;
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
  padding: 6px 15px;
  font-size: 17px;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif;
  letter-spacing: 0;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: #ffcb05;
  }
  @media (max-width: 992px) {
    // width: 50%;
    // max-width: 14.8rem;
    // padding: 8px 24px;
    font-size: 16px;
  }
}
.head-title-table {
  padding: 20px 0 16px 0;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 15px;
  .btn-sort {
    outline: none;
    padding: 0;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    img {
      max-width: 100%;
      width: 14px;
    }
    &:focus {
      outline: none;
    }
  }
}
.total-money {
  color: #ffcb05;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-top: 0.4rem;
  @media (min-width: 992px) {
    text-align: right;
    margin-top: 0;
    padding-left: 0;
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
  padding-right: 0;
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
  background: url(/images/funds/bg_kid.jpg) center bottom no-repeat;
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
  margin-top: -5px;
  i {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translate(0%, -50%);
    font-size: 20px;
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
