import { RequestLogger, Selector } from 'testcafe';


fixture`Test network requests for leaflet`
  .page`http://localhost:3001/sandbox`;

const osmLogger = RequestLogger(/\.tile\.openstreetmap\.org/, {
  logRequestHeaders: true,
});


const cycleMapLogger = RequestLogger(/tile\.opencyclemap\.org/, {
  logRequestHeaders: true,
});

const addCycleLayer = Selector('#addCycleLayer');


test.requestHooks(osmLogger)('Test outgoing osm requests on map load...', async t => {
  await t
    .wait(200)
    .expect(osmLogger.count(() => true))
    .gt(5, 'Must request more than 5 tiles from OSM')
})

test.requestHooks(cycleMapLogger)('Test outgoing opencycle requests on layer load', async t => {
  await t
  .click(addCycleLayer)
  .wait(200)
  .expect(cycleMapLogger.count(() => true))
  .gt(5, 'Must request more than 5 tiles from OpenCycleMap')
})
