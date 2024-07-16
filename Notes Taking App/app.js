btn = document.querySelector(".btn");
main = document.querySelector(".main");

const saveNotes = () => {
  textarea = document.querySelectorAll("textarea");
  const data = [];
  textarea.forEach((text) => {
    data.push(text.value);
  });
  if (data.length === 0) {
    localStorage.removeItem(textarea);
  } else localStorage.setItem("textarea", JSON.stringify(data));
};

const addnote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<div class="toolbar">
        <i class="save fa-regular fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash-can"></i>
    </div>
    <textarea>${text}</textarea>`;
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });
  main.append(note);
  saveNotes();
};

(function () {
  const lsNotes = JSON.parse(localStorage.getItem("textarea"));
  if (lsNotes === null) {
    addnote();
  } else {
    lsNotes.forEach((lsNote) => {
      addnote(lsNote);
    });
  }
})();

btn.addEventListener("click", addnote);
