<template>
    <q-page class="bg-grey-3 column">
        <div class="row q-pa-sm bg-primary">
            <q-input @keyup.enter="addTask" filled v-model="newTask" placeholder="Add Task" dense bg-color="white" class="col" square>
                <template v-slot:append>
                    <q-btn round dense flat icon="add" @click="addTask" />
                </template>
            </q-input>
        </div>
        <q-list
            separator
            bordered
            class="bg-white"
        >
            <q-item v-for=" (task, index) in tasks" :key="task.title"
                @click="task.done = !task.done"
                :class="{ 'done bg-blue-1' : task.done }"
                clickable
                v-ripple
            >
                <q-item-section avatar>
                    <q-checkbox v-model="task.done" class="no-pointer-events" color="primary" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{task.title}}</q-item-label>
                </q-item-section>

                <q-item-section
                    v-if="task.done"
                    side
                >
                    <q-btn
                        @click.stop = "deleteTask(index)"
                        flat round color="primary" icon="delete"
                    />
                </q-item-section>
            </q-item>
        </q-list>
        <div v-if="!tasks.length" class="no-tasks absolute-center">
            <q-icon name="check" size="100px" color="primary" />
            <div class="text-h5 text-primary text-center">
                No Tasks
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { Dialog, Notify }           from 'quasar';

interface iTask {
    title:  string;
    done:   boolean;
}

const newTask                   = ref( '' );
const tasks:        iTask[]     = ref( [] );

function deleteTask( index: number ) {
    Dialog.create({
        title:      'Confirm',
        message:    'Are you sure you want to DELETE?',
        cancel:     true,
        persistent: true,
    }).onOk(() => {
        tasks.value.splice( index, 1 );
        Notify.create( 'Task deleted' );
    });
}

function addTask() {
    if ( !newTask.value ) {
        return;
    }

    tasks.value.push( {
        title:  newTask.value,
        done:   false,
    } );
    newTask.value   = '';
}
</script>

<style lang="scss">
.done{
    .q-item__label {
      text-decoration:line-through;
      color: #bbb;
    }
}

.no-tasks{
    opacity: 0.5;
}
</style>
