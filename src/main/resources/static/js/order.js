// Front-end for ordering page processed by Vue.js
// All request are processed by axios lib.

let productApi = "/api/product";

    var vue = new Vue({
        el: "#app",
        data: function(){
            return {
                products: [],
                found_products_by_name: [],
                found_products_by_type: [],
                ordered_products: [],
                ordered_ids: [],
                search_name: '',
                search_type: '',
                end_order: [],
                toggle: false
            }
        },
        methods:{
            order: function(product) {
                this.ordered_products.push(product);
                this.ordered_ids.push(product.id);
            },

            loadProducts: function () {
                axios({
                    method: "get",
                    url: productApi
                })
                    .then( response => {
                        this.products = response.data;
                    }).
                    catch( error => {
                        console.log(error);
                    });

            },


            findByName: function () {
                this.found_products_by_name = [];
                this.found_products_by_type = [];

                axios({
                    method: "get",
                    url:"api/product/filter/name?name="+this.search_name
                })
                    .then( response => {
                        this.found_products_by_name = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                },

            findByType: function () {
                this.found_products_by_type = [];
                this.found_products_by_name = [];

                axios({
                    method: "get",
                    url:"api/product/filter/type?type="+this.search_type
                })
                    .then( response => {
                        this.found_products_by_type = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            endOrder: function () {
                this.end_order = [];
                axios({
                    method: "post",
                    url:"/api/product/order?table="+this.ordered_ids
                })
                    .then( response => {
                        console.log(response.data);
                        this.toggle = true;
                        this.end_order = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                },

            removeOrder: function(product){
                this.ordered_products.splice(this.ordered_products.indexOf(this.product), 1);
                this.ordered_ids.splice(this.ordered_ids.indexOf(product.id), 1);
            }
        },
        created: function() {
            this.loadProducts(this.products);
        }
    });