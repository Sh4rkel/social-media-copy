// variables
const signOutButton = document.querySelector("#signOut");
const sponsored = document.querySelector("#SPONS_MESSAGE");
const ads = ["image-1.jpg", "image-2.jpg", "image-3.jpg"];
const posts_wrapper = document.querySelector("#posts_wrapper");
const postText = document.querySelector("#addPost");
const postSubmit = document.querySelector("#submitNewPost");

// load random ad - IIFE
(function () {
  const adToLoad = Math.floor(Math.random() * ads.length);
  sponsored.innerHTML = `
    <a href="img/${ads[adToLoad]}" target="_blank">
        <img src="img/${ads[adToLoad]}" alt="${ads[adToLoad]}" />
    </a>
  `;
})();

// like share and comment functions
function likePost(id) {
  fetch(baseURL + ENDPOINTS.LIKE_POST + "/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => showToast(json.message))
    .catch((err) => showToast(`<p>${err.message}</p>`, true));
}

function sharePost(id) {
  fetch(baseURL + ENDPOINTS.SHARE_POST + "/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => showToast(json.message))
    .catch((err) => showToast(`<p>${err.message}</p>`, true));
}

function addComment(id, text) {
  fetch(baseURL + ENDPOINTS.COMMENT + "/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({ text }),
  })
    .then((res) => res.json())
    .then((json) => showToast(json.message))
    .catch((err) => showToast(`<p>${err.message}</p>`, true));
}

// generate post function
function generatePost({
  text,
  author,
  date,
  videos,
  images,
  id,
  likes,
  shares,
  comments,
}) {
  // ADD DEBUG LOGGER

  const fullDate = new Date(date);
  const day = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  return `
  <div class="post">
    <div class="header">
      <a href="#" class="profile-image">
        <img src="https://source.unsplash.com/40x40" />
      </a>
      <div class="author">
        <a href="user/${author}"><h4>${author}</h4></a>
        <p class="light">${day} ${months[month]} ${year}</p>
      </div>
      <div class="menu">
        <i class="fa fa-ellipsis-h"></i>
        <ul class="sub-menu">
          <li>
            <a href="#">Report</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      ${text !== "" ? `<p>${text}</p>` : ""}
      ${
        videos.length > 0
          ? videos.map(
              (video) => `
                            <video autoplay controls muted>
                              <source src="${video}" type="video/${video.substr(
                video.length - 3
              )}" />
                            </video>
                          `
            )
          : ""
      }
      ${
        images.length > 0
          ? images.map((img) => `<img src="${img}" alt="${img}" />`)
          : ""
      }
    </div>
    <div class="footer">
      <ul class="buttons">
        <li>
          <a href="#" onclick="likePost(${id})">
            <i class="fa fa-thumbs-o-up"></i>
            <span class="action">Like</span>
            ${
              likes.length > 0
                ? `<span class="count">${likes.length}</span>`
                : ""
            }
            
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-comments-o"></i>
            <span class="action">Comment</span>
            ${
              comments.length > 0
                ? `<span class="count">${comments.length}</span>`
                : ""
            }
            
          </a>
        </li>
        <li class="active">
          <a href="#" onclick="sharePost(${id})">
            <i class="fa fa-share-square-o"></i>
            <span class="action">Share</span>
            ${
              shares.length > 0
                ? `<span class="count">${shares.length}</span>`
                : ""
            }
            
          </a>
        </li>
      </ul>
      <ul class="comments">
        <li class="new-comment">
          <a href="#">
            <img src="https://source.unsplash.com/30x30" />
          </a>
          <div>
            <input type="text" placeholder="Write comments..." />
          </div>
        </li>
        <li>
          <a href="#">
            <img src="https://source.unsplash.com/31x31" />
          </a>
          <div>
            <p>Amazing!</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `;
}

// event listeners
signOutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

const addNewPost = () => {
  if (document.querySelector("#addPost").value.length < 5)
    return showToast(`<p>Please add to your post</p>`, true);

  fetch(baseURL + ENDPOINTS.ADD_NEW_POST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      text: document.querySelector("#addPost").value,
      files: [],
    }),
  })
    .then((res) => res.json())
    .then((json) => showToast(`<p>${json.message}</p>`))
    .catch((err) => showToast(`<p>${err.message}</p>`, true))
    .finally(() => window.location.reload());
};

// (async function () {
//   const request = await fetch(baseURL + ENDPOINTS.GET_ALL_POSTS, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.token}`,
//     },
//   });

//   const response = await request.json();

//   if (request.status !== 200) {
//     return showToast("Whoops. Something went wrong.", true);
//   }

//   response.map((post) => (posts_wrapper.innerHTML += generatePost(post)));

//   console.log(request.status, response);
// })();
