const app = new Vue({
  el: "#app",

  data: {
    tasks: [],
    newTask: "",
    editMode: false,
    taskToUpdate: null
  },

  computed: {
    totalHours() {
      let totalHours = 0;
      this.tasks.forEach(t => {
        totalHours += parseFloat(t.timeSpent);
      });
      return totalHours.toFixed(2);
    }
  },

  created() {
    this.init();
  },

  updated() {
    this.updateLocalStorage();
  },

  methods: {
    init() {
      if (localStorage.getItem("myTasks") !== null) {
        this.tasks = JSON.parse(localStorage.getItem("myTasks"));
      }
    },

    saveTask() {
      if (this.newTask != "") {
        let taskToSave = {};

        taskToSave.id = Date.now();
        taskToSave.task = this.newTask;
        taskToSave.completed = false;
        taskToSave.timeSpent = 0;

        this.tasks.push(taskToSave);

        this.newTask = "";
        this.$refs["task-input"].focus();
      }
    },

    updateLocalStorage() {
      localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    },

    enableEdit(task) {
      this.taskToUpdate = task;
      this.editMode = true;
    },

    disableEdit() {
      this.taskToUpdate = null;
      this.editMode = false;
    },

    removeTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },

    completeTask(task) {
      task.completed = !task.completed;
    },

    resetTime(task) {
      task.timeSpent = 0;
    },

    resetAll() {
      this.tasks.forEach(task => {
        task.timeSpent = 0;
      });
    }
  }
});
