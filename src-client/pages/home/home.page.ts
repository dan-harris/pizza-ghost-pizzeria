import { Injectable } from 'injection-js';
import 'reflect-metadata';
import { initPage } from "../../models/page.model";
import { StateChange } from '../../models/state-change.model';
import { StateContext } from '../../models/state-context.model';
import { Listen } from '../../utils/decorators/listen';
import { OnStateChange } from '../../utils/decorators/on-state-change.decorator';
import { Query } from '../../utils/decorators/query';
import { State } from '../../utils/decorators/state.decorator';

@Injectable()
class Http {
    print(): void {
        console.log('hello');
    }
}

@Injectable()
class HomePage {

    @Query('.pgp-logo')
    logoElement: HTMLElement;

    @State<{ count: number }>({ count: 1 })
    counter: StateContext<{ count: number }>;

    constructor(private http: Http) {
        this.http.print();
        console.log('😬', { this: this });
        console.log('🚧', { logoElement: this.logoElement });
        // console.log('🦄', { counter: this.counter.getState() });
        this.counter.setState({ count: 3 });
        // this.counter.onStateChange(async ({ state, oldState }) => { console.log('🐤', { oldState, newState: state }) })
    }

    @Listen('click', this.logoElement)
    onClickAnywhere(event: any) {
        console.log('😬', { this: this });
        console.log('🚧', { logoElement: this.logoElement });
        this.http.print();
        this.counter.setState({ count: this.counter.getState().count + 1 });
    }

    @OnStateChange<{ count: number }>('counter')
    logState({ state, oldState, patchState }: StateChange<{ count: number }> | any) {
        console.log('🐤', { oldState, newState: state });
        patchState({ count: 7 });
    }

    @OnStateChange<{ count: number }>('counter')
    logState2({ state, oldState, patchState }: StateChange<{ count: number }> | any) {
        console.log('🦄', { oldState, newState: state });
        patchState({ count: 4 });
    }
}


// init the page
initPage<HomePage>(HomePage, [Http]);