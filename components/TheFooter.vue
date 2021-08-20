<template>
  <footer class="app-footer text-semi-bold">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6 col-12">
          <h5 class="block-heading mb-3" ><b>Về chúng tôi</b></h5>
          <ul>
            <li class="mb-2" v-for="(menu, index) in menus" :key='index' @click="showModal(menu)">
              {{menu.name}}
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-6">
          <h5 class="block-heading mb-3" style="height: 22px">  </h5>
          <ul>
            <li class="mb-2">
              <nuxt-link :to="localePath('/doi-tac-chien-luoc')">Đối tác chiến lược</nuxt-link>
            </li>
            <li class="mb-2">
              <nuxt-link :to="localePath('/lien-he')">Liên hệ</nuxt-link>
            </li>
            <li class="mb-2">
              Copyright © 2021 Quỹ phát triển tài năng Việt. All rights reserved.
            </li>
          </ul>
        </div>
      </div>
      <b-modal id="modal" :title="menuSelected && menuSelected.name" hide-footer size="lg">
        <vue-pdf :src="menuSelected && menuSelected.link" @num-pages="numPages = $event"></vue-pdf>
        <div v-if="numPages > 1" >
          <div v-for="(pageNum, index) in numPages" :key="index" style="border-top: 1px solid #aaa">
            <vue-pdf
              :key="pageNum"
              :src=" menuSelected.link"
              :page="pageNum"
              v-if="pageNum > 1"
            ></vue-pdf>
          </div>
        </div>
      </b-modal>
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
      menuSelected: null,
      numPages: 0,
      menus: [
        {
          id: 'modal-1',
          name: 'Quyết định công nhận Quỹ',
          link: '/pdf/pdf_1.pdf',
          page: 1
        },
        {
          id: 'modal-2',
          name: 'Quyết định thành lập Quỹ',
          link: '/pdf/pdf_2.pdf',
          page: 2
        },
        {
          id: 'modal-3',
          name: 'Điều lệ Quỹ',
          link: '/pdf/pdf_3.pdf',
          page: 12
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    showModal(menu) {
      this.menuSelected = Object.assign(menu);
      this.$bvModal.show('modal')
    }
  }
};
</script>
<style lang="scss">
  .modal-body {
    padding: 0;
  }
</style>
<style lang="scss" scoped>
.social-icon {
  width: 4rem;
}
ul li {
  cursor: pointer;
  font-size: 16px;
}
</style>
