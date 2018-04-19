const mediaUpploadModel = function (){

    const imgurClientID = "731be7fd568417b";
    const uploadURL = "https://api.imgur.com/3/image";

    //imageData must be:
    //A binary file or Base64 encoded image
    this.imgurUpload = function(imageData, progress, fail, complete){
        var form = new FormData();
        form.append("image", imageData);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", uploadURL);
        xhr.addEventListener("progress", progress);
        xhr.addEventListener("load", (e) => {
            if(xhr.status == 200){
                if(xhr.response.success){
                    complete(xhr.response.data.link)
                }else{
                    fail(xhr.response)
                }
            }else {
                fail(xhr.response)
            }
        });
        xhr.addEventListener("error", fail);
        xhr.addEventListener("abort", fail);
        xhr.setRequestHeader('Authorization', `Client-ID ${imgurClientID}`);

        xhr.send(form);

        return xhr
    }

    this.uploadMedia = function(data, progress, fail, complete){
        //Todo: kollla filtyp välj platform
        return this.imgurUpload(data, progress, fail, complete)
    }
}

export const mediaInstance = new mediaUpploadModel();
