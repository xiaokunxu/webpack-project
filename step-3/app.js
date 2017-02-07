import Vue from 'vue'

var app = new Vue({
	    el: '#app',
	    data: {
	    newTodo: '',
	    todoList: []
    	},
    	
    created() {
		//将数据保存在localStorage里防止关闭浏览器丢失
    	window.onbeforeunload =()=>{
			let dataString = JSON.stringify(this.todoList);
    		window.localStorage.setItem('myTodos',dataString);
      		let todoString = JSON.stringify(this.newTodo);
      		window.localStorage.setItem('newTodo',todoString);
		}
		let oldDataString = window.localStorage.getItem('myTodos')
		let oldData = JSON.parse(oldDataString)
		this.todoList = oldData || []

		let oldTodos = window.localStorage.getItem('newTodo')
		let oldTodo = JSON.parse(oldTodos)
		this.newTodo = oldTodo || ''
	},
    methods: {
	    addTodo: function(){
	    	if(!/\S/g.test(this.newTodo)){
				return alert('不能为空哟！')
			}
	    	var date = new Date(); // 获取当前时间
	    	var year = date.getFullYear(),
	    		month = parseInt(date.getMonth()+1),
	    		day = date.getDate(),
	    		hours = date.getHours(),
	    		min = date.getMinutes(),
	    		sec = date.getSeconds();

	    	var time = year + "-"
	    		+ (month<10?"0":"")+month+"-"
	    		+ (day<10?"0":"")+day+"-"
	    		+ (hours<10?"0":"")+hours+":"
	    		+ (min<10?"0":"")+min+":"
	    		+ (sec<10?"0":"")+sec;
	        this.todoList.push({
	            title: this.newTodo,
	        	createdAt: time,
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

