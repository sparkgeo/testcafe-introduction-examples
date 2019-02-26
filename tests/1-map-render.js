import { Selector } from 'testcafe';

fixture `Leaflet Map - Testing Render`
    .page `http://localhost:3001/sandbox`;

test('The suite loads', async t => {
  // Test code
});

const addMarker = Selector('#addMarker');

test('The marker is visible', async t => {
  await t
  .click(addMarker)
  .expect(Selector('.leaflet-marker-icon').exists)
  .ok('The Leaflet marker must populate')
})

test('The marker image pulls from the correct source', async t => {
  await t
    .click(addMarker)
    .expect(Selector('.leaflet-marker-icon')
    .withAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png'))
    .ok('The marker must come from the proper source')
})
