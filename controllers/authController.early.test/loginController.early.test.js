// Unit tests for: loginController

const { loginController } = require("../authController");

// Import necessary modules
describe("loginController() loginController method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    test("should successfully log in a user with valid credentials", async () => {
      // Arrange
      const req = mockRequest({
        body: { username: "validUser", password: "validPassword" },
      });
      const res = mockResponse();
      const mockUserService = {
        authenticate: jest
          .fn()
          .mockResolvedValue({ id: 1, username: "validUser" }),
      };

      // Act
      await loginController(req, res, mockUserService);

      // Assert
      expect(mockUserService.authenticate).toHaveBeenCalledWith(
        "validUser",
        "validPassword"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, username: "validUser" });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    test("should return 400 if username is missing", async () => {
      // Arrange
      const req = mockRequest({
        body: { password: "somePassword" },
      });
      const res = mockResponse();

      // Act
      await loginController(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Username is required" });
    });

    test("should return 400 if password is missing", async () => {
      // Arrange
      const req = mockRequest({
        body: { username: "someUser" },
      });
      const res = mockResponse();

      // Act
      await loginController(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Password is required" });
    });

    test("should return 401 if credentials are invalid", async () => {
      // Arrange
      const req = mockRequest({
        body: { username: "invalidUser", password: "invalidPassword" },
      });
      const res = mockResponse();
      const mockUserService = {
        authenticate: jest.fn().mockResolvedValue(null),
      };

      // Act
      await loginController(req, res, mockUserService);

      // Assert
      expect(mockUserService.authenticate).toHaveBeenCalledWith(
        "invalidUser",
        "invalidPassword"
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
    });

    test("should handle unexpected errors gracefully", async () => {
      // Arrange
      const req = mockRequest({
        body: { username: "someUser", password: "somePassword" },
      });
      const res = mockResponse();
      const mockUserService = {
        authenticate: jest
          .fn()
          .mockRejectedValue(new Error("Unexpected error")),
      };

      // Act
      await loginController(req, res, mockUserService);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});

// End of unit tests for: loginController
