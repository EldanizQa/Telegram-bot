const telegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '5161286444:AAEhNrLIuXnHsJC3_KmemDOwSvZMU8MnM0I'

const bot = new telegramApi(token, {polling: true})

const chats = {}





const startGame = async(chatId) => {
    await bot.sendMessage(chatId, `Я загадаю цифру от 0 - до 9, а ты отгадай`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
    bot.setMyCommands(      [
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Получить информацию о себе'},
        {command: '/game', description: 'Игра отгадай цифру'}
    ])
    
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start') {
            await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/80a/5c9/80a5c9f6-a40e-47c6-acc1-44f43acc0862/9.webp` )
            return bot.sendMessage(chatId, 'Добро пожаловать в бот двух аутистов ')
        }
        if( text ==='/info'){
            await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/f32/45c/f3245cf8-d73a-373a-ac5b-91ebae4f53f5/3.webp` )
            return bot.sendMessage(chatId, `Я слежу за тобой ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if( text ==='/game'){
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `Ты че аутист? Такой команды нет!!!`)
    })

    bot.on( 'callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал ${chats[chatId]}`, againOptions)
        }else{
            return bot.sendMessage(chatId, `Не фортануло, попробуй еще. Загаданное число было  ${chats[chatId]}`, againOptions)
        }
    })

}

start()