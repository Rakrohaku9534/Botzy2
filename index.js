const { modul } = require('./module');
const moment = require('moment-timezone');
const yargs = require('yargs/yargs')
const lolcatjs = require('lolcatjs')
const { Boom } = require('@hapi/boom')
const _ = require('lodash')
const axios = require('axios')
const { baileys, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber } = modul;
const { default: iikyyConnect, useSingleFileAuthState, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, jidDecode, proto } = require("@adiwajshing/baileys")
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./Library/color')
const colors = require('colors')
const { uncache, nocache } = require('./Library/loader')
const { start } = require('./Library/spinner')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./Library/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./Library/myfunc')
const owner = JSON.parse(fs.readFileSync('./Database/owner.json'))

var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./Library/lowdb')
}

const { Low, JSONFile } = low 
const mongoDB = require('./Library/mongoDB')
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`Database/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    group: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    donate: {},
    others: {},
    sticker: {},
    anonymous: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)
  
const me = 
require('./BotzAku.js')
nocache('../BotzAku.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

function title() {
      console.clear()
      console.log(chalk.yellow(`\n\n               ${chalk.bold.yellow(`[ ${botname} ]`)}\n\n`))
      console.log(color(`< ================================================== >`, 'cyan'))
	console.log(color(`\n${themeemoji} YT CHANNEL: fahrul2951`,'magenta'))
console.log(color(`${themeemoji} GITHUB: Fahrul6868 `,'magenta'))
console.log(color(`${themeemoji} WA NUMBER: ${owner}`,'magenta'))
console.log(color(`${themeemoji} CREDIT: ${wm}\n`,'magenta'))
}

async function iikyyBot() {
    	const { state, saveCreds } = await useMultiFileAuthState('Sessions')
        const iikyy = iikyyConnect({
            printQRInTerminal: true,
            logger: pino({ level: 'fatal' }),
            auth: state,
            browser: [`${botname}`, "Safari", "3.0"],
	    getMessage: async key => {
              return {
                
              }
          }
        })
        store.bind(iikyy.ev)

console.log(color(figlet.textSync(`BotzAku`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
}), 'green'))

iikyy.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    let pa7rick = await iikyy.sendContact(callerId, global.owner)
    iikyy.sendMessage(callerId, { text: `*Sistem otomatis block!*\n*Jangan menelpon bot*!\n*Silahkan Hubungi Owner Untuk Dibuka !*`})
    await sleep(8000)
    await iikyy.updateBlockStatus(callerId, "block")
    }
    })

iikyy.ws.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))}})

iikyy.ev.on('messages.upsert', async chatUpdate => {
try {
kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast') return
if (!iikyy.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
m = smsg(iikyy, kay, store)
require('./BotzAku')(iikyy, m, chatUpdate, store)
} catch (err) {
console.log(err)}})

	// detect group update
		iikyy.ev.on("groups.update", async (json) => {
			try {
ppgroup = await iikyy.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
			console.log(json)
			const res = json[0];
			if (res.announce == true) {
				await sleep(2000)
				iikyy.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admins can send messages !`,
				});
			} else if (res.announce == false) {
				await sleep(2000)
				iikyy.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nThe group has been opened by admin, Now participants can send messages !`,
				});
			} else if (res.restrict == true) {
				await sleep(2000)
				iikyy.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !`,
				});
			} else if (res.restrict == false) {
				await sleep(2000)
				iikyy.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\nGroup info has been opened, Now participants can edit group info !`,
				});
			} else if(!res.desc == ''){
				await sleep(2000)
				iikyy.sendMessage(res.id, { 
					text: `「 Group Settings Change 」\n\n*Group description has been changed to*\n\n${res.desc}`,
				});
      } else {
				await sleep(2000)
				iikyy.sendMessage(res.id, {
					text: `「 Group Settings Change 」\n\n*Group name has been changed to*\n\n*${res.subject}*`,
				});
			} 
			
		});
		
iikyy.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await iikyy.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await iikyy.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await iikyy.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
//welcome\\
memb = metadata.participants.length
BotzIkyWlcm = await getBuffer(ppuser)
BotzIkyLft = await getBuffer(ppuser)
                if (anu.action == 'add') {
                const buffer = await getBuffer(ppuser)
                let BotzIkyName = num
                const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	            const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
	            const xmembers = metadata.participants.length
                BotzIkybody = `*Hai Kak 👋🏻 @${BotzIkyName.split("@")[0]}, Welcome to ${metadata.subject}.*\n\n_info selengkapnya baca deskripsi ya kak_\n\n*BotzAku by fahrul*`
iikyy.sendMessage(anu.id,
 { text: BotzIkybody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": `𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝗚𝗿𝗼𝘂𝗽 👋🏻`,
"body": `📢 Group Notification`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": BotzIkyWlcm,
"sourceUrl": ``}}})
                } else if (anu.action == 'remove') {
                	const BotzIkybuffer = await getBuffer(ppuser)
                    const BotzIkytime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	                const BotzIkydate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                	let BotzIkyName = num
                    const BotzIkymembers = metadata.participants.length
                    BotzIkybody = `*GoodBye 👋🏻, @${BotzIkyName.split("@")[0]}*`
iikyy.sendMessage(anu.id,
 { text: BotzIkybody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": `𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋🏻`,
"body": `📢 Group Notification`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": BotzIkyLft,
"sourceUrl": ``}}})
} else if (anu.action == 'promote') {
const BotzIkybuffer = await getBuffer(ppuser)
const BotzIkytime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const BotzIkydate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let BotzIkyName = num
BotzIkybody = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @${BotzIkyName.split("@")[0]}, you have been *promoted* to *admin* 🥳`
   iikyy.sendMessage(anu.id,
 { text: BotzIkybody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": `𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀 👏🏻 🎉`,
"body": `📢 Group Notification`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": BotzIkyWlcm,
"sourceUrl": ``}}})
} else if (anu.action == 'demote') {
const BotzIkybuffer = await getBuffer(ppuser)
const BotzIkytime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const BotzIkydate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let BotzIkyName = num
BotzIkybody = `𝗢𝗼𝗽𝘀‼️ @${BotzIkyName.split("@")[0]}, you have been *demoted* from *admin* 😬`
iikyy.sendMessage(anu.id,
 { text: BotzIkybody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": `𝗜𝗺 𝘀𝗼𝗿𝗿𝘆 😔`,
"body": `📢 Group Notification`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": BotzIkyLft,
"sourceUrl": ``}}})
}
}
} catch (err) {
console.log(err)
}
})

iikyy.sendTextWithMentions = async (jid, text, quoted, options = {}) => iikyy.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

iikyy.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

iikyy.ev.on('contacts.update', update => {
for (let contact of update) {
let id = iikyy.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

iikyy.getName = (jid, withoutContact  = false) => {
id = iikyy.decodeJid(jid)
withoutContact = iikyy.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = iikyy.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === iikyy.decodeJid(iikyy.user.id) ?
iikyy.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

iikyy.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

iikyy.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await iikyy.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await iikyy.getName(i)}\nFN:${await iikyy.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	iikyy.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

iikyy.setStatus = (status) => {
iikyy.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

iikyy.public = true

iikyy.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await iikyy.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

iikyy.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await iikyy.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

iikyy.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await iikyy.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

iikyy.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await iikyy.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

iikyy.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

iikyy.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

iikyy.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './Library' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

iikyy.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await iikyy.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./Library/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await iikyy.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

iikyy.sendText = (jid, text, quoted = '', options) => iikyy.sendMessage(jid, { text: text, ...options }, { quoted })

iikyy.serializeM = (m) => smsg(iikyy, m, store)

iikyy.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update	
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); iikyy.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); iikyyBot(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); iikyyBot(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); iikyy.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); iikyy.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); iikyyBot(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); iikyyBot(); }
else iikyy.end(`Unknown DisconnectReason: ${reason}|${connection}`)
} else if (connection === "open") { iikyy.sendMessage(owner + "@s.whatsapp.net", { text: `*Bot Sudah Online*` }); }
console.log('Connected...', update)
})

iikyy.ev.on('creds.update', await saveCreds)

start('2',colors.bold.white('\nWaiting for New Messages..'))

iikyy.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
iikyy.sendMessage(jid, buttonMessage, { quoted, ...options })
}
  
iikyy.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: iikyy.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "INR",
"priceAmount1000": "100000",
"url": `${websitex}`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${ownernumber}@s.whatsapp.net`
}
}, options)
return iikyy.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

iikyy.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
iikyy.relayMessage(jid, template.message, { messageId: template.key.id })
}

iikyy.sendButImg = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
iikyy.sendMessage(jid, fjejfjjjer, { quoted: m })
}

return iikyy

}

iikyyBot()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})