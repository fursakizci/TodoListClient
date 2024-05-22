const apiurl = 'http://3.27.88.228:8080/api';

export const apiEndpoint = {

  TodoEndpoint: {
    getAllTodo: `${apiurl}/task`,
    addTodo: `${apiurl}/task/add`,
    updateTodo: `${apiurl}/task/update`,
    deleteTodo: `${apiurl}/task`,
    getTodosByStatus: `${apiurl}/task/getTaskByStatus`
  },
};
