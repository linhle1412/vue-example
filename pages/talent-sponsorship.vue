<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <div class="logo text-center">
              <img src="~/assets/images/slogan.png" class="thumb" alt="" />
            </div>
          </div>
          <div class="col-lg-8 col-md-12 mx-auto pb-5">
            <div class="page-title text-center">
              {{$t('list_sponsored')}}
            </div>
            <div class="table-main list-talent">
              <div class="table-head">
                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-4">{{$t('talent_name_sponsored')}}</div>
                  <div class="col-md-2"></div>
                  <div class="col-md-4 text-center">{{$t('sponsored_amount')}}</div>
                </div>
              </div>
              <div
                v-for="(talent, index) in sponsorships"
                :key="index"
                class="table-body"
              >
                <div>
                  <div class="card-row row bg-white mb-3 mx-0">
                    <div class="col-md-2 font-weight-bold index">
                      {{ index + 1 }}
                    </div>
                    <div class="col-md-4 font-weight-bold name">
                      {{ talent.name }}
                    </div>
                    <div class="col-md-2 detail">
                      <a :href="talent.link">{{$t('detail')}}</a>
                    </div>
                    <div class="col-md-4 price">
                      {{ talent.amount | money }}₫
                    </div>
                  </div>
                  <div class="card-row-mobile row bg-white mb-3 mx-0">
                    <div class="col-2 font-weight-bold index">{{ index }}</div>
                    <div class="col-10">
                      <p class="name">{{ talent.name }}</p>
                      <p class="detail">
                        <a :href="talent.link">
                          {{$t('detail')}}
                        </a>
                      </p>
                      <p class="price">{{ talent.amount | money }}₫</p>
                    </div>
                  </div>
                </div>
              </div>
              <pagination
                v-model="page"
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
</template>

<script>
// import TableList from '@/components/TableList'
import Pagination from "@/components/Pagination";
import { mapState, mapActions } from "vuex";

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
    ...mapState(["sponsorships"]),
    pageCount() {
      return Math.ceil(this.total / this.perpage);
    }
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.getData();
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["fetchSponsorships"]),
    getData() {
      this.fetchSponsorships({
        page: this.page - 1,
        perpage: this.perpage
      }).then(total => {
        this.total = total;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-head {
  .row {
    padding-bottom: 15px;
  }
}

// .text-sliver {
//   color: $color-silver;
// }


@media only screen and (max-width: 768px) {
  .table-head {
    display: none;
  }
}
</style>
