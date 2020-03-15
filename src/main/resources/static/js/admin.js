let productApi = "/api/product";
let missionApi = "/api/mission";

function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var vue = new Vue({
    el: "#app",
    data: function(){
        return {
            products: [],
            search_name: '',
            search_type: '',
            url: '',
            name: '',
            price: '',
            product_mission: '',
            product_id: '',
            product_price: '',
            product_url: '',
            product_creationDate: '',
            product_footprint_xx: '',
            product_footprint_xy: '',
            product_footprint_yy: '',
            product_footprint_yx: '',
            productAttr: [],
            found_products_by_name: [],
            found_products_by_type: [],
            mission: '',
            missions: [],
            startDate: '',
            finishDate: '',
            type: '',
            mission_name: '',
            mission_id: '',
            mission_type: '',
            mission_startDate: '',
            mission_finishDate: '',
            missionAttr: []
        }
    },

    watch: {
        productAttr: function(newVal, oldVal) {
            this.mission = newVal.product_mission;
            this.id = newVal.product_id;
            this.price = newVal.product_price;
            this.url = newVal.product_url;
            this.creationDate = newVal.product_creationDate;
            this.footprint_xx = product_footprint_xx;
            this.footprint_xy = product_footprint_xy;
            this.footprint_yy = product_footprint_yy;
            this.footprint_yx = product_footprint_yx;
        },

        missionAttr: function(newVal, oldVal) {
            this.name = newVal.mission_name;
            this.type = newVal.mission_type;
            this.startDate = newVal.mission_startDate;
            this.finishDate = newVal.mission_finishDate;
        }
    },

    methods: {
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


        delProduct: function(product) {
            axios({
                method: "delete",
                url: productApi + "/" + product.id
            })
                .then( response => {
                    this.products.splice(this.products.indexOf(product), 1)
                }).
            catch( error => {
                console.log(error);
            });
        },


        saveProduct: function() {
            axios({
                method: "post",
                url: productApi,
                data: {
                    mission: this.product_mission,
                    price: this.product_price,
                    url: this.product_url,
                    footprint_xx: this.product_footprint_xx,
                    footprint_xy: this.product_footprint_xy,
                    footprint_yy: this.product_footprint_yy,
                    footprint_yx: this.product_footprint_yx
                }
            })
                .then(response => {
                    this.products.push(response.data);
                }).catch(error => {
                console.log(error);
            });
        },

        loadMissions: function () {
            axios({
                method: "get",
                url: missionApi
            })
                .then( response => {
                    this.missions = response.data;
                }).
            catch( error => {
                console.log(error);
            });
        },

        delMission: function(mission) {
            axios({
                method: "delete",
                url: missionApi + "/" + mission.id
            })
                .then( response => {
                    this.missions.splice(this.missions.indexOf(mission), 1)
                }).
            catch( error => {
                console.log(error);
            });
        },


        edit: function(mission) {
            this.mission_name = mission.name;
            this.mission_id = mission.id;
            this.mission_type = mission.type;
            this.mission_startDate = mission.startDate;
            this.mission_finishDate = mission.finishDate;
        },


        saveMission: function() {
            if(this.mission_id) {
                axios({
                    method: "put",
                    url: missionApi + "/" + this.mission_id,
                    data: {
                        name: this.mission_name,
                        type:  this.mission_type,
                        startDate: this.mission_startDate,
                        finishDate: this.mission_finishDate
                    }
                })
                    .then(response => {
                        var index = getIndex(this.missions, response.data.id);
                        this.missions.splice(index, 1, response.data);
                    }).catch(error => {
                    console.log(error);
                });
            }else{
                axios({
                    method: "post",
                    url: missionApi,
                    data: {
                        name: this.mission_name,
                        type:  this.mission_type,
                        startDate: this.mission_startDate,
                        finishDate: this.mission_finishDate
                    }
                })
                    .then(response => {
                        this.missions.push(response.data);
                    }).catch(error => {
                    console.log(error);
                });
            }
        }

    },

    created: function() {
        this.loadProducts(this.products);
        this.loadMissions(this.missions);
    }
})
