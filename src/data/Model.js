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

  this.getThreads = function (board){
    var endPoint = `${URL}/api/threads/${board}`;
    return fetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          console.log(json)
          return json;
    })
    .catch(handleError => console.log('There was an error: ' + handleError))
  }

  this.getThreadInfo = function (threadID){
    var endPoint = `${URL}/api/thread/${threadID}`;
    return fetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          console.log(json)
          return json;
    })
    .catch(handleError => console.log('There was an error: ' + handleError))
  }

  this.getReplyIds = function (threadID){
    var endPoint = `${URL}/api/thread/${threadID}/replies`;
    return fetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          console.log(json)
          return json;
    })
    .catch(handleError => console.log('There was an error: ' + handleError))
  }

  this.getPost = function (postID){
    var endPoint = `${URL}/api/post/${postID}`;
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
