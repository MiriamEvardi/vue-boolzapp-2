<script>

import {auth, db} from '../main';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {doc, setDoc, getDoc, updateDoc, arrayUnion, collection, onSnapshot} from 'firebase/firestore';

export default {
    name: 'Appbody',


    data() {
        return {

            activeIndex: 0,
            myNewMessage: '',
            search: '',
            newContact: '',
            logIn: false,
            isDarkMode: false,
            newUserMail: '',
            newUserPassword: '',

            randomAnswer: [
                "Ok.",
                "Grazie",
                "Ciao",
                "Sì",
                "Dovresti saperlo.",
                "Lasciami stare",
                "Fai come vuoi.",
                "Non sei tu sono io",
                "Non sono arrabbiata.",
                "No"
            ],

            user: {
                id: '',
                userName: '',

            },

            userData: {


            },

            contacts: [
                // {
                //     name: 'Michele',
                //     avatar: './img/avatar_1.jpg',
                //     visible: true,
                //     lastActivity: '16:15',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '10/01/2020 15:30:55',
                //             message: 'Hai portato a spasso il cane?',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 15:50:00',
                //             message: 'Ricordati di stendere i panni',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 16:15:22',
                //             message: 'Tutto fatto!',
                //             status: 'received'
                //         }
                //     ],
                // },
                // {
                //     name: 'Fabio',
                //     avatar: './img/avatar_2.jpg',
                //     visible: true,
                //     lastActivity: '16:30',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '20/03/2020 16:30:00',
                //             message: 'Ciao come stai?',
                //             status: 'sent'
                //         },
                //         {
                //             date: '20/03/2020 16:30:55',
                //             message: 'Bene grazie! Stasera ci vediamo?',
                //             status: 'received'
                //         },
                //         {
                //             date: '20/03/2020 16:35:00',
                //             message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                //             status: 'sent'
                //         }
                //     ],
                // },
                // {
                //     name: 'Samuele',
                //     avatar: './img/avatar_3.jpg',
                //     visible: true,
                //     lastActivity: '16:15',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '28/03/2020 10:10:40',
                //             message: 'La Marianna va in campagna',
                //             status: 'received'
                //         },
                //         {
                //             date: '28/03/2020 10:20:10',
                //             message: 'Sicuro di non aver sbagliato chat?',
                //             status: 'sent'
                //         },
                //         {
                //             date: '28/03/2020 16:15:22',
                //             message: 'Ah scusa!',
                //             status: 'received'
                //         }
                //     ],
                // },
                // {
                //     name: 'Alessandro B.',
                //     avatar: './img/avatar_4.jpg',
                //     visible: true,
                //     lastActivity: '15:50',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '10/01/2020 15:30:55',
                //             message: 'Lo sai che ha aperto una nuova pizzeria?',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 15:50:00',
                //             message: 'Si, ma preferirei andare al cinema',
                //             status: 'received'
                //         }
                //     ],
                // },
                // {
                //     name: 'Alessandro L.',
                //     avatar: './img/avatar_5.jpg',
                //     visible: true,
                //     lastActivity: '15:50',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '10/01/2020 15:30:55',
                //             message: 'Ricordati di chiamare la nonna',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 15:50:00',
                //             message: 'Va bene, stasera la sento',
                //             status: 'received'
                //         }
                //     ],
                // },
                // {
                //     name: 'Claudia',
                //     avatar: './img/avatar_6.jpg',
                //     visible: true,
                //     lastActivity: '15:50',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '10/01/2020 15:30:55',
                //             message: 'Ciao Claudia, hai novità?',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 15:50:00',
                //             message: 'Non ancora',
                //             status: 'received'
                //         },
                //         {
                //             date: '10/01/2020 15:51:00',
                //             message: 'Nessuna nuova, buona nuova',
                //             status: 'sent'
                //         }
                //     ],
                // },
                // {
                //     name: 'Federico',
                //     avatar: './img/avatar_7.jpg',
                //     visible: true,
                //     lastActivity: '15:50',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '10/01/2020 15:30:55',
                //             message: 'Fai gli auguri a Martina che è il suo compleanno!',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 15:50:00',
                //             message: 'Grazie per avermelo ricordato, le scrivo subito!',
                //             status: 'received'
                //         }
                //     ],
                // },
                // {
                //     name: 'Davide',
                //     avatar: './img/avatar_8.jpg',
                //     visible: true,
                //     lastActivity: '15:51',
                //     isTyping: false,
                //     online: false,
                //     messages: [
                //         {
                //             date: '10/01/2020 15:30:55',
                //             message: 'Ciao, andiamo a mangiare la pizza stasera?',
                //             status: 'received'
                //         },
                //         {
                //             date: '10/01/2020 15:50:00',
                //             message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                //             status: 'sent'
                //         },
                //         {
                //             date: '10/01/2020 15:51:00',
                //             message: 'OK!!',
                //             status: 'received'
                //         }
                //     ],
                // }
            ]

        }
    },

    created() {
        onAuthStateChanged(auth, async(user) => {

            if(user) {
                this.logIn = true;
                this.user.id = user.uid;
                const user_unsub = onSnapshot(doc(db, "users", this.user.id), (doc) => {
                this.userData = doc.data();
                console.log(this.userData)
                 });    
              }

        });
    },

    mounted() {

        window.addEventListener('resize', function () {
            const sideBarDiv = document.getElementById("sideBar");
            const textDiv = document.getElementById('textChat');

            if (window.innerWidth > 768) {
                sideBarDiv.style.width = "0";
                textDiv.style.width = "0";
                sideBarDiv.style.flexGrow = "1";
                textDiv.style.flexGrow = "2";
            } else {
                sideBarDiv.style.width = "0";
                textDiv.style.width = "100vw";
                sideBarDiv.style.flexGrow = "0";
                textDiv.style.flexGrow = "1";
            }
        })
    },

    methods: {

        async getSignUp() {
            try {
                const userData = await createUserWithEmailAndPassword(auth, this.newUserMail, this.newUserPassword);
                this.logIn = true;
                this.user.id = userData.user.uid;
                console.log(this.user)
                await setDoc(doc(db, 'users', this.user.id), { 
                    messages: [],
                    contacts: [],
                    uid: this.user.id,
                 })
            }catch(error) {
                console.log(error.message);
            }
        },

        // last message time send/received
        getLastTime(contact) {
            if (contact.messages && contact.messages.length > 0) {
                const lastMessage = contact.messages[contact.messages.length - 1];
                const dateTime = lastMessage.date.split(' ');
                const timeSplit = dateTime[1].split(':');
                const hours = `${timeSplit[0]}:${timeSplit[1]}`;
                return hours;
            } else {
                return '';
            }
        },

        // obtain locale time for messages
        getTime(message) {
            const dateTime = message.date.split(' ');
            const timeSplit = dateTime[1].split(':');
            const hours = `${timeSplit[0]}:${timeSplit[1]}`;
            return hours;
        },

        activeContact(index) {
            this.activeIndex = index;

            const sideBarDiv = document.getElementById("sideBar");
            const textDiv = document.getElementById('textChat');

            if (window.innerWidth <= 768) {
                sideBarDiv.style.width = "0vw";
                textDiv.style.width = "100vw";
                sideBarDiv.style.flexGrow = "0";
                textDiv.style.flexGrow = "1";
            }
        },

        // obtained starting time used in addNewMessage
        getTimeStamp() {
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
            const timer = `${date} ${time}`
            return timer;
        },

        // obtained locale time (hour + minutes)
        getHour() {
            const now = new Date();
            const time = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
            return time;
        },


        // send/receive new message
        async addNewMessage() {
            if (this.myNewMessage !== '') {
                this.userData.messages.push({

                    date: `${this.getTimeStamp()}`,
                    message: this.myNewMessage,
                    status: 'sent',
                    from: this.userData.uid,
                    to: '',
                })

                this.scrollToBottom();

                const activeChat = this.activeIndex;

               
               
                this.myNewMessage = '';
                const userRef = doc(db, 'users', this.userData.uid);
                await updateDoc(userRef, {...this.userData});
            }
        },

        // last message
        getLastMessage(contact) {
            if (contact.messages && contact.messages.length > 0) {
                const lastMessage = contact.messages[contact.messages.length - 1];
                let messageText = lastMessage.message;
                const maxLength = 30;

                if (messageText.length > maxLength) {
                    messageText = messageText.substring(0, maxLength) + '...';
                }

                return messageText;
            } else {
                return '';
            }
        },

        // delete a single message
        deleteMessage(messageIndex) {
            this.contacts[this.activeIndex].messages.splice(messageIndex, 1);
        },

        // delete all messages
        deleteAllMessage() {
            this.contacts[this.activeIndex].messages = [];
        },

        // delete conversation
        deleteConversation() {
            this.contacts.splice(this.activeIndex, 1);

            if (this.activeIndex >= this.contacts.length) {
                this.activeIndex = this.contacts.length - 1;
            }
        },

        // can't send an empty message
        sendMessage() {
            if (this.myNewMessage !== '') {
                this.addNewMessage();
            }
        },

        // automatic scroll
        scrollToBottom() {
            const target = this.$refs.myScrollTarget;
            this.$nextTick(() => {
                target.scrollTo(
                    {
                        top: target.scrollHeight,
                        left: 0,
                        behavior: "smooth"
                    }
                );
            });
        },

        // add new contact
        addNewContact() {
            this.contacts.push({
                name: this.newContact,
                avatar: '/img/default-avatar.jpg',
                visible: true,
                lastActivity: this.getTimeStamp(),
                isTyping: false,
                online: false,
                messages: []
            })
        },

        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            const toggleBtn = document.getElementById('toggle-btn');

            if (toggleBtn) {
                toggleBtn.classList.toggle('toggle-btn--dark', this.isDarkMode);
            }
            document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
        },

        backToContacts() {
            const sideBarDiv = document.getElementById("sideBar");
            const textDiv = document.getElementById('textChat');

            if (window.innerWidth <= 768) {
                sideBarDiv.style.width = "100vw";
                textDiv.style.width = "0vw";
                sideBarDiv.style.flexGrow = "1";
                textDiv.style.flexGrow = "0";
            }
        }

    }
}

</script>


<template>
  <div class="splash-page text-white" v-if="logIn == false">

    <h1 class="text-center">Crea un account</h1>
    <div class="row g-3 align-items-center">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input v-model="newUserMail" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
    </div>
    <div class="row g-3 align-items-center">
        <div class="col-auto">
        <label for="inputPassword6" class="col-form-label">Password</label>
    </div>
    <div class="col-auto">
        <input v-model="newUserPassword" type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline">
    </div>
    <button @click="getSignUp()">crea</button>
    <button>entra come ospite</button>
    </div>
</div>

<div class="background-top"></div>


<!-- start chat container -->
<div v-if="logIn == true" class="chat-container container-fluid container-lg">

<!-- sidebar -->
<div class="side-bar border-end border-secondary-subtle" id="sideBar">


    <!-- my profile -->
    <div class="profile d-flex justify-content-between">
        <div class="d-flex align-items-center">
            <div class="profile-pic me-1">
                <img src="/img/avatar_io.jpg" alt="">
            </div>
            <div> Miriam </div>
        </div>
        <div class="d-flex justify-content-between align-items-center gap-3 fs-5 me-3">
            <div @click="toggleDarkMode()" id="toggle-btn" :class="{ 'toggle-btn--dark': isDarkMode }">
            </div>
            <i class="fa-solid fa-circle-notch d-lg-block d-none"></i>
            <i class="fa-solid fa-message d-lg-block d-none"></i>

            <!-- start dropdown contacts -->
            <div class="dropdown">
                <span type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="icon-container">
                        <i class="fa-solid fa-ellipsis-vertical p-1"></i>
                    </div>
                </span>

                <!-- add new chat -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item">Insert name <input v-model="newContact"
                                @keyup.enter="addNewContact()" type="text"> </a></li>
                </ul>
            </div>
        </div>
    </div>


    <!-- notifications -->
    <div class="notification d-flex align-items-center">
        <div class="profile-pic notify-icon me-2 text-center">
            <i class="fa-regular fa-bell-slash mt-2 pt-1 fs-4"></i>
        </div>
        <div class="lh-1">
            <div>Ricevi notifiche di nuovi messaggi</div>
            <div><a href="#">Attiva notifiche desktop</a></div>
        </div>
    </div>


    <!-- search bar -->
    <div class="search-bar p-2">
        <div class="input-group flex-nowrap">
            <span class="input-group-text px-4" id="addon-wrapping"><i
                    class="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" class="form-control" placeholder="Cerca una chat" aria-label="Username"
                aria-describedby="addon-wrapping" v-model="search">
        </div>
    </div>


    <!-- contacts -->
    <div class="contacts">
        <div class="contact align-items-start pt-2" v-for="(currentContact, index) in contacts"
            :class=" index == activeIndex ? 'active' : ''" @click="activeContact(index)"
            v-show="currentContact.name.toLowerCase().includes(search.toLowerCase())">
            <div class="user-pic me-3">
                <img :src="currentContact.avatar" alt="">
            </div>
            <div>
                <div class="lh-2 mb-3">
                    <div class="name">{{currentContact.name}}</div>
                    <div class="last-message">
                        {{ getLastMessage(currentContact) }}
                    </div>
                </div>
            </div>
            <div class="last-message ms-auto me-2">{{getLastTime(currentContact)}}</div>
        </div>

    </div>
