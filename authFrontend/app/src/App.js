import logo from "./logo.svg";
import "./App.css";

const AskGithubForCode = () => {
  const githubURl = "https://github.com/login/oauth/authorize";

  const options = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT,
    scope: "user:email",
    // state: "http://localhost:3000",
  };

  const qs = new URLSearchParams(options);

  const fullRequest = `${githubURl}?${qs.toString()}`;
  return (
    <a href={fullRequest} target="_blank" rel="noreferrer">
      {/* <a href={fullRequest} target="_self" rel="noreferrer"> */}
      logga in och få en code
    </a>
  );
};

const SendCodeToServer = () => {
  const tokenURl = "http://localhost:8082/auth/github";
  const queryParams = new URLSearchParams(document.location.search);
  const options = {
    code: queryParams?.get("code"),
  };
  const qs = new URLSearchParams(options);

  const getTokenFromServer = async () => {
    await fetch(`${tokenURl}?${qs.toString()}`);
  };

  return (
    <div>
      <div>Code: {queryParams.get("code") || "none"}</div>
      <div>State: {queryParams.get("state") || "none"}</div>
      <h3>byt code mot token</h3>
      <button onClick={getTokenFromServer}>send code to server</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <h2>{user.data}</h2> */}
        <AskGithubForCode />
        <SendCodeToServer />
      </header>
    </div>
  );
}

export default App;