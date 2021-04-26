<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan-larger.svg" alt="" />
            </div>
            <div class='title-list text-center'>
                Bảng vinh danh đóng góp
            </div>
            <div class="list-talent">
              <div class="list-talent-title">
                  <div class="row">
                      <div class="col-md-2"></div>
                      <div class="col-md-4">Tên tài năng</div>
                      <div class="col-md-2"></div>
                      <div class="col-md-4 text-center">Số tiền tài trợ</div>
                  </div>
              </div>
              <div v-for="(talent, index) in talents" :key="index" class="list-talent-content">
                  <TableList :index=index :name=talent.name :link=talent.link :price=talent.price />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableList from '@/components/TableList'
import { mapState, mapActions } from 'vuex'

export default {
  layout: "default",
  components: {
    TableList
  },
  data() {
    return {
    };
  },
  computed: {
      ...mapState(['talents']),
  },
  mounted() {
      this.fetchTalents()
  },
  methods: {
      ...mapActions(['fetchTalents'])
  }
};
</script>

<style lang="scss" scoped>
.title-list{
    margin-bottom: 25px;
    font-size: 28px;
    font-family: "Yeseva One",sans-serif;
    text-transform: uppercase;
}
.list-talent-content{
    font-family: "Yeseva One",sans-serif;
}
.list-talent {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 1rem;
}
.list-talent-title{
    .row{
        padding-bottom: 15px;
    }
}
@media only screen and (max-width: 550px) {
    .list-talent-title{
        display: none;
    }
    .title-list{
        font-size: 24px;
    }
}
</style>