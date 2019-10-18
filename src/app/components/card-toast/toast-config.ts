import { InjectionToken } from '@angular/core';

export class ToastData {
    icon: string;
    time: string;
    event: string;
    teamKit: string;
  }

  export interface ToastConfig {
    position?: {
        top: number;
        right: number;
    };
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
}

export const defaultToastConfig: ToastConfig = {
    position: {
        top: 55,
        right: 15,
    },
    animation: {
        fadeOut: 300,
        fadeIn: 300,
    },
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');