<template>
  <div>
    <div class="comment-submit">
      <div class="avatar">
        <img :src="user.avatar || require('~/assets/images/avatar-default.png')" alt=""/>
      </div>
      <div style="flex: 1">
        <div class="comment-input">
          <input :disabled="!isLogin" type="text" v-model="inputValue" @keyup.enter="submit" :placeholder="$t('fill_comment')">
          <div :class="!isLogin ? 'disabled' : ''" class="btn-defaut" @click="submit"><a>{{$t('send')}}</a></div>
        </div>
        <div v-if="!isLogin" class="require-login mt-1 pl-3">{{$t('require_login_cmt')}}</div>
      </div>
      
    </div>
    <div class="comment-list">
      <div v-for="(cmt) in comments" :key="cmt.id" class="comment-item">
        <div class="avatar">
          <img :src="(cmt.avatar && cmt.avatar.thumbnail )|| require('~/assets/images/avatar-default.png')" alt=""/>
        </div>
        <div style="flex: 1" class="pl-2">
          <div class="comment-name">{{cmt.fullname}}</div>
          <div class="comment-content">{{cmt.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      inputValue: ''
    }
  },
  computed: {
    ...mapState(["user", "isLogin"]),
  },
  methods: {
    submit() {
      this.$emit('submit', this.inputValue)
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 45px;
  height: 45px;
  object-fit: cover;
  object-position: center;
}
.avatar {
  width: 45px;
  height: 45px;
  background-image: url('~assets/images/avatar-default.png');
  background-size: cover;
}
.btn-defaut a {
 height: 37px;
}
.require-login {
  font-size: 12px;
  color: #666;
}
.comment-submit {
  display: flex;
  .comment-input {
    margin-left: 10px;
    border: 1px solid #e5e5e5;
    height: 45px;
    background: transparent;
    display: flex;
    flex: 1;
    padding: 3px;
    input {
      background: transparent;
      flex: 1;
      border: none;
      outline: none !important;
      font-size: 14px;
      padding-left: 10px;
    }
  }
}
.comment-submit {
  margin-bottom: 50px;
}
.comment-item {
  display: flex;
  margin-bottom: 20px;
  
  .comment-name {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 15px;
    margin-top: -3px;
  }
  .comment-content {
    font-size: 14px;
  }
}
</style>