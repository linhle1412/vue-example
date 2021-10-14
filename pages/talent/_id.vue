<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom" :class="talentDetail.category == 'suggested_talent' ? 'with-bottom' : ''">
      <div class="container">
        <div class="row">
          <div class="col-12 pb-5">
            <div class="row">
              <div class="col-12 py-5">
                <div class="logo text-center">
                  <img src="~/assets/images/slogan.png" class="thumb" alt="" />
                </div>
              </div>
            </div>
            <div class="page-title text-center">
              {{pageTitle}}
            </div>
            <div class="talent-detail">
              <div class="talent-detail-img">
                <div
                  v-bind:style="{
                    'background-image': 'url(' + (talentDetail.image && talentDetail.image.small || require('~/assets/images/default-talent.jpg')) + ')'
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
              <div v-if="talentDetail.category == 'suggested_talent'" class="mt-5 w-100">
                <div class="voting-wrapper">
                  <div>
                    <img src="~/assets/images/icon-vote.png" alt="">
                    <div class="vote-count">{{talentDetail.vote_count}}</div>
                    <div>{{$t('num_vote')}}</div>
                  </div>
                  <div>
                    <div v-if="!isLogin" class="d-flex justify-content-center align-items-center h-100">
                      <facebook-login>{{$t('require_login_vote')}}</facebook-login>
                    </div>
                    <div v-else class="btn-defaut" @click="voteTalent"><a>{{talentDetail.has_voted ? $t('voted') : $t('vote_talent')}}</a></div>
                  </div>
                </div>
                <comment-box :comments="comments" @submit="sendCmt"></comment-box>
              </div>
              <div class="pre-next-btn">
                <NuxtLink class='prev-btn' v-if='prev' :to="localePath({name: 'talent-id', params: {id: prev}})">
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                  {{talentDetail.category == 'other_sponsorship' ? $t('prev') : $t('prev_talent')}}
                </NuxtLink>
                <NuxtLink class='next-btn' v-if='next' :to="localePath({name: 'talent-id', params: {id: next}})">
                  {{talentDetail.category == 'other_sponsorship' ? $t('next') : $t('next_talent')}}
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
import CommentBox from '../../components/CommentBox.vue';
import FacebookLogin from '../../components/FacebookLogin.vue';

export default {
  layout: "default",
  components: {
    CommentBox,
    FacebookLogin
  },
  data() {
    return {
      talentDetail: this.$store.state.talentDetail,
      comments: this.$store.state.talentDetail.comments,
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
    try {
      await store.dispatch('checkToken')
    } catch (e) {

    }
  },
  head() {
    return {
      title: this.talentDetail.title_i18n[this.$i18n.locale],
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
          content: this.talentDetail.image && this.talentDetail.image.small
        }
      ]
    };
  },
  computed: {
    ...mapState(["talents", "isLogin"]),
    pageTitle() {
      switch (this.talentDetail.category) {
        case 'suggested_talent':
          return this.$t('talent_suggested_title')
        case 'other_sponsorship':
          return this.$t('sponsor_info')
        default:
          return this.$t('talent_title')
          break;
      }
    }
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
    ...mapActions(["fetchTalentsRelated", "sendComment", "vote"]),
    async voteTalent() {
      if (!this.talentDetail.has_voted) {
        try {
          await this.vote(this.talentDetail.id)
          this.talentDetail.vote_count += 1;
          this.talentDetail.has_voted = true;
          this.$toast.success(this.$t('vote_success'))
        } catch(e) {
          this.$toast.error(e)
        }
      }
    },
    async sendCmt(value) {
      try {
        var data = await this.sendComment({
          id: this.talentDetail.id,
          content: value
        })
        this.comments.unshift(data)
        this.$toast.success(this.$t('comment_success'))
      } catch (e) {
        this.$toast.error(e)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.voting-wrapper {
  display: flex;
  width: 100%;
  margin-bottom: 50px;
  img {
    width: 50px;
  }
  .vote-count {
    font-size: 50px;
    font-family: "Yeseva One", sans-serif;
  }
  .btn-defaut a {
    padding: 15px 50px;
  }
  &>div {
    flex: 1;
    border-radius: 20px;
    background: #fff;
    height: 210px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &:first-child {
      margin-right: 20px
    }
  }
  @media screen and (max-width: 500px) {
    display: block;
    &>div {
      &:first-child {
        margin-right: 0;
        margin-bottom: 15px;
      }
    }
  }
}
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
.talent-detail-content {
  min-height: 220px;
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
