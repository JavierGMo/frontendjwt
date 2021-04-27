<template>
  <v-container>
    <v-row>
      <v-col
          v-for="(product, index) in productsRange"
          :key="index"
          cols="4"
      >
          <v-card>
              <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
              ></v-img>
              <v-card-title>
                  {{product.name}}
              </v-card-title>
              <div class="my-4 subtitle-1">
                  Price : ${{product.price}}
              </div>
              <div class="my-4 subtitle-1">
                  Stock : {{product.pieces}} u
              </div>
              <v-card-actions>
                  <v-btn
                      :to="`/products/${product.id}`"
                  >
                      Ver
                  </v-btn>
                  <v-btn
                     
                  >
                      Editar
                  </v-btn>
                  <v-btn
                      
                  >
                      Eliminar
                  </v-btn>
              </v-card-actions>
          </v-card>
      </v-col>
      </v-row>
    <v-container>
      <div class="text-center">
        <div>
          <h3>hoiasda{{page}}</h3>
        </div>
        <v-pagination
          v-model="page"
          @input="getProductsByRange"
          :length="6"
        >
          
        </v-pagination>
      </div>
    </v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn
          color="primary"
          nuxt
          to="/login"
        >
          Login
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="primary"
          nuxt
          to="/register"
        >
          Register
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted(){
    this.getProductsByRange();
  },
  data(){
    return{
      page : 1,
      productsRange : [],
      error : false,
      loadCircle : false
    };
  },//data
  methods : {
    async getProductsByRange(){
      
      try {
        console.log(20/10);
        // const request = await fetch(`http://localhost:5000/products/pagination/range/${this.page}`, {
        //   headers : {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //   }
        // });
        const request = await fetch(`http://localhost:5000/products/pagination/range/${this.page}`);
        this.dataOfRequest(request);

      } catch (error) {
        console.error(error);
        this.productsRange = [];

      }
    },
    async dataOfRequest(request){
        switch(request.status){
          case 200:
              const dataJSON = await request.json();
              this.dataProducts(dataJSON['data']);
              
              break;
          case 403:
              alert('Acceso denegado, desde el home');
              break;
          case 404:
              alert('No hay mas productos');
              break;
          case 500:
              alert('Algo salio mal, intente mas tarde.');
              break;
          default:
              alert('Algo salio mal, intente mas tarde.');
        }
    },
    async dataProducts(dataJSON){
        const self = this;
        const products = dataJSON;
        this.productsRange = [];
        products.forEach(element => {
          self.productsRange.push(element);
        });
    },
  },//Methods
}
</script>
