<template >
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-icon class="ion-margin-start" :icon="book" size="large" color="primary" slot="start"></ion-icon>
                <ion-title>Dictionary</ion-title> 
              
            </ion-toolbar>
        </ion-header>
        <ion-content>

            <br><br><br><br>

            <ion-item>

                <select v-model="searchType" interface="action-sheet" cancelText="Cancelar">
                    <option disabled value="">Select a language</option>
                    <option value="definicion">Definicion</option>
                    <option value="sinonimos">Sinonimo</option>
                    <option value="antonimos">Antonimo</option>
                </select>
            </ion-item>

            <ion-input class="ion-margin-top ion-margin-bottom" v-model="searchTerm" label="Write a word"
                label-placement="floating" fill="outline" placeholder="Enter text"></ion-input>
            <ion-button @click="search" class="ion-margin-start ion-buttondic">Search</ion-button>

            <ion-list>
                <ion-item v-if="results != null" class="ion-text-wrap">
                    <ion-label>

                        <h1>Palabra</h1>
                        <br>
                        <h2>{{ results.word }}</h2>

                        <ion-button type="submit" class="ion-margin ion-margin-no-solid" fill="outline" shape="round"
                            @click="addToFavorites">
                            <ion-icon :icon="starOutline" class="ion-margin-end"></ion-icon>favorito
                        </ion-button>

                        <br><br>
                        <ion-label class="ion-text-wrap" v-if="results.definition">
                            <h1>Definicion</h1>
                            <br>
                            {{ results.definition }}

                        </ion-label>

                        <ion-list v-if="results.examples" :inset="true">
                            <p>Ejemplos de la Palabra</p>
                            <ion-item v-for="(example, index) in results.examples" :key="index">
                                <p> {{ example }}</p>
                            </ion-item>
                        </ion-list>

                        <ion-label v-if="results.sinonimos">

                            <h1>Sinonimos</h1>
                            <br>
                            {{ getResultText(results) }}

                        </ion-label>

                        <ion-label class="ion-text-wrap" v-if="results.antonimos">
                            <h1>Antonimos</h1>
                            <br>
                            {{ getResultText(results) }}
                        </ion-label>

                    </ion-label>

                </ion-item>
                <ion-item v-else>
                    <ion-label>
                        <p>La palabra no fue encontrada.</p>
                    </ion-label>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>
<script>
import { IonIcon, IonSearchbar, IonList, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

import axios from 'axios';
import { book, home, logIn, logOut, language, starOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage';

export default {
    name: "DiccionariPage",

    components: {
        IonIcon, IonSearchbar, IonList, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },

    data() {
        return {
            searchTerm: "",
            results: null,
            searchType: "",
            book,
            starOutline,
            favorites: []

        };
    },
    methods: {

        search() {


            console.log(this.searchTerm)

            axios.get(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/${this.searchType}/${this.searchTerm}`).then((response) => {
                this.results = response.data;
                console.log(this.results);
            });

        },

        getResultText(results) {
            if (results) {
                if (this.searchType === "sinonimos") {
                    return results.sinonimos.join(", ");
                } else if (this.searchType === "antonimos") {
                    return results.antonimos.join(", ");
                }
            }
            return "";
        },
      async  addToFavorites(word) {

            console.log(this.results)

            let storage = new Storage();

            // Crear el almacenamiento
            await storage.create();

            // Obtener datos del almacenamiento
            const uid = await storage.get('uid');

            // Hacer algo con los datos recuperados
            console.log('UID from Storage:', uid);

            axios.post(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/addFavorite`, {
                uid: uid,
                idDiccionary: this.results._id
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });


        }

    }
}
</script>
<style >
.ion-buttondic {

    --background: rebeccapurple;
}

.ion-margin-no-solid {
    margin-bottom: 20px;
    --border-color: rgb(98, 62, 168, 1);
    --color: rgb(98, 62, 168, 1);
    float: right;
}
</style>