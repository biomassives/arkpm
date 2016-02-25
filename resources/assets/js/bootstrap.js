// Import requirements using browserify
window.Vue = require('vue')
window.VueRouter = require('vue-router')

// Insert vue-router and vue-resource into Vue

// Import the actual routes, aliases, ...
import { configRouter } from './routes'

// Create our router object and set options on it
const router = new VueRouter()

// Inject the routes into the VueRouter object
configRouter(router)

// Configure the application
window.config = require('./config')
Vue.config.debug = true

// Configure our HTTP client
var rest = require('rest')
var pathPrefix = require('rest/interceptor/pathPrefix')
var mime = require('rest/interceptor/mime')
var defaultRequest = require('rest/interceptor/defaultRequest')
var errorCode = require('rest/interceptor/errorCode')
var interceptor = require('rest/interceptor')
var jwtAuth = require('./interceptors/jwtAuth')

window.client = rest.wrap(pathPrefix, { prefix: config.api.base_url })
                    .wrap(mime)
                    .wrap(defaultRequest, config.api.defaultRequest)
                    .wrap(errorCode, { code: 400 })
                    .wrap(jwtAuth);

// Bootstrap the app
Vue.component('header-component', require('./compiled/header.vue'))
Vue.component('sidebar-component', require('./compiled/sidebar.vue'))
Vue.component('nav-component', require('./compiled/nav.vue'))
Vue.component('footer-component', require('./compiled/footer.vue'))
Vue.component('login-component', require('./compiled/login.vue'))
Vue.component('maintemplate-component', require('./compiled/maintemplate.vue'))

const App = Vue.extend(require('./compiled/app.vue'))
router.start(App, '#app')
window.router = router
