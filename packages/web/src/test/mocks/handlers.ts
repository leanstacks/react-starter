import { delay, HttpResponse, http } from 'msw';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { usersFixture } from '@/__fixtures__/users';
import { todosFixture } from '@/__fixtures__/todos';
import { Task } from '@/pages/Tasks/api/useGetUserTasks';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    // get all users
    return HttpResponse.json(usersFixture);
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId', ({ params }) => {
    // get a user by identifier
    const { userId } = params;
    const user = find(usersFixture, { id: Number(userId) });
    if (user) {
      return HttpResponse.json(user);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:userId/todos', ({ params }) => {
    // get all tasks(todos) for a user
    const { userId } = params;
    const todos = filter(todosFixture, { userId: Number(userId) });
    return HttpResponse.json(todos);
  }),
  http.post('https://jsonplaceholder.typicode.com/todos', async ({ request }) => {
    // create a task
    const requestTodo = (await request.json()) as Task;
    if (requestTodo.title === '500') {
      return new HttpResponse(null, { status: 500 });
    }
    return HttpResponse.json(requestTodo, { status: 201 });
  }),
  http.get('https://jsonplaceholder.typicode.com/todos/:todoId', async ({ params }) => {
    // get a task
    await delay();
    const { todoId } = params;
    const todo = find(todosFixture, { id: Number(todoId) });
    if (todo) {
      return HttpResponse.json(todo);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.put('https://jsonplaceholder.typicode.com/todos/:todoId', async ({ params, request }) => {
    // update a task
    await delay();
    const { todoId } = params;
    const todo = find(todosFixture, { id: Number(todoId) });
    if (todo) {
      const requestTodo = (await request.json()) as Task;
      if (requestTodo.title === '500') {
        // simulate 500 error
        return new HttpResponse(null, { status: 500 });
      }
      // return the request body as the response
      return HttpResponse.json(requestTodo);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.delete('https://jsonplaceholder.typicode.com/todos/:todoId', async ({ params }) => {
    // delete a task
    const { todoId } = params;
    const todo = find(todosFixture, { id: Number(todoId) });
    if (todo) {
      return new HttpResponse(null, { status: 200 });
    }
    return new HttpResponse(null, { status: 500 });
  }),
];
