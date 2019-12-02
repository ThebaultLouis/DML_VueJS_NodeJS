<template>
  <div class="home">
    <!-- <div class="black hidden-sm-and-up">
      <Navbar></Navbar>
    </div>-->
    <!-- <div class="hidden-xs-only"> -->
    <div>
      <div class="hidden-sm-and-down">
        <!-- <v-img src="danse_country.png" height="1080px"> -->
        <v-img src="accueil/picto/page_accueil.png">
          <v-layout align-center justify-end>
            <Navbar></Navbar>
          </v-layout>
          <v-layout column align-center justify-center class="white--text">
            <!-- <v-img src="Logo/utils/logo.png" height="200"></v-img> -->
            <img src="Logo/utils/logo.png" alt="alt" height="300" style="margin-top:100px;" />
          </v-layout>
          <v-layout align-end justify-center style="margin-top:100px;">
            <v-btn class="title" href="#debut" flat dark large outline>Découvrir</v-btn>
          </v-layout>
        </v-img>
      </div>
      <div class="hidden-md-and-up">
        <!-- <img src="accueil/picto/page_accueil.png" alt /> -->
        <div class="bg" style="width:100%">
          <Navbarxs style="position: relative" :isTransparent="true"></Navbarxs>
          <v-layout align-center justify-center class="white--text" full-width>
            <img src="Logo/utils/logo.png" height="150" style="margin-top:20px;margin-left:60px;" />
            <!-- <div class="bg-2"></div> -->
            <div style="height:50px"></div>
          </v-layout>
        </div>

        <!-- <v-img src="accueil/picto/page_accueil.png" width="100%">
        </v-img>-->
        <!-- <v-layout column align-center justify-center>
          <v-img src="accueil/picto/page_accueil.png" width="100%">
            <v-layout justify-start>
            </v-layout>
            <v-layout column align-center justify-center class="white--text" full-width>
              <img
                src="Logo/utils/logo.png"
                alt="alt"
                height="120"
                style="margin-top:20px;margin-left:60px;"
              />
              <div style="height:50px"></div>
            </v-layout>
          </v-img>
        </v-layout>-->
      </div>

      <div id="debut">
        <div id="bonne_note">
          <div class="py-3 amber lighten-4 text-xs-center">
            <v-layout row justify-center align-center>
              <v-flex sm6 xs11>
                <v-img src="accueil/picto/title_bonne_note.png"></v-img>
              </v-flex>
            </v-layout>
          </div>
          <v-img src="accueil/picto/bonnenote.png"></v-img>
          <br class="my-2" />
          <v-img src="accueil/picto/fond_bonne_note.png" position="top">
            <v-layout column align-center justify-center class="px-1">
              <v-avatar size="150" class="my-2">
                <img src="/Logo/utils/avatar_cropped.jpg" alt />
              </v-avatar>
              <br />

              <p class="title">VALERIE SIMON</p>
              <p class="bonne_note_texte">Animatrice danse country</p>
              <p class="text-xs-center bonne_note_texte">Anne-Marie et Franck membres du bureau</p>
              <br class="my-2" />
              <p class="text-xs-center bonne_note_texte">
                La danse est un excellent moyen de vous évader.
                <br />Grâce à cette discipline, vous avez le capacité de vous libérer
                <br />et de laisser libre cours au bien être.
                <br />Quoi de mieux que d'opter pour de la danse country ?
                <br />Les cours de danse des 3 niveaux sont assurés par Valérie.
                <br />La danse en ligne est pratiquée sur tout styles de musiques.
              </p>
              <p class="text-xs-center bonne_note_texte mt-4">
                Tous les cours se dérouleront à
                <br />la salle des boulais Route de Guichen,
                <br />39 rue de la halte
                <br />35890 Laillé
                <br />
                <br />Pour toute demande de renseignement,
                veuillez nous contacter à
                <br />
                <br />Le bureau :
                <a
                  href="mailto:countrydanselaille@gmail.com?subject=Manifestation country"
                >countrydanselaille@gmail.com</a>

                <br />Valérie :
                <a
                  href="mailto:cvaleriedml35@gmail.com?subject=Manifestation country"
                >valeriedml35@gmail.com</a>
              </p>
            </v-layout>
          </v-img>
        </div>
      </div>
      <br class="my-4" />

      <div id="programmes">
        <div class="py-1 amber lighten-4 text-xs-center">
          <v-layout row justify-center align-center>
            <v-layout row justify-center align-center>
              <v-flex sm6 xs11>
                <v-img src="accueil/picto/title_programmes.png"></v-img>
              </v-flex>
            </v-layout>
          </v-layout>
        </div>
        <v-img src="accueil/picto/programmes.png"></v-img>
        <br class="my-2" />
        <v-img src="accueil/picto/fond_ligne.png" position="top">
          <v-layout column align-center justify-center class>
            <p
              class="text-xs-center programmes_texte"
            >Les cours de Country se déroulent le mercredi et sont séparés en trois niveaux :</p>
            <v-layout row align-center justify-center class="mt-4">
              <span class="title">Débutant - 18h15 : 19h15</span>
            </v-layout>

            <br class="my-2" />
            <p class="text-xs-center programmes_texte">
              Ce cours s'adresse aux personnes qui veulent découvrir la danse country.
              <br />Les danses sont simples pour acquérir les bases des pas.
              <br />Si vous découvrez tout juste la country, ou n'en avez jamais fait, alors il est fait pour vous.
            </p>
            <br class="my-2" />
            <v-layout row align-center justify-center class>
              <span class="title">Novice - 19h15 : 20h30</span>
            </v-layout>
            <br class="my-2" />
            <p class="text-xs-center programmes_texte">
              Ce cours s’adresse aux personnes qui veulent découvrir de nouvelles chorégraphies
              <br />tout en travaillant avec des techniques et des rythmes encore plus variés.
            </p>
            <br class="my-2" />
            <v-layout row align-center justify-center class>
              <span class="title">Intermédiaire - 20h00 : 21h45</span>
              <!-- <v-icon size="50">fa-male</v-icon> -->
            </v-layout>
            <br class="my-2" />
            <p
              class="text-xs-center programmes_texte"
            >Ce cours s’adresse aux personnes qui souhaitent acquérir des chorégraphiques techniques sur des rythmes plus difficiles.</p>
            <br class="my-3" />
            <div class="text-xs-center">
              <div class="title">Les cours révisions se déroulent le vendredi</div>
              <div class="bonne_note_texte">1 repas partage avec bal révisions 1 fois par trimestre.</div>
            </div>
            <v-layout></v-layout>
          </v-layout>
        </v-img>
      </div>
      <br class="my-4" />

      <div id="sorties">
        <div class="py-1 amber lighten-4 text-xs-center">
          <v-layout row justify-center align-center>
            <v-flex sm6 xs11>
              <v-img src="accueil/picto/title_sorties.png"></v-img>
            </v-flex>
          </v-layout>
        </div>
        <v-img src="accueil/picto/sorties.png"></v-img>

        <br class="my-2" />
        <v-img src="accueil/picto/fond_sorties.png">
          <v-layout row align-center justify-center class>
            <v-avatar size="100" tile>
              <v-img src="accueil/picto/picto_ranch.png"></v-img>
            </v-avatar>
          </v-layout>
          <p class="text-xs-center programmes_texte my-4">
            DML Laille 35 organise des bals, des manifestations
            <br />et des démos dans la salle de l’archipel à Laillé.
            <br />
            <br />En décembre le bal du père Noel et en mars le bal annuel.
            <br />DML Laillé 35 contribue à aider d’autres associations caritatives.
            <br />Tels que vaincre la » mucoviscidose » de Pléchatel,
            <br />« Au cœur du don » de Laillé, « le yoga » de Crevin
            <br />DML Laillé 35 anime dans les clubs de la région ou dans des festivals.
          </p>
          <br />
          <v-layout row align-center justify-center class>
            <v-avatar size="100" tile>
              <v-img src="accueil/picto/picto_avion.png"></v-img>
            </v-avatar>
          </v-layout>
          <p class="text-xs-center programmes_texte">
            DML Laillé 35 participe aussi aux manifestations des autres associations.
            <br />
            <br />Vous pouvez nous informer de votre évènement, en nous envoyant un mail à
            <br />
            <a
              href="mailto:countrydanselaille@gmail.com?subject=Manifestation country"
            >countrydanselaille@gmail.com</a>
            <br />avec votre affiche et votre playliste.
            <br />
            <br />Avec plaisir de vous retrouver sur la piste de danse.
          </p>
        </v-img>
      </div>
      <br class="my-4" />

      <div id="sorties">
        <div class="py-1 amber lighten-4 text-xs-center">
          <v-layout row justify-center align-center>
            <v-flex sm6 xs11>
              <v-img src="accueil/picto/title_autres_standards.png"></v-img>
            </v-flex>
          </v-layout>
        </div>
        <v-img src="accueil/picto/autres_standards.png" height="400"></v-img>

        <!-- <br class="my-2" /> -->

        <v-img max-height="1080" src="accueil/picto/fond_autres_standards.png">
          <v-layout align-end justify-start class="mt-5">
            <v-flex>
              <p class="text-xs-center programmes_texte">
                Dans une ambiance conviviale, joyeuse et dynamique
                <br />la section DML, danses standards et latines de Laillé
                <br />proposent des cours collectifs le jeudi soir à la salle de l'Archipel.
                <br />Ces cours sont dispensés par une professeur sérieuse et très expérimentée.
                <br />Nous vous offrons un large choix de danses:
                <br />cha cha, salsa, samba, batchata l'incontournable rock 'n' roll...
              </p>
            </v-flex>
          </v-layout>
          <br class="my-5" />
          <v-layout align-end justify-end class="mt-5">
            <p class="text-xs-center programmes_texte">
              N'hésitez pas à nous contacter pour plus de renseignements
              <br />Mr Quéré Jean-Paul
              <br />Tel: 02 99 42 52 77 / 06 33 01 39 28
              <br />Mail:
              <a href="mailto:jpaul.quere@gmail.com">jpaul.quere@gmail.com</a>
            </p>
            <v-flex sm1></v-flex>
          </v-layout>
        </v-img>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/home/Navbar";
import Navbarxs from "@/components/navbar/general/Navbar";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 2000 // values from 0 to 3000, with step 50ms
});

export default {
  name: "home",

  components: {
    Navbar,
    Navbarxs
  },
  data: () => ({
    niveaux: {}
  })
};
</script>
<style scoped>
.bg {
  width: 100%;
  height: 300px;
  background-image: url("/accueil/picto/page_accueil.png");
  /* background-size: contain; */
  background-size: cover;
  /* background-size: auto; */
}
.bg-2 {
  /* margin-top: -30px;
  margin-left: 30px; */
  /* right: 10px; */
  /* position: relative; */
  width: 100%;
  height: auto;
  height: 150px;
  background-image: url("/Logo/utils/logo.png");
  background-size: contain;
}
#home {
  background-color: "grey";
}
h1 {
  font-family: cursive, sans-serif !important;
}
.banner_title {
  font-size: 50px;
  line-height: 100px;
}
.bonne_note_texte {
  /* line-height: 50px; */
  font-size: 20px;
  /* font-weight: 500; */
}
.programmes_texte {
  font-size: 20px;
  /* line-height: 45px; */
}
/* .botte {
  background-image: "public/Logo/utils/logo.svg";
} */
</style>
