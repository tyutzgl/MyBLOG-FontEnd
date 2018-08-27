// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import VueResource from 'vue-resource'
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs';


Vue.config.debug = true;
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(VueResource);
Vue.use(VueQuillEditor);

Vue.prototype.$http = axios;

axios.defaults.withCredentials = true;

// 配置axios拦截器
axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config;
}, function (error) {
  loadinginstace.close();
  return Promise.reject(error);
});

// Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  components: {App},
  template: '<App/>'
});
