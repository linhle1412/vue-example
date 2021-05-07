<template>
  <div>
    <p v-b-modal="id">{{ name }}</p>
    <b-modal :id="id" :title="name" hide-footer size="lg">
      <vue-pdf :src="link" @num-pages="numPages = $event"></vue-pdf>
      <div v-if="numPages > 1">
        <div :class="{ loader: isActive }"></div>
        <div v-for="(pageNum, index) in numPages" :key="index">
          <vue-pdf
            :key="pageNum"
            :src="link"
            :page="pageNum"
            v-if="pageNum > 1"
          ></vue-pdf>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "MenuPDF",
  props: ["id", "name", "link"],
  data() {
    return {
      numPages: 50,
      isActive: true
    };
  },
  computed: {},
  created() {},
  watch: {
    numPages(nVal) {
      if (nVal > 1) {
        setTimeout(() => this.isActive = false, 1500);
      }
    }
  }
};
</script>
<style>
.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #777776;
  width: 70px;
  height: 70px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  margin: auto;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