</div>



<div class="chat d-flex flex-column justify-content-between" id="textChat">

    <!-- user profile when chat is opened -->
    <div class="addressee d-flex justify-content-between align-items-center">

        <div class="d-flex align-items-center ms-2 ">
            <div @click="backToContacts()" class="back-arrow d-block d-md-none ">
                <i class="fas fa-arrow-left"></i>
            </div>

            <div class="profile-pic me-1" v-for="(currentChat, index) in contacts"
                v-show="index == activeIndex">
                <img :src="currentChat.avatar" alt="">
            </div>

            <!-- top bar in opened chat -->
            <div class="ms-3 lh-2" v-for="(currentChat, index) in contacts" v-show="index == activeIndex">
                <div> {{currentChat.name}}</div>
                <div v-if="!currentChat.isTyping && !currentChat.online" class="last-access">Ultimo accesso
                    alle
                    {{currentChat.lastActivity.split(' ')[0]}}
                </div>
                <div class="last-access" v-else-if="currentChat.isTyping">Sta scrivendo...</div>
                <div class="last-access" v-else-if="currentChat.online">Online</div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center gap-3 fs-5 me-3">
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-paperclip"></i>



            <!-- dropdown delete -->
            <div class="dropdown">
                <span type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical p-2"></i>
                </span>


                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <!-- delete conversation -->
                    <li><a class="dropdown-item" @click="deleteConversation()" href="#">Delete Conversation
                        </a></li>
                    <!-- delete all messages -->
                    <li><a class="dropdown-item" @click="deleteAllMessage()" href="#">Delete All
                            Messages</a></li>
                </ul>
            </div>
        </div>
    </div>



    <!-- Chat box -->
    <div class="middle-container p-4" ref="myScrollTarget">

        <!--messages -->
        <div class="d-flex " v-for="(currentMessage, index) in contacts[activeIndex]?.messages"
            :class="currentMessage.status == 'sent'? 'justify-content-end' : 'justify-content-start'"
            @submit="addNewMessage()">

            <div class="my-message mb-2 position-relative"
                :class="currentMessage.status == 'sent'? 'sent' : 'received'">
                <div>
                    <p><span class="message-text">{{ currentMessage.message }}</span></p>


                    <div class="d-flex justify-content-end time align-self-end">{{ getTime(currentMessage)
                        }}</div>
                </div>

                <!-- dropdown delete -->
                <div class="dropdown position-absolute end-0 top-0 mt-2 me-1">
                    <span type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-chevron-down"></i>
                    </span>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" href="#">Message
                                Info</a></li>
                        <!-- delete message -->
                        <li><a class="dropdown-item" @click="deleteMessage(index)" href="#">Delete
                                Message</a></li>
                    </ul>
                </div>

            </div>
        </div>

    </div>


    <!-- chat text -->
    <div class="chat-text">
        <div class=" addressee d-flex align-items-center justify-content-between">

            <div class="px-4">
                <i class="fa-regular fa-face-smile fs-3 text-secondary"></i>
            </div>

            <!-- typing bar -->
            <input type="text" class="form-control p-2" placeholder="Scrivi un messaggio"
                aria-label="chat-text" aria-describedby="basic-addon1"
                @keyup.enter="addNewMessage(activeIndex)" v-model="myNewMessage">

            <div class="px-4" v-if="!myNewMessage">
                <i class="fa-solid fa-microphone fs-3 text-secondary"></i>
            </div>

            <div class="px-4" v-else @click="sendMessage()">
                <i class="fa-solid fa-paper-plane fs-3 text-secondary"></i>
            </div>

        </div>

    </div>


</div>

</div>



</template>


<style></style>