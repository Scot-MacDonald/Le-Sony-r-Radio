import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic"; // Use dynamic import for SineWaves

const Waves = () => {
  const wavesRef = useRef(null);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      import("sine-waves").then(({ default: SineWaves }) => {
        const waves = new SineWaves({
          el: wavesRef.current,
          speed: 6,
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          ease: "SineInOut",
          wavesWidth: "80%",
          waves: [
            {
              timeModifier: 9,
              lineWidth: 1,
              amplitude: -100,
              wavelength: 25,
            },
            {
              timeModifier: 4,
              lineWidth: 1,
              amplitude: 100,
              wavelength: 20,
            },
          ],
          resizeEvent: function () {
            var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
            gradient.addColorStop(0, "#4c4c4c");

            var index = -1;
            var length = this.waves.length;
            while (++index < length) {
              this.waves[index].strokeStyle = gradient;
            }

            // Clean Up
            index = void 0;
            length = void 0;
            gradient = void 0;
          },
        });

        // Clean up SineWaves on component unmount
        return () => {
          waves.destroy();
        };
      });
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return <canvas ref={wavesRef} />;
};

export default Waves;
