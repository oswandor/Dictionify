<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-icon class="ion-margin-start" :icon="book" size="large" color="primary" slot="start"></ion-icon>
                <ion-title>Lista de Favoritos</ion-title>

            </ion-toolbar>
        </ion-header>
        <ion-content>
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
                            <ion-button @click="deleteFavorite(favorite.favoritos._id.$oid)" color="danger">
                                <ion-icon :icon="trash"></ion-icon>
                            </ion-button>




                        </ion-card-content>
                    </ion-card>
                </ion-item>
            </ion-list>



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
import { IonList, IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { chevronUpCircle ,trash , logOut } from 'ionicons/icons';
import { auth, signInWithEmailAndPassword , signOut  } from './firebase.js';


export default {
    name: 'FavoritosPage',
    components: {

        IonList, IonCol, alertController, IonIcon, IonGrid, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },
    data() {
        return {
            favoritesList: [],
            trashIcon: trash,
            uid: '',
            trash, 
            logOut,
            chevronUpCircle
        };
    },

    methods: {
        // para obtener todos los usuarios 
        async getAllUserFavorites(uid) {
            try {
                const apiUrl = 'https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io';
                const response = await axios.get(`${apiUrl}/allUserFavorites/${uid}`);
                this.favoritesList = response.data;


                console.log(JSON.stringify(this.favoritesList));


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


                const url = `${apiUrl}/deleteUserFavoritesByIdDiccionary/${this.uid}/${favoriteId}`;
                console.log(url)
                console.log(this.uid)
                // Vuelve a cargar la lista después de eliminar
                this.getAllUserFavorites(this.uid);
            } catch (error) {
                console.error('Error al eliminar el favorito:', error);
            }
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
    async updated() {

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