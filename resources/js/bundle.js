
import '@mdi/font/css/materialdesignicons.css' 

import vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

let css = require("./styles/importer.sass");


// Helpers
//import colors from 'vuetify/es5/util/colors'
window.Vue = vue;

Vue.use(VueRouter);
Vue.use(Vuetify);

/*{
	theme: {
		primary: colors.red.darken1, // #E53935
			secondary: colors.red.lighten4, // #FFCDD2
				accent: colors.indigo.base // #3F51B5
	},
	iconfont: 'mdi'
}
*/



import Headercomponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';


import HomeComponent from './pages/HomeComponent.vue';
import ChartsComponent from './pages/ChartsComponent.vue'
/*
const routes = [
	{ path: '/', name: 'home', component: HomeComponent },
];*/


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
		'home-component': HomeComponent,
		'charts-component': ChartsComponent
	}
});