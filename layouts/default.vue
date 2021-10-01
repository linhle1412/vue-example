<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  },
   head() {
    return {
      title: this.$t('page_title'),
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$t('page_title')
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://quyphattrientainangviet.akadigital.vn"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t('page_title')
        },
        {
          hid: "description",
          name: "description",
          content: this.$t('page_title')
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article"
        },
        {
          hid: "og:image",
          property: "og:image",
          content: '/icon.jpg'
        },
        {
          hid: 'image',
          name: 'image',
          content: '/icon.jpg'
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '1109570683188671'
        },
      ],
    }
   
  },
}
</script>

<style>

</style>
