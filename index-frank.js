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
      catImg.setAttribute("draggable", "false");

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
    // setTimeout(slides, 3000);

    this.rootDom.addEventListener("mousedown", (e) => {
      let startX = e.clientX;

      let prevPosition =
        (currentPosition + this.data.length - 1) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let prevImg = this.rootDom.childNodes[prevPosition];
      let currentImg = this.rootDom.childNodes[currentPosition];
      let nextImg = this.rootDom.childNodes[nextPosition];

      prevImg.style.transition = `ease 0s`;
      currentImg.style.transition = `ease 0s`;
      nextImg.style.transition = `ease 0s`;

      prevImg.style.transform = `translateX(${
        5 * (-100 * (prevPosition + 1))
      }px)`;
      currentImg.style.transform = `translateX(${
        5 * (-100 * currentPosition)
      }px)`;
      nextImg.style.transform = `translateX(${
        5 * (-100 * (nextPosition - 1))
      }px)`;

      const move = (e) => {
        prevImg.style.transform = `translateX(${
          5 * (-100 * (prevPosition + 1)) + e.clientX - startX
        }px)`;
        currentImg.style.transform = `translateX(${
          5 * (-100 * currentPosition) + e.clientX - startX
        }px)`;
        nextImg.style.transform = `translateX(${
          5 * (-100 * (nextPosition - 1)) + e.clientX - startX
        }px)`;
      };

      const up = (e) => {
        let offset = 0;
        if (e.clientX - startX > 250) {
          offset = 1; // 向左移
        } else if (e.clientX - startX < -250) {
          offset = -1; // 向右移
        }

        prevImg.style.transition = `transform ease 0.5s`;
        currentImg.style.transition = `transform ease 0.5s`;
        nextImg.style.transition = `transform ease 0.5s`;

        prevImg.style.transform = `translateX(${
          5 * (-100 * (prevPosition + 1)) + offset * 500
        }px)`;
        currentImg.style.transform = `translateX(${
          5 * (-100 * currentPosition) + offset * 500
        }px)`;
        nextImg.style.transform = `translateX(${
          5 * (-100 * (nextPosition - 1)) + offset * 500
        }px)`;

        currentPosition =
          (currentPosition - offset + this.data.length) % this.data.length;

        this.rootDom.removeEventListener("mousemove", move);
        this.rootDom.removeEventListener("mouseup", up);
      };

      this.rootDom.addEventListener("mousemove", move);
      this.rootDom.addEventListener("mouseup", up);
    });
  }
}
