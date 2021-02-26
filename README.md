# ember-destroying-bug

Minimal reproduction of an issue upgrading ember from `3.19` to `3.20`.

To see the problem:
* `git clone <repository-url>` this repository
* `cd ember-destroying-bug`
* `npm install`
* `ember test`

The test fails due to the following assertion failing:
```
You looked up the 'parent' relationship on a 'child' with id 1 but some of the associated records
were not loaded. Either make sure they are all loaded together with the parent record, or specify
that the relationship is async (`belongsTo({ async: true })`)
```

While that assertion is from ember data it's upgrading `ember-source` from `3.19` to `3.20` that introduces the problem.

The code includes some logging which seems to suggest the following is happening:
* The test runs and the single assertion passes.
* The teardown of the test/app takes place which includes the models being destroyed.
* The getter in `controllers/application.js` recomputes.
* As the getter attempts to access the `belongsTo` relationship, and the `parent` model has been destroyed, an Ember Data assertion fails.

There’s a few ways to prevent the error / test failure:
* Downgrade `ember-source` to `3.19`.
* Remove the `belongsTo` relationship from the `parent` model.
* Remove the `this.name` arg being passed to the `dummy-modifier` in the application template.
