<template>
  <div>
    <TheHeader />
    <Nuxt />
    <div class='banner-bottom'>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader
  },
}
</script>

<style lang="scss" scoped>
.banner-bottom{
    background: url('~/assets/images/bg_kid.jpg') bottom no-repeat;
    height: 42rem;
    position: relative;
    width: 100%;
    background-size: cover;
    &:after{
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        height: 2rem;
        width: 100%;
        background: #efeeec;
    }
}
@media only screen and (max-width: 550px) {
    .banner-bottom{
        height: 14rem;
    }
}
</style>
