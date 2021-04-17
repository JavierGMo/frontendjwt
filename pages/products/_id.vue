<template>
    <v-container>
        <v-container>
            <h2>{{product.name}}</h2>
        </v-container>
        <v-container>
            <v-row>
                <v-col>
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    ></v-img>
                </v-col>
                <v-col>
                    <v-col>
                        <v-row>
                            <div class="my-4 subtitle-1">
                                <p>Precio : ${{product.price}}</p>
                            </div>
                        </v-row>
                        <v-row>
                            <div class="my-4 subtitle-1">
                                <p>Stock : {{product.pieces}} u </p>
                            </div>
                        </v-row>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    mounted(){
        this.getProduct();
    },
    data(){
        return {
            product : {},
        };
    },
    methods : {
        async getProduct(){
            const url = `http://localhost:5000/products/${this.$route.params.id}`;
            console.log(this.$route.params.id);
            const request = await fetch(url, {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await request.json();            
            this.product = data['data'][0];
            console.log(this.product);

        }
    },

}
</script>

<style>

</style>