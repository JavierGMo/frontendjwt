<template>
    <v-container>
        <h1>USER</h1>
        <v-row>
            <v-col
                v-for="(product, index) in products"
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
                            @click="getProductsUser"
                        >
                            Editar
                        </v-btn>
                        <v-btn
                            @click="getProductsUser"
                        >
                            Eliminar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    
    mounted : function(){
        // this.isAuthenticated = localStorage.getItem('login')?localStorage.getItem('login'):false;
        const site = window.location.href.split('/')[2];
        const url = `http://${site}/login`;
        // if(!localStorage.getItem('login')) this.$router.push('login/');
        if(!localStorage.getItem('login')) window.location.href = url;
        this.getProductsUser();
    },
    data(){
        return{
            isAuthenticated : false,
            products : []
        };
    },//data
    methods : {
        async getProductsUser(){
            const request = await fetch('http://localhost:5000/products/user', {
                headers : {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            this.dataOfRequest(request);
        },
        async dataOfRequest(request){
            switch(request.status){
                case 200:
                    const dataJSON = await request.json();
                    this.dataProducts(dataJSON['data']);
                    break;
                case 403:
                    alert('Acceso denegado');
                    break;
                case 404:
                    alert('Usuario no encontrado');
                    break;
                case 500:
                    alert('Algo salio mal, intente mas tarde.');
                    break;
                default:
                    alert('Algo salio mal, intente mas tarde.');
            }
        },
        async dataProducts(dataJSON){
            const allData = dataJSON;
            const self = this;
            allData.forEach(element => {
                self.products.push(element);
            });
            console.log(this.products);
        
        
        
        },
        deleteProduct(){},
    },//Methods

}
</script>

<style>

</style>