const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

script.onload = () => {
  marked.parse("#some markdown content");

  performance.mark("javascript-start");
  const start = performance.now();

  marked.parse("#some markdown content");

  const end = performance.now();
  performance.mark("javascript-end");
  performance.measure("javascript", "javascript-start", "javascript-end");

  console.log(`It took ${end - start} to do this in JavaScript`);
};
document.body.appendChild(script);
