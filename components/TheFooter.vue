<template>
  <footer class="app-footer text-semi-bold">
    <!-- <b-modal v-model="modalShow">
      <iframe :src="'~/assets/images/sample.pdf'" ></iframe>
    </b-modal> -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6 col-12">
          <h4 class="block-heading">Về chúng tôi</h4>
          <ul>
            <li class="mt-2" >
              <a
                href="https://drive.google.com/file/d/1u4UuL7NfYHgN5X0c5g527VVz2-aiBNFX/view?usp=sharing"
                class="link"
                target="_blank"
                >Quyết định công nhận Quỹ</a
              >
            </li>
            <li class="mt-2" >
              <a
                href="https://drive.google.com/file/d/10uBvIY73u0_b1e9vpv4h3Pi9BzOKEuni/view?usp=sharing"
                class="link"
                target="_blank"
                >Quyết định thành lập Quỹ</a
              >
            </li>
            <li class="mt-2">
              <a
                href="https://drive.google.com/file/d/1pFvjcXAoTR-NXC6nJ9ydE113T71D35bG/view?usp=sharing"
                class="link"
                target="_blank"
                >Điều lệ Quỹ</a
              >
            </li>
          </ul>
        </div>

        <div class="col-12 col-lg-6">
          <p class="d-i-block mt-2">
            Copyright © 2021 Quỹ phát triển tài năng Việt. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: "AppFooter",
  components: {
  },
  data() {
    return {
      modalShow: false,
      modalLink: ''
    }
  },
  mounted() {
    // PDFJS.getDocument()
  },
  methods: {
    openModal(link) {
      this.modalLink = link
      this.modalShow = true
    }
  }
};
</script>

<style lang="scss" scoped>
.social-icon {
  width: 4rem;
}
// ul li {
//   cursor: pointer;
// }
</style>
