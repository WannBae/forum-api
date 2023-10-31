const routes = (handler) => [
  {
    method: "POST",
    path: "/threads",
    handler: handler.handlePostThread,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "GET",
    path: "/threads/{threadId}",
    handler: handler.handleGetThreadById,
  },
];

module.exports = routes;
