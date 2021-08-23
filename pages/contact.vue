<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row justify-content-center py-md-5 py-4">
          <div class="col-lg-8 col-md-12">
            <div class="logo logo-background text-center"></div>
          </div>
        </div>
        <div class='page-title text-center'>
          {{$t('contact')}}
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row contact-wrapper mx-0">
              <div class="col-md-6 col-12 p-0">
                <div class="contact-item">
                  <img src="~/assets/images/icon-pin.png" alt="">
                  <div class="contact-item-content">
                    <div class="contact-item-title">
                      {{$t('address')}}
                    </div>
                    <div class="contact-item-text">
                      <div>{{contactInfo.address && contactInfo.address[$i18n.locale]}}</div>
                    </div>
                  </div>
                </div>
                <div class="contact-item">
                  <img src="~/assets/images/icon-phone.png" alt="">
                  <div class="contact-item-content">
                    <div class="contact-item-title">
                      {{$t('contact')}}
                    </div>
                    <div class="contact-item-text">
                      <div>{{$t('email')}}: {{contactInfo.email && contactInfo.email[$i18n.locale]}}</div>
                      <div>{{$t('phone')}}: {{contactInfo.phone && contactInfo.phone[$i18n.locale]}}</div>
                    </div>
                  </div>
                </div>
                <div class="contact-item">
                  <img src="~/assets/images/icon-heart.png" alt="">
                  <div class="contact-item-content">
                    <div class="contact-item-title">
                      {{$t('bank_donation')}}
                    </div>
                    <div class="contact-item-text">
                      <div>{{contactInfo.bankNo && contactInfo.bankNo[$i18n.locale]}}</div>
                      <div>{{$t('bank_name')}}: {{contactInfo.bankName && contactInfo.bankName[$i18n.locale]}}</div>
                      <div>{{$t('bank')}}: {{contactInfo.bank && contactInfo.bank[$i18n.locale]}}</div>
                      <div>{{$t('bank_branch')}}: {{contactInfo.bankBranch && contactInfo.bankBranch[$i18n.locale]}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12 form-contact">
                <div class="title text-center">
                  {{$t('send_contact')}}
                </div>
                <div class="form">
                  <div class="floating-label">
                    <input
                      class="floating-input"
                      type="text"
                      placeholder=" "
                      :class="{ error: rules.name.error }"
                      v-model="form.name"
                    />
                    <label>{{$t('your_name')}}</label>
                    <small>{{ rules.name.error }}&nbsp;</small>
                  </div>

                  <div class="floating-label">
                    <input
                      class="floating-input"
                      :class="{ error: rules.phone.error }"
                      type="text"
                      v-model="form.phone"
                      placeholder=" "
                    />
                    <label>{{$t('phone_no')}} *</label>
                    <small>{{ rules.phone.error }}&nbsp;</small>
                  </div>
                  <div class="floating-label">
                    <input
                      class="floating-input"
                      type="email"
                      placeholder=" "
                      :class="{ error: rules.email.error }"
                      v-model="form.email"
                    />
                    <label>Email</label>
                    <small>{{ rules.email.error }} &nbsp;</small>
                  </div>
                  <div class="floating-label">
                    <textarea
                      name="contribute-message"
                      id="contribute-message"
                      rows="3"
                      class="floating-input"
                      v-model="form.message"
                      placeholder=" "
                    ></textarea>
                    <label>{{$t('message')}}</label>
                  </div>
                  <div class="text-center" style="margin-top: 30px">
                    <button
                      @click="submit"
                      :class="isLoading ? 'is-loading' : ''"
                    >
                      {{$t('send_info')}}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
         
        </div>
      </div>
    </div>
    <popup-success v-if="!isSuccess" @close="isSuccess = false"></popup-success>
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
      contactInfo: this.$store.state.contactMeta || {},
      isSubmitted: false,
      isSuccess: true,
      isLoading: false,
      form: {
        name: "",
        phone: "",
        email: "",
        message: "",
      },
      rules: {
        name: {
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
        email: {
          required: false,
          label: "email",
          validate: value => {
            if (!value) return true;
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          error: ""
        },
        message: {
          required: false,
          label: "lời nhắn",
          error: ""
        },
      }
    };
  },
  async fetch({ store, params, redirect, query }) {
    try {
      await store.dispatch('fetchContactMeta')
    } catch (e) {
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
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
        email: "",
        message: "",
      };
    },

    submit() {
      if (this.validate(this.form, this.rules)) {
        this.isLoading = true;
        this.$store.dispatch("sendContact", this.form).then(res => {
          this.isLoading = false;
          this.isSuccess = true;
          this.clearForm();
        })
        .catch(e => {
          this.isLoading = false;
          this.$toast.error(e)
        });
      }
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
