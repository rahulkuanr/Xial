// method to submit the form data for new post using AJAX
let createPost = () => {
    let newPostForm = $('#new-post-form');

    newPostForm.submit(e => {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: (data) => {
                let newPost = newPostDom(data.data.post);
                $('#post-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost));
            }, error: (error) => {
                console.log(error.responseText);
            }
        })
    });
}

// method to create a post in DOM
let newPostDom = (post) => {
    return $(`
    <li id="post-${post._id}">
        <p class="user">
            ${post.user.name}
        </p>
        ${post.content}
        <small id="delete-post">
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
        </small>
        <hr>
        <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input id="comment-input" type="text" name="content" placeholder="Write a comment...."
                    required>
                <input type="hidden" name="post" value="${post._id}">
            </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        </div>
    </li>
    `)
}

// method to delete a post from DOM
let deletePost = (deleteLink) => {
    $(deleteLink).click(e => {
        e.preventDefault();

        $.ajax({
            type:'get',
            url: $(deleteLink).prop('href'),
            success: (data) => {
                $(`#post-${data.data.post_id}`).remove();
            }, error: (error) => {
                console.log(error.responseText);
            }
        });
    });
}

createPost();