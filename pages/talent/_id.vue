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
            <div class="page-title text-center">
              {{talentDetail.category == 'suggested_talent' ? $t('talent_suggested_title') : $t('talent_title')}}
            </div>
            <div class="talent-detail">
              <div class="talent-detail-img">
                <div
                  v-bind:style="{
                    'background-image': 'url(' + talentDetail.image.small + ')'
                  }"
                ></div>
              </div>
              <div class="talent-detail-content">
                <div class="talent-detail-title">
                  <img
                    width="30px"
                    src="~/assets/images/medal-icon.png"
                    alt=""
                  />
                  {{ talentDetail.title_i18n[[$i18n.locale]] }}
                </div>
                <div v-html="talentDetail.content_i18n[$i18n.locale]"></div>
              </div>

              <div class="pre-next-btn">
                <NuxtLink class='prev-btn' v-if='prev' :to="localePath({name: 'talent-id', params: {id: prev}})">
                  <i class="fa fa-angle-left" aria-hidden="true"></i> {{$t('prev_talent')}}
                </NuxtLink>
                <NuxtLink class='next-btn' v-if='next' :to="localePath({name: 'talent-id', params: {id: next}})">
                  {{$t('next_talent')}}
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
  layout: "default",
  components: {},
  data() {
    return {
      talentDetail: this.$store.state.talentDetail,
      next: '',
      prev: '',
    };
  },
  async fetch({ store, params, redirect, query }) {
    try {
      const id = params.id.split('_')[ params.id.split('_').length - 1]
      await store.dispatch("fetchTalentDetail", id);
    } catch (e) {
      redirect("/not-found");
    }
  },
  head() {
    return {
      title: this.talentDetail.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.talentDetail.description_i18n[this.$i18n.locale]
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.talentDetail.title_i18n[this.$i18n.locale]
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$nuxt.$route.fullPath
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.talentDetail.description_i18n[this.$i18n.locale]
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article"
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.talentDetail.image.small
        }
      ]
    };
  },
  computed: {
    ...mapState(["talents"])
  },
  created() {
   
  },
  async mounted() {
    try {
      let data = await this.fetchTalentsRelated({
        article_id: this.talentDetail.id,
        category: this.talentDetail.category
      })
      if (this.talentDetail.id === '') {

      }
      if (data) {
        for (const t of data) {
          if (t.id < this.talentDetail.id) {
            this.next = this.$toSlug(t.title_i18n[this.$i18n.locale]) + '_' + t.id
          } else {
            this.prev = this.$toSlug(t.title_i18n[this.$i18n.locale]) + '_' + t.id
          }
        }
      }

    } catch (e) {

    }
   
  },
  methods: {
    ...mapActions(["fetchTalentsRelated"]),
    nextTalen() {
      return ''
    },
    previousTalen() {
      return ''
    }
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
  > div {
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
  padding-top: 50px;
  clear: both;
  .next-btn{
    float: right;
  }
  a {
    color: #333;
    font-weight: bold;
    font-size: 14px;
    font-family: "Roboto Condensed", sans-serif;
    &:hover {
      text-decoration: none;
    }
    i {
      font-weight: bold;
      &.fa-angle-left {
        margin-right: 20px;
      }
      &.fa-angle-right {
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
    > div {
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
