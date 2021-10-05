const { google } = require('googleapis');


const oAuth2Client = new google.auth.OAuth2(
    "141104721890-esj2rbb9cri70kgq15ebr6p6mguarl98.apps.googleusercontent.com",
    "oiuw2lE1IJJ4w44MiC_cFDbQ", "urn:ietf:wg:oauth:2.0:oob");

oAuth2Client.setCredentials({
    access_token: "ya29.a0ARrdaM8UK904DXl0XL3djY1mouHA422CIHxPtvDtXEx2DxmYX2fXcX490GFKGDKGhRXgiMSG-4SNKgqX7gUvFwKywSagRFJG95iqTD4pvLCe-PhnKRsji-V8CfPGWdRx4bGA2H_5__ym2l35dAKzKyJoAxKB",
    refresh_token: "1//0h9K7DB1E-E4ZCgYIARAAGBESNwF-L9Ir19IXiJQz6uUntEoeIeWQ2K1U2HGiXPmCsBGUMY-JgibkK1Y8bnswaMt8bjIflg3woDE",
    scope: "https://www.googleapis.com/auth/spreadsheets",
    token_type: "Bearer",
    expiry_date: 1633356406402
});

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

//LEER LOS PRODUCTOS DESDE EL SPREEDSHEET
async function read() {

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1H2zB3LwnSTQkf7uEYbe_0V9PWoTqNyFhnwCpISBnhWM',
        range: 'Products!A2:E',
    });

    const rows = response.data.values;

    const products = rows.map((row) => ({

        id: +row[0],
        nombre: row[1],
        price: +row[2],
        image: row[3],
        stock: +row[4],

    }));

    return products;
}

async function write(products) {

    let values = products.map(p => [p.id, p.nombre, p.price, p.image, p.stock])
    const resource = {
        values,
    };
    const result = await sheets.spreadsheets.values.update({
        spreadsheetId: '1H2zB3LwnSTQkf7uEYbe_0V9PWoTqNyFhnwCpISBnhWM',
        range: 'Products!A2:E',
        valueInputOption: 'RAW',
        resource,
    });

    console.log(result.updatedCells);
}
//FUNCION QUE VA A LEER Y ESCRIBIR ASINCRONICO
//async function readAndWrite() {
//  const products = await read(); //LEYENDO LOS PRODUCTOS
//products[0].stock = 1;
//await write(products); //VOLVIENDOLOS A ESCRIBIR
//}

//readAndWrite();
module.exports = {
    read,
    write,
};