<template>
  <div class="page-index bg-home bg-fund-info">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <div class="logo text-center">
              <img src="~/assets/images/slogan.png" class="thumb" alt="" />
            </div>
          </div>
          <div class="col-lg-7 col-md-12 mx-auto">
            <div v-if="!isSubmitted" class="form-contribute">
              <div class="title-form text-center" v-html="$t('contribute_title')">
              </div>
              <div class="form">
                <div class="floating-label">
                  <input
                    class="floating-input"
                    type="text"
                    placeholder=" "
                    :class="{ error: rules.fullname.error }"
                    v-model="form.fullname"
                  />
                  <label>{{$t('contribute_name')}}</label>
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
                <div class="floating-label contribute-money">
                  <input
                    class="floating-input"
                    type="text"
                    placeholder=" "
                    name="contribute-money"
                    id="contribute-money"
                    :value="form.priceDisplay"
                    @keyup="formatPrice"
                    :class="{ error: rules.priceDisplay.error }"
                    v-on:keypress="isNumber"
                  />
                  <div class="currency">VND</div>
                  <label>{{$t('contribute_amount')}} *</label>
                  <small>{{ rules.priceDisplay.error }}&nbsp;</small>
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
                  <label>{{$t('message')}}</label>
                </div>
                <div class="form-group form-radio d-flex">
                  <label for="contribute-type">{{$t('contribute_type')}}</label>
                  <div class="group-radio">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribute-type-1"
                        name="contribute-type"
                        v-model="form.type"
                        value="personal"
                        checked
                      />
                      <label
                        class="custom-control-label"
                        for="contribute-type-1"
                        >{{$t('person')}}</label
                      >
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribute-type-2"
                        name="contribute-type"
                        v-model="form.type"
                        value="organization"
                      />
                      <label
                        class="custom-control-label"
                        for="contribute-type-2"
                        >{{$t('organization')}}</label
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group form-radio d-flex">
                  <label for="contribution">{{$t('contribute_form')}}</label>
                  <div style="flex: 1">
                    <div class="group-radio mb-4">
                      <div class="custom-control custom-radio w-100">
                        <input
                          type="radio"
                          class="custom-control-input"
                          id="contribution-1"
                          name="contribution"
                          v-model="form.method"
                          value="cash"
                        />
                        <label class="custom-control-label" for="contribution-1"
                          >{{$t('cod')}}</label
                        >
                      </div>
                    </div>
                    <div class="group-radio">
                      <!-- <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          class="custom-control-input"
                          id="contribution-2"
                          name="contribution"
                          v-model="form.method"
                          value="momo"
                        />
                        <label class="custom-control-label" for="contribution-2"
                          ><img
                            src="~/assets/images/momo-icon.png"
                            alt="momo-icon"
                            width="30px"
                          />
                          Ví Momo</label
                        >
                      </div> -->
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          class="custom-control-input"
                          id="contribution-3"
                          name="contribution"
                          v-model="form.method"
                          value="zalopay"
                        />
                        <label class="custom-control-label" for="contribution-3"
                          ><img
                            src="~/assets/images/zalo-pay.jpeg"
                            alt="zalo-pay-icon"
                            width="30px"
                          />
                          Ví ZaloPay</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-4">
                  <button
                    @click="checkForm"
                    :class="isLoading ? 'is-loading' : ''"
                  >
                  {{$t('send_contribute')}}
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="!isSuccess" class="form-contribute form-result">
              <div class="img-form text-center">
                <img src="~/assets/images/img-fail.png" alt="" />
              </div>
              <div class="title-form text-center">
                {{$t('payment_failed')}}
              </div>
              <div class="content-form text-center mb-5" v-html="$t('contribute_fail')">
              </div>
              <div
                class="btn-defaut text-center my-3"
                @click="isSubmitted = false"
              >
                <a>{{$t('try_contribute')}}</a>
              </div>
            </div>
            <div v-else class="form-contribute form-result">
              <div class="img-form text-center">
                <img src="~/assets/images/img-success.png" alt="" />
              </div>
              <div class="title-form text-center">
                {{$t('payment_success')}}
              </div>
              <div class="content-form text-center mb-5" v-html="$t('contribute_success')">
              </div>
              <!-- <div class="btn-defaut text-center my-3" @click="isSubmitted = false">
                <a>Đóng</a>
              </div> -->
              <div class="btn-defaut text-center mb-4">
                <NuxtLink :to="localePath('fund-info')" class='text-uppercase'>
                  {{$t('nav.fund_info')}}
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
export default {
  layout: "default",
  data() {
    return {
      isSubmitted: false,
      isSuccess: true,
      isLoading: false,
      form: {
        fullname: "",
        phone: "",
        email: "",
        amount: 0,
        priceDisplay: "",
        note: "",
        type: "personal",
        method: "cash"
      },
      rules: {
        fullname: {
          required: true,
          label: "tên cá nhân / tổ chức",
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
        priceDisplay: {
          required: true,
          label: "số tiền đóng góp",
          error: ""
        },
        note: {
          required: false,
          label: "lời nhắn",
          error: ""
        },
        type: {
          required: false,
          label: "loại đóng góp",
          error: ""
        }
      }
    };
  },
  methods: {
    formatPrice(e) {
      if (e.target.value == "") {
        this.form.amount = 0;
        this.form.priceDisplay = "";
        return;
      }
      this.form.amount = parseInt(
        e.target.value.toString().replaceAll(",", "")
      );
      this.form.priceDisplay = this.form.amount
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
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
        amount: 0,
        priceDisplay: "",
        note: "",
        type: "personal",
        method: "cash"
      };
    },

    checkForm() {
      if (this.validate(this.form, this.rules)) {
        if (!this.form.email) delete this.form.email;
        this.isLoading = true;
        this.$store.dispatch("createContribute", this.form).then(res => {
          if (this.form.method === "cash") {
            this.isLoading = false;
            this.isSubmitted = true;
            this.isSuccess = true;
            this.clearForm();
          } 
          else {
            this.isLoading = false
            this.isSubmitted = true
            this.isSuccess = true
            this.clearForm()
            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
            ) {
              window.open(res.deeplink);
            } else {
              window.open(res.pay_url);
            }
          }
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
.form-contribute {
  background: #f5f5f5;
  padding: 30px 40px;
  border-radius: 20px;
  .title-form {
    text-transform: uppercase;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 40px;
    font-family: "Yeseva One", sans-serif;
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
  font-size: 15px;
  color: #000;
}

.floating-select:focus ~ label,
.floating-select:not([value=""]):valid ~ label {
  top: -18px;
  font-size: 15px;
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
/***  daniel - Fork me friend - style  ***/

@media only screen and (max-width: 550px) {
  .form-contribute {
    padding: 15px;
    .title-form {
      margin-bottom: 30px;
      font-size: 18px;
    }
  }
}
</style>
