export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
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