<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <div class="row justify-content-center">
              <div class="col-lg-8 col-md-12">
                <div class="logo logo-background text-center mb-4"></div>
              </div>
            </div>
            <div class='page-title text-center'>
                Thông tin các tài năng
            </div>
            <div class="list-talent">
              <div v-for="(talent, index) in talents" :key="index" class="list-talent-content">
                <div class="talent-list-item mx-0 mb-3">
                  <div class="talent-list-img">
                    <div v-bind:style="{'background-image': 'url('+ talent.image.small + ')'}"></div>
                  </div>
                  <div class="talent-list-content">
                    <div class="talent-list-title">
                      <NuxtLink :to="localePath('/tai-nang/' +  talent.slug+'_'+talent.id)">
                        <img width="30px" src="~/assets/images/medal-icon.png" alt="" />
                        {{talent.title}}
                      </NuxtLink>
                    </div>
                    <div class="talent-list-des">
                      {{talent.description}}
                    </div>
                    <div class="talent-list-btn">
                      <NuxtLink :to="localePath('/tai-nang/' +  talent.slug+'_'+talent.id)">
                        Chi tiết
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
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
      this.fetchTalents({page: this.page - 1, perpage: this.perpage}).then((total) => {
        this.total = total;
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.list-talent-content{
    font-family: "Roboto Condensed", sans-serif;
}

</style>