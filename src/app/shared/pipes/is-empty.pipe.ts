import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEmpty'
})
export class IsEmptyPipe implements PipeTransform {

  transform(input, prop) {
    if (!Array.isArray(input)) {
      return input;
    }

    return input.filter((obj) => {
      const value = this.extractDeepPropertyByMapKey(obj, prop);
      return !value;
    });
  }

  extractDeepPropertyByMapKey(obj, map) {
    const /** @type {?} */ keys = map.split('.');
    const /** @type {?} */ head = keys.shift();
    return keys.reduce((prop, key) => {
      return !this.isUndefined(prop) && !this.isUndefined(prop[key])
        ? prop[key]
        : undefined;
    }, obj[head || '']);
  }

  isUndefined(value) {
    return typeof value === 'undefined';
  }

}
