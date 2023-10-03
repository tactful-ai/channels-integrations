import assert from 'assert';
import app from '../..';

describe('"InstagramSettings" service', () => {
  it('registered the service', async () => {
    const service = app.service('InstagramSettings');

    assert.ok(service, 'Registered the service');
  });
});