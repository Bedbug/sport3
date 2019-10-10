import { Injectable, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { FilePreviewOverlayRef } from './prize-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './prize-preview-overlay.tokens';

// Each property can be overridden by the consumer
interface PrizeViewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?:any;
}

const DEFAULT_CONFIG: PrizeViewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}


@Injectable({
  providedIn: 'root'
})
export class PrizeViewOverlayService {

  constructor(private injector: Injector, private overlay: Overlay) { }

  open<T>(component: ComponentType<T>, config: PrizeViewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new FilePreviewOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer<T>(overlayRef, dialogConfig, dialogRef, component);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private attachDialogContainer<T>(
    overlayRef: OverlayRef, 
    config: PrizeViewDialogConfig, 
    dialogRef: FilePreviewOverlayRef,
    component: ComponentType<T>) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private getOverlayConfig(config: PrizeViewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: PrizeViewDialogConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private createInjector(config: PrizeViewDialogConfig, dialogRef: FilePreviewOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(FilePreviewOverlayRef, dialogRef);
    injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

}
