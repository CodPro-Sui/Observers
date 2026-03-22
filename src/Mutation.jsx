import { useEffect, useRef, useState } from "react";

const Mutation = () => {
  const targetRef = useRef(null);
  const inputRef = useRef(null);
  const [val, setVal] = useState("");

  useEffect(() => {
    const observer = new MutationObserver((entries) => {
      entries.forEach((ele) => {
        switch (ele.type) {
          case "childList":
            alert("element performed!");
            navigator.vibrate(200);
            break;
          case "attributes":
            alert("attribute change");
            navigator.vibrate(200);
            break;
          case "characterData":
            alert("text changed!");
            navigator.vibrate(300);
            break;
          default:
            alert("something performed");
        }
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
      });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        ref={inputRef}
        placeholder="add tasks"
      />

      <ul ref={targetRef}></ul>

      <div className="btns">
        <button
          onClick={() => {
            if (!val.trim()) return;
            let li = document.createElement("li");
            li.innerText = val;
            setVal("");
            targetRef.current.appendChild(li);
          }}
        >
          Add task
        </button>

        <button
          onClick={() => {
            if (targetRef.current.children.length > 0) {
              targetRef.current.removeChild(
                targetRef.current.children[
                  targetRef.current.children.length - 1
                ],
              );
            }
          }}
        >
          remove
        </button>

        <button
          onClick={() => {
            let li = document.querySelectorAll("li");
            if (li.length > 0) {
              li.forEach((ele) => {
                ele.classList.toggle("red");
              });
            }
          }}
        >
          change class
        </button>
      </div>
    </>
  );
};

export default Mutation;
