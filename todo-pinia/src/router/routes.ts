import { RouteRecordRaw }   from 'vue-router';

// import debug                from 'debug';

// const log                   = debug('app:routes');

const routes: RouteRecordRaw[] = [
    {
        path:       '/',
        component:  () => import('layouts/MainLayout.vue'),
        children: [
            { path: 'todo',             component: () => import('pages/Todo.vue') },
            { path: 'todo-solution',    component: () => import('pages/Todo-solution.vue') },
        ],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path:       '/:catchAll(.*)*',
        component:  () => import('pages/Error404.vue'),
    },
];

export default routes;
