<template>
    <v-container>
        <v-container><h2>Subir producto nuevo</h2></v-container>
        <v-container>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model="nameProduct"
                    :rules="nameProductRules"
                    label="Nombre del producto"
                    placeholder="Nombre del producto"
                ></v-text-field>
                <v-text-field
                    v-model="price"
                    :rules="priceRules"
                    label="Precio"
                    placeholder="Precio"
                    type=""
                ></v-text-field>
                <v-text-field
                    v-model="stock"
                    :rules="stockRules"
                    label="Stock"
                    placeholder="Stock"
                ></v-text-field>
                <v-file-input
                    :rules="rulesImage"
                    v-model="imageProduct"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Seleccione la imagen del producto"
                    prepend-icon="mdi-camera"
                    label="Imagen del producto"
                ></v-file-input>
                <v-textarea
                    v-model="description"
                    :rules="descriptionRules"
                    solo
                    name="input-7-4"
                    label="Descripcion"
                    placeholder="Descripcion"
                ></v-textarea>
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Subir producto
                </v-btn>
                <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                >
                    Reset Form
                </v-btn>
            </v-form>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            valid: true,
            nameProduct: '',
            nameProductRules: [
                v => !!v || 'El nombre es necesario',
                v => (v && v.length >= 8) || 'Elnombre debe ser mayor o igual a diez caracteres',
            ],
            price : 0,
            priceRules : [
                v => !!v || 'El precio es requerido',
                v => (v && !isNaN(v)) || 'Debe de ser un numero'
            ],
            stock: 0,
            stockRules : [
                v => !!v || 'El numero de piezas es requerido',
                v => (v && !isNaN(v)) || 'Debe de ser un numero'
            ],
            description : '',
            descriptionRules : [
                v => !!v || 'La descripcion es necesaria',
            ],
            imageProduct : [],
            rulesImage: [
                value => !value || value.size <= 10000000 || 'La imagen debe ser menor o igual a 10 MB',
            ],
        };
    },
    methods : {
        validate(){
            if(this.$refs.form.validate()){
                console.log('Validados');
                console.log(this.imageProduct);
            }
        },
        reset(){
            if(this.$refs.form.reset()) console.log('reset');
        },
    }
}
</script>

<style>

</style>