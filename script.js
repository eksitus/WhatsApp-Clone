// Create a new Date object representing the current date and time
const currentDate = new Date();

// Get the current hour and minute from the Date object
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();

// Format the hour and minute to have leading zeros if they are less than 10
const formattedHour = String(currentHour).padStart(2, '0');
const formattedMinute = String(currentMinute).padStart(2, '0');
const currentTime = formattedHour + ':' + formattedMinute





const chatsLog = [
  {
    id: 0,
    contact:'Rin Tin Can',
    contactProfilePicture: 'profile-pictures/0.jpg', 
    chat:[
      {
        time:currentTime,
        content:'Hi',
        isOut : false
      },{
        time:currentTime,
        content:'Hello',
        isOut : true
      },{
        time:currentTime,
        content:'How are you?',
        isOut : false
      },{
        time:currentTime,
        content:"Fine",
        isOut: true,
      }
    ]
  },
  {
    id: 1,
    contact:'Joe Dalton',
    contactProfilePicture: 'profile-pictures/1.jpg', 
    chat:[
      {
        time:currentTime,
        content:'Halo',
        isOut : true
      },{
        time:currentTime,
        content:'Halo!',
        isOut : false
      },{
        time:currentTime,
        content:'Wie geht es dir?',
        isOut : true
      },{
        time:currentTime,
        content:"Gut",
        isOut: false,
      }
    ]
  },
  {
    id: 2,
    contact:'Jolly Jumper',
    contactProfilePicture: 'profile-pictures/2.jpg', 
    chat:[
      {
        time:currentTime,
        content:'Hello',
        isOut : true
      },{
        time:currentTime,
        content:'Hello!!',
        isOut : false
      },{
        time:currentTime,
        content:'Where are you?',
        isOut : true
      },{
        time:currentTime,
        content:"I'am at home",
        isOut: false,
      }
    ]
  }
]



const body = document.body;
const chatsContainer = document.querySelector('.chatboxes-container');
const inputField = document.getElementById('input-field')
const leftChatBox = document.querySelector('.chats-container')
inputField.addEventListener('keydown',(e)=>{getInputValue(e)})

const chats = document.querySelectorAll('.chat')
let currentChatId
function newMessage(content,time,isOut) {
  this.content = content
  this.time = time
  this.isOut = isOut
}

for (let index = 0; index < chats.length; index++) {
  const element = chats[index];
  //console.log(element.id)
  
}

chatsLog.forEach(element => {
  leftChatBox.appendChild(chatCreator(element.id))
  console.log('done')
});

for (const iterator of leftChatBox.children) {
  iterator.addEventListener('click',()=>{
    chatsContainer.innerHTML = ''
    currentChatId = iterator.id
    console.log(currentChatId)
    getChatScene(iterator.id)
  })
}




function getChatScene(chatId) {
  const profilePicturePath = chatsLog[chatId].contactProfilePicture
  console.log(profilePicturePath)
  body.querySelector('.message-profile-picture').setAttribute('src',profilePicturePath) 
  body.querySelector('.current-contact-name').innerText = chatsLog[chatId].contact
  chatsLog[chatId].chat.forEach((message)=>{
    if (message.isOut) {
      createOwnerMessage(message.content)
    }else{
      createContactMessage(message.content)
    }
  })
  chatsContainer.scrollTo(0,chatsContainer.scrollHeight)
}


function chatCreator(chatId) {

  const profilePicturePath = 'profile-pictures/' + chatId + '.jpg'
  const len = chatsLog[chatId].chat
  const lastMessage = chatsLog[chatId].chat[len.length-1]
  const chat1 = document.createElement('div')
  chat1.setAttribute('class','chat')
  chat1.setAttribute('id',chatId)

  const profile = document.createElement('div')
  profile.setAttribute('class','profile')

  const profilePicture = document.createElement('img')
  profilePicture.setAttribute('class','profile-picture')
  profilePicture.setAttribute('src',profilePicturePath)
  profile.appendChild(profilePicture)
  chat1.appendChild(profile)

  const sideInfoContainer = document.createElement('div')
  sideInfoContainer.setAttribute('class','side-info-container')
  
  const sideName = document.createElement('div')
  sideName.setAttribute('class','side-name')
  sideName.innerText = chatsLog[chatId].contact
  
  const sideMessage = document.createElement('div')
  sideMessage.setAttribute('class','side-message')
  sideMessage.innerText = lastMessage.content

  const date = document.createElement('div')
  date.setAttribute('class','date')
  date.innerText = lastMessage.time

  sideInfoContainer.appendChild(sideName)
  sideInfoContainer.appendChild(sideMessage)
  sideInfoContainer.appendChild(date)

  chat1.appendChild(sideInfoContainer)

  return chat1;
}



function getInputValue(e) {
  let inputValue = inputField.value
  sendMessage(e,inputValue)
}

function sendMessage(e,input) {
  if (e.keyCode == 13 && input.trim()) {
    
    console.log(e.keyCode)
    createOwnerMessage(input)
    newMessageCreate(input,currentChatId,true)
    loopOverChat(chatsLog)
    createContactMessage('response')
    newMessageCreate('response',currentChatId,false)
    inputField.value = ''
    chatsContainer.scrollTo(0,chatsContainer.scrollHeight)

  }
}

function loopOverChat(chatsLog) {
  chatsLog.forEach(element => {
    console.log(element)
  });
}

function createOwnerMessage(params) {
    const messageBox = document.createElement('div')
    messageBox.setAttribute('class','owner-message-row')

    const message = document.createElement('div')
    message.setAttribute('class','owner-message-box')
    
    const messageContent = document.createElement('div')
    messageContent.setAttribute('class','owner-message-content')
    messageContent.innerText = params
    
    const messageTime = document.createElement('div')
    messageTime.setAttribute('class','owner-send-time')
    
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    messageTime.innerText = currentHour + ':' + currentMinute
    
    messageBox.appendChild(message)
    message.appendChild(messageContent)
    message.appendChild(messageTime)
    chatsContainer.appendChild(messageBox)


}

function createContactMessage(params) {
    const messageBox = document.createElement('div')
    messageBox.setAttribute('class','contact-message-row')

    const message = document.createElement('div')
    message.setAttribute('class','contact-message-box')
    
    const messageContent = document.createElement('div')
    messageContent.setAttribute('class','contact-message-content')
    messageContent.innerText = params
    
    const messageTime = document.createElement('div')
    messageTime.setAttribute('class','contact-send-time')
    
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    messageTime.innerText = currentHour + ':' + currentMinute
    
    messageBox.appendChild(message)
    message.appendChild(messageContent)
    message.appendChild(messageTime)
    chatsContainer.appendChild(messageBox)

}

function newMessageCreate(input,id,isOut) {
  const newMessage1 = new newMessage(input,currentTime,isOut);
  chatsLog[id].chat.push(newMessage1)
}

