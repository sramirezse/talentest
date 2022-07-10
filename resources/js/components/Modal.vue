<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      :class="btnlg ? 'btn btn-lg btn-' + color : 'btn btn-' + color"
      data-toggle="modal"
      :data-target="'#' + id"
      data-backdrop="false"
      v-if="buttonShow"
    >
      {{ button_modal_text }}
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="id + 'Label'"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        :class="modallg ? 'modal-lg' : ''"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-secondary" :id="id + 'Title'">
              {{ title }}
            </h5>
            <button
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeAction"
            >
              <i class="material-icons">cancel</i>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "modal-default",
    },
    buttonShow: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    button_modal_text: {
      type: String,
      default: "",
    },
    close_button_text: {
      type: String,
      default: "",
    },
    save_button_text: {
      type: String,
      default: "",
    },
    closeAction: {
      type: Function,
    },
    color: {
      type: String,
      default: "success",
    },
    btnlg: {
      type: Boolean,
      default: false,
    },
    modallg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>
