const pages = Array.from(document.querySelectorAll(".page"));
let index = 0; // how many pages have been flipped
const count = document.getElementById("count");

function updateCount(){
  // friendly display: "Page X" where X is 1-based for content viewing
  const shown = Math.min(index + 1, pages.length);
  count.textContent = `Page ${shown}`;
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

document.getElementById("nextBtn").addEventListener("click", flipNext);
document.getElementById("prevBtn").addEventListener("click", flipPrev);

const startBtn = document.getElementById("startBtn");
startBtn?.addEventListener("click", flipNext);

// Optional: click right side to next, left side to prev
document.getElementById("book").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  if(x > rect.width * 0.6) flipNext();
  else if(x < rect.width * 0.4) flipPrev();
});

updateCount();