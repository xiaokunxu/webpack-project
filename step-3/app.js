import Vue from 'vue'

var app = new Vue({
	    el: '#app',
	    data: {
	    newTodo: '',
	    todoList: []
    	},
    	created: function(){
	  		window.onbeforeunload = ()=>{
	  			let dataString = JSON.stringify(this.tosoList)
	  			window.localStorage.setItem('myTodos', dataString)
	  		}

	  		let oldDataString = window.localStorage.getItem('myTodos')

	  		let oldData = JSON.parse(oldDataString)
	  		this.todoList = oldData || []
	  	},
  
    methods: {
	    addTodo: function(){
	    	var date = new Date();
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
	        	createTime: time,
	        	done: false // 添加一个 done 属性
	        })
	    	this.newTodo = '' // 变成空
    	}, 
	    removeTodo: function(todo){
    		let index = this.todoList.indexOf(todo)
    		this.todoList.splice(index,1)
	    },
	    
    }
})      

