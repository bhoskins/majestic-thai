(function(){
  'use strict';

  var CategoryView = Backbone.View.extend({
    template: _.template($('#category-template').text()),

    render: function(){
      this.$el.html(this.template());
    }
  });

  var OrderView = Backbone.View.extend({
    template: _.template($('#order-template').text()),

    render: function(){
      this.$el.html(this.template());
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
      this.categoryView = new CategoryView({el: '.js-category-view'});
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
