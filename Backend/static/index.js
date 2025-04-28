const imgForm = document.querySelector(".imgForm");

imgForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];

  // fetch to server endpoint to get link from s3
  //   takes imageUrl from upload, sends response and then updates URL variable with image url
  const response = await fetch("/geturl").then((res) => res.json());
  // Handle both string and object response
  const url = typeof response === "string" ? response : response.url;
  // fetch to s3 top upload the image (PUT)
  await fetch(url, {
    method: "PUT",
    body: file,
  });

  const imgURL = url.split("?")[0];
  //   console.log(imgURL);

  const img = document.createElement("img");
  img.src = imgURL;
  document.body.appendChild(img);

  // fetch to our server's db to post the link
});
