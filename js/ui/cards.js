import {
  loadImage
} from "../../db/database.js";

export async function renderCards(
  list,
  container
){

  container.innerHTML = "";

  for(const item of list){

    const card =
      document.createElement("div");

    card.className = "card";

    let imageHTML = "";

    if(item.imageId){

      const image =
        await loadImage(
          item.imageId
        );

      if(image){

        imageHTML = `
          <img
            src="${image}"
            class="thumb"
          />
        `;
      }
    }

    card.innerHTML = `
      ${imageHTML}
      <div class="name">
        ${item.text}
      </div>
    `;

    container.appendChild(card);
  }
}
