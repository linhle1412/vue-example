<template>
  <div class="page-index bg-form">
    <div class="bg-leaf-banner-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-md-12 mx-auto py-5">
            <div class="logo text-center mb-4">
              <img src="~/assets/images/slogan-larger.svg" alt="" />
            </div>
            <div class="title-list text-center">
              Thông tin các tài năng
            </div>
            <div class="talent-detail">
              <div class="talent-detail-img">
                <img src="~/assets/images/default-image.jpg" alt="" />
              </div>
              <div class="talent-detail-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. <br />
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TalentList from "@/components/TalentList";
import { mapState, mapActions } from "vuex";

export default {
  layout: "banner-bottom",
  components: {
    TalentList
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["talents"])
  },
  mounted() {
    this.fetchTalents();
  },
  methods: {
    ...mapActions(["fetchTalents"])
  }
};
</script>

<style lang="scss" scoped>
.title-list {
  margin-bottom: 25px;
  font-size: 28px;
  font-family: "Yeseva One", sans-serif;
  text-transform: uppercase;
}
.talent-detail-img {
    max-width: 300px;
    padding: 15px;
    background-color: #fff;
    border-radius: 15px;
    float: left;
    margin-right: 15px;
  img {
    width: 100%;
    height: auto;
  }
}
.talent-detail {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 1rem;
}
@media only screen and (max-width: 550px) {
  .talent-detail-img {
    width: 100%;
    float: unset;
    margin-right: 0;
    margin-bottom: 15px;
    max-width: unset;
}
  .title-list {
    font-size: 24px;
  }
}
</style>
