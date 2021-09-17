<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row justify-content-center py-md-5 py-4">
          <div class="col-lg-8 col-md-12">
            <div class="logo logo-background text-center"></div>
          </div>
        </div>
        <div class="row contact-wrapper mx-0">
          <div class="btn-tab">
            <div :class="tab === 0 ? 'active' : ''" @click="tab = 0">{{$t('talent_info')}}</div>
            <div :class="tab === 1 ? 'active' : ''" @click="tab = 1">{{$t('other_talent')}}</div>
          </div>
          <div v-if="!loading && !talents.length" class="text-center w-100" style="margin-top: 60px">{{$t('empty_data')}}</div>
          <div class="list-talent w-100 p-0" :class="loading ? 'loading' : ''">
            <div v-for="(talent, index) in talents" :key="index" class="list-talent-content">
              <div class="talent-list-item mx-0 mb-3">
                <div class="talent-list-img">
                  <div v-bind:style="{'background-image': 'url('+ (talent.image && talent.image.small || require('~/assets/images/default-talent.jpg')) + ')'}"></div>
                </div>
                <div class="talent-list-content">
                  <div class="talent-list-title">
                    <NuxtLink :to="localePath({name: 'talent-id', params: {id: $toSlug(talent.title_i18n[$i18n.locale])+'_'+talent.id}})">
                      <img v-if="tab === 0"  src="~/assets/images/medal-icon.png" alt="" />
                      <img v-else style="height: 25px; object-fit: contain; padding: 4px;" src="~/assets/images/medal-icon-2.png" alt="" />
                      {{talent.title_i18n[$i18n.locale]}}
                    </NuxtLink>
                  </div>
                  <div class="talent-list-des">
                    {{talent.description_i18n[$i18n.locale]}}
                  </div>
                  <div class="talent-list-btn">
                    <NuxtLink :to="localePath({name: 'talent-id', params: {id: $toSlug(talent.title_i18n[$i18n.locale])+'_'+talent.id}})">
                      {{$t('detail')}}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center w-100">
             <pagination
              v-model="page"
              v-if="talents.length"
              :page-count="pageCount"
              :page-range="3">
            </pagination>
          </div>
        </div>
      </div>
    </div>
    <div class='banner-bottom'>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  layout: "default",
  components: {
  },
  data() {
    return {
      loading: true,
      tab: 0,
      page: 1,
      perpage: 3,
      total: 0
    };
  },
  computed: {
    ...mapState(['talents']),
    pageCount() {
      return Math.ceil(this.total / this.perpage)
    }
  },
  watch: {
    tab(nVal) {
      this.page = 1
      this.getData()
    },
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
    ...mapActions(['fetchTalents']),
    getData() {
      this.loading = true
      this.fetchTalents({
        page: this.page - 1, 
        perpage: this.perpage,
        filters: [{rule: 'category', op: '=', value: !this.tab ? 'talent': 'other_sponsorship'}]}
      ).then((total) => {
        this.total = total;
        this.loading = false
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-talent {
  min-height: 200px;
}
.list-talent-content{
    font-family: "Roboto Condensed", sans-serif;
}

.contact-wrapper {
  background: #f5f5f5;
  border-radius: 20px;
  padding: 30px;
  @media screen and (max-width: 550px) {
    padding: 15px;
  }
}

</style>