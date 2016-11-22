# Energy Star Rater Pro - Common UI

To include the Common UI in a project, add:


"epahomeratingapp-ui": "git+https://github.com/icf-jheinrichs/epahomeratingapp-ui.git"


... to devDependancies.

Add  `import ComponentsModule from 'epahomeratingapp-ui';` to your webpack entry file.


To run the UI preview site, you will need to run CouchDB, and then:

```
npm install
npm run dev
```

To check for TODO items, run:

```
npm run todo:client
```


To lint the UI, run:

```
npm run lint:client
```
