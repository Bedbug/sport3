import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';
import { toastAnimations, ToastAnimationState } from './toast-animation';


@Component({
  selector: 'app-card-toast',
  templateUrl: './card-toast.component.html',
  styleUrls: ['./card-toast.component.scss'],
  animations: [toastAnimations.fadeToast],
})
export class CardToastComponent implements OnInit {

  animationState: ToastAnimationState = 'default';
  iconType: string;

  private intervalId: any;

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) { }

  ngOnInit() {
    this.intervalId = setTimeout(() => this.animationState = 'closing', 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
