<template>
  <div class="page-index bg-home">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan.png" alt="" />
            </div>
           
          </div>
          <div class="col-lg-9 mx-auto">
            <div class="info-item">
              <div class="info-item-title"><span>Ý nghĩa</span></div>
              <div class="info-item-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit quis architecto molestias deleniti ad recusandae delectus, aperiam doloremque tempora dignissimos perspiciatis quae ipsa, atque voluptas accusantium repudiandae maiores mollitia distinctio.
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title"><span>Ý nghĩa</span></div>
              <div class="info-item-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit quis architecto molestias deleniti ad recusandae delectus, aperiam doloremque tempora dignissimos perspiciatis quae ipsa, atque voluptas accusantium repudiandae maiores mollitia distinctio.
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title"><span>Ý nghĩa</span></div>
              <div class="info-item-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit quis architecto molestias deleniti ad recusandae delectus, aperiam doloremque tempora dignissimos perspiciatis quae ipsa, atque voluptas accusantium repudiandae maiores mollitia distinctio.
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title"><span>Ý nghĩa</span></div>
              <div class="info-item-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit quis architecto molestias deleniti ad recusandae delectus, aperiam doloremque tempora dignissimos perspiciatis quae ipsa, atque voluptas accusantium repudiandae maiores mollitia distinctio.
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
  async fetch({ store, params, redirect, query }) {
    try {
      
    } catch (e) {
    }
  },
  data() {
    return {
      fundInfo: this.$store.state.fundInfo,
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.info-item {
  border: 1px solid #222;
  border-top-color: transparent;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  margin-bottom: 60px;
  .info-item-title {
    position: absolute;
    top: 0;
    left: 0;
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
    width: 100%;
    display: flex;
    span {
      margin: 0 20px;
      margin-top: -20px;
    }
    &::after, &::before {
      content: '';
      border: 1px solid transparent;
      border-top-color: #222;
    }
    &::after {
      border-top-right-radius: 17px;
      flex: 1 1;
    }
    &::before {
      border-top-left-radius: 17px;
      flex: 0 0 30px;
    }
  }
  .info-item-content {
    color: #444;
  }
}
</style>
