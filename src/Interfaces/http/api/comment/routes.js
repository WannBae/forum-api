const routes = (handler) => [
  {
    method: "POST",
    path: "/threads/{threadId}/comments",
    handler: handler.handlePostComment,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/threads/{threadId}/comments/{commentId}",
    handler: handler.handleDeleteComment,
    options: {
      auth: "forumapi_jwt",
    },
  },
];

module.exports = routes;
