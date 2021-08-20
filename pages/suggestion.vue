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
            <div :class="tab === 0 ? 'active' : ''" @click="tab = 0">Các tài năng được đề xuất</div>
            <div :class="tab === 1 ? 'active' : ''" @click="tab = 1">Gửi đề xuất tài năng của bạn</div>
          </div>
          <div v-show="tab === 0" class="list-talent w-100 p-0">
            <div v-for="(talent, index) in suggestions" :key="index" class="list-talent-content">
              <div class="talent-list-item mx-0 mb-3">
                <div class="talent-list-img">
                  <div v-bind:style="{'background-image': 'url('+ talent.image.small + ')'}"></div>
                </div>
                <div class="talent-list-content">
                  <div class="talent-list-title">
                    <NuxtLink :to="localePath('/tai-nang/' +  talent.slug+'_'+talent.id)">
                      <img width="30px" src="~/assets/images/medal-icon.png" alt="" />
                      {{talent.title_i18n[$i18n.locale]}}
                    </NuxtLink>
                  </div>
                  <div class="talent-list-des">
                    {{talent.description_i18n[$i18n.locale]}}
                  </div>
                  <div class="talent-list-btn">
                    <NuxtLink :to="localePath('/tai-nang/' +  talent.slug+'_'+talent.id)">
                      Chi tiết
                    </NuxtLink>
                    <div class="vote">
                      <div>
                        <img src="~/assets/images/like.png" alt=""> Ủng hộ: {{talent.vote_count || 0}}
                      </div>
                      <div class="mx-2">│</div>
                      <div>
                        <img src="~/assets/images/chat.png" alt=""> Thảo luận: {{talent.comment_count || 0}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <pagination
              v-model="page"
              v-if="suggestions.length"
              :page-count="pageCount"
              :page-range="6"
            >
            </pagination>
          </div>
          <div v-show="tab === 1" class="col-12 ">
            <div class="row">
              <div class="col-md-6 p-0 pr-md-2 mb-md-0 mb-3">
                <div class="form-contact">
Là một người dân Việt Nam, chắc hẳn không ai quên được giây phút vỡ òa cảm xúc khi Văn Thanh ghi bàn thắng quyết định đưa đội tuyển bóng đá U23 Vietnam vào trận chung kết U23 Châu Á 2018 tại Thường Châu, hoặc giây phút Ánh Viên rơi nước mắt hát quốc ca khi nhận 8 Huy Chương Vàng SEAGAME 2017 đã tạo nên những kỳ tích, đem lại niềm tự hào vô bờ bến cho đất nước.
Nhưng có mấy ai biết được những tài năng này đã từng trải qua những giai đoạn khó khăn bế tắc, có lúc tưởng chừng như bỏ cuộc… nhưng họ đã may mắn khi nhận được những động viên, hỗ trợ kịp thời  của rất nhiều người để giúp họ vượt qua khó khăn, nỗ lực tỏa sáng đem lại những khoảnh khắc vui sướng tột cùng, thắp lên niềm tự hào dân tộc của hàng triệu người dân Việt Nam.
Quỹ Phát Triển Tài Năng Việt ra đời trao cho tất cả chúng ta cơ hội được là một phần của sự chiến thắng, niềm tự hào dân tộc bằng một cách rất dễ dàng: chỉ cần một đóng góp nhỏ như khi mua một ly cà phê Ông Bầu là bạn đã đóng góp 1,000đ vào Quỹ, hoặc vào website của Quỹ để chọn Tài năng và đóng góp trực tiếp bằng tiền mặt, hiện vật,…
Bằng một hành động nhỏ sẽ tạo nên những niềm tự hào to lớn cho đất nước. Đã có hàng triệu người tham gia đóng góp vào Quỹ Phát Triển Tài Năng Việt… còn bạn thì sao?
                </div>
              </div>
              <div class="col-md-6 p-0 pl-md-2">
                <div class="form form-contact">
                  <div class="title text-center">
                    Thông tin về tài năng
                  </div>
                  <div class="floating-label">
                    <input
                      class="floating-input"
                      type="text"
                      placeholder=" "
                      :class="{ error: rules.fullname.error }"
                      v-model="form.fullname"
                    />
                    <label>TÊN CỦA TÀI NĂNG</label>
                    <small>{{ rules.fullname.error }}&nbsp;</small>
                  </div>

                  <div class="floating-label">
                    <input
                      class="floating-input"
                      :class="{ error: rules.phone.error }"
                      type="text"
                      v-model="form.phone"
                      placeholder=" "
                    />
                    <label>Số điện thoại *</label>
                    <small>{{ rules.phone.error }}&nbsp;</small>
                  </div>
                  <div class="floating-label">
                    <input
                      class="floating-input"
                      type="text"
                      placeholder=" "
                      :class="{ error: rules.dateOfBirth.error }"
                      v-model="form.dateOfBirth"
                    />
                    <label>Ngày sinh</label>
                    <small>{{ rules.dateOfBirth.error }} &nbsp;</small>
                  </div>
                  <div class="floating-label">
                    <input
                      class="floating-input"
                      type="text"
                      placeholder=" "
                      :class="{ error: rules.address.error }"
                      v-model="form.address"
                    />
                    <label>Địa chỉ</label>
                    <small>{{ rules.address.error }} &nbsp;</small>
                  </div>
                  <div class="floating-label">
                    <textarea
                      name="contribute-message"
                      id="contribute-message"
                      rows="3"
                      class="floating-input"
                      v-model="form.note"
                      placeholder=" "
                    ></textarea>
                    <label>Thông tin mô tả</label>
                  </div>
                  <div class="text-center" style="margin-top: 30px">
                    <button
                      @click="submit"
                      :class="isLoading ? 'is-loading' : ''"
                    >
                      Gửi thông tin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <popup-success v-if="isSuccess" @close="isSuccess = false"></popup-success>
    <div class='banner-bottom'>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PopupSuccess from '../components/PopupSuccess.vue';

export default {
  components: { PopupSuccess },
  layout: "default",
  data() {
    return {
      isSubmitted: false,
      isSuccess: false,
      isLoading: false,
      tab: 0,
      page: 1,
      perpage: 3,
      total: 0,
      form: {
        fullname: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        note: "",
      },
      rules: {
        fullname: {
          required: true,
          label: "tên của bạn",
          error: ""
        },
        phone: {
          required: true,
          label: "số điện thoại",
          validate: value => {
            return value && value.length === 10 && value.indexOf("0") === 0;
          },
          error: ""
        },
        address: {
          required: false,
          label: "địa chỉ",
          error: ""
        },
        dateOfBirth: {
          required: false,
          label: "ngày sinh",
          error: ""
        },
        note: {
          required: false,
          label: "lời nhắn",
          error: ""
        },
      }
    };
  },
  computed: {
    ...mapState(['suggestions']),
    pageCount() {
      return Math.ceil(this.total / this.perpage);
    },
  },
  mounted() {
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.getData();
      }
    }
  },
  methods: {
    ...mapActions(['fetchSuggestions']),
    getData() {
      this.fetchSuggestions({
        page: this.page - 1,
        perpage: this.perpage
      }).then(total => {
        this.total = total;
      });
    },
    validate(data, rules) {
      let isValidate = true;
      for (const key of Object.keys(rules)) {
        if (rules[key].required === true && data[key] === "") {
          rules[key].error = "Vui lòng nhập " + rules[key].label;
          isValidate = false;
          continue;
        } else {
          rules[key].error = "";
        }
        if (rules[key].validate) {
          if (!rules[key].validate(data[key])) {
            isValidate = false;
            rules[key].error = "Vui lòng nhập đúng " + rules[key].label;
            continue;
          } else {
            rules[key].error = "";
          }
        }
      }
      return isValidate;
    },
    clearForm() {
      this.form = {
        fullname: "",
        phone: "",
        email: "",
        note: "",
        dateOfBirth: '',
        address: ''
      };
    },

    submit() {
      if (this.validate(this.form, this.rules)) {
        this.isLoading = true;
        this.$store.dispatch("sendContact", this.form).then(res => {
          this.isLoading = false;
          this.clearForm();
        })
        .catch(e => {
          this.isLoading = false;
          this.isSubmitted = true;
          this.isSuccess = false;
          this.clearForm();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-tab {
  display: flex;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  font-family: "Yeseva One", sans-serif;
  margin-bottom: 20px;
  div {
    flex: 1;
    border: 1px solid #fff;
    padding: 8px 25px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
    background: #fff;
    &.active {
      background: #ffd52a;
      border-color:#ffd52a;
    }
  }
}
.contact-wrapper {
  background: #f5f5f5;
  border-radius: 20px;
  padding: 30px;
  @media screen and (max-width: 550px) {
    padding: 15px;
  }
  &.form-result .title-form {
    margin-bottom: 15px;
  }
  .img-form {
    width: 85px;
    margin: 20px auto 30px auto;
    img {
      width: 100%;
    }
  }
  .form {
    input[type="radio"] {
      &:checked + label:before {
        background: #ffd52a;
      }
    }
    button {
      background: #ffd52a;
      border: 1px solid #ffd52a;
      padding: 8px 30px;
      font-weight: bold;
      font-size: 18px;
    }
    .contribute-money {
      position: relative;
      width: 100%;
      .currency {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
    small {
      color: #dc3545;
      font-size: 11px;
    }
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: #ffd52a;
  }
  .custom-control-input:focus ~ .custom-control-label::before {
    box-shadow: 0 0 0 0.2rem rgb(163 214 39 / 25%);
  }
  .custom-control-input:not(:disabled):active ~ .custom-control-label::before {
    background-color: #ffdd5b;
    border-color: #ffdc54;
  }
}

/****  floating-Lable style start ****/
.floating-label {
  position: relative;
  margin-bottom: 20px;
}
.floating-input,
.floating-select {
  &.error {
    border-color: #dc3545;
  }
  font-size: 15px;
  padding: 0;
  display: block;
  width: 100%;
  font-weight: bold;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #888;
}
textarea.floating-input {
  height: 80px;
}
.floating-input:focus,
.floating-select:focus {
  &.error {
    border-color: #dc3545;
  }
  outline: none;
  border-bottom: 2px solid #ffcb05;
}
.floating-label {
  label {
    color: #999;
    font-size: 15px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    font-weight: bold;
    left: 0;
    top: 0px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -18px;
  font-size: 13px;
  color: #000;
}

.floating-select:focus ~ label,
.floating-select:not([value=""]):valid ~ label {
  top: -18px;
  font-size: 13px;
  color: #000;
}

/* active state */
.floating-input:focus ~ .bar:before,
.floating-input:focus ~ .bar:after,
.floating-select:focus ~ .bar:before,
.floating-select:focus ~ .bar:after {
  width: 50%;
}

.floating-textarea {
  min-height: 30px;
  max-height: 260px;
  overflow: hidden;
  overflow-x: hidden;
}

/* highlighter */
.highlight {
  position: absolute;
  height: 50%;
  width: 100%;
  top: 15%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
.floating-input:focus ~ .highlight,
.floating-select:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* animation */
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

/****  floating-Lable style end ****/

/***   daniel - Fork me friend - style   ***/
.floating-credit {
  position: fixed;
  bottom: 10px;
  right: 10px;
  color: #aaa;
  font-size: 13px;
  font-family: arial, sans-serif;
}
.floating-credit a {
  text-decoration: none;
  color: #000000;
  font-weight: bold;
}
.floating-credit a:hover {
  border-bottom: 1px dotted #f8f8f8;
}
.floating-heading {
  position: fixed;
  color: #aaa;
  font-size: 20px;
  font-family: arial, sans-serif;
}
.form-contact {
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  height: 100%;
  @media screen and (max-width: 550px) {
    padding: 15px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
    text-transform: uppercase;
  }
}
.contact-item {
  display: flex;
  margin-bottom: 25px;
  img {
    width: 60px;
    height: 100%;
  }
  .contact-item-content {
    padding-left: 15px;
    flex: 1;
    .contact-item-title {
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .contact-item-text {
      div {
        margin-top: 5px;
        font-size: 14px;
      }
    }

  }
}

</style>
