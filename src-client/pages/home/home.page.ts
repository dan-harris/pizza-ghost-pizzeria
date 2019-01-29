import { Injectable } from "injection-js";
import "reflect-metadata";
import { initPage } from "../../models/page.model";
import { Listen } from "../../utils/decorators/listen.decorator";
import { Query } from "../../utils/decorators/query.decorator";
import "./home.page.css";

@Injectable()
class HomePage {
  @Query(".pgp-logo")
  logoElement: HTMLElement;

  constructor() {}

  @Listen("click", ".pgp-logo")
  onClickLogo(event: any) {
    this.logoElement.classList.add("rumble");
    setTimeout(
      () =>
        requestAnimationFrame(() =>
          this.logoElement.classList.remove("rumble")
        ),
      800
    );
  }
}

/**
 *  init the page
 */
initPage<HomePage>(HomePage, []);
