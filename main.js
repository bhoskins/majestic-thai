(function(){
  'use strict';

  var CategoryView = Backbone.View.extend({
    template: _.template($('#category-template').text()),

    render: function(){
      var self = this;
      this.$el.html(this.template());
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

  $(document).ready(function(){
    window.router = new AppRouter();
    Backbone.history.start();
  });
})();
