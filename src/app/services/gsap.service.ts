import { Injectable } from "@angular/core";
import { gsap, Power2, Elastic, Back, Linear } from "gsap/all";

@Injectable({
  providedIn: "root",
})
export class GsapService {
  // public fFadeFrom(element, tym, alfa, posY, dlay){
  //   console.log("Running Gsap Tween!");
  //   gsap.from(element, {duration:tym, opacity: alfa, ease:Power2, delay:dlay});
  // }
  public rotateTo(element, tym, rot, dlay) {
    // console.log("Running Gsap Tween!");
    gsap.from(element, {
      duration: tym,
      rotation: rot,
      ease: Back.easeInOut,
      delay: dlay,
    });
  }
  // TweenLite.to(element, 2, {rotation:90, transformOrigin:"left 50%"});

  public fFrom(element, tym, posX, posY, dlay) {
    // console.log("Running Gsap Tween!");
    gsap.from(element, {
      duration: tym,
      x: posX,
      y: posY,
      ease: Back.easeOut,
      delay: dlay,
    });
  }

  public RotateInf(element) {
    // console.log("Running Gsap Tween!");
    gsap.to(element, {
      duration: 60,
      rotation: "360",
      ease: Linear.easeNone,
      repeat: -1
    });
  }
  

  public moveTo(element, tym, posY, posX, dlay) {
    // console.log("Running Gsap Tween!");
    gsap.to(element, {
      duration: tym,
      y: posY,
      x: posX,
      ease: Back.easeOut.config(1),
      delay: dlay,
    });
  }
  public fTo(element, tym, posY, posX, dlay) {
    // console.log("Running Gsap Tween!");
    gsap.to(element, {
      duration: tym,
      y: posY,
      x: posX,
      ease: Back.easeOut.config(1),
      delay: dlay,
    });
  }
  public backInTo(element, tym, posY, posX, dlay) {
    // console.log("Running Gsap Tween!");
    gsap.to(element, {
      duration: tym,
      y: posY,
      x: posX,
      ease: Back.easeIn.config(3),
      delay: dlay,
    });
  }

  public aTo(element, tym, op, dlay) {
    // console.log("Running Alpha Tween!");
    gsap.to(element, { duration: tym, alpha: op, ease: Power2, delay: dlay });
  }
  public alphaYoyo(element, tym, op, dlay) {
    // console.log("Running Alpha Tween!");
    gsap.to(element, { duration: tym, alpha: op, ease: Power2, delay: dlay,repeat: -1,
      yoyo: true, });
  }

  public Click(element, tym, sclX, sclY, dlay) {
    // console.log("Running Click Tween!");
    gsap.to(element, {
      duration: tym,
      scaleX: sclX,
      scaleY: sclY,
      ease: Power2,
      delay: dlay,
      repeat: 1,
      yoyo: true,
    });
  }

  public YoyoScale(element, tym, sclX, sclY, dlay) {
    console.log("Running Yoyo Scale!");
    gsap.to(element, {
      duration: tym,
      scaleX: sclX,
      scaleY: sclY,
      ease: Linear.easeNone,
      delay: dlay,
      repeat: 100,
      yoyo: true,
    });
  }
}
