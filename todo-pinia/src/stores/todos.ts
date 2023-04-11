import { defineStore }              from 'pinia';
import debug                        from 'debug';

const log                           = debug( 'app:stores:todos' );

interface iTask {
    title:  string;
    done:   boolean;
}

export const useTodosStore       = defineStore( 'todos', {
    state:          () => ({
        _todos:         [] as iTask[],
    }),

    getters:        {
        todos:          ( state ) => state._todos,
        todoLength:     ( state ) => state._todos.length,
    },

    actions:        {
        async getData() {
            //
            try {
                const rows      = localStorage.getItem( 'todos' );
                this._todos     = JSON.parse( rows ) || [];
            }
            catch ( error ) {
                log( 'getData() error:', error );
                throw error;
            }
        },

        addTask( task: string ) {
            log( 'addTask()', task );
            if ( !task ) {
                return;
            }

            this._todos.push( {
                title:  task,
                done:   false,
            } );
            localStorage.setItem( 'todos', JSON.stringify( this._todos ) );
        },

        deleteTask( index: number ) {
            log( 'deleteTask()', index );
            this._todos.splice( index, 1 );
            localStorage.setItem( 'todos', JSON.stringify( this._todos ) );
        },
    },
});
