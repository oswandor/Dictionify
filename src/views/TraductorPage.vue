<template>
    <ion-page>
      <div>
        <ion-item>
          <ion-label>Action Sheet Interface</ion-label>
          <ion-select @ionChange="fromLanguage=$event.target.value" interface="action-sheet" placeholder="Selecciona un idioma" cancelText="Cancelar">
            <ion-select-option value="en">Inglés</ion-select-option>
            <ion-select-option value="fr">Francés</ion-select-option>
            <ion-select-option value="es">Español</ion-select-option>
          </ion-select>
        </ion-item>
        <p>Idioma seleccionado: {{ fromLanguage }}</p>
  
        <ion-input placeholder="Type something here" fill="solid" v-model="textToTranslate" @input="translateText"></ion-input>
  
        <div>
          <ion-item>
            <ion-label>Action Sheet Interface</ion-label>
            <ion-select @ionChange="toLanguages=$event.target.value"  interface="action-sheet" placeholder="Selecciona un idioma" cancelText="Cancelar">
              <ion-select-option value="en">Inglés</ion-select-option>
              <ion-select-option value="fr">Francés</ion-select-option>
              <ion-select-option value="es">Español</ion-select-option>
            </ion-select>
          </ion-item>
          <p>Idioma seleccionado: {{ toLanguages }}</p>
  
          <ion-textarea aria-placeholder="Traducción" v-if="translationResult && translationResult.length > 0" :value="translationResult[0].translations[0].text || 'translator'" :auto-grow="true"></ion-textarea>
        </div>
      </div>
    </ion-page>
  </template>
  
  <script>
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    name: "TraductorPage",
    components: {
      IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
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
            'to': this.toLanguages.join(','),
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
    },
  };
  </script>
  
  <style lang="">
  </style>
  