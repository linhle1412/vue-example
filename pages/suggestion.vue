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
            <div :class="tab === 0 ? 'active' : ''" @click="tab = 0">{{$t('suggested_talent')}}</div>
            <div :class="tab === 1 ? 'active' : ''" @click="tab = 1">{{$t('submit_suggestion')}}</div>
          </div>
          <div v-show="tab === 0" class="list-talent w-100 p-0">
            <div v-for="(talent, index) in suggestions" :key="index" class="list-talent-content">
              <div class="talent-list-item mx-0 mb-3">
                <div class="talent-list-img">
                  <div v-bind:style="{'background-image': 'url('+ (talent.image && talent.image.small || require('~/assets/images/default-talent.jpg')) + ')'}"></div>
                </div>
                <div class="talent-list-content">
                  <div class="talent-list-title">
                    <NuxtLink :to="localePath({name: 'talent-id', params: {id: $toSlug(talent.title_i18n[$i18n.locale])+'_'+talent.id}})">
                      <img width="30px" src="~/assets/images/medal-icon.png" alt="" />
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
                    <div class="vote">
                      <div>
                        <img src="~/assets/images/like.png" alt=""> {{$t('vote')}}: {{talent.vote_count || 0}}
                      </div>
                      <div class="mx-2">│</div>
                      <div>
                        <img src="~/assets/images/chat.png" alt=""> {{$t('comment')}}: {{talent.comment_count || 0}}
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
                  {{$t('suggest_content')}}
                </div>
              </div>
              <div class="col-md-6 p-0 pl-md-2">
                <div class="form form-contact">
                  <div v-if="!isLogin" class="d-flex justify-content-center align-items-center h-100">
                    <facebook-login ><div v-html="$t('require_login_suggestion')"></div></facebook-login>
                  </div>
                  <div v-else>
                    <div class="title text-center">
                      {{$t('talent_a_info')}}
                    </div>
                    <div class="floating-label">
                      <input
                        class="floating-input"
                        type="text"
                        placeholder=" "
                        :class="{ error: rules.name.error }"
                        v-model="form.name"
                      />
                      <label>{{$t('talent_name')}}</label>
                      <small>{{ rules.name.error }}&nbsp;</small>
                    </div>

                    <div class="floating-label">
                      <input
                        class="floating-input"
                        :class="{ error: rules.phone.error }"
                        type="tel"
                        v-model="form.phone"
                        placeholder=" "
                      />
                      <label>{{$t('phone_no')}} *</label>
                      <small>{{ rules.phone.error }}&nbsp;</small>
                    </div>
                    <div class="floating-label">
                      <input
                        class="floating-input"
                        type="text"
                        :class="{ error: rules.date_of_birth.error }"
                        v-model="form.date_of_birth"
                        placeholder=" "
                      />
                      <label>{{$t('birth_date')}}</label>
                      <small>{{ rules.date_of_birth.error }} &nbsp;</small>
                    </div>
                    <div class="floating-label">
                      <input
                        class="floating-input"
                        type="text"
                        placeholder=" "
                        :class="{ error: rules.address.error }"
                        v-model="form.address"
                      />
                      <label>{{$t('address')}}</label>
                      <small>{{ rules.address.error }} &nbsp;</small>
                    </div>
                    <div class="floating-label">
                      <input
                        class="floating-input select"
                        type="text"
                        placeholder=" "
                        :class="{ error: rules.field.error }"
                        v-model="form.field"
                        @focus="showOption = true"
                        @blur="onBlur"
                      />
                      <div class="select-dropdown" @click="showOption = !showOption">⌵</div>
                      <div class="select-option" v-show="filterFields.length && showOption">
                        <div v-for="(field) in filterFields" :key="field" @click="form.field = field; showOption = false">{{field}}</div>
                      </div>
                      <label>{{$t('talent_field')}} *</label>
                      <small>{{ rules.field.error }} &nbsp;</small>
                    </div>
                    <div class="floating-label">
                      <textarea
                        name="contribute-message"
                        id="contribute-message"
                        rows="3"
                        class="floating-input"
                        v-model="form.description"
                        placeholder=" "
                      ></textarea>
                      <label>{{$t('note')}}</label>
                    </div>
                    <div class="text-center" style="margin-top: 30px">
                      <button
                        @click="submit"
                        :class="isLoading ? 'is-loading' : ''"
                      >
                        {{$t('submit_suggest')}}
                      </button>
                    </div>
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
import FacebookLogin from '../components/FacebookLogin.vue';
import PopupSuccess from '../components/PopupSuccess.vue';

