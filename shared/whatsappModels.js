//Enviar txt
function MessageText(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "preview_url": true,
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });
    return data;
}

//Botones tipo gestión
function MessageGestion(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "¿Con qué gestión te puedo ayudar?"
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
                            "title": "Certificado nomina"
                        }
                    }
                ]
            }
        }
    });
    return data;
}

//Botones medio de envío
// function MessageEnvio(number){
//     const data = JSON.stringify({
//         "messaging_product": "whatsapp",    
//         "to": number,
//         "type": "interactive",
//         "interactive": {
//             "type": "button",
//             "body": {
//                 "text": "¿Por qué medio quieres que te envíe el documento?"
//             },
//             "action": {
//                 "buttons": [
//                     {
//                         "type": "reply",
//                         "reply": {
//                             "id": "003",
//                             "title": "Chat"
//                         }
//                     },
//                     {
//                         "type": "reply",
//                         "reply": {
//                             "id": "004",
//                             "title": "Correo"
//                         }
//                     }
//                 ]
//             }
//         }
//     });
//     return data;
// }

//Botones consulta inicial
function MessageResolver(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "¿He resuelto tu consulta inicial?"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "005",
                            "title": "Si"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "006",
                            "title": "No"
                        }
                    }
                ]
            }
        }
    });
    return data;
}

//Enviar documento tipo pdf
// function MessageDoc(number){
//     const data = JSON.stringify({
//         "messaging_product": "whatsapp",    
//         "to": number,
//         "type": "document",
//         "document": {
//             "link": "https://www.africau.edu/images/default/sample.pdf",
//             "filename": iden+".pdf"
//         }
//     });
//     return data;
// }

// function MessageList(number)
//     const data = JSON.stringify({
//     "object": "whatsapp_business_account",
//     "entry": [
//       {
//         "id": "105133522282263",
//         "changes": [
//           {
//             "value": {
//               "messaging_product": "whatsapp",
//               "metadata": {
//                 "display_phone_number": "15550293773",
//                 "phone_number_id": "100584242748738"
//               },
//               "contacts": [
//                 {
//                   "profile": {
//                     "name": "User Name"
//                   },
//                   "wa_id": "51123456789"
//                 }
//               ],
//               "messages": [
//                 {
//                   "from": "51123456789",
//                   "id": "wamid.HBgLNTE5NDM2NjI5NjQVAgASGBQzRUIwQTRBMDI4OUEwOERCNUM2OAA=",
//                   "timestamp": "1658392580",
//                   "type": "interactive",
//                   "interactive": {
//                     "type": "list_reply",
//                     "list_reply":{
//                         "id": "01",
//                         "title": "Ver habitaciones"
//                     }
//                   }                
//                 }
//               ]
//             },
//             "field": "messages"
//           }
//         ]
//       }
//     ]
//   })

module.exports = {
    MessageText,
    MessageGestion,
    MessageResolver
    // MessageEnvio,
    // MessageDoc,
    // MessageList
};