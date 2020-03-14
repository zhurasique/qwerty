let productApi = "/product";

    var vue = new Vue({
        el: "#app",
        data: function(){
            return {
                products: [],
                searchedProducts: [],
                found_products: [],
                ordered_products: [],
                ordered_ids: [],
                search_name:""
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


            find: function () {
                this.found_products = [];

                axios({
                    method: "get",
                    url:"/product/filter?filter="+this.search_name
                })
                    .then( response => {
                        this.found_products = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },


            endOrder: function () {
                axios({
                    method: "post",
                    url:"/product/order?table="+this.ordered_ids
                })
                    .then( response => {
                        console.log(response.data);
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