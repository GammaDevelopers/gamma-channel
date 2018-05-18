
const Model = function (){
  /*
    Fetch data from gamma-channel api
    Each method atempts to convert result data to json
  */

  const URL = ""

  /* 
    Fetch and check response code
  */
  function myFetch(url, options) {
    if (options == null) options = {}
    if (options.credentials == null) options.credentials = 'same-origin'
    return fetch(url, options).then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      } else {
        var error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
      }
    })
  }

  /*
    postData Format:
    {
      "title":"Post/Thread title",
      "mediaURL":"image url",
      "name":"creator name",
      "options":"unused atm",
      "content":"body of post"
    }
  */
  this.generatePostData = function(title,name,content,options = "",mediaURL = ""){
    if(name === ""){
      name="Anonymous";
    }
    var postData = {"title":title,"mediaURL":mediaURL,"name":name,"content":content,"options":options};
    return postData;
  }

  this.postReply = function(threadID, postData, captchaResponse){
    var endPoint = `${URL}/api/post/${threadID}/reply`;
    return myFetch(endPoint, {
      body: JSON.stringify(postData),
      headers: {
        'content-type': 'application/json',
        'captcha':captchaResponse
      },
      method: 'POST'
    }).then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json.postID;
    })

  }

  this.createThread = function(board, postData, captchaResponse){
    var endPoint = `${URL}/api/threads/${board}/new`;
    return myFetch(endPoint, {
      body: JSON.stringify(postData),
      headers: {
        'content-type': 'application/json',
        'captcha':captchaResponse
      },
      method: 'POST',
    }).then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json.threadID;
    })

  }

  this.getAllBoards = function (){
    var endPoint = `${URL}/api/boards`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.getBoard = function (board){
    var endPoint = `${URL}/api/boards/${board}`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.searchThreads = function(board, searchString){
    var endPoint = `${URL}/api/search/${board}/${searchString}`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.getThreads = function (board){
    var endPoint = `${URL}/api/threads/${board}`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.getThreadInfo = function (threadID){
    var endPoint = `${URL}/api/thread/${threadID}`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.searchPosts = function(thread, searchString){
    var endPoint = `${URL}/api/searchPost/${thread}/${searchString}`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.getReplyIds = function (threadID){
    var endPoint = `${URL}/api/thread/${threadID}/replies`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  }

  this.getPost = function (postID){
    var endPoint = `${URL}/api/post/${postID}`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          json.created = new Date(json.created)
          json.content = {'__html':json.content}
          return json;
    })
  }

  this.getHeaderImage = function(){
    var endPoint = `${URL}/api/header/random_image`;
    return myFetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          return json;
    })
  };

}

export const modelInstance = new Model();
