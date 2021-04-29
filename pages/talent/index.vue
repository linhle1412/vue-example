<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan-larger.svg" alt="" />
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
                      <NuxtLink :to="'/tai-nang/' +  talent.slug">
                      <img width="30px" src="~/assets/images/medal-icon.png" alt="" />
                      {{talent.title}}
                      </NuxtLink>
                    </div>
                    <div class="talent-list-des">
                      {{talent.description}}
                    </div>
                    <div class="talent-list-btn">
                      <NuxtLink :to="'/tai-nang/' +  talent.slug">
                        Chi tiết
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
              <pagination
                v-model="page"
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
        this.total = total
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.list-talent-content{
    font-family: "Roboto Condensed", sans-serif;
}
.list-talent {
  background: #f5f5f5;
  padding: 25px;
  border-radius: 1rem;
}

.talent-list-content{
    padding: 15px;
    background: #fff;
    margin: 0;
    border-radius: 15px;
    flex: 1;
    overflow: hidden;
}
.talent-list-item {
  display: flex;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    background: #fff;
    border-radius: 15px;
  }

}
.talent-list-img {
  flex: 0 0 190px;
  margin-right: 15px;
  >div {
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 15px;
  }
  @media only screen and (max-width: 500px) {
    margin-right: 0;
  }
}
.talent-list-title {
  a{
    color: #000;
  }
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    background: #ffcb05;
    width: 25px;
    margin-right: 10px;
  }
}
.talent-list-des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 15px;
}
.talent-list-btn{
    a {
      color: #000;
      border-bottom: 1px solid;
      font-weight: bold;
      &:hover {
        text-decoration: none;
      }
    }
}

</style>