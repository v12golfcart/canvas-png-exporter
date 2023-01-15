import React, { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState();

  const handleCanvas = () => {
    console.log("handlecanvas", uploadedImgUrl);
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "48px serif";
    ctx.fillStyle = "blue";
    ctx.fillText("Hello World", 10, 50);
    ctx.fillStyle = "green";
    ctx.fillText("Goodbye World", 10, 100);

    if (uploadedImgUrl) {
      const img = new Image();
      img.src = uploadedImgUrl;
      img.onload = () => ctx.drawImage(img, 10, 150);
    }
  };

  const handleImageUpload = (e) => {
    if (e && e.target.files) {
      const file = e.target.files[0];
      setUploadedImgUrl(URL.createObjectURL(file));
    }
  };

  const handleExportClick = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "canvas.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // const handleExportClick = () => {
  //   const canvas = canvasRef.current;
  //   const dataUrl = canvas.toDataURL("image/png");
  //   fetch(dataUrl)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "canvas.png";
  //       a.click();
  //       URL.revokeObjectURL(url);
  //     });
  // };

  useEffect(() => {
    if (canvasRef.current) {
      handleCanvas();
    }
  }, [uploadedImgUrl]);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleExportClick}>Export as PNG</button>
      <canvas ref={canvasRef} width={window.innerWidth} height="500" />
    </div>
  );
}

export default App;
