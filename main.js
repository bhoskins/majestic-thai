(function(){
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'category/:name': 'showCategory'
    },

    index: function(){
      var categoryTemplate = _.template($('#category-template').text());
      $('.js-category-view').html(categoryTemplate());

      var orderTemplate = _.template($('#order-template').text());
      $('.js-order-view').html(orderTemplate());
    },

    showCategory: function(){
    }

  });

  $(document).ready(function(){
    window.router = new AppRouter();
    Backbone.history.start();
  });
})();
