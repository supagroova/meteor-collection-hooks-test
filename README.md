meteor-collection-hooks-test
============================

Example app showing problems with the collection-hooks .direct implementation

The see the test, run the app with `mrt` to install the collection-hooks package and launch to app. Then click on the two buttons to execute the tests.

The output should show the following:

```
Inserting TestCol with hooks...
TestCol.after.insert hook called!
First TestCol id:  DQ6yqQrPYftQMpMtv

Inserting TestCol withOUT hooks...
Second TestCol id:  function () { [native code] }
TestCol count should be 2, but is:  1

Updating TestCol with hooks...
TestCol.after.update hook called!
Updated TestCol:  1

Updating TestCol withOUT hooks...
Updated TestCol:  function () { [native code] }

Removing TestCol withOUT hooks...
Removed TestCol:  function () { [native code] }

TestCol.after.remove hook called!
Removed TestCol:  1
```

In each example the use of .direct doesn't execute the expected code. Additionally it returns a function.