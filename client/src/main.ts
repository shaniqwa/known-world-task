import Vue from 'vue'
import App from './App.vue'
import store from './store'
import moment from 'moment'

Vue.config.productionTip = false;

Vue.filter('formatDate',  (value: number) => {
	if (value) {
		return moment(value).format('MM/DD/YYYY hh:mm:ss')
	}
});

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
