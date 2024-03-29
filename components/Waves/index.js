import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Waves = () => {
  const wavesRef = useRef(null);

  useEffect(() => {
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
              timeModifier: 4,
              lineWidth: 2,
              amplitude: -100,
              wavelength: 1,
            },
            {
              timeModifier: 4,
              lineWidth: 1,
              amplitude: 250,
              wavelength: 3,
            },
            {
              timeModifier: 16,
              lineWidth: 1,
              amplitude: 350,
              wavelength: 6,
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

            index = void 0;
            length = void 0;
            gradient = void 0;
          },
        });

        return () => {
          waves.destroy();
        };
      });
    }
  }, []);

  return <canvas ref={wavesRef} />;
};

export default Waves;
