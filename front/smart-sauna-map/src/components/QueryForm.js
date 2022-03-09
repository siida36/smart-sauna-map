import React from "react";


function QueryForm({ query, onInput, onSubmit }) {
  return (
    <form onSubmit={ onSubmit }>
      <label>
        Name:
        <input type="text" value={ query } onChange={ onInput } />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default QueryForm;
