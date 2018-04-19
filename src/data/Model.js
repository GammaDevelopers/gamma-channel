
const Model = function (){

  const URL = ""

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
    var postData = {"title":title,"mediaURL":mediaURL,"name":name,"content":content,"options":options};
    return postData;
  }

  this.postReply = function(threadID, postData){
    var endPoint = `${URL}/api/post/${threadID}/reply`;
    return fetch(endPoint, {
      body: JSON.stringify(postData),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })

  }

  this.createThread = function(board, postData){
    var endPoint = `${URL}/api/threads/${board}/new`;
    return fetch(endPoint, {
      body: JSON.stringify(postData),
      headers: {
        'content-type': 'application/json'
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
    return fetch(endPoint)
      .then(processResponse =>{
          return processResponse.json()})
      .then((json) => {
          console.log(json)
          return json;
    })
    .catch(handleError => console.log('There was an error: ' + handleError))
  }

  //TODO getBoard(), get a single board

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
