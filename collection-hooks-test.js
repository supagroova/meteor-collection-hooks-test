// 
// Collection Definition
// 
TestCol = new Meteor.Collection(null);

TestCol.after.insert(function() {
  console.log("TestCol.after.insert hook called!");
})

TestCol.after.update(function() {
  console.log("TestCol.after.update hook called!");
})

TestCol.after.remove(function() {
  console.log("TestCol.after.remove hook called!");
})

// 
// Tests to run
// 
var executeTests = function() {
  console.log("Inserting TestCol with hooks...");
  first_id = TestCol.insert({ test: 1 })
  console.log("First TestCol id: ", first_id);
  
  console.log("Inserting TestCol withOUT hooks...");
  second_id = TestCol.direct.insert({ test: 2 })
  console.log("Second TestCol id: ", second_id);
  
  console.log("TestCol count should be 2, but is: ", TestCol.find().count());
  
  console.log("Updating TestCol with hooks...");
  testcol = TestCol.update(first_id, { test: 1, updates: 1 })
  console.log("Updated TestCol: ", testcol);
  
  console.log("Updating TestCol withOUT hooks...");
  testcol = TestCol.direct.update(first_id, { test: 1, updates: 2 })
  console.log("Updated TestCol: ", testcol);

  console.log("Removing TestCol withOUT hooks...");
  removed_testcol = TestCol.direct.remove(first_id)
  console.log("Removed TestCol: ", removed_testcol);
  
  removed_testcol = TestCol.remove(first_id)
  console.log("Removed TestCol: ", removed_testcol);
  
}

// 
// Client and Server interaction to run above tests
// 
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to collection-hooks-test.";
  };

  Template.hello.events({
    'click #clientSideTest': function () {
      executeTests()
    },

    'click #serverSideTest': function () {
      Meteor.call('runServerTest')
    }
  });
}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    // Clear out DB
    TestCol.remove({});
  })
  
  Meteor.methods({
    runServerTest: function() {
      console.log("Executing tests on server...")
      executeTests()
    }
  });
}
