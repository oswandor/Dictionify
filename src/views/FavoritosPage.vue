<template>
    <ion-page>
        <ion-content>
            <h1>Lista de Favoritos</h1>

            <ion-list>
                <ion-item v-for="favorite in favoritesList" :key="favorite._id.$oid">
                    <ion-card>
                        <ion-card-header>
                            <ion-card-subtitle>{{ favorite.favoritos.word }}</ion-card-subtitle>
                            <ion-card-title>{{ favorite.favoritos.definition }}</ion-card-title>
                        </ion-card-header>

                        <ion-card-content>
                            <ion-label><strong>Ejemplos:</strong></ion-label>
                            <ion-list>
                                <ion-item v-for="example in favorite.favoritos.examples" :key="example">
                                    {{ example }}
                                </ion-item>
                            </ion-list>

                            <ion-label><strong>Sinónimos:</strong> {{ favorite.favoritos.synonyms.join(', ') }}</ion-label>
                            <ion-label><strong>Antónimos:</strong> {{ favorite.favoritos.antonyms.join(', ') }}</ion-label>
                            <!-- Botón de eliminación -->
                            <ion-button @click="deleteFavorite(favorite._id.$oid)">
                                <ion-icon :icon="trash"></ion-icon>
                            </ion-button>


                        </ion-card-content>
                    </ion-card>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonList, IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { trash } from 'ionicons/icons';


export default {
    name: 'FavoritosPage',
    components: {

        IonList, IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },
    data() {
        return {
            favoritesList: [],
            trashIcon: trash,
            uid: '' 
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

        // Función para eliminar un favorito
        async deleteFavorite(favoriteId) {
            try {

                console.log(favoriteId)
               
                const apiUrl = 'https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io';
                await axios.delete(`${apiUrl}/deleteUserFavoritesByIdDiccionary/${this.uid}/${favoriteId}`);
                

                const url =  `${apiUrl}/deleteUserFavoritesByIdDiccionary/${this.uid}/${favoriteId}` ; 
                console.log(url) 
                console.log(this.uid)
                // Vuelve a cargar la lista después de eliminar
                this.getAllUserFavorites(this.uid);
            } catch (error) {
                console.error('Error al eliminar el favorito:', error);
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
        this.uid = await storage.get('uid');

        // Hacer algo con los datos recuperados
        console.log('UID from Storage:', this.uid);

        this.getAllUserFavorites(this.uid);

    },
}




</script>
<style></style>