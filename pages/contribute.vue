<template>
  <div class="page-index bg-home">
    <div class="bg-leaf">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-3">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.svg" alt="" />
            </div>
            <div class="form-contribute">
              <div class="title-form text-center">
                Đóng góp cho <br />
                quỹ phát triển tài năng việt
              </div>
              <form>
                <div class="form-group">
                  <label for="contribute-name">Họ tên*</label>
                  <input
                    type="text"
                    name="contribute-name"
                    id="contribute-name"
                    value=""
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="contribute-name">Số điện thoại*</label>
                  <input
                    type="text"
                    name="contribute-phone"
                    id="contribute-phone"
                    value=""
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="contribute-name">Email</label>
                  <input
                    type="email"
                    name="contribute-email"
                    id="contribute-email"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <label for="contribute-money">Số tiền đóng góp*</label>
                  <div class="contribute-money">
                    <input
                      type="text"
                      name="contribute-money"
                      id="contribute-money"
                      :value="form.price.toLocaleString()"
                      required
                    />
                    <div class="currency">VND</div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="contribute-message">Lời nhắn</label>
                  <textarea
                    name="contribute-message"
                    id="contribute-message"
                    rows="3"
                  ></textarea>
                </div>
                <div class="form-group form-radio">
                  <label for="contribute-type">Loại đóng góp</label>
                  <div class="group-radio">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribute-type-1"
                        name="contribute-type"
                        checked
                      />
                      <label
                        class="custom-control-label"
                        for="contribute-type-1"
                        >Cá nhân</label
                      >
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribute-type-2"
                        name="contribute-type"
                      />
                      <label
                        class="custom-control-label"
                        for="contribute-type-2"
                        >Tổ chức</label
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group form-radio">
                  <label for="contribution">Hình thức đóng góp</label>
                  <div style="flex: 1">
                     <div class="group-radio mb-4">
                    <div class="custom-control custom-radio w-100">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribution-1"
                        name="contribution"
                        checked
                      />
                      <label class="custom-control-label" for="contribution-1"
                        >Chuyển khoản/ Đóng góp tại quầy</label
                      >
                    </div>
                  </div>
                  <div class="group-radio">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribution-2"
                        name="contribution"
                      />
                      <label class="custom-control-label" for="contribution-2"
                        ><img
                          src="~/assets/images/momo-icon.png"
                          alt="momo-icon"
                          width="30px"
                        />
                        Ví Momo</label
                      >
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="contribution-3"
                        name="contribution"
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
                  <input type="submit" @click="submit()" value="Gửi đóng góp" />
                </div>
              </form>
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
        form: {
            name: '',
            phone: '',
            email: '',
            price: 200000,
            message: '',
            type: '',
            contribution:''
        }        
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    submit(){
        if(!this.form.name){
            alert('Vui lòng nhập tên!')
            return
        }
        this.$router.push("/success");
      }
  }
};
</script>

<style lang="scss" scoped>
.form-contribute {
  background: #f5f5f5;
  padding: 20px;
  .title-form {
    text-transform: uppercase;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  form {
    input[type="radio"] {
      &:checked + label:before {
        background: #ffd52a;
      }
    }
    input[type="submit"] {
      background: #ffd52a;
      border: 1px solid #ffd52a;
      padding: 10px 20px;
      font-weight: bold;
    }
    .contribute-money {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      .currency{
          position: absolute;
          right: 10px;
      }
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

@media only screen and (max-width: 550px) {
    .form-contribute{
        padding: 15px;
        .title-form{
            margin-bottom: 15px;
        }
    }
}
</style>
