import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = '1KPqugUTvNs5gOaRwq0veCOO-gzGzoHsz';
var APP_KEY = '0GW1Fa6sjXfK9104QPdgRnvG';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
	    el: '#app',
	    data: {
	    newTodo: '',
	    todoList: [],
	    actionType: 'signUp',
    	formData: {
     	 	username: '',
      		password: ''
	    },
	    currentUser: null,
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
	    signUp: function () {
	    	let user = new AV.User();
	    	// 设置用户名
	    	user.setUsername(this.formData.username);
	    	// 设置密码
	    	user.setPassword(this.formData.password);
	    	user.signUp().then((loginedUser) => {
	    		this.currentUser = this.getCurrentUser();
	    	}, (error) => {
	    		alert('注册失败')
	    	});
	    },
	    login: function () {
        	AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        		this.currentUser = this.getCurrentUser();
        	}, function (error) {
        		alert('登录失败')
      		});
	    },
	    logout: function () {
	    	AV.User.logOut();
	    	this.currentUser = null;
	    	window.location.reload();
	    },
	    getCurrentUser: function () {
	    	let {id, createdAt, attributes: {username}} = AV.User.current()
	    	return {id, username, createdAt}
	    },
	    created: function(){
	  		window.onbeforeunload = ()=>{
	  			let dataString = JSON.stringify(this.tosoList)
	  			let newTodoString = JSON.stringify(this.newTodo)
	  			window.localStorage.setItem('myTodos', dataString)
	  			window.localStorage.setItem('newTodoString', newTodoString)
	  		}

	  		let oldDataString = window.localStorage.getItem('myTodos')
	  		let newTodoString = window.localStorage.getItem('newTodoString')

	  		let oldData = JSON.parse(oldDataString)
	  		let newTodo = JSON.parse(newTodoString)
	  		this.todoList = oldData || []
	  		this.newTodo = newTodo || ""

	  		this.currentUser = this.getCurrentUser();
	    }
	}
})      

