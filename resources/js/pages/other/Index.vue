<template>
  <kanban-board :stages="stages" :blocks="blocks">
    <div v-for="stage in stages" :slot="stage" :key="stage">
      <h2>{{ stage }}</h2>
    </div>
    <div v-for="block in blocks" :slot="block.id" :key="block.id">
      <div><strong>id:</strong> {{ block.id }}</div>
      <p>
        {{ block.title }}
      </p>
    </div>
  </kanban-board>
</template>

<script>
import Axios from 'axios';

export default {
  data() {
    return {
      stages: ["buffer", "working", "done"],
      blocks: [
        {
          id: 1,
          status: "buffer",
          title: "Test",
        },
      ],
    };
  },
  methods: {
    getUser() {
      Axios.get('/api/user').then(response => {
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss">
$buffer: #fb7d44;
$working: #2a92bf;
$done: #00b961;

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
