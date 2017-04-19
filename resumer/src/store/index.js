import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0,
		selected: 'profile',
		resume: {
			// visibleItems: ['profile', 'work history', 'education', 'projects', 'awards', 'contacts', 'others'],
			config: [
				{ field: 'profile', icon: 'id' },
	  			{ field: 'work history', icon: 'work' },
	 			{ field: 'education', icon: 'book' },
	 			{ field: 'projects', icon: 'heart' },
	  			{ field: 'awards', icon: 'cup' },
		        { field: 'contacts', icon: 'phone' },
			],
	  		profile: {
				name: '徐XX',
				city: '火星',
				title: '前端工程师'
			},
			'work history': [
				{ company: 'AL', content: '我的第二份工作是' },
				{ company: 'TX', content: '我的第一份工作是' },
			],
			education: [
				{ school: '社会大学', content: '研究生' },
				{ school: '社会大学', content: '本科' },
			],
			projects: [
				{ name: '项目2', content: '文字' },
				{ name: '项目1', content: '文字' },
			],
			awards: [
				{ name: 'awards A', content: '文字' },
				{ name: 'awards B', content: '文字' },
			],
			contacts: [
				{ contact: '手机', content: '13412434567' },
				{ contact: 'QQ', content: '12345678' },
			],	
	  	}
	},
	mutations: {
		increment (state) {
			state.count++
		}
	}
})
