<template lang="">
    <div>
      <v-card max-width="600" class="mx-auto my-2">
        <router-link v-if="!admin" :to="{name: 'galeriePhotoDetail', params: {id: bal._id}}">
        <v-img  :src="bal.photos[0]" >
        </v-img>
        </router-link>
        <v-carousel v-else hide-delimiters>
          <v-carousel-item
            v-for="(item,i) in bal.photos"
            :key="i"
            :src="item"
            height="400"           
          ></v-carousel-item>
        </v-carousel>
            
            <div class="pa-2">
              <div class="title">{{ bal.name }}</div>
              <div class="grey--text subtitle-1">{{ doneAt() }}</div>
            </div>

            <v-card-actions v-if="admin">
              <!-- <span class="title"> {{ bal.name }} </span> -->
              <v-spacer></v-spacer>

             <v-btn  icon>
                    <v-icon @click="remove(bal._id)" color="red" size="40">remove_circle</v-icon>
                  </v-btn>
            </v-card-actions>
          </v-card>
        
         
    </div>
</template>
<script>
import utils from "@/utils/string.js";

export default {
  name: "galeriePhotoItem",
  props: ["bal", "admin"],
  data: () => ({
    show: false
  }),

  methods: {
    remove(id) {
      this.$store.dispatch("adminBal/deleteBal", id);
    },
    doneAt() {
      return utils.getDate(this.bal.doneAt);
    }
  }
};
</script>