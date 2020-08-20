export default class Carousel {
  constructor() {
    this.rootDom = null;
    this.data = [];
  }

  render() {
    this.rootDom = document.createElement("div");
    this.rootDom.classList.add("carousel");

    for (let d of this.data) {
      const catImg = document.createElement("img");
      catImg.src = d;

      this.rootDom.appendChild(catImg);
    }
  }
}
