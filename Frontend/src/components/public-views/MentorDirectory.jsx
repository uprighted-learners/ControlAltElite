// Mentor Directory (carousel)
import React from "react";
import CardPreview from "./CardPreview";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useState, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import { API_VIEW_MENTORS } from "../../constants/endpoints";

const MentorDirectory = (props) => {
  // Placeholder data for looping
  // const mentorData = [
  //   {
  //     id: 1,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Mentor 1",
  //     description: "This is a placeholder description for Mentor 1.",
  //   },
  //   {
  //     id: 2,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Mentor 2",
  //     description: "This is a placeholder description for Mentor 2.",
  //   },
  //   {
  //     id: 3,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Mentor 3",
  //     description: "This is a placeholder description for Mentor 3.",
  //   },
  //   {
  //     id: 4,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Mentor 4",
  //     description: "This is a placeholder description for Mentor 4.",
  //   },
  // ];

  // State to hold mentor data
  const [mentorData, setMentorData] = useState([]);

  // function for fetching mentor data
  async function fetchMentorData() {
    //headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", props.token); // pass token from props
    // request options
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // send request
    let response = await fetch(API_VIEW_MENTORS, requestOptions);
    // response object
    let data = await response.json();
    //set the state variable to the data
    console.log(data.mentors);

    setMentorData(data.mentors);
  }
  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchMentorData();
  }, []);

  useEffect(() => {
    console.log(
      "Mentor IDs:",
      mentorData.map((m) => m.id)
    );
  }, [mentorData]);

  return (
    <>
      {/* Swiper Carousel */}
      <Swiper
        // direction="vertical"
        spaceBetween={30}
        slidesPerView={3}
        style={{ height: "auto", width: "100%"}} // adjust as needed
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {mentorData.map((mentor) => (
          <SwiperSlide key={mentor.id} className="flex items-center justify-center">
            {/* <CardPreview
              imageUrl={mentor.imageUrl}
              title={mentor.title}
              description={mentor.description}
            /> */}
            <CardPreview
              firstName={mentor.firstName}
              lastName={mentor.lastName}
              profilePhoto={mentor.profilePhoto}
              interests={mentor.interests}
              mentorId={mentor.id}
              token={props.token}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MentorDirectory;
