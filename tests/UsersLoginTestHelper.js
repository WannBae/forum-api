// istanbul ignore file
const UsersLoginTestHelper = {
  async getAccessTokenAndUserIdHelper({ server }) {
    // payload
    const userPayload = {
      username: Math.random().toString(36).substring(2, 5),
      password: "secret",
    };

    // user registration
    const userLogin = await server.inject({
      method: "POST",
      url: "/users",
      payload: { ...userPayload, fullname: "placeholder fullname" },
    });

    // user login
    const userAuth = await server.inject({
      method: "POST",
      url: "/authentications",
      payload: userPayload,
    });

    const { id: userId } = JSON.parse(userLogin.payload).data.addedUser;
    const { accessToken } = JSON.parse(userAuth.payload).data;

    return {
      userId,
      accessToken,
    };
  },
};

module.exports = UsersLoginTestHelper;
