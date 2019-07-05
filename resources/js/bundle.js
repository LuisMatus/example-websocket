
import '@mdi/font/css/materialdesignicons.css' 

import vue from 'vue';
import Vuetify from 'vuetify';

// Helpers
//import colors from 'vuetify/es5/util/colors'
window.Vue = vue;

Vue.use(Vuetify, );
/*{
	theme: {
		primary: colors.red.darken1, // #E53935
			secondary: colors.red.lighten4, // #FFCDD2
				accent: colors.indigo.base // #3F51B5
	},
	iconfont: 'mdi'
}
*/

let css = require("./styles/importer.sass");

Vue.component('header-component', require('./components/HeaderComponent.vue').default);
Vue.component('footer-component', require('./components/FooterComponent.vue').default);
Vue.component('card-component', require('./components/CardComponent.vue').default);

Vue.component('home-component', require('./pages/HomeComponent.vue').default);




const app = new Vue({
	el: '#app',
});
