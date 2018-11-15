exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, email: 'alice@gmail.com', password: '123456'}),
        knex('users').insert({id: 2, email: 'bob@hotmail.com', password: 'password'}),
        knex('users').insert({id: 3, email: 'charlie@lighthouselabs.ca', password: 'RubberDuck'})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('maps').insert({id: 1, url: 'https://google.ca', name: 'Google', description: 'Hey Google, How do I SQL?'}),
        knex('maps').insert({id: 2, url: 'https://microsoft.ca', name: 'Microsoft', description: 'Is there a microsoft in Canada?'}),
        knex('maps').insert({id: 3, url: 'https://apple.ca', name: 'Apple', description: 'Apples are delicious'})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('user_favourites').insert({user_id: 1, map_id: 2}),
        knex('user_favourites').insert({user_id: 2, map_id: 3}),
        knex('user_favourites').insert({user_id: 3, map_id: 1})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('user_contributions').insert({user_id: 1, map_id: 1}),
        knex('user_contributions').insert({user_id: 2, map_id: 2}),
        knex('user_contributions').insert({user_id: 3, map_id: 3})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('places').insert({id: 1, name: 'CN Tower', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/2b/93/b7/cn-tower.jpg', description: 'Tallest point in Toronto', place_lat: 43.6426, place_long: 79.3871}),
        knex('places').insert({id: 2, name: 'Rogers Center', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Toronto_-_ON_-_Rogers_Centre_%28Nacht%29.jpg/338px-Toronto_-_ON_-_Rogers_Centre_%28Nacht%29.jpg', description: 'Roof does not open on rainy days', place_lat: 43.6414, place_long: 79.3894}),
        knex('places').insert({id: 3, name: 'Ripleys Aquarium', image: 'https://sparkleshinylove.com/wp-content/uploads/2013/11/image-1024x768.jpg', description: 'Try not to get seasick', place_lat: 43.6424, place_long: 79.3860}),
        knex('places').insert({id: 4, name: 'Union Station', image: 'https://toronto.citynews.ca/wp-content/blogs.dir/sites/10/2018/03/09/union-station.jpg', description: 'Under construction', place_lat: 43.6453, place_long: 79.3806})
      ]);
    })
    .then(function() {
      return Promise.all([
        knex('map_places').insert({map_id: 1, place_id: 1}),
        knex('map_places').insert({map_id: 1, place_id: 2}),
        knex('map_places').insert({map_id: 1, place_id: 3}),
        knex('map_places').insert({map_id: 1, place_id: 4})
      ]);
    })
};
