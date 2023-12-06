// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// import styles from "@/styles/slider.module.css";

// // import required modules
// import { Pagination } from "swiper/modules";

// export default function App() {
//   return (
//     <>
//       <Swiper
//         spaceBetween={30}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[Pagination]}
//         className={styles.mySwiper}
//       >
//         <SwiperSlide>
//           <img src="https://media.gq-magazine.co.uk/photos/5df90c2ce2d50100085d4762/16:9/w_2240,c_limit/20191217-mati-klarwein-05.jpg" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://media.gq-magazine.co.uk/photos/5df90c2ce2d50100085d4762/16:9/w_2240,c_limit/20191217-mati-klarwein-05.jpg" />
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
import styles from "@/styles/slider.module.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        <SwiperSlide>
          <img src="https://media.gq-magazine.co.uk/photos/5df90c2ce2d50100085d4762/16:9/w_2240,c_limit/20191217-mati-klarwein-05.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://media.gq-magazine.co.uk/photos/5df90c2ce2d50100085d4762/16:9/w_2240,c_limit/20191217-mati-klarwein-05.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://media.gq-magazine.co.uk/photos/5df90c2ce2d50100085d4762/16:9/w_2240,c_limit/20191217-mati-klarwein-05.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
