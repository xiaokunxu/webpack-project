import Vue from 'vue'
import AV from 'leancloud-storage'
import style from './style.css'

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
  //   	window.onbeforeunload =()=>{
		// 	let dataString = JSON.stringify(this.todoList);
  //   		window.localStorage.setItem('myTodos',dataString);
  //     		let todoString = JSON.stringify(this.newTodo);
  //     		window.localStorage.setItem('newTodo',todoString);
		// }

		// let oldDataString = window.localStorage.getItem('myTodos')
		// let oldData = JSON.parse(oldDataString)
		// this.todoList = oldData || []

		// let oldTodos = window.localStorage.getItem('newTodo')
		// let oldTodo = JSON.parse(oldTodos)
		// this.newTodo = oldTodo || ''

		this.currentUser = this.getCurrentUser();

     	this.fetchTodos()
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
	    	this.saveOrUpdateTodos()
    	}, 
    	removeTodo: function(todo){
    		let index = this.todoList.indexOf(todo)
    		this.todoList.splice(index,1)
    		this.saveOrUpdateTodos()
	    },
    	fetchTodos: function(){
	      	if(this.currentUser){
	        	var query = new AV.Query('AllTodos');
	        	query.find()
	          	.then((todos) => {
	            	let avAllTodos = todos[0] // 理论上 AllTodos 只有一个，所以取结果的第一项
	            	let id = avAllTodos.id
	            	this.todoList = JSON.parse(avAllTodos.attributes.content) // 有个 attributes 是因为从控制台看到的
	          		this.todoList.id = id // 给 todoList 这个数组设置 id 是因为数组也是对象
	          	}, function (error) {
	            	console.error(error) 
	          	})
	      	}
	    },
    	
    	saveTodos: function(){
    		let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos')
            var avTodos = new AVTodos();
            var acl = new AV.ACL()
            acl.setReadAccess(AV.User.current(),true)
            acl.setWriteAccess(AV.User.current(),true)
            avTodos.set('content',dataString);
            avTodos.setACL(acl)
            avTodos.save().then((todo) => {
                this.todoList.id = todo.id
                console.log('保存成功')
            },function(error){
                alert('保存失败')
            })
    	},
    	updateTodos: function () {
    		let dataString = JSON.stringify(this.todoList)
            let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)
            avTodos.set('content',dataString)
            avTodos.save().then(() => {
                console.log('更新成功')
            })
    	},
    	saveOrUpdateTodos: function(){
        	if(this.todoList.id){
                this.updateTodos()
            }else{
                this.saveTodos()
            }
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
	    		// console.log(error)
	    	});
	    },
	    login: function () {
        	AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        		this.currentUser = this.getCurrentUser();
        		this.fetchTodos() // 登录成功后读取 todos
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