export default {
  components: { PopupSuccess, FacebookLogin },
  layout: "default",
  async fetch({ store, params, redirect, query }) {
    try {
      await store.dispatch('checkToken')
    } catch (e) {
    }
  },
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
        name: "",
        phone: "",
        address: "",
        date_of_birth: "",
        description: "",
        field: ''
      },
      fields: ["Bóng chuyền","Bóng rổ","Bóng đá","Bóng bàn","Cầu lông","Quần vợt/Tennis","Điền kinh","Quyền anh","Xe đạp","Đấu kiếm","Golf","Thể dục dụng cụ","Judo","Karate","Taekwondo","Cử tạ","Đấu vật","Kiến trúc","Điêu khắc","Hội họa","Âm nhạc","Văn chương","Sân khấu","Điện ảnh","Múa","Nhiếp ảnh","Đồ họa"],
      filterFields: [],
      showOption: false,
      rules: {
        name: {
          required: true,
          label: "talent_name",
          error: ""
        },
        field: {
          required: true,
          label: "talent_field",
          error: ""
        },
        phone: {
          required: true,
          label: "phone_no",
          validate: value => {
            return value && value.length === 10 && value.indexOf("0") === 0;
          },
          error: ""
        },
        address: {
          required: false,
          label: "address",
          error: ""
        },
        date_of_birth: {
          required: false,
          label: "birth_date",
          error: ""
        },
        description: {
          required: false,
          label: "description",
          error: ""
        },
      }
    };
  },
  computed: {
    ...mapState(['suggestions', 'isLogin']),
    pageCount() {
      return Math.ceil(this.total / this.perpage);
    },
  },
  mounted() {
    this.filterFields = this.fields.slice(0)
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.getData();
      }
    },
    'form.field'(nVal, oVal) {
      this.filterFields = this.fields.filter((f) => this.normalizeee(f).includes(this.normalizeee(nVal)))
    },
    'form.date_of_birth'(nVal, oVal) {
      if (/\D\/$/.test(nVal)) nVal = nVal.substr(0, nVal.length - 3);
      var values = nVal.split('/').map(function(v) {
        return v.replace(/\D/g, '')
      });
      if (values[0]) values[0] = this.checkValue(values[0], 12);
      if (values[1]) values[1] = this.checkValue(values[1], 31);
      var output = values.map(function(v, i) {
        return v.length == 2 && i < 2 ? v + ' / ' : v;
      });
      this.form.date_of_birth = output.join('').substr(0, 14);
    }
  },
  methods: {
    ...mapActions(['fetchSuggestions']),
    checkValue(str, max) {
      if (str.charAt(0) !== '0' || str == '00') {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
      };
      return str;
    },
    onBlur(){
      setTimeout(() => {this.showOption = false}, 300)
    },
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
          rules[key].error = this.$t("please_enter") + this.$t(rules[key].label).toLowerCase();
          isValidate = false;
          continue;
        } else {
          rules[key].error = "";
        }
        if (rules[key].validate) {
          if (!rules[key].validate(data[key])) {
            isValidate = false;
            rules[key].error = this.$t("please_enter_correct") + this.$t(rules[key].label).toLowerCase();
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
        name: "",
        phone: "",
        description: "",
        date_of_birth: '',
        address: '',
        field: ''
      };
    },

    submit() {
      if (this.validate(this.form, this.rules)) {
        this.isLoading = true;
        this.$store.dispatch("sendSuggestion", this.form).then(res => {
          this.isLoading = false;
          this.isSuccess = true;
          this.clearForm();
        })
        .catch(e => {
          this.isLoading = false;
          this.$toast.error(e)
        });
      }
    },
    normalizeee(str) {
      if (str) {
        str += '';
        str = str.trim();
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
      }
      return str
    }
  }
};
</script>

<style lang="scss" scoped>

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
  .select-option {
    max-height: 200px;
    overflow: auto;
    position: absolute;
    background: #fff;
    z-index: 1;
    left: 0;
    width: 100%;
    box-shadow: 0 0 16px -2px #ddd;
    border-radius: 0 0 8px 8px;
    padding: 10px 0;
    div {
      cursor: pointer;
      padding: 5px 15px;
      color: #666;
      &:hover {
        color: #222;
      }
    }
  }
  .select-dropdown {
    position: absolute;
    right: 0;
    top: -10px;
    font-size: 24px;
    font-weight: bold;
    color: #888;
    cursor: pointer;
  }
}
.floating-input.select:focus ~ .select-option {
  display: block;
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
