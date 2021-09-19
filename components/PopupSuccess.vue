<template>
  <client-only>
    <div class="modal" @click="clickBg">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img src="~/assets/images/img-success.png" width="75" alt="">
            <div class="modal-title mt-4 mb-3">{{$t('send_success')}}</div>
            <div>{{$t('thank_you')}}</div>
          </div>
          <div class="modal-footer">
            <div
              @click="viewTalent"
              class="btn-defaut"
            >
              <a>{{$t('view_talent')}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script>
export default {
  props: {
    action: {
      type: Function,
      default: null
    }
  },
  methods: {
    viewTalent() {
      if (this.action != null) {
        this.action()
      } else {
        this.$emit('close')
        this.$router.push(this.localePath({name: 'talent'}))
      }
     
    },
    clickBg(event) {
      if (event.target.className === 'modal') {
        this.$emit('close')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.modal {
  display: flex !important;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  .modal-dialog {
    width: 500px;
    max-width: calc(100% - 30px);
    margin: auto;
  }
  .modal-title {
    font-size: 18px;
    font-family: "Yeseva One", sans-serif;
    text-transform: uppercase;
  }
  .modal-dialog,
  .modal-content {
    border-radius: 15px !important;
    border: 0 !important;
  }
  .modal-dialog.modal-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .modal-body {
    padding: 0px 40px;
    padding-top: 30px;
    @media screen and (max-width: 576px) {
      padding: 0px 30px;
      padding-top: 20px;
    }
  }

  @media screen and (max-height: 600px) {
    overflow: auto !important;
  }
}
.modal-header {
  border-bottom: 0 !important;
  height: 40px !important;
}
.modal-footer {
  justify-content: center !important;
  border-top: 0 !important;
  padding: 30px 40px;
}
</style>
