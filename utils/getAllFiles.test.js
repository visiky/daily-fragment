const getFiles = require('./getAllFiles');

describe('test the method of getAllFiles', () => {
  test('1. ', () => {
    const files = getFiles('debug-dev', /debug-dev\/\w+\.ts$/);
    expect(files).toEqual(['index', 'webgl_geometries' ]);
  });
});