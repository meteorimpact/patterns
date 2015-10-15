// Basic publications for the main collections

Meteor.publish('planes', (ids) => { return Planes.find({ _id: { $in: ids }}); });
Meteor.publish('trains', (ids) => { return Trains.find({ _id: { $in: ids }}); });
Meteor.publish('automobiles', (ids) => { return Automobiles.find({ _id: { $in: ids }}); });

// The timeline publication

Meteor.publish('timeline', function (limit) {

   let sub = this;

   // We use the peerlibrary:reactive-mongo to enable meteor reactivity on the server

   sub.ids = {}
   let tracker = Tracker.autorun( () => {

      // Run a find operation on the collections that can be displayed in the timeline,
      // and add the ids to an array

      let collections = ['planes', 'trains', 'automobiles']

      var items = [];

      collections.forEach((collectionName) => {

         // dburles:mongo-collection-instances allows to to find collections by name

         collection = Mongo.Collection.get(collectionName);

         // Get the cursor, limiting to the current total required
         // We only need the `order` from the array, and potentially another field such as
         // an update time if we wish to check for changes too.

         cursor = collection.find({}, { limit: limit, fields: { order: 1}, sort: { order: 1 }});

         // Add each item to the array

         cursor.forEach((item) => {
            item.collection = collectionName;
            items.push(item);
         });
      });

      // Now that we have the first `limit` items from each array we need to sort
      // them together and crop the array to the right amount

      items = _.sortBy(items, 'order')
      items = items.slice(0, limit);

      // Add each item's ID to the subscription, or mark it as changed.

      var newIds = {};
      items.forEach((doc) => {
         id = doc._id;
         newIds[id] = true;

         if (sub.ids[id] == null) {
            sub.ids[id] = true;
            sub.added('timeline', id, {
               collection: doc.collection,
               docId: id,
               order: doc.order
            });
         }

         // Here we can add some logic to determine if the item has been updated
         // (by comparing the new update time with the previous one, for example)
         // and call sub.changed it if has.

      });

      // Finally, remove any items that were in the array previously that aren't any more.

      for (id in sub.ids) {
         if (newIds[id] == null) {
            sub.removed('timeline', id);
            delete sub.ids[id];
         }
      }
   });

   // Mark the subscription as ready.

   sub.ready();
});
