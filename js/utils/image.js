// =========================
// COMPRESS IMAGE
// =========================
export async function compressImage(file){

  return new Promise((resolve)=>{

    const reader = new FileReader();

    reader.onload = (event)=>{

      const img = new Image();

      img.onload = ()=>{

        const canvas =
          document.createElement("canvas");

        const MAX_WIDTH = 320;

        let width = img.width;
        let height = img.height;

        if(width > MAX_WIDTH){

          height =
            height * (MAX_WIDTH / width);

          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const compressed =
          canvas.toDataURL(
            "image/jpeg",
            0.72
          );

        resolve(compressed);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}
