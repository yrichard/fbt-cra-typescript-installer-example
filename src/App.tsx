import "./App.css";


import { FbtParam, IntlViewerContext, fbt, init } from "fbt";
import React, { FormEvent, useCallback, useRef, useState } from "react";
import { Button, TextField, Container } from '@material-ui/core';

import intl from "./translatedFbts.json";
import logo from "./logo.svg";

// This will load the translated strings in FBT.
init({ translations: intl });

IntlViewerContext.locale = "fr_FR";

export default () => {
  // This might trigger the error 'Unexpected token, expected ";"'
  // when doing 'yarn collect-fbts'. Adding a 'babel.config.js' file
  // with '@babel/preset-typescript' as a preset will solve the problem.
  console.log(IntlViewerContext.locale!);

  const [name, setName] = useState("");
  const inputNameRef = useRef(null);

  const onSubmitName = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setName(inputNameRef!.current!["value"]);
    },
    [setName]
  );

  const fbtParamsTest = (
    <div>
      <fbt desc="FbtParams example string">
        Hello, <FbtParam name="name">{name}</FbtParam>
      </fbt>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt={fbt("logo", "alt text for logo")}
        />
        <p>
          <fbt desc="more complex example">
            Edit <code>src/App.tsx</code> and save to reload.
          </fbt>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <fbt desc="example">Learn React</fbt>
        </a>
      </header>
      <div className="fbtExamples">
        <Container maxWidth="md">
          <fbt desc="description for more examples">
            Some more use cases for FBT strings:
        </fbt>
          <h2>FbtParam</h2>
          <div>
            <fbt desc="about FbtParams">
              <strong>FbtParams</strong> allows you to inject a value within a
            translated string.
          </fbt>
          </div>
          <div>
            <form onSubmit={onSubmitName}>
              <TextField
                id="outlined-button"
                label="Enter your name"
                variant="outlined"
                color="primary"
                size="small"
                style={{ margin: 2, backgroundColor: "white" }}
              />
            </form>
            <Button variant="contained" color="primary" size="large">
              <fbt desc="submit button label">Submit</fbt>
            </Button>
            {name && fbtParamsTest}
          </div>
        </Container>
      </div>
    </div>
  );
};
