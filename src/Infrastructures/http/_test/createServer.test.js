const createServer = require("../createServer");

describe("HTTP server", () => {
  it("should response 404 when request unregistered route", async () => {
    // Arrange
    const server = await createServer({});

    // Action
    const response = await server.inject({
      method: "GET",
      url: "/unregisteredRoute",
    });

    // Assert
    expect(response.statusCode).toEqual(404);
  });

  it("should handle server error correctly", async () => {
    // Arrange
    const requestPayload = {
      username: "dicoding",
      fullname: "Dicoding Indonesia",
      password: "super_secret",
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual("error");
    expect(responseJson.message).toEqual("terjadi kegagalan pada server kami");
  });
});

describe("Authentication Strategy Configuration", () => {
  const authenticationStrategy = {
    validate: (artifacts) => {
      const isValid = artifacts.decoded.payload.id === 1; // Ubah ID yang diharapkan sesuai dengan valid ID
      return {
        isValid,
        credentials: isValid
          ? {
              id: artifacts.decoded.payload.id,
            }
          : undefined,
      };
    },
  };

  it("should authenticate successfully with valid credentials", () => {
    // Arrange
    const artifacts = {
      decoded: {
        payload: {
          id: 1, // ID yang valid
        },
      },
    };

    // Action
    const validationResult = authenticationStrategy.validate(artifacts);

    // Assert
    expect(validationResult.isValid).toEqual(true);
    expect(validationResult.credentials.id).toEqual(1);
  });

  it("should return unauthorized error with invalid credentials", () => {
    // Arrange
    const artifacts = {
      decoded: {
        payload: {
          id: 2, // ID yang tidak valid
        },
      },
    };

    // Action
    const validationResult = authenticationStrategy.validate(artifacts);

    // Assert
    expect(validationResult.isValid).toEqual(false);
    expect(validationResult.credentials).toBeUndefined();
  });
});
