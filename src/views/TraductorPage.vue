<template>
    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-icon class="ion-margin-start" :icon="language" size="large" color="primary" slot="start"></ion-icon>
                <ion-title>Translator</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>

            <br><br>
            <ion-item>

                <select v-model="fromLanguage" interface="action-sheet" cancelText="Cancelar">
                    <option disabled value="">Selecciona un idioma</option>
                    <option value="fr">Francés</option>
                    <option value="en">Inglés</option>
                    <option value="es">Español</option>
                </select>
            </ion-item>


            <div class="ion-input">

                <ion-input aria-label="Tertiary input" color="tertiary" placeholder="Type something here"
                    v-model="textToTranslate" @input="translateText"></ion-input>

            </div>

            <div>
                <ion-item>
                    <select v-model="toLanguages" interface="action-sheet" cancelText="Cancelar">
                        <option disabled value="">Selecciona un idioma</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="es">Español</option>
                    </select>
                </ion-item>


                <div class="ion-input">
                    <ion-input aria-placeholder="Traducción" v-if="translationResult && translationResult.length > 0"
                        :value="translationResult[0].translations[0].text || 'translator'" :auto-grow="true"></ion-input>

                </div>


            </div>

            <!--Botton de cierre de sesion-->
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button>
                    <ion-icon :icon="chevronUpCircle"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="top">
                    <ion-fab-button @click="cerrarSesion">
                        <ion-icon :icon="logOut"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list>
            </ion-fab>

        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonMenu, IonFab, IonFabButton, IonFabList, IonIcon, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    home, logIn, logOut, language
} from 'ionicons/icons';
import { auth, signInWithEmailAndPassword, signOut } from './firebase.js';



export default {
    name: "TraductorPage",
    components: {
        IonMenu, IonFab, IonFabButton, IonFabList, IonIcon, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },
    data() {
        return {
            key: "62341f62cd5b46f1a0e20dee8e30d685",
            endpoint: "https://api.cognitive.microsofttranslator.com/",
            location: "eastus",
            fromLanguage: '',
            toLanguages: '',
            textToTranslate: "",
            translationResult: null,
            language,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            logOut


        };
    },
    methods: {
        translateText() {
            console.log(this.fromLanguage);
            console.log(this.toLanguages);
            console.log(this.textToTranslate);
            axios({
                baseURL: this.endpoint,
                url: '/translate',
                method: 'post',
                headers: {
                    'Ocp-Apim-Subscription-Key': this.key,
                    'Ocp-Apim-Subscription-Region': this.location,
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuidv4().toString(),
                },
                params: {
                    'api-version': '3.0',
                    'from': this.fromLanguage,
                    'to': this.toLanguages,
                },
                data: [
                    {
                        'text': this.textToTranslate,
                    },
                ],
                responseType: 'json',
            })
                .then((response) => {
                    this.translationResult = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        handleFromLanguageChange(event) {
            console.log(event);
            this.fromLanguage = event.detail.value;
        },
        handleToLanguageChange(event) {
            console.log(event);
            this.toLanguages = event.detail.value;
        },


        cerrarSesion() {
            // logica de cerra sesion 
            signOut(auth).then(() => {
                console.log('Cierre de sesión ejecutado');
                this.$router.push('/LoginPage');
            }).catch((error) => {
                console.log(error)
            });

        },

    },
};
</script>
  
<style >
select {
    width: 197px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    border: 1px solid #b486fd;
    border-radius: 8px;
    height: 40px;
    padding-left: 9px;
    position: relative;

}

.ion-input {
    width: 100%;
    height: 188px;
    border-left: 1px solid transparent;
    /* Bordes transparentes en los lados izquierdo y derecho */
    border-right: 1px solid transparent;
    border-top: 1px solid #c9c9c9;
    /* Borde superior */
    border-bottom: 1px solid #c9c9c9;
    /* Borde inferior */
    padding-left: 16px;
}
</style>
  