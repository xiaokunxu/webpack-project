# 如何运行本 demo

1. 安装 Node.js 和 NPM
2. npm i
3. webpack
4. 打开 page.html

# 预览
[预览地址](https://xiaokunxu.github.io/webpack-demo/step-3/page.html)

# TodoList
### 基本功能
1. 用户可以新建一个待办事项
2. 用户可以删除一个待办事项
3. 用户可以将一个待办事项标记为已完成
4. 用户刷新页面之后，待办事项还在

# 思路
### 1.添加待办事项
  - 用户输入待办内容
  - 用户按下回车
  - 新的待办出现在 ol.todos 里
  
### 2.绑定数据
```
<div class="newTask">
  <input type="text" v-model="newTodo">
</div>
```

### 3.绑定事件
当用户敲击“回车时”，在 data.todoList 里新建一个对象。

### 4.展开新的待办事项
```
<ol class="todos">
  <li v-for="todo in todoList">
    {{ todo.title }}
  </li>
</ol>
```
### 5.优化
```
methods: {
  addTodo: function(){
    this.todoList.push({
      title: this.newTodo,
      createdAt: new Date()
    })
    this.newTodo = ''  // 变成空
  }
}
```

### 6.标记为完成
  - 给每一个 todo 添加一个 done 属性
  - 给每一个 ``<li>`` 里面添加一个 checkbox
  - 将 done 和 checkbox 双向绑定。
  
app.js
```
methods: {
  addTodo: function(){
    this.todoList.push({
      title: this.newTodo,
      createdAt: new Date(),
      done: false // 添加一个 done 属性
    })
    this.newTodo = ''
  }
}

```

page.html
```
<ol class="todos">
  <li v-for="todo in todoList">
    <input type="checkbox" v-model="todo.done"> {{ todo.title }}
    <span v-if="todo.done">已完成</span>
    <span v-else>未完成</span>
  </li>
</ol>
```

### 7.删除待办事项
  - 在每一项后面添加一个删除按钮
  - 点击按钮则从 data.todoList 中删除该项
  
app.js
```
methods: {
  addTodo: function(){
    this.todoList.push({
      title: this.newTodo,
      createdAt: new Date(),
      done: false // 添加一个 done 属性
    })
    this.newTodo = ''
  },
  removeTodo: function(todo){
    let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
    this.todoList.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
  }
}
```

page.html
```
<ol class="todos">
  <li v-for="todo in todoList">
    <input type="checkbox" v-model="todo.done"> {{ todo.title }}
      <span v-if="todo.done">已完成</span>
      <span v-else>未完成</span>
      <button @click="removeTodo(todo)">X</button>
  </li>
</ol>
```
  
### 8.保存待办事项
