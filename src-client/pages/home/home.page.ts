import { Injectable } from 'injection-js';
import 'reflect-metadata';
import { initPage } from "../../models/page.model";
import { Listen } from '../../utils/decorators/listen';
import { Query } from '../../utils/decorators/query';

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

    counter: number = 0;

    constructor(private http: Http) {
        this.http.print();
        console.log('😬', { this: this });
        console.log('🚧', { logoElement: this.logoElement });
        this.counter = 3;
        this.onClickAnywhere.bind(this);
    }

    @Listen('click', this.logoElement)
    onClickAnywhere(event: any) {
        console.log('😬', { this: this });
        console.log('🚧', { logoElement: this.logoElement });
        console.log('➕', { count: this.counter })
        this.http.print();
        this.counter = this.counter + 1;
    }

}


// init the page
initPage<HomePage>(HomePage, [Http]);