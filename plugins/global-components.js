import Vue from "vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import PrettyCheck from "pretty-checkbox-vue/check";

Vue.component("navbar", Navbar);
Vue.component("app-footer", Footer);
Vue.component("p-check", PrettyCheck);
