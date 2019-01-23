import { Injectable } from "injection-js";
import "reflect-metadata";
import { initPage } from "../../models/page.model";
import { Bind } from "../../utils/decorators/bind.decorator";
import { Listen } from "../../utils/decorators/listen.decorator";
import { Query } from "../../utils/decorators/query.decorator";
import { Watch } from "../../utils/decorators/watch.decorator";
import { CustomElement } from "../../utils/types/custom-element.type";

@Injectable()
class Http {
  print(): void {
    console.log("👏", "http");
  }
}

@Injectable()
class HomePage {
  @Query(".pgp-logo")
  logoElement: HTMLElement;

  @Query("my-element")
  countElement: CustomElement;

  @Bind<{ count: number }>({ count: 1 })
  counter: { count: number };

  constructor(private http: Http) {
    this.http.print();
    console.log("😬", { this: this });
    console.log("🚧", { logoElement: this.logoElement });
    this.countElement.setAttribute("count", this.counter.count.toString());
  }

  @Listen("click", ".pgp-logo")
  onClickAnywhere(event: any) {
    console.log("😬", { this: this });
    console.log("🚧", { logoElement: this.logoElement });
    this.http.print();
    this.counter.count = this.counter.count + 1;
  }

  @Watch<{ count: number }>("counter")
  logState({ count }: { count: number }) {
    console.log("🐤", { count });
    this.http.print();
    if (count % 2 === 0) this.logoElement.style.opacity = "0";
    else this.logoElement.style.opacity = "1";
  }

  @Watch<{ count: number }>("counter")
  logState2({ count }: { count: number }) {
    // console.log('🦄', { count });
    this.http.print();
    this.countElement.count = count.toString();
  }
}

// init the page
initPage<HomePage>(HomePage, [Http]);
