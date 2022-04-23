import { makeAutoObservable } from "mobx";

class TaskStore {
  list = [
    {
      id: 1,
      name: "react",
      isDone: true,
    },
    {
      id: 2,
      name: "vue",
      isDone: true,
    },
  ];
  constructor() {
    makeAutoObservable(this);
  }
}
export default TaskStore