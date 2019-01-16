import '../components/counter.element';
import "./core.css";
import './_polyfills';

// @Injectable()
// class Http {
//     print(): void {
//         console.log('hello');
//     }
// }

// @Injectable()
// class Service {

//     constructor(private http: Http) {
//         this.http.print();
//     }

//     log(text: string): void {
//         console.log('[LOG]', text);
//     }
// }

// const injector = ReflectiveInjector.resolveAndCreate([Http, Service]);

// console.log(injector.get(Service) instanceof Service);

// const service: Service = injector.get(Service);
// service.log('testing service')