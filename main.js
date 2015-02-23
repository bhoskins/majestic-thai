(function(){
  'use strict';

  var Item = Backbone.Model.extend({
    defaults: {
      name: '',
      price: ''
    }
  });

  var ItemCollection = Backbone.Collection.extend({
    model: Item,
    url: "https://api.parse.com/1/classes/Item",
    parse: function(response){
      return response.results;
    }
  });

  var Order = Backbone.Model.extend({
    // define defaults as a function, otherwise the items array will be shared
    // among all orders. See http://backbonejs.org/#Model-defaults
    defaults: function(attributes){
      attributes = attributes || {};
      return _.defaults(attributes, {
        items: []
      });
    },

    addItem: function(item){
      // 1. use item.toJSON since we need to turn a model into an object that
      //    looks like {name: "Cool Food", price: 100}
      // 2. use set + concat because, if you were to just modify items in place
      //    (e.g. using .push) it wouldn't fire a change event. .concat takes an
      //    array and returns a new array of the two arrays combined, so it will
      //    fire a change event.
      this.set('items', this.get('items').concat([item.toJSON()]));
    },

    totalPrice: function(){
      return this.get('items').reduce(function(acum, item) {
        return acum + item.price;
      }, 0);
    },

    toJSON: function(){
      return _.extend({
        totalPrice: this.totalPrice()
      }, this.attributes);
    }
  });

  var OrderCollection = Backbone.Model.extend({
    model: Order,
    url: "https://api.parse.com/1/classes/Order",
    parse: function(response){
      return response.results;
    }
  });

  var CategoryView = Backbone.View.extend({
    template: _.template($('#category-template').text()),

    render: function(){
      // remove children to avoid zombie views
      _.invoke(this.children, 'remove');

      this.$el.html(this.template());

      var self = this;
      this.children = this.collection.map(function(item){
        var view = new ItemView({model: item});
        self.$('ul').append(view.render().el);
        return view;
      });

      return this;
    }
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').text()),

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var OrderView = Backbone.View.extend({
    template: _.template($('#order-template').text()),

    render: function(){
      this.$el.html(this.template());
      return this;
    }
  });

  var NavView = Backbone.View.extend({

  });

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'category/:name': 'showCategory'
    },

    initialize: function(){
      this.items = new Backbone.Collection([{name: "Cool Food", price: 1}]);
      this.categoryView = new CategoryView({
        el: '.js-category-view',
        collection: this.items
      });
      this.orderView = new OrderView({el: '.js-order-view'});
      this.navView = new NavView({el: '.js-primary-nav'});
    },

    index: function(){
      this.categoryView.render();
      this.orderView.render();
    },

    showCategory: function(){

    }
  });

  $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "ZYQHOvrj5oPV8fGAN6M7x6m00ZNLtr5tpd3gzkFi",
      "X-Parse-REST-API-Key": "0BRysAUoHF2WsbkYZh1DOosJS3Oi1uS31KozIKUz"
    }
  });

  $(document).ready(function(){
    window.router = new AppRouter();
    Backbone.history.start();
  });
})();
