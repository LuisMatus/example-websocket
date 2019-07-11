
import '@mdi/font/css/materialdesignicons.css' 

import vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

let css = require("./styles/importer.sass");

window.Vue = vue;

import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
	debug: true,
	connection: 'http://104.238.73.77:3000/', 
	//connection: 'http://localhost:3000/',
}));

Vue.use(VueRouter);
Vue.use(Vuetify);



import Headercomponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

import ChartsComponent from './pages/ChartsComponent.vue'

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
	mode: 'history',
	//routes: routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
});

// Step 1: Create a Vue instance
const app = new Vue({
	el: '#app',
	router: router,
	components: {
		'header-component': Headercomponent,
		'footer-component': FooterComponent,
		'charts-component': ChartsComponent
	}
});