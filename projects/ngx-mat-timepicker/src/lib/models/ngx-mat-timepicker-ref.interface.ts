import { EventEmitter, OutputEmitterRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface NgxMatTimepickerRef {
  close?: () => void;
  hourSelected: EventEmitter<number> | OutputEmitterRef<number>;
  timeChanged: EventEmitter<string> | OutputEmitterRef<string>;
  timeSet: EventEmitter<string> | OutputEmitterRef<string>;
  timeUpdated: Observable<string>;
}
