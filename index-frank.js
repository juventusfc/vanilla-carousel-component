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

    // add slide
    let currentPosition = 0;
    const slides = () => {
      let nextPosition = (currentPosition + 1) % this.data.length;

      let currentImg = this.rootDom.childNodes[currentPosition];
      let nextImg = this.rootDom.childNodes[nextPosition];

      currentImg.style.transition = `ease 0s`;
      nextImg.style.transition = `ease 0s`;
      currentImg.style.transform = `translateX(${-100 * currentPosition}%)`;
      nextImg.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        currentImg.style.transition = `transform ease 0.5s`;
        nextImg.style.transition = `transform ease 0.5s`;
        currentImg.style.transform = `translateX(${
          -100 * (currentPosition + 1)
        }%)`;
        nextImg.style.transform = `translateX(${
          100 - 100 * (nextPosition + 1)
        }%)`;

        currentPosition = nextPosition;
      }, 16);

      setTimeout(slides, 3000);
    };
    setTimeout(slides, 3000);
  }
}
