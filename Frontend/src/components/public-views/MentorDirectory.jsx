// Mentor Directory (carousel)
import React from "react";
import CardPreview from "./CardPreview";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";

// Import Swiper styles
import "swiper/css";

const MentorDirectory = (props) => {
  // Placeholder data for looping
  const mentorData = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 1",
      description: "This is a placeholder description for Mentor 1.",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 2",
      description: "This is a placeholder description for Mentor 2.",
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 3",
      description: "This is a placeholder description for Mentor 3.",
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 4",
      description: "This is a placeholder description for Mentor 4.",
    },
  ];

  return (
    <>
      {/* Swiper Carousel */}
      <Swiper
        style={{ height: "auto", width: "100%" }}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {mentorData.map((mentor) => (
          <SwiperSlide key={mentor.id}>
            <CardPreview imageUrl={mentor.imageUrl} title={mentor.title} description={mentor.description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MentorDirectory;
