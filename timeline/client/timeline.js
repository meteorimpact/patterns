
let subsManager = new SubsManager()

Template.timeline.onCreated(function() {

   this.limit = new ReactiveVar(5);
   this.autorun( () => {

      // The autorun re-runs every time we increase the limt
      // First, we subscribe to the timeline collection
      //
      // Note that we use a subscriptions manager when subscribing.
      // (See https://github.com/kadirahq/subs-manager)
      // This is important since it keeps the subscriptions alive between refreshes. This
      // stops all the data being resent every time the limit increases, and also
      // has the effect of eliminating flickering.

      let sub = subsManager.subscribe('timeline',  this.limit.get());
      if (sub.ready()) {

         // Next, fetch the ids and collections of the objects to display

         let items = Timeline.find({}, { sort: { order: 1}, limit: this.limit.get() }).fetch();

         // For each collection, we pluck out the corresponding ids and subscribe to
         // the corresponding collection.

         let trainIds = _.pluck(_.where(items, { collection: 'trains' }), 'docId');
         this.trainsSub = subsManager.subscribe('trains', trainIds);

         let planeIds = _.pluck(_.where(items, { collection: 'planes' }), 'docId');
         this.planesSub = subsManager.subscribe('planes', planeIds);

         let autoIds = _.pluck(_.where(items, { collection: 'automobiles' }), 'docId');
         this.autosSub = subsManager.subscribe('automobiles', autoIds);
      }
   });

   // Function used be the template helper to get the timeline items

   this.items = () => {
      limit =  this.limit.get();
      if (limit === 0) return [];
      return Timeline.find({}, { limit: limit, sort: { order: 1 }});
   };

   // Function to increase the current limit

   this.incrementLimit = () => {
      this.limit.set(this.limit.get() + 5);
   }
});

Template.timeline.helpers({

   items: function() { return Template.instance().items(); },
   item: function() {
      if (this.collection === 'trains') return Trains.findOne(this._id);
      if (this.collection === 'planes') return Planes.findOne(this._id);
      if (this.collection === 'automobiles') return Automobiles.findOne(this._id);
   }

});

Template.timeline.events({
   'click #loadmore': function(e, template) {
      e.preventDefault();
      template.incrementLimit();
   }
})
