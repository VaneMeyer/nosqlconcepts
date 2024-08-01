;<Box display="flex" alignItems="center" justifyContent="center" p={7}>
  <div>
    <div
      style={{
        border: `1px solid ${colors.blueAccent[100]}`,
        borderRadius: "5px",
        padding: "50px",
      }}
    >
      <h2>Login</h2>
      <p>
        Please type in your username and password provided by your instructor.
      </p>
      <form>
        {user ? (
          <div>
            {" "}
            {/* <Link to="/dashboard">
                  <Button>Go To Dashboard</Button>
                </Link> */}
          </div>
        ) : (
          <div>
            <div>
              <InputLabel id="username">Username</InputLabel>
              <TextField
                id="username"
                width="300px"
                type="text"
                /* onChange={handleChange("username")} */
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              ></TextField>
            </div>

            <div>
              <InputLabel id="password">Password</InputLabel>
              <TextField
                id="password"
                width="300px"
                type="password"
                /* onChange={handleChange("password")} */
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></TextField>
            </div>

            <Button
              sx={muiButtonStyle}
              /* onClick={handleSubmit} */ onClick={handleLogin}
              type="submit"
            >
              login
            </Button>
          </div>
        )}
        {errorMessage !== "" && (
          <p
            style={{
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: `${colors.redAccent[700]}`,
            }}
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
    <Footer />
  </div>
</Box>
