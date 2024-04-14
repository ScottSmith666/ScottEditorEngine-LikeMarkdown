import Vue from 'vue';
import VueRouter from 'vue-router';
import Workspace from "../views/Workspace";
import Credits from "../views/Credits";
import Help from "../views/Help";

Vue.use(VueRouter);

const originaPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originaPush.call(this, location).catch(err => err)
}

// DIRECTORY!!!
const routes = [
    {
        path: '/',
        redirect: '/workspace',
    },
    {
        path: '/workspace',
        component: Workspace,
    },
    {
        path: '/credits',
        component: Credits,
    },
    {
        path: '/help',
        component: Help,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
