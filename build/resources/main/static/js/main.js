function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}


var missionApi = Vue.resource('/mission{/id}');
var superName = '';
Vue.component('mission-form', {
    props: ['missions', 'missionAttr'],
    data: function() {
        return {
            name: '',
            id: '',
            type: '',
            creationDate: '',
            finishDate: ''
        }
    },
    watch: {
        missionAttr: function(newVal, oldVal) {
            this.name = newVal.name;
            superName = this.name;
            this.id = newVal.id;
            this.type = newVal.type;
            this.creationDate = newVal.creationDate;
            this.finishDate = newVal.finishDate;
        }
    },
    template:
        '<div>' +
            '<input type="name" placeholder="Name" v-model="name" />' +
            '<select type="type" v-model="type" style="margin-left: 5px;">' +
                '<option value="Panchromatic">Panchromatic</option>' +
                '<option value="Multispectral">Multispectral</option>' +
                '<option value="Hyperspectral">Hyperspectral</option>' +
            '</select>' +
            '<input type="finishDate" placeholder="Finish date" v-model="finishDate" style="margin-left: 5px;"/>' +
            '<input type="button" value="Save" @click="save" style="margin-left: 5px;"/>' +
        '</div>',
    methods: {
        save: function() {
            var mission = { name: this.name, type: this.type, finishDate: this.finishDate, creationDate: this.creationDate };

            if(this.name != '' && this.finishDate != '' && this.type != ''){
                if (this.id) {
                    missionApi.update({id: this.id}, mission).then(result =>
                        result.json().then(data => {
                            var index = getIndex(this.missions, data.id);
                            this.missions.splice(index, 1, data);
                            this.name = ''
                            this.id = ''
                            this.type = ''
                            this.creationDate = ''
                            this.finishDate = ''
                        })
                    )
                } else {
                    missionApi.save({}, mission).then(result =>
                        result.json().then(data => {
                            this.missions.push(data);
                            this.name = ''
                            this.type = ''
                            this.finishDate = ''
                        })
                    )
               }
           }
        }
    }
});

Vue.component('mission-row', {
    props: ['mission', 'editMethod', 'missions'],
    template:
        '<div>' +
            '<strong>[{{ mission.name }}]</strong>' + // вот это
            '<span style="position: absolute; right: 0">' +
               '<input type="button" value="Edit" @click="edit" />' +
               '<input type="button" value="X" @click="del" />' +
            '</span>' +
                '<ul>' +
                    '<li><strong>Mission type:</strong> {{ mission.type }}</li>' +
                    '<li><strong>Date of start:</strong> {{ mission.creationDate }}</li>' +
                    '<li><strong>Date of finish:</strong> {{ mission.finishDate }}</li>' +
                '</ul>' +
        '</div>',
    methods: {
        edit: function() {
            this.editMethod(this.mission);
        },
        del: function() {
            missionApi.remove({id: this.mission.id}).then(result => {
                if (result.ok) {
                    this.missions.splice(this.missions.indexOf(this.mission), 1)
                }
            })
        }
    }
});

Vue.component('missions-list', {
  props: ['missions'],
  data: function() {
    return {
        mission: null
    }
  },
  template:
    '<div>' +
        '<mission-form :missions="missions" :missionAttr="mission" />' +
        '<div style="position: relative; width: 580px">' +
            '<mission-row v-for="mission in missions" :key="mission.id" :mission="mission" ' +
                ':editMethod="editMethod" :missions="missions" style="padding-top: 10px;"/>' +
        '</div>' +
    '</div>',
  created: function() {
    missionApi.get().then(result =>
        result.json().then(data =>
            data.forEach(mission => this.missions.push(mission))
        )
    )
  },
  methods: {
    editMethod: function(mission) {
        this.mission = mission;
    }
  }
});

var missions = new Vue({
  el: '#missions',
  template: '<missions-list :missions="missions" />',
  data: {
      missions: []
  }
});




var productApi = Vue.resource('/product{/id}');

Vue.component('product-form', {
    props: ['products', 'productAttr', 'missions'],
    data: function() {
        return {
            name: '',
            id: '',
            footprint: '',
            price: '',
            url: ''
        }
    },
    watch: {
        productAttr: function(newVal, oldVal) {
            this.name = newVal.name;
            this.id = newVal.id;
            this.footprint = newVal.footprint;
            this.price = newVal.price;
            this.url = newVal.url;
        }
    },
    template:
        '<div>' +
            '<input type="name" placeholder="Name" v-model="name" />' +
            '<select type="footprint" v-model="footprint" style="margin-left: 5px;">' + // вот сюда нужно вставить
                '<option value="Panchromatic">Panchromatic</option>' +
                '<option value="Multispectral">Multispectral</option>' +
                '<option value="Hyperspectral">Hyperspectral</option>' +
            '</select>' +
            '<input type="price" placeholder="Price" v-model="price" style="margin-left: 5px;"/>' +
            '<input type="url" placeholder="Image url" v-model="url" style="margin-left: 5px;"/>' +
            '<input type="button" value="Save" @click="save" style="margin-left: 5px;"/>' +
        '</div>',
    methods: {
        save: function() {
            var product = { name: this.name, footprint: this.footprint, price: this.price, url: this.url };
                if (this.id) {
                    productApi.update({id: this.id}, product).then(result =>
                        result.json().then(data => {
                            var index = getIndex(this.products, data.id);
                            this.products.splice(index, 1, data);
                            this.name = ''
                            this.id = ''
                            this.footprint = ''
                            this.price = ''
                            this.url = ''
                        })
                    )
                } else {
                    productApi.save({}, product).then(result =>
                        result.json().then(data => {
                            this.products.push(data);
                            this.name = ''
                            this.footprint = ''
                            this.price = ''
                            this.url = ''
                        })
                    )
                }
        }
    }
});

Vue.component('product-row', {
    props: ['product', 'products'],
    template:
        '<div>' +
            '<strong>[{{ product.name }}]</strong>' +
            '<span style="position: absolute; right: 0">' +
               '<input type="button" value="X" @click="del" />' +
            '</span>' +
                '<ul>' +
                    '<li><strong>Footprint:</strong> {{ product.footprint }}</li>' +
                    '<li><strong>Price:</strong> {{ product.price }}</li>' +
                    '<li><strong>Url:</strong> {{ product.url }}</li>' +
                '</ul>' +
        '</div>',
    methods: {
        del: function() {
            productApi.remove({id: this.product.id}).then(result => {
                if (result.ok) {
                    this.products.splice(this.products.indexOf(this.product), 1)
                }
            })
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
        '<product-form :products="products" :productAttr="product" />' +
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
        products: [],
        items: [
              { message: 'Foo' },
              { message: 'Bar' }
            ]
    }
});

