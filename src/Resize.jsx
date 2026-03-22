import { useState, useEffect, useRef } from "react";

const Resize = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  let resizeRef = useRef(null);
  const [size, setSize] = useState({ w: 100, h: 100 });
  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      entries.forEach((ele) => {
        setWidth(ele.contentRect.width);
        setHeight(ele.contentRect.height);
      });
    });
    observer.observe(resizeRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  /*
  function manage(e) {
    if (e === "+") {
      setSize({ w: size.w + 1, h: size.h + 1 });
    } else {
      setSize({ w: size.w - 1, h: size.h - 1 });
    }
  }*/


  function manage(type) {
    setSize((prev) => ({
      w: type === "+" ? prev.w + 1 : prev.w - 1,
      h: type === "+" ? prev.h + 1 : prev.h - 1
    }));
  }



  return (
    <div
      ref={resizeRef}
      style={{
        width: `${size.w}px`,
        height: `${size.h}px`,
        resize: "both",
        background: "blue",
      }}
    >
      <h3>Resize</h3>
      <p>
        H: {height} - W: {width}
      </p>
      <button onClick={() => manage("+")}>+</button>{" "}
      <button onClick={() => manage("-")}>-</button>
    </div>
  );
};

export default Resize;
