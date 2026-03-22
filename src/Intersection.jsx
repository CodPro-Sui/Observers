import { useEffect, useRef } from "react";

const Intersection = () => {
  const bgRef = useRef(null);
  const opRef = useRef(null);

  
  const thres = Array.from({ length: 101 }, (_, i) => i / 100);

  useEffect(() => {
    
    if (!bgRef.current || !opRef.current) return;

    
    const observerBg = new IntersectionObserver(
      (entries) => {
        entries.forEach((ele) => {
          if (ele.isIntersecting) {
            ele.target.style.background = `rgba(62,200,98,${ele.intersectionRatio})`;
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: thres,
      },
    );

    const observerOp = new IntersectionObserver(
      (entries) => {
        entries.forEach((ele) => {
          if (ele.isIntersecting && ele.intersectionRatio > 0.4) {
            ele.target.style.transform = "translateY(0) scale(1)";
            ele.target.style.opacity = "1";
          } else {
            // optional reverse animation
            ele.target.style.transform = "translateY(30px) scale(0.8)";
            ele.target.style.opacity = "0";
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.4],
      },
    );

    
    observerBg.observe(bgRef.current);
    observerOp.observe(opRef.current);

    
    return () => {
      observerBg.disconnect();
      observerOp.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "100px" }}>
      {/* Background changing box */}
      <div
        ref={bgRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          height: "200px",
          borderRadius: "20px",
          transition: "background 0.2s linear",
        }}
      >
        background
      </div>

      {/* Animated box */}
      <div
        ref={opRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "300px",
          transform: "translateY(30px) scale(0.8)", 
          opacity: "0",
          transition: "all 0.4s ease",
          width: "150px",
          height: "150px",
          background: "#ccc",
        }}
      >
        opacity based
      </div>
    </div>
  );
};

export default Intersection;
