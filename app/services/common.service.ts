import { Injectable } from '@angular/core';

function _window(): any {

  return window;
}

@Injectable()
export class CommonService {

  get window(): any {

    return _window();
  }
}