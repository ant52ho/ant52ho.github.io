import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaRegHeart } from "react-icons/fa";

export default function ClareValentines2025() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const heartRef = useRef(null);
  const messageRef = useRef(null);

  const startAnimation = () => {
    // const tl = gsap.timeline({ repeat: 0 });
    // tl.set(
    //   [leftRef.current, rightRef.current, heartRef.current, messageRef.current],
    //   { clearProps: "all" }
    // )
    //   .to(leftRef.current, { x: 150, duration: 2, ease: "power2.inOut" }, 0)
    //   .to(rightRef.current, { x: -150, duration: 2, ease: "power2.inOut" }, 0)
    //   .to(leftRef.current, { x: 130, duration: 0.5, ease: "bounce.out" })
    //   .to(rightRef.current, { x: -130, duration: 0.5, ease: "bounce.out" }, "<")
    //   .fromTo(
    //     heartRef.current,
    //     { scale: 0, opacity: 0 },
    //     { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    //   )
    //   .fromTo(
    //     messageRef.current,
    //     { opacity: 0, y: 20 },
    //     { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    //   );
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column`}
      style={{
        minHeight: "100vh",
        minWidth: "100%",
      }}
    >
      <div
        className="bg-primary"
        style={{
          minHeight: "20px",
          minWidth: "20px",
        }}
      />
      <div
        className="flex items-center justify-center h-screen bg-gray-100 relative border"
        onClick={startAnimation}
      >
        <div
          ref={leftRef}
          className="bg-primary"
          style={{ left: "25%", minHeight: "20px", minWidth: "20px" }}
        />
        <div
          ref={rightRef}
          className="w-16 h-16 bg-red-500 rounded-full absolute"
          style={{ right: "25%" }}
        />

        <div
          ref={heartRef}
          className="absolute text-red-500"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <FaRegHeart color="red" />
        </div>

        <div
          ref={messageRef}
          className="absolute text-xl font-bold text-gray-800"
          style={{ top: "60%" }}
        >
          "Text"
        </div>
      </div>
    </div>
  );
}
