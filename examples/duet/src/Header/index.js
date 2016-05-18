const dom        = require('duet/util/dom');
const {modelFor} = require('duet/util/model');
const {uuid}     = require('../utils');

const ENTER_KEY = 13;

const onKeydown = (model, data) => {
  var title;

  if (data.event.keyCode !== ENTER_KEY) {
    return;
  }

  title = data.form['new-todo'].trim();

  if (title) {
    model.todos.put(uuid(), {
      title: title,
      completed: false
    });
    model.newTodo.set('');
  }
};

module.exports = (state) => {
  const model = modelFor(state);

  return dom`
    <header class="header">
      <h1>todos</h1>
      <input type="text"
        class="new-todo"
        name="new-todo"
        value=${state.newTodo}
        dataset=${{
          keydown: model.ev(onKeydown),
          default: 'keydown'
        }}
        placeholder="What needs to be done?"
        ${state.isInitLoad ? 'autofocus' : ''} />
    </header>
  `;
};
