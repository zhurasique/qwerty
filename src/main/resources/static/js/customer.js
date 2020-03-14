
var productApi = Vue.resource('/product{/id}');
var productOrdered;

Vue.component('product-row', {
    props: ['product', 'products'],
    template:
        '<div>' +
            '<strong>[{{ product.name }}]</strong>' +
            '<span style="position: absolute; right: 0">' +
               '<input type="button" value="Order" @click="order" />' +
            '</span>' +
                '<ul>' +
                    '<li><strong>Price:</strong> {{ product.price }} $</li>' +
                    '<li><strong>Url:</strong> {{ product.url }}</li>' +
                    '<li><strong>Creation date:</strong> {{ product.creationDate }}</li>' +
                '</ul>' +
        '</div>',
    methods: {
        order: function() {
        console.log(this.product.id);
        productOrdered = this.product.id;
            /*productApi.remove({id: this.product.id}).then(result => {
                if (result.ok) {
                    this.products.splice(this.products.indexOf(this.product), 1)
                }
            })*/
        }
    }
});

Vue.component('products-list', {
  props: ['products'],
  data: function() {
    return {
        product: null
    }
  },
  template:
    '<div>' +
        '<div style="position: relative; width: 580px">' +
            '<product-row v-for="product in products" :key="product.id" :product="product" ' +
                ':products="products" style="padding-top: 10px;"/>' +
        '</div>' +
    '</div>',
  created: function() {
    productApi.get().then(result =>
        result.json().then(data =>
            data.forEach(product => this.products.push(product))
        )
    )
  }
});

var products = new Vue({
    el: '#products',
    template: '<products-list :products="products" />',
    data: {
        products: []
    }
});




var filterApi = Vue.resource('/product/filter?filter={name}');

Vue.component('filter-form', {
    props: ['products'],
    data: function() {
        return {
            name: ''
        }
     },
    template:
        '<div>' +
            '<input type="name" placeholder="Name" v-model="name" />' +
            '<input type="button" value="Find" @click="created" style="margin-left: 5px;"/>' +
        '</div>',
    methods: {
        created: function() {
            if(this.products.length > 0){
                var size = this.products.length;
                for (var i = 0; i < size; i++) {
                    this.products.splice(this.products.indexOf(this.product), 1);
                }
            }
            filterApi.get({name: this.name}).then(result =>
                result.json().then(data =>
                    data.forEach(product => {
                        this.products.push(product);
                     })
                )
            )
          }
    }
});

Vue.component('filters-list', {
  props: ['products'],
  data: function() {
    return {
        product: null
    }
  },
  template:
    '<div>' +
        '<filter-form :products="products" :productAttr="product" />' +
        '<div style="position: relative; width: 580px">' +
            '<product-row v-for="product in products" :key="product.id" :product="product" ' +
                ':products="products" style="padding-top: 10px;"/>' +
        '</div>' +
    '</div>'
});

var filters = new Vue({
    el: '#filters',
    template: '<filters-list :products="products" />',
    data: {
        products: []
    }
});



var orderApi = Vue.resource('/product/order?table={id}');

Vue.component('order-form', {
    props: ['products'],
    template:
        '<div>' +
            '<input type="button" value="Find" @click="created" style="margin-left: 5px;"/>' +
        '</div>',
    methods: {
        created: function() {
            orderApi.get({id: productOrdered}).then(result =>
                result.json().then(data =>
                    data.forEach(product => {
                        this.products.push(product);
                     })
                )
            )
          }
    }
});

Vue.component('orders-list', {
  props: ['products'],
  data: function() {
    return {
        product: null
    }
  },
  template:
    '<div>' +
            '<order-form :products="products" :productAttr="product" />' +
            '<div style="position: relative; width: 580px">' +
                '<product-row v-for="product in products" :key="product.id" :product="product" ' +
                    ':products="products" style="padding-top: 10px;"/>' +
            '</div>' +
    '</div>'
});

var orders = new Vue({
    el: '#orders',
    template: '<orders-list :products="products" />',
    data: {
        products: []
    }
});




