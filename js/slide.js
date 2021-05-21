export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 }
  }

  updatePosition(clientX) {
    this.dist.movement = -(this.dist.startX - clientX) * 1.6;
    return this.dist.movement + this.dist.finalPosition;
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;// -400
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onStart(event) {
    let moveType;
    if (event.type === 'mousedown') {
      event.preventDefault();
      // Coloca no startX a posição no momento do click
      this.dist.startX = event.clientX;
      // Ativa o onMove
      moveType = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = 'touchmove';
    }
    // Passei o {passive: true}, parou o erro ao mover.
    this.wrapper.addEventListener(moveType, this.onMove, {passive: true});
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  // Adiciona os eventos no wrapper
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart, );
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  // Faz o bind dos eventos
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Inicia o bind e adiciona os eventos
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}