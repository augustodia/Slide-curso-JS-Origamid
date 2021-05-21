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
    event.preventDefault();
    // Coloca no startX a posição no momento do click
    this.dist.startX = event.clientX;
    // Ativa o onMove
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  // Adiciona os eventos no wrapper
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
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