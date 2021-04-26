<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan-larger.svg" alt="" />
            </div>
            <div class="page-title text-center">
              Thông tin các tài năng
            </div>
            <div class="talent-detail">
                <div class="talent-detail-img">
                  <div v-bind:style="{'background-image': 'url('+ talentDetail.image.small + ')'}"></div>
                </div>
                <div class="talent-detail-content">
                  <div class="talent-detail-title">
                    <img width="30px" src="~/assets/images/medal-icon.png" alt="" />
                    {{talentDetail.title}}
                  </div>
                  {{talentDetail.content}}
                </div>
              <div class="pre-next-btn">
                <NuxtLink to="#">
                  <i class="fa fa-angle-left" aria-hidden="true"></i> Tài năng
                  trước
                </NuxtLink>
                <NuxtLink to="#">
                  Tài năng sau
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
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
  layout: "banner-bottom",
  components: {
  },
  data() {
    return {
      talentDetail: this.$store.state.talentDetail
    };
  },
  async fetch({ store, params, redirect, query }) {
    try {
      const id = params.id.split('-')[0]
      await store.dispatch('fetchTalentDetail', id)
    } catch (e) {
      redirect('/not-found')
    }
  },
  head() {
    return {
      title: this.talentDetail.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.talentDetail.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.talentDetail.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$nuxt.$route.fullPath
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.talentDetail.description
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.talentDetail.image.small
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.talent-detail-img {
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  float: left;
  margin-right: 25px;
  >div {
    width: 190px;
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
  }
}
.talent-detail-title {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    background: #ffcb05;
    width: 40px;
    margin-right: 10px;
  }
}
.talent-detail {
  background: #f5f5f5;
  padding: 25px;
  border-radius: 1rem;
  float: left;
  width: 100%;
}
.pre-next-btn {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  clear: both;
  a {
    color: #000;
    font-weight: bold;
    font-size: 16px;
    font-family: "Roboto Condensed", sans-serif;
    &:hover {
      text-decoration: none;
    }
    i {
      font-weight: bold;
      &.fa-angle-left{
        margin-right: 20px;
      }
       &.fa-angle-right{
        margin-left: 20px;
      }
    }
  }
}
@media only screen and (max-width: 500px) {
  .talent-detail-img {
    width: 100%;
    float: unset;
    margin-right: 0;
    margin-bottom: 20px;
    >div {
      width: 100%;
    }
  }
  i.fa-angle-left {
    margin-right: 10px !important;
  }
  i.fa-angle-right {
    margin-left: 10px !important;
  }
}
</style>
