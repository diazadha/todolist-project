<template>
  <div class="container col-lg-5">
    <h1 class="mt-5">My To Do List</h1>
    <div class="input-group mb-3 mt-3">
      <input
        type="text"
        class="form-control"
        placeholder="Add your list"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        v-model="input_list.namakegiatan"
      />
      <button
        class="btn btn-primary"
        type="button"
        id="button-addon2"
        @click="posttodolist"
      >
        Add
      </button>
    </div>
    <hr />
    <ol class="list-group list-group-numbered mt-3">
      <li
        class="list-group-item"
        v-for="(item, index) in todolist"
        :key="index"
      >
        {{ item.namakegiatan }}
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            class="btn btn-warning me-md-2 justify-content-md-end"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            @click="getdatabyid(index)"
          >
            Update
          </button>
          <button
            class="btn btn-danger justify-content-md-end"
            type="button"
            @click="deletetodolist(index)"
          >
            Delete
          </button>
        </div>
      </li>
    </ol>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              To Do List Update
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Add your list"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                v-model="update_list.namakegiatan"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="updatetodolist"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todolist: [],
      input_list: {
        namakegiatan: "",
        status: "To-Do",
      },
      update_list: {
        index: "",
        namakegiatan: "",
        status: "To-Do",
      },
    };
  },
  methods: {
    gettodolist() {
      this.$axios
        .$get("http://localhost:3300/todolist")
        .then((response) => {
          console.log(response.data);
          this.todolist = response.data;
          console.log(this.todolist);
        })
        .catch((e) => {
          console.log(e.response.message);
        });
    },
    posttodolist() {
      // console.log(this.input_list);
      this.$axios
        .$post(`/api/v1${"http://localhost:3300/todolist"}`, this.input_list)
        .then((response) => {
          console.log(response);
          this.todolist.push(response);
        })
        .catch((e) => {
          console.log(e.response.message);
        });
    },
    deletetodolist(index) {
      console.log(index);
      this.$axios
        .$delete(
          `/api/v1${
            "http://localhost:3300/todolist/" + this.todolist[index].id
          }`
        )
        .then((response) => {
          console.log(response);
          this.todolist.splice(index, 1);
        })
        .catch((e) => {
          console.log(e.response.message);
        });
    },
    getdatabyid(index) {
      this.$axios
        .$get(
          `/api/v1${
            "http://localhost:3300/todolist/" + this.todolist[index].id
          }`
        )
        .then((response) => {
          console.log(response);
          this.update_list.namakegiatan = response.namakegiatan;
          this.update_list.index = index;
        })
        .catch((e) => {
          console.log(e.response.message);
        });
    },
    updatetodolist() {
      // console.log(this.update_list.index);
      // console.log("Haiii");
      const data = {
        namakegiatan: this.update_list.namakegiatan,
      };
      this.$axios
        .$put(
          `/api/v1${
            "http://localhost:3300/todolist/" +
            this.todolist[this.update_list.index].id
          }`,
          data
        )
        .then((response) => {
          console.log(response);
          this.todolist.splice(this.update_list.index, 1, response);
        })
        .catch((e) => {
          console.log(e.response.message);
        });
    },
  },
  mounted() {
    this.gettodolist();
  },
};
</script>