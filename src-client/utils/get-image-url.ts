import * as env from "../../env.json";

/**
 * get img src url for named image
 */
export function getImageUrl(imageFilename: string): string {
  return `${env.URL_ASSETS_IMAGES}/${imageFilename}`;
}
