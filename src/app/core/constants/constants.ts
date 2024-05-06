const apiurl = 'http://localhost:5157/api';

export const apiEndpoint = {

  TodoEndpoint: {
    getAllTodo: `${apiurl}/task`,
    addTodo: `${apiurl}/task/add`,
    updateTodo: `${apiurl}/task/update`,
    deleteTodo: `${apiurl}/task`,
    getTodosByStatus: `${apiurl}/task/getTaskByStatus`
  },
};
