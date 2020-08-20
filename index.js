export default class Carousel {
  constructor() {
    this.root = null;
    this.data = [];
  }

  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");

    for (let d of this.data) {
      let element = document.createElement("img");
      element.src = d;
      element.addEventListener("dragstart", (event) => event.preventDefault());

      this.root.appendChild(element);
    }

    let position = 0;
    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;

      let current = this.root.childNodes[position];
      let next = this.root.childNodes[nextPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";
      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        current.style.transition = ""; // use css rule
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;
        position = nextPosition;
      }, 16);

      setTimeout(nextPic, 3000);
    };
    setTimeout(nextPic, 3000);

    this.root.addEventListener("mousedown", (event) => {
      let startX = event.clientX,
        startY = event.clientY;

      let prevPosition = (position - 1 + this.data.length) % this.data.length;
      let nextPosition = (position + 1) % this.data.length;

      let current = this.root.childNodes[position];
      let prev = this.root.childNodes[prevPosition];
      let next = this.root.childNodes[nextPosition];

      prev.style.transition = "ease 0s";
      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      prev.style.transform = `translateX(${-500 - 500 * prevPosition}px)`;
      current.style.transform = `translateX(${-500 * position}px)`;
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      let move = (event) => {
        prev.style.transform = `translateX(${
          event.clientX - startX - 500 - 500 * prevPosition
        }px)`;
        current.style.transform = `translateX(${
          event.clientX - startX - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          event.clientX - startX + 500 - 500 * nextPosition
        }px)`;
      };

      let up = (event) => {
        let offset = 0;
        if (event.clientX - startX > 250) {
          offset = 1;
        } else if (event.clientX - startX < -250) {
          offset = -1;
        }

        prev.style.transition = "";
        current.style.transition = "";
        next.style.transition = "";
        prev.style.transform = `translateX(${
          offset * 500 - 500 - 500 * prevPosition
        }px)`;
        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;

        position = (position - offset + this.data.length) % this.data.length;

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  }
}
