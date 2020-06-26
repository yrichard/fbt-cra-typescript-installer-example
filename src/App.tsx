import "./App.css";


import { FbtParam, IntlViewerContext, fbt, init } from "fbt";
import React, { FormEvent, useCallback, useRef, useState, ChangeEvent } from "react";
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
  const [nameInputValue, setNameInputValue] = useState("");
  const inputNameRef = useRef(null);

  const onSubmitName = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setName(nameInputValue);
    },
    [setName, nameInputValue]
  );

  const onNameInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event.target.value);
      setNameInputValue(event.target.value);
    },
    []
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
              <div>
                <TextField
                  id="outlined-button"
                  label="Enter your name"
                  variant="outlined"
                  color="primary"
                  size="small"
                  onChange={onNameInputChange}
                  ref={inputNameRef}
                  style={{ margin: 2, backgroundColor: "white" }}
                />
              </div>
              <Button variant="contained" color="primary" size="large" type="submit">
                <fbt desc="submit button label">Submit</fbt>
              </Button>
            </form>

            {name && fbtParamsTest}
          </div>
        </Container>
      </div>
    </div>
  );
};
