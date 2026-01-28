async function LoadData() {
  let res = await fetch("http://localhost:3000/posts");
  let posts = await res.json();
  let body = document.getElementById("body_table");
  body.innerHTML = "";
  for (const post of posts) {
    let style = post.isDeleted ? "text-decoration: line-through; color: red;" : "";
    body.innerHTML += `<tr style="${style}">
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.views}</td>
           <td><input type="submit" value="Delete" onclick="Delete( ${post.id})"/></td>
        </tr>`;
  }
}
async function getMaxId() {
  let res = await fetch("http://localhost:3000/posts");
  let posts = await res.json();
  if (posts.length === 0) {
    return "1";
  }
  let maxId = 0;
  for (const post of posts) {
    let id = parseInt(post.id);
    if (id > maxId) {
      maxId = id;
    }
  }
  return String(maxId + 1);
}
async function Save() {
  let id = document.getElementById("id_txt").value;
  let title = document.getElementById("title_txt").value;
  let views = document.getElementById("view_txt").value;
  if (id === "") {
    id = await getMaxId();
  }
  let getItem = await fetch("http://localhost:3000/posts/" + id);
  if (getItem.ok) {
    let res = await fetch("http://localhost:3000/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        views: views,
      }),
    });
    if (res.ok) {
      console.log("Thanh cong");
    }
  } else {
    try {
      let res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          views: views,
        }),
      });
      if (res.ok) {
        console.log("Thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  LoadData();
  return false;
}
async function Delete(id) {
  let getItem = await fetch("http://localhost:3000/posts/" + id);
  let post = await getItem.json();
  let res = await fetch("http://localhost:3000/posts/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: post.id,
      title: post.title,
      views: post.views,
      isDeleted: true
    }),
  });
  if (res.ok) {
    console.log("Thanh cong");
  }
  LoadData();
  return false;
}

async function LoadComments() {
  let res = await fetch("http://localhost:3000/comments");
  let comments = await res.json();
  let body = document.getElementById("body_table_comments");
  body.innerHTML = "";
  for (const comment of comments) {
    let style = comment.isDeleted ? "text-decoration: line-through; color: red;" : "";
    body.innerHTML += `<tr style="${style}">
            <td>${comment.id}</td>
            <td>${comment.text}</td>
            <td>${comment.postId}</td>
            <td><input type="submit" value="Delete" onclick="DeleteComment( ${comment.id})"/></td>
        </tr>`;
  }
}

async function getMaxCommentId() {
  let res = await fetch("http://localhost:3000/comments");
  let comments = await res.json();
  if (comments.length === 0) {
    return "1";
  }
  let maxId = 0;
  for (const comment of comments) {
    let id = parseInt(comment.id);
    if (id > maxId) {
      maxId = id;
    }
  }
  return String(maxId + 1);
}

async function SaveComment() {
  let id = document.getElementById("comment_id_txt").value;
  let text = document.getElementById("comment_text_txt").value;
  let postId = document.getElementById("comment_postId_txt").value;

  if (id === "") {
    id = await getMaxCommentId();
  }

  let getItem = await fetch("http://localhost:3000/comments/" + id);

  if (getItem.ok) {
    await fetch("http://localhost:3000/comments/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        postId: postId,
        isDeleted: false
      }),
    });
  } else {
    await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        text: text,
        postId: postId,
        isDeleted: false
      }),
    });
  }

  LoadComments();
  return false;
}


async function DeleteComment(id) {
  let getItem = await fetch("http://localhost:3000/comments/" + id);
  let comment = await getItem.json();
  let res = await fetch("http://localhost:3000/comments/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: comment.id,
      text: comment.text,
      postId: comment.postId,
      isDeleted: true
    }),
  });
  if (res.ok) {
    console.log("Thanh cong");
  }
  LoadComments();
  return false;
}
LoadData();
LoadComments();