const mediaUpploadModel = function (){

    const imgurClientID = "731be7fd568417b";
    const uploadURL = "https://api.imgur.com/3/image";

    //imageData must be:
    //A binary file or Base64 encoded image
    this.imgurUpload = function(imageData){
        var form = new FormData();
        form.append("image", imageData);
        return fetch(uploadURL, {
            method: "POST",
            headers: {
                "Authorization": `Client-ID ${imgurClientID}`
            },
            body: form
        }).then(processResponse =>{
            return processResponse.json()
        });
    }

    this.uploadMedia = function(data){
        //Todo: kollla filtyp välj platform
        return this.imgurUpload(data)
    }
}

export const mediaInstance = new mediaUpploadModel();
