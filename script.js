document.addEventListener("DOMContentLoaded", () => {
  const pages = Array.from(document.querySelectorAll(".page"));
  let index = 0; // how many pages have been flipped
  const count = document.getElementById("count");

  // Auto z-index stacking (so you can add unlimited pages)
  pages.forEach((p, i) => {
    p.style.zIndex = String((pages.length - i) * 10);
  });

  function updateCount(){
    const shown = Math.min(index + 1, pages.length);
    if (count) count.textContent = `Page ${shown}`;
  }

  function flipNext(){
    if(index >= pages.length) return;
    pages[index].classList.add("flipped");
    index += 1;
    updateCount();
  }

  function flipPrev(){
    if(index <= 0) return;
    index -= 1;
    pages[index].classList.remove("flipped");
    updateCount();
  }

  document.getElementById("nextBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    flipNext();
  });

  document.getElementById("prevBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    flipPrev();
  });

  document.getElementById("startBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // IMPORTANT so book click doesn't mess with it
    flipNext();
  });

  // Click zones: right = next, left = prev (ignore clicks on buttons/links/media)
  document.getElementById("book")?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest("button, a, video, audio, input, textarea, select")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x > rect.width * 0.6) flipNext();
    else if (x < rect.width * 0.4) flipPrev();
  });

  updateCount();
});