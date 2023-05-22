<template>
    <v-app theme="dark" >
        <v-navigation-drawer  temporary v-model="isOpen" width="500" location="right">
             
              <div class="d-flex flex-column h-100">
                  <div class="d-flex align-center justify-space-between pa-4">
                  <h1>{{ $store.state.albumCliked.name }}</h1>
                  <v-btn @click="closetracks()" icon="mdi-close"/>
              </div>
              
              <div>
                  <v-col >
                      <div class="d-flex">
                          <div class="bg-white px-2 " >
                              <v-img style="width: 200px" :src="$store.state.urlImageAlbum" />  
                          </div>
                          <div class="pa-4 mr-4"> 
                              <p class="text-lg-h5">{{$store.state.trackArtist}}</p>
                              <p class="pl-1 font-weight-light">faixas: {{$store.state.tracksAlbums.length}}</p>
                          </div>
                      </div>
             
                      <div class="h-100 overflow-y-auto">
                          <v-list  
                              v-for="track, index in $store.state.tracksAlbums">
                              <v-list-item>{{index + 1}} - {{track.name}}</v-list-item>
                          </v-list>
                      </div>              
                       
                      <div class="d-flex flex-row-reverse  mt-auto pa-4"> 
                          <td><a class="text-white text-h6 " :href="$store.state.linkAlbumSpotify">Ouça o album no spotify!</a></td>
                      </div>    
              
                  </v-col>
              </div>
            </div>
        </v-navigation-drawer>
  
        <v-layout>
            <v-app-bar flat density="comfortable" class="text-center border-b">
            <v-app-bar-title class="text-h4 text-amber-accent-3 font-weight-black"> Horizonfy</v-app-bar-title>
            </v-app-bar>
          
            <v-main class="mt-6">
                <v-card
                    class="mx-auto   px-12"
                    max-width="600"
                >
        
                <v-sheet >Nome do artista
                    <v-form class="text-amber-accent-3"  @submit.stop.prevent="getInput">
                        <div class="seach">
                            <v-text-field  
                                v-model="inputChange"
                                lear-icon="text-amber-accent-3"
                            ></v-text-field>

                            <v-btn type="submit" class="bg-amber-accent-3" >Buscar</v-btn>
                        </div>
                    </v-form>
                </v-sheet>
        
                </v-card>
                <v-container>
                    <div
                        v-if="!$store.state.albums.length"
                        class="text-center">
                            Encontre seu artista favorito!
                    </div>
                                
                    <v-row>
                        <v-col
                            v-for="album in $store.state.albums"
                            v-bind:key="album.id"
                            cols="12" sm="6" md="4" lg="3"
                        >
                            <v-card flat class="border">
                                <div class="bg-white px-6 py-2">
                                    <v-img :src="album.images[0].url" />  
                                </div>        
  
                                <v-card-text  text>
                                    <h4>{{ album.name }}</h4>
                                    <div class="my-4">
                                        <div class="font-weight-light">{{ album.artists[0].name }}</div>
                                        <div class="font-weight-light">Faixas: {{ album.total_tracks }}</div>
                                        <div class="font-weight-light">Data de lançamento: {{ new Date(album.release_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})  }}</div>
                                    </div>
                                    <v-btn flat block :title="album.id" @click="showTracks(album.id)" color="amber-accent-3">Ver mais</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
      
    </v-app>
  </template>
  
  <script>
   
      import { ref } from 'vue'
      import { useStore } from 'vuex'
   
      export default {
          name: "App",
  
          setup(){
              const loading = ref(false)
              const inputChange = ref('')
              const isOpen = ref(false)
              const albums = ref([])
              const store = useStore()
          
              loading.value = true
              store.dispatch('getToken')
                 
              const showTracks =(album_Id)=> {
                  store.dispatch('getTracks', {
                  album_id:album_Id,
              })
          
              return isOpen.value = true;
          }
  
          const closetracks = () => {
              return isOpen.value = false;
          }
          
          const getInput = () => {
              if (!inputChange.value) {
                  return false;
              }
              const teste = ref(true)
                  store.dispatch('getAlbumsArtist', {
                  inputChange: inputChange.value,

              }).finally(() => {
                 inputChange.value = ''
              })
          }
  
          return {  
                  loading,
                  inputChange,
                  getInput,
                  isOpen,
                  showTracks,
                  closetracks,
                  albums: store.state.albums
          }
      }
   } 
</script>
  

<style>
    .seach{
        display: flex;
        gap: 16px;
        align-items: center;
    }

    .label{
        color:#BF360C
    }
</style>