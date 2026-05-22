export async function compressImage(file){

  return new Promise((resolve)=>{

    const reader =
      new FileReader();

    reader.onload = (event)=>{

      const img =
        new Image();

      img.onload = ()=>{

        const canvas =
          document.createElement(
            "canvas"
          );

        const MAX_SIZE = 600;

        let width =
          img.width;

        let height =
          img.height;

        if(width > height){

          if(width > MAX_SIZE){

            height *=
              MAX_SIZE / width;

            width =
              MAX_SIZE;
          }
        }
        else{

          if(height > MAX_SIZE){

            width *=
              MAX_SIZE / height;

            height =
              MAX_SIZE;
          }
        }

        canvas.width =
          width;

        canvas.height =
          height;

        const ctx =
          canvas.getContext("2d");

        ctx.imageSmoothingEnabled =
          true;

        ctx.imageSmoothingQuality =
          "high";

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const result =
          canvas.toDataURL(
            "image/webp",
            0.72
          );

        resolve(result);
      };

      img.src =
        event.target.result;
    };

    reader.readAsDataURL(file);
  });
}
