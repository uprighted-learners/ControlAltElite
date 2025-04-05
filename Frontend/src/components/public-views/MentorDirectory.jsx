// Mentor Directory (carousel)
import React from "react";
import CardPreview from "./CardPreview";

const MentorDirectory = (props) => {
  // Placeholder data for looping
  const mentorData = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 1",
      description: "This is a placeholder description for Mentor 1.",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 2",
      description: "This is a placeholder description for Mentor 2.",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 3",
      description: "This is a placeholder description for Mentor 3.",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentor 4",
      description: "This is a placeholder description for Mentor 4.",
    },
  ];

  return (
    <>
      <div className="carousel w-full h-screen mt-6">
        {/* Carousel Slide */}
        <div className="carousel-item relative w-full h-full">
          <div className="flex space-x-6 justify-center">
            {/* Mount Card & Map data (todo)*/}
            {mentorData.map((mentor, index) => (
              <div key={mentor.id}>
                <CardPreview
                  imageUrl={mentor.imageUrl}
                  title={mentor.title}
                  description={mentor.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation */}
        {/* TO DO - navigation not working / check 'carousel-item'/slide use */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle" data-carousel-prev>
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle" data-carousel-next>
            ❯
          </a>
        </div>
      </div>
    </>
  );
};

export default MentorDirectory;
