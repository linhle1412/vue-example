<template>
  <div>
    <div class="comment-submit">
      <img :src="user.avatar || require('~/assets/images/avatar-default.png')" alt=""/>
      <div class="comment-input">
        <input type="text" v-model="inputValue" @keyup.enter="submit" placeholder="Bình luận...">
        <div class="btn-defaut" @click="submit"><a>Gửi</a></div>
      </div>
    </div>
    <div class="comment-list">
      <div v-for="(cmt, index) in comments" :key="index" class="comment-item">
        <img :src="cmt.avatar || require('~/assets/images/avatar-default.png')" alt=""/>
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
    ...mapState(["user"]),
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
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
}
.comment-submit {
  display: flex;
  .comment-input {
    margin-left: 10px;
    border: 1px solid #e5e5e5;
    height: 50px;
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
    margin-top: -5px;
  }
  .comment-content {
    font-size: 14px;
  }
}
</style>