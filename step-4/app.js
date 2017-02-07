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

		this.currentUser = this.getCurrentUser();
	},
    methods: {
	    addTodo: function(){
	    	if(!/\S/g.test(this.newTodo)){
				return alert('不能为空哟！')
			}
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
	        	createdAt: time,
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
	    		alert('注册成功')
	    	}, (error) => {
	    		alert('注册失败')
	    	});
	    },
	    login: function () {
        	AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        		this.currentUser = this.getCurrentUser();
        	}, function (error) {
        		alert('请输入正确的用户名或密码')
      		});
	    },
	    logout: function () {
	    	AV.User.logOut();
	    	this.currentUser = null;
	    	window.location.reload(); //重新加载
	    },
	    getCurrentUser: function () {
	    	// 解构赋值
	    	let current = AV.User.current()
		    if (current) {
		        let {id, createdAt, attributes: {username}} = current
		        return {id, username, createdAt} 
		    }else{
		    	return null
		    }
	    }
	}
})      

