import { Injectable } from '@angular/core';

import * as exif from 'exif-js/lib/esm/main';

export class ExifObject {
  private _img: HTMLImageElement;

  /**
   * Gathers Exif data from an image
   *
   * @param  img {HTMLImageElement}     The image to load from.
   * @param  enableXmp {boolean}        Should Xml support be turned on.
   */
  constructor(img: HTMLImageElement, enableXmp: boolean) {
    if (enableXmp) {
      exif.enableXmp();
    } else {
      exif.disableXmp();
    }
 
    if (exif.getData(img, null)) {
      this._img = img;
    } else {
      console.warn('Unable to load image data');
    }
  }

  /**
   * Returns the tag value
   * 
   * @param  tag {string} The Exif tag name
   * @returns {string}
   */
  getTag(tag: string): string {
    return exif.getTag(this._img, tag);
  }

  /**
   * Returns the tag value
   * 
   * @param  tag {string} The Iptc tag name
   * @returns {string}
   */
  getIptcTag(tag: string): string {
    return exif.getIptcTag(this._img, tag);
  }

  /**
   * Returns all Exif tags
   * 
   * @returns {object}
   */
  getAllTags(): object {
    return exif.getAllTags(this._img);
  }

  /**
   * Returns all Iptc tags
   * 
   * @returns {object}
   */
  getAllIptcTags(): object {
    return exif.getAllIptcTags(this._img);
  }

  /**
   * Returns all tags pretty prented
   *
   * @returns {string}
   */
  pretty(): string {
    return exif.pretty(this._img);
  }
}

@Injectable()
export class Exif {
  /**
   * Gathers Exif data from an image
   *
   * @param  img {HTMLImageElement}     The image to load from.
   * @param  enableXmp {boolean}        Should Xml support be turned on.
   * @returns {ExifObject}
   */
  create(img: HTMLImageElement, enableXmp = false): ExifObject {
    return new ExifObject(img, enableXmp);
  }
}
