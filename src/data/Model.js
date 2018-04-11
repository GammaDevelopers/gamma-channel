import React, { Component } from 'react';

const Model = function (){

  const URL = ""

  this.getAllBoards = function (){
    var endPoint = `${URL}/api/boards`;
    return fetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          console.log(json)
          return json;
    })
    .catch(handleError => console.log('There was an error: ' + handleError))
  }

}

export const modelInstance = new Model();
