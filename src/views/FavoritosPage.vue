<template>
    <ion-page>
        <ion-content>

            <div>
                <h1>Lista de Favoritos</h1>
                <ul>
                    <li v-for="favorite in favoritesList" :key="favorite._id.$oid">
                        <h2>{{ favorite.favoritos.word }}</h2>
                        <p><strong>Definición:</strong> {{ favorite.favoritos.definition }}</p>
                        <p><strong>Ejemplos:</strong></p>
                        <ul>
                            <li v-for="example in favorite.favoritos.examples" :key="example">{{ example }}</li>
                        </ul>
                        <p><strong>Sinónimos:</strong> {{ favorite.favoritos.synonyms.join(', ') }}</p>
                        <p><strong>Antónimos:</strong> {{ favorite.favoritos.antonyms.join(', ') }}</p>
                    </li>
                </ul>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { Storage } from '@ionic/storage';
import axios from 'axios';
export default {
    name: 'FavoritosPage',
    components: {

        IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },
    data() {
        return {
            favoritesList: [],
        };
    },

    methods: {
        // para obtener todos los usuarios 
        async getAllUserFavorites(uid) {
            try {
                const apiUrl = 'https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io';
                const response = await axios.get(`${apiUrl}/allUserFavorites/${uid}`);
                this.favoritesList = response.data;

                console.log(this.favoritesList); 
            } catch (error) {
                console.error('Error al obtener favoritos del usuario:', error);
            }
        },
    },


    // para 
   async mounted() {

        // Instanciar el servicio Storage
        let storage = new Storage();

        // Crear el almacenamiento
        await storage.create();

        // Obtener datos del almacenamiento
        const uid = await storage.get('uid');

        // Hacer algo con los datos recuperados
        console.log('UID from Storage:', uid);

        this.getAllUserFavorites(uid);

    },
}




</script>
<style></style>