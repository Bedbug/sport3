import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { PrizeViewOverlayComponent } from './prize-view-overlay.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

// Each property can be overridden by the consumer
interface PrizeViewDialogConfig {
  prizeID: string;
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: PrizeViewDialogConfig = {
  prizeID: "",
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

export class FilePreviewOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PrizeViewOverlayService {

  constructor(private overlay: Overlay) { }

  open(config: PrizeViewDialogConfig) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(PrizeViewOverlayComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    const dialogRef = new FilePreviewOverlayRef(overlayRef);

    return dialogRef;
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
    injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.prizeID);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

}
