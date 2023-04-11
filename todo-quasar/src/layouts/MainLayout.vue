<template>
    <q-layout view="lHr LpR lff">
        <q-header>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />

                <q-toolbar-title>Todo</q-toolbar-title>
                <q-space />
                <q-toolbar-title shrink class="text-subtitle1">{{todaysDate}}</q-toolbar-title>
            </q-toolbar>
            <q-img
                src="../statics/mountains.jpg"
                class="header-image absolute-top"
            />
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            :width="250"
            :breakpoint="600"
        >
            <q-scroll-area style="height: calc(100% - 20px); border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple to="/" exact>
                        <q-item-section avatar>
                            <q-icon name="list" />
                        </q-item-section>

                        <q-item-section>
                            Todo
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <keep-alive>
                <router-view />
            </keep-alive>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { date }         from 'quasar';

const leftDrawerOpen    = ref(false);

const todaysDate        = computed( () => {
        const timeStamp = Date.now();
        return  date.formatDate(timeStamp, 'dddd D MMMM');
    });

</script>

<style lang="scss">
  .header-image{
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
</style>
