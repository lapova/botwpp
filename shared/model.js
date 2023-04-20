//Plantillas de tipos de msjes que se pueden enviar mediante la API WhatsApp
//No se utilizan en el código, solo es para tenerlos de ejemplo


//Msje para enviar txt
function sampleText(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "preview_url": false,
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });
    return data;
}

//Msje para enviar una imagen 
function sampleImage(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "image",
        "image": {
            "link": "https://blog.hanyuchineseschool.com/wp-content/uploads/2021/03/Dibujo-de-dragon-chino-768x564.jpg"
        }
    });
    return data;
}

//Msje para enviar un documento 
function sampleDocument(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "document",
        "document": {
            "link": "https://www.africau.edu/images/default/sample.pdf"
        }
    });
    return data;
}


//Msje con botones
function sampleButtons(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "Solicitas ayuda con:"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Certificado laboral"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "Solicitar vacaciones"
                        }
                    }
                ]
            }
        }
    });
    return data;
}

module.exports = {
    sampleText,
    sampleImage,
    sampleDocument,
    sampleButtons
};