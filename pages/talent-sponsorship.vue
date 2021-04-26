<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan-larger.svg" alt="" />
            </div>
            <div class='page-title text-center'>
                Bảng vinh danh đóng góp
            </div>
            <div class="table-main list-talent">
              <div class="table-head">
                  <div class="row">
                      <div class="col-md-2"></div>
                      <div class="col-md-4">Tên tài năng</div>
                      <div class="col-md-2"></div>
                      <div class="col-md-4 text-center">Số tiền tài trợ</div>
                  </div>
              </div>
              <div v-for="(talent, index) in sponsorships" :key="index" class="table-body">
                <div>
                  <div class="card-row row bg-white mb-3 mx-0">
                    <div class="col-md-2 font-weight-bold index">{{ index + 1 }}</div>
                    <div class="col-md-4 font-weight-bold name">{{ talent.name }}</div>
                    <div class="col-md-2 detail"><a :href="talent.link">Chi tiết</a></div>
                    <div class="col-md-4 price">{{ talent.amount | money }}<u>đ</u></div>
                  </div>
                  <div class="card-row-mobile row bg-white mb-3 mx-0">
                    <div class="col-2 font-weight-bold index">{{ index }}</div>
                    <div class="col-10">
                      <p class="name">{{ talent.name }}</p>
                      <p class="detail"><a :href="talent.link">Chi tiết</a></p>
                      <p class="price">{{ talent.amount | money }}<u>đ</u></p>
                    </div>
                  </div>
                </div>
              </div>
              <pagination
                v-model="page"
                :page-count="pageCount"
                :page-range="6">
              </pagination>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TableList from '@/components/TableList'
import Pagination from '@/components/Pagination'
import { mapState, mapActions } from 'vuex'

export default {
  layout: "default",
  components: {
    Pagination
  },
  data() {
    return {
      page: 1,
      perpage: 10,
      total: 0
    };
  },
  computed: {
      ...mapState(['sponsorships']),
      pageCount() {
        return Math.ceil(this.total / this.perpage)
      }
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.getData()
      }
    }
  },
  mounted() {
  },
  methods: {
      ...mapActions(['fetchSponsorships']),
    getData() {
      this.fetchSponsorships({page: this.page - 1, perpage: this.perpage}).then((total) => {
        this.total = total
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.table-head{
    .row{
        padding-bottom: 15px;
    }
}
@media only screen and (max-width: 550px) {
    .table-head{
        display: none;
    }
}
</style>