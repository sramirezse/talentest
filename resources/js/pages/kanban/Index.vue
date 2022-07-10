<template>
  <div>
    <kanban-board @update-block="updateBlock" :stages="stages" :blocks="blocks">
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <div class="row">
          <div class="col-10">
            <h2>{{ stage }}</h2>
          </div>
          <button
            class="col-2 btn btn-add-card"
            data-toggle="modal"
            data-backdrop="false"
            data-target="#modal-default"
            @click="setState(stage)"
          >
            <i class="fas fa-plus-circle"></i>
          </button>
          <ModalDefault :closeAction="closeModal" :buttonShow="false">
            <div slot="body">
              <div class="form-group">
                <label>Titulo</label>
                <input class="form-control" type="text" v-model="block.title" />
              </div>
              <div class="form-group">
                <label>Contenido</label>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="block.content"
                ></textarea>
              </div>
              <div class="form-group">
                <label>fecha</label>
                <input class="form-control" type="date" v-model="block.limit_date">
              </div>
            </div>
            <div slot="buttons">
              <button type="button" class="btn btn-primary" @click="newBlock">
                Agregar
              </button>
            </div>
          </ModalDefault>
        </div>
      </div>
      <div :class="block.color == 'success' ? '': 'bg-danger'"  v-for="block in blocks" :slot="block.id" :key="block.id">
        <button @click="setBlock(block, true)" class="btn text-left">
          <div><strong>Título:</strong> {{ block.title}}</div>
          <p>
            {{block.content  }}
          </p>
        </button>
      </div>
    </kanban-board>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Modal from "../../components/Modal";
export default {
  components: {
    ModalDefault: Modal,
  },
  data() {
    return {
      block: {
        id: 0,
        step_id: "",
        title: "",
        content: "",
        status: "",
        date: "",
        limit_date : "",
      },
    };
  },

  computed: {
    ...mapState({
      blocks: (state) => state.blocks.blocks,
      stages: (state) => state.blocks.steps,
    }),
  },
  methods: {
    updateBlock(id, status) {
        console.log(id, status);
        if(status == 'done'){
            alert('Felicitaciones por lograrlo!');
        }
      const block = this.blocks.find((b) => b.id === Number(id));
      console.log('block',block);
      this.setBlock(block, false);
      this.setState(status);
      this.newBlock();
    },
    async newBlock() {
      await this.$store.dispatch("blocks/save", this.block).then((res) => {
        $("#modal-default").modal("hide");
        this.fetchBlocks();
        this.resetFields();
        // alert("Guardado");
      });
    },
    async fetchBlocks() {
      const data = await this.$store.dispatch("blocks/fetch").then((res) => {
        console.log("res", res);
        return res;
      });
    },
    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    closeModal() {
      console.log("close");
    },
    setBlock(block, modal = false) {
      console.log("setBlockId", block);
      this.block = block;
      this.block.step_id = block.status;
      if (modal) {
        $("#modal-default").modal("show");
      }
    },
    setState(id) {
      this.block.step_id = id;
      console.log(this.block.step_id);
    },
  },
  mounted() {
    this.fetchBlocks();
  },
};
</script>

<style lang="scss">
$buffer: #fb7d44;
$working: #2a92bf;
$done: #00b961;
$canceled: #f44336;

* {
  box-sizing: border-box;
}

body {
  background: #09215a;
  color: white;
  font-family: "Lato";
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
h2 {
  color: white;
}
.btn-add-card {
  padding: 0;
  margin-bottom: 0;
}

.drag-column {
  background-color: #d6d9dc;
  border-radius: 10px;
  .drag-column-header > div {
    width: 100%;
    h2 > a {
      float: right;
    }
  }

  .drag-column-footer > div {
    margin-left: 10px;
    a {
      text-decoration: none;
      color: white;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  &-buffer {
    .drag-column-header,
    .is-moved,
    .drag-item,
    .drag-options {
      background: $buffer;
    }
  }

  &-working {
    .drag-column-header,
    .drag-item,
    .is-moved,
    .drag-options {
      background: $working;
    }
  }

  &-done {
    .drag-column-header,
    .drag-item,
    .is-moved,
    .drag-options {
      background: $done;
    }
  }
}

.section {
  padding: 20px;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: 300;
  }

  h4 {
    font-weight: 400;
    a {
      font-weight: 600;
    }
  }
}
</style>
