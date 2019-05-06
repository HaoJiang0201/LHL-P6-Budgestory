exports.seed = function(knex, Promise) {
  return knex('records').del()
    .then(function () {
      return Promise.all([
        knex('records').insert({user_id: 1, category_id: 3, value:150000, notes: 'Salary for 1st week of January', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 4, value:5042, notes: 'Interest for 1st week of January', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 5, value:130000, notes: 'Dividends from Amazon', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 20, value:540, notes: 'Coffee from Starbucks', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 45, value:1500, notes: 'Gas from Chevron', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 21, value:1180, notes: 'Lunch from Chipotle', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 24, value:15000, notes: 'Stopped for groceries', date: '2019-01-01' }),
        knex('records').insert({user_id: 1, category_id: 20, value:670, notes: 'Coffee from Starbucks', date: '2019-01-02' }),
        knex('records').insert({user_id: 1, category_id: 21, value:980, notes: 'Lunch from Mcdonalds', date: '2019-01-02' }),
        knex('records').insert({user_id: 1, category_id: 20, value:230, notes: 'Coffee from Tims', date: '2019-01-03' }),
        knex('records').insert({user_id: 1, category_id: 42, value:275, notes: 'Took the bus', date: '2019-01-03' }),
        knex('records').insert({user_id: 1, category_id: 24, value:1800, notes: 'Sushi for Lunch', date: '2019-01-03' }),
        knex('records').insert({user_id: 1, category_id: 15, value:2340, notes: 'Bought a shirt from H and M', date: '2019-01-03' }),
        knex('records').insert({user_id: 1, category_id: 20, value:230, notes: 'Coffee from Tims', date: '2019-01-04' }),
        knex('records').insert({user_id: 1, category_id: 45, value:1500, notes: 'Gas from Chevron', date: '2019-01-04' }),
        knex('records').insert({user_id: 1, category_id: 26, value:3200, notes: 'Ordered pizza for dinner', date: '2019-01-04' }),
        knex('records').insert({user_id: 1, category_id: 42, value:275, notes:'Took the bus', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 43, value:275, notes: 'Skytrain ticket', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 21, value:1170, notes: 'Lunch from Mcdoanlds', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 15, value:6670, notes: 'Some Prada loafers', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 16, value:5070, notes: 'Pair of dress pants', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 17, value:2670, notes: 'Jeans from Old Navy', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 10, value:3200, notes: 'Pair of Sunglasses', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 22, value:4500, notes: 'Dinner at The Keg', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 31, value:2230, notes: 'Went to Alita', date: '2019-01-05' }),
        knex('records').insert({user_id: 1, category_id: 42, value:275, notes: 'Took the bus to the PNE', date: '2019-01-06' }),
        knex('records').insert({user_id: 1, category_id: 37, value:2300, notes: 'Rides at the PNE', date: '2019-01-06' }),
        knex('records').insert({user_id: 1, category_id: 38, value:1200, notes: 'Minidoughnuts at the PNE', date: '2019-01-06' }),
        knex('records').insert({user_id: 1, category_id: 39, value:560, notes: 'Games at the PNE', date: '2019-01-06' }),
        knex('records').insert({user_id: 1, category_id: 42, value:275, notes: 'Bus back from the PNE', date: '2019-01-06' }),
        knex('records').insert({user_id: 1, category_id: 23, value:4670, notes: 'Went to the pub for the Game', date: '2019-01-06' }),
        knex('records').insert({user_id: 1, category_id: 20, value:540, notes: 'Coffee from Starbucks', date: '2019-01-08' }),
        knex('records').insert({user_id: 1, category_id: 45, value:1500, notes: 'Gas from Chevron', date: '2019-01-08' }),
        knex('records').insert({user_id: 1, category_id: 21, value:1180, notes: 'Lunch from Chipotle', date: '2019-01-08' }),
        knex('records').insert({user_id: 1, category_id: 24, value:15000, notes: 'Stopped for groceries', date: '2019-01-08' }),
        knex('records').insert({user_id: 1, category_id: 20, value:670, notes: 'Coffee from Starbucks', date: '2019-01-09' }),
        knex('records').insert({user_id: 1, category_id: 21, value:980, notes: 'Lunch from Mcdonalds', date: '2019-01-09' }),
        knex('records').insert({user_id: 1, category_id: 20, value:230, notes: 'Coffee from Tims', date: '2019-01-10' }),
        knex('records').insert({user_id: 1, category_id: 42, value:275, notes: 'Took the bus', date: '2019-01-10' }),
        knex('records').insert({user_id: 1, category_id: 24, value:1800, notes: 'Sushi for Lunch', date: '2019-01-10' }),
        knex('records').insert({user_id: 1, category_id: 17, value:2340, notes: 'Bought some pants from H and M', date: '2019-01-10' }),
        knex('records').insert({user_id: 1, category_id: 20, value:230, notes: 'Coffee from Tims', date: '2019-01-11' }),
        knex('records').insert({user_id: 1, category_id: 45, value:1500, notes: 'Gas from Chevron', date: '2019-01-11' }),
        knex('records').insert({user_id: 1, category_id: 27, value:3200, notes: 'Ordered Chinese for dinner', date: '2019-01-11' }),
        knex('records').insert({user_id: 1, category_id: 45, value:2075, notes: 'Gas from Esso', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 21, value:1170, notes: 'Lunch from Mcdoanlds', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 50, value:1670, notes: 'Taxi to the Club', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 33, value:570, notes: 'Coat Check', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 34, value:3670, notes: 'Lots of Tequila', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 21, value:1100, notes: 'Midnight Mcdonalds', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 50, value:1100, notes: 'Taxi Home', date: '2019-01-12' }),
        knex('records').insert({user_id: 1, category_id: 3, value:123000, notes: 'Salary for 2nd week of January', date: '2019-01-14' }),
        knex('records').insert({user_id: 1, category_id: 4, value:2342, notes: 'Interest for 2nd week of January', date: '2019-01-14' }),
        knex('records').insert({user_id: 1, category_id: 5, value:80000, notes: 'Dividends from Amazon', date: '2019-01-14' }),
        knex('records').insert({user_id: 1, category_id: 23, value:4670, notes: 'Went to the pub for the Game', date: '2019-01-14' }),
        knex('records').insert({user_id: 1, category_id: 51, value:670, notes: 'Hydro Bill', date: '2019-01-14' }),
        knex('records').insert({user_id: 1, category_id: 52, value:670, notes: 'Coffee from Starbucks', date: '2019-01-14' })


      ]);
    });
}