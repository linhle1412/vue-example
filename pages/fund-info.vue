<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.svg" alt="" />
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
                        <b-input
                          id="search_text"
                          prefix-icon="search"
                          :value="searchText"
                          @input="handleInputSearch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="head-title-table d-none d-lg-block">
                  <div class="d-flex">
                    <div class="w-10">Xếp hạng</div>
                    <div class="w-90">
                      <div class="row">
                        <div class="col-6">Thành viên</div>
                        <div v-if="tabActive === 1" class="col-2">
                          <span class="pl-9x">SĐT</span>
                        </div>
                        <div class="col d-flex content-end">
                          Số tiền đóng góp
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="dataFunds.entities && dataFunds.entities.length > 0">
                  <div
                    v-for="(item, index) in dataFunds.entities"
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
                                  'col-lg-6': tabActive === 1,
                                  'col-lg-7': tabActive === 2
                                }"
                              >
                                {{ item.name }}
                              </div>
                              <div
                                v-if="tabActive === 1"
                                class="col-md-12 col-lg-3"
                              >
                                {{ item.code }}
                              </div>
                              <div
                                class="col-md-12 total-money"
                                :class="{
                                  'col-lg-3': tabActive === 1,
                                  'col-lg-5': tabActive === 2
                                }"
                              >
                                {{ item.total | formatPrice }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="searchText" class="d-flex mt-4x content-center">
                  <div class="text-sliver">
                    <div class="d-flex content-center mb-2x">
                      <img
                        src="images/funds/icon_not-found.svg"
                        alt="loading"
                        height="52"
                      />
                    </div>
                    Không tìm thấy
                    {{ tabActive === 1 ? "thành viên" : "cửa hàng" }} đã nhập
                  </div>
                </div>
                <div v-else class="loading d-flex content-center">
                  <img src="images/spinner.svg" alt="loading" width="50" />
                </div>
                <div v-if="dataFunds.total > pageSizes" class="paging-row">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :pager-count="pageCount"
                    :total="dataFunds.total"
                    :page-size="pageSizes"
                    :current-page.sync="currentPage"
                    @current-change="handleCurrentChange"
                  >
                  </el-pagination>
                </div>
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
      dataFunds: {
        total: 0,
        entities: []
      },
      tabActive: 1,
      searchText: '',
      currentPage: 1,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async loadDataShops(isAll, pageSizeMax) {
      const pageIndex = this.currentPage - 1
      const dataShop = await this.$repo.getFundsShop.list({
        start:
          isAll ||
          (this.currentPage === 1 ? 0 : 1) + this.pageSizes * pageIndex,
        length: pageSizeMax || this.pageSizes
      })
      this.dataFundsShop = {
        data: dataShop
          ? dataShop.data.map((shop) => {
              const {
                rank = shop.rank,
                name = shop.shopName,
                image = shop.shopImage,
                code = shop.ShopCode,
                total = shop.total,
                type = 'shop'
              } = shop
              return { rank, name, code, image, total, type }
            })
          : null,
        total: dataShop ? dataShop.total : 0
      }
      this.mapDataFunds(this.tabActive)
    },
    async loadDataCustomers(isAll, pageSizeMax) {
      const pageIndex = this.currentPage - 1
      const dataCustomers = await this.$repo.getFundsCustomers.list({
        start: isAll || this.pageSizes * pageIndex,
        length: pageSizeMax || this.pageSizes
      })
      this.dataFundsCustomers = dataCustomers || null
      this.mapDataFunds(this.tabActive)
    },
    setTabActive(index) {
      this.tabActive = index
      this.searchText = ''
      this.currentPage = 1
      this.loadDataShops()
      this.loadDataCustomers()
    },
  }
};
</script>

<style lang="scss" scoped>
.tab-contribute {
  background: #f5f5f5;
  padding: 20px;
}
</style>
