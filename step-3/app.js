import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  craeted: function(){
  	window.onbeforeunload = ()=>{
  		let dataString = JSON.stringify(this.tosoList)
  		window.localStrorage.setItem('myTodos', dataString)
  	}

  	let oldDataString = window.localStrorage.getItem('myTodos')
  	let oldData = JSON.parse(oldDataString)
  	this.todoList = oldData || []

  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        done: false // 添加一个 done 属性
      })
      this.newTodo = '' // 变成空
    },
    removeTodo: function(todo){
    	let index = this.todoList.indexOf(todo)
    	this.todoList.splice(index,1)
    }
  }
})      

