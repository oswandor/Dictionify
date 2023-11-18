<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-content">

            <ion-card class="ion-no-margin ion-card">
                <img alt="Silhouette of mountains"
                    src="https://i.pinimg.com/736x/bb/3d/02/bb3d027efc8586606821a1c60c10a986.jpg" />
                <ion-card-header class="ion-card-header-centered">
                    <ion-card-title>
                        <ion-icon :icon="personCircle" size="large"
                            style="color: rgb(98, 62, 168,1);"></ion-icon></ion-card-title>
                    <ion-subtitle>
                        <h1> Login </h1>
                    </ion-subtitle>

                </ion-card-header>

                <ion-card-content class="ion-card-content-centered">
                    <div>
                        <ion-grid>
                            <ion-row>


                                <ion-input label="Users" v-model="usersinput" label-placement="floating" fill="solid"
                                    placeholder="Enter text" class="ion-margin-bottom"></ion-input>

                                <ion-input class="ion-margin-bottom" v-model="passinput" type="password" label="Password"
                                    label-placement="floating" fill="solid" placeholder="Enter text"></ion-input>

                                <ion-col>
                                    <ion-button fill="solid" shape="round" class="ion-margin ion-margin-solid"
                                        @click="Login">
                                        <ion-icon :icon="send" class="ion-margin-end"></ion-icon>login</ion-button>

                                </ion-col>


                            </ion-row>
                        </ion-grid>

                    </div>
                </ion-card-content>
            </ion-card>
        </ion-content>

    </ion-page>
</template>
<script>
import { IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { personCircle, home, logIn, logOut, send } from 'ionicons/icons';
import { auth, signInWithEmailAndPassword } from './firebase.js';
import { Storage } from '@ionic/storage';

export default {
    name: "LoginPage",
    components: {
        IonCol, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },
    data() {
        return {
            logOut,
            logIn,
            home,
            send,
            personCircle,
            usersinput: "",
            passinput: ""

        };
    },

    methods: {

        // metodo de autenticacion 
        async Login() {

            // Validar el correo electrónico antes de intentar iniciar sesión
            if (!this.isValidEmail(this.usersinput)) {
                // Mostrar la alerta si el correo electrónico no es válido
                await this.showInvalidEmailAlert();
                return;
            }

            //  "ronalgonzalez2023sv@gmail.com"   "Gnulinux2023"

            console.log(this.usersinput)

            // logearse  
            signInWithEmailAndPassword(auth, this.usersinput, this.passinput)
                .then( async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                    // instanciar el storage
                    let storage  =   new Storage(); 

                    // create 
                    await storage.create(); 
                    // guardar los datos en storage 
                    await storage.set('uid' , user.uid); 
                 
                    console.log("User Login:", user.uid);
                    // ...
                    this.$router.push('/tabs/FavoritosPage');


                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
        },

        // Función para validar el formato del correo electrónico
        isValidEmail(email) {
            // Utiliza una expresión regular para validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Función para mostrar la alerta de correo no válido
        async showInvalidEmailAlert() {
            const alert = await alertController.create({
                header: 'Correo no válido',
                message: 'Por favor, ingrese un correo electrónico válido.',
                buttons: ['OK'],
            });

            await alert.present();
        },



    }

}
</script>
<style scoped>
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}


.ion-margin-solid {

    --background: rgb(98, 62, 168, 1);
}

.ion-margin-no-solid {

    --border-color: rgb(98, 62, 168, 1);
    --color: rgb(98, 62, 168, 1);
}

.ion-card-header-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.custom-content {
    --ion-background-color: white !important;
    /* Cambia el color de fondo de ion-content a blanco */
}

.ion-cardLogin {
    --ion-background-color: white !important;
    /* Cambia el color de fondo de las tarjetas a blanco */
}

/* Opcional: Cambiar el color del texto dentro de las tarjetas */
.ion-cardLogin ion-card-content {
    color: black !important;
}


/* Eliminar los márgenes del ion-content */
.ion-content {
    --padding-start: 0;
    --padding-end: 0;
    --padding-top: 0;
    --padding-bottom: 0;
}

.ion-card {

    height: 100%;
}


.ion-card-content-centered {

    margin-top: 20%;

}
</style>