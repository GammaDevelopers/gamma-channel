import React, { Component } from 'react';

const Model = function (){

  const URL = "localhost:3000"

  this.getAllBoards = function (){
    var endPoint = `${URL}/api/boards`;
    return fetch(endPoint)
      .then(processResponse => processResponse.json())
      .then((json) => {
          return json.results;
    })
    .catch(handleError => console.log('There was an error: ' + handleError))
  }

}

export const modelInstance = new Model();
