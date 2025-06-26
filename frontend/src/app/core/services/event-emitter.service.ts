// event-emitter.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it available application-wide
})
export class EventEmitterService {
  private events = new Map<string, Subject<any>>();

  /**
   * Emit an event with optional data
   * @param eventName Name of the event to emit
   * @param data Optional data to pass with the event
   */
  emit(eventName: string, data?: any): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Subject<any>());
    }
    this.events.get(eventName)!.next(data);
  }

  /**
   * Subscribe to an event
   * @param eventName Name of the event to subscribe to
   * @param callback Function to execute when event is emitted
   * @returns Subscription that can be unsubscribed
   */
  on(eventName: string, callback: (data?: any) => void) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Subject<any>());
    }
    return this.events.get(eventName)!.subscribe(callback);
  }

  /**
   * Unsubscribe from an event
   * @param eventName Name of the event to unsubscribe from
   */
  off(eventName: string): void {
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.complete();
      this.events.delete(eventName);
    }
  }
}