import { source } from '../src/lib/source';
import { test_Data, test_Results } from './mocks';

type S = typeof test_Data;

describe('Test source', () => {
  const resource = source(test_Data);

  const select = {
    listOfObjects: (src: S) => src.listOfObjects,
    'listOfObjects[0]': (src: S) => src.listOfObjects[0],
    'listOfObjects[0].item': (src: S) => src.listOfObjects[0].item,
    "listOfObjects[0]['item']": (src: S) => src.listOfObjects[0]['item'],
    'listOfObjects.find("object_1")': (src: S) =>
      src.listOfObjects.find((o) => o.item === 'object_1'),

    mapOfObjects: (src: S) => src.mapOfObjects,
    "mapOfObjects.get('object_1')": (src: S) =>
      src.mapOfObjects.get('object_1'),
    "mapOfObjects.get('object_1')?.item": (src: S) =>
      src.mapOfObjects.get('object_1')?.item,
    "mapOfObjects.get('object_1')?.['item']": (src: S) =>
      src.mapOfObjects.get('object_1')?.['item'],

    objectOfLists: (src: S) => src.objectOfLists,
    "objectOfLists['list_1']": (src: S) => src.objectOfLists['list_1'],
    "objectOfLists['list_1'][0]": (src: S) => src.objectOfLists['list_1'][0],
    "objectOfLists['list_1'][0].item": (src: S) =>
      src.objectOfLists['list_1'][0].item,
    "objectOfLists['list_1'][0]['item']": (src: S) =>
      src.objectOfLists['list_1'][0]['item'],

    objectOfObjects: (src: S) => src.objectOfObjects,
    'objectOfObjects.object_1': (src: S) => src.objectOfObjects.object_1,
    "objectOfObjects['object_2']": (src: S) => src.objectOfObjects['object_2'],
    "objectOfObjects.object_1['item']": (src: S) =>
      src.objectOfObjects.object_1['item'],
    "objectOfObjects['object_2'].item": (src: S) =>
      src.objectOfObjects['object_2'].item,

    objectOfPrimitives: (src: S) => src.objectOfPrimitives,
    'objectOfPrimitives.bool': (src: S) => src.objectOfPrimitives.bool,
    "objectOfPrimitives['lost']": (src: S) => src.objectOfPrimitives['lost'],
  };

  describe(`Test source.read(*)`, () => {
    describe(`Test 'listOfObjects'`, () => {
      it(`should read with selector 'listOfObjects'`, () => {
        const result = resource.read(select.listOfObjects);
        expect(result).toEqual(test_Data.listOfObjects);
      });
      it(`should read with selector 'listOfObjects[0]'`, () => {
        const result = resource.read(select['listOfObjects[0]']);
        expect(result).toEqual(test_Data.listOfObjects[0]);
      });
      it(`should read with selector 'listOfObjects[0].item'`, () => {
        const result = resource.read(select['listOfObjects[0].item']);
        expect(result).toEqual(test_Data.listOfObjects[0].item);
      });
      it(`should read with selector 'listOfObjects[0]['item']'`, () => {
        const result = resource.read(select["listOfObjects[0]['item']"]);
        expect(result).toEqual(test_Data.listOfObjects[0]['item']);
      });
      it(`should read with selector 'listOfObjects[0].find("object_1")'`, () => {
        const result = resource.read(select['listOfObjects.find("object_1")']);
        expect(result).toEqual(test_Data.listOfObjects[0]);
      });
    });

    describe(`Test 'mapOfObjects'`, () => {
      it(`should read with selector 'mapOfObjects'`, () => {
        const result = resource.read(select.mapOfObjects);
        expect(result).toEqual(test_Data.mapOfObjects);
      });
      it(`should read with selector 'mapOfObjects.get('object_1')'`, () => {
        const result = resource.read(select["mapOfObjects.get('object_1')"]);
        expect(result).toEqual(test_Data.mapOfObjects.get('object_1'));
      });
      it(`should read with selector 'mapOfObjects.get('object_1')?.item'`, () => {
        const result = resource.read(
          select["mapOfObjects.get('object_1')?.item"]
        );
        expect(result).toEqual(test_Data.mapOfObjects.get('object_1')?.item);
      });
      it(`should read with selector 'mapOfObjects.get('object_1')?.['item']'`, () => {
        const result = resource.read(
          select["mapOfObjects.get('object_1')?.['item']"]
        );
        expect(result).toEqual(
          test_Data.mapOfObjects.get('object_1')?.['item']
        );
      });
    });

    describe(`Test 'objectOfLists'`, () => {
      it(`should read with selector 'objectOfLists'`, () => {
        const result = resource.read(select.objectOfLists);
        expect(result).toEqual(test_Data.objectOfLists);
      });
      it(`should read with selector 'objectOfLists['list_1']'`, () => {
        const result = resource.read(select["objectOfLists['list_1']"]);
        expect(result).toEqual(test_Data.objectOfLists['list_1']);
      });
      it(`should read with selector 'objectOfLists['list_1'][0]'`, () => {
        const result = resource.read(select["objectOfLists['list_1'][0]"]);
        expect(result).toEqual(test_Data.objectOfLists['list_1'][0]);
      });
      it(`should read with selector 'objectOfLists['list_1'][0].item'`, () => {
        const result = resource.read(select["objectOfLists['list_1'][0].item"]);
        expect(result).toEqual(test_Data.objectOfLists['list_1'][0].item);
      });
      it(`should read with selector 'objectOfLists['list_1'][0]['item']'`, () => {
        const result = resource.read(
          select["objectOfLists['list_1'][0]['item']"]
        );
        expect(result).toEqual(test_Data.objectOfLists['list_1'][0]['item']);
      });
    });

    describe(`Test 'objectOfObjects'`, () => {
      it(`should read with selector 'objectOfObjects'`, () => {
        const result = resource.read(select.objectOfObjects);
        expect(result).toEqual(test_Data.objectOfObjects);
      });
      it(`should read with selector 'objectOfObjects.object_1'`, () => {
        const result = resource.read(select['objectOfObjects.object_1']);
        expect(result).toEqual(test_Data.objectOfObjects.object_1);
      });
      it(`should read with selector 'objectOfObjects.object_1['item']'`, () => {
        const result = resource.read(
          select["objectOfObjects.object_1['item']"]
        );
        expect(result).toEqual(test_Data.objectOfObjects.object_1['item']);
      });
      it(`should read with selector 'objectOfObjects['object_2']'`, () => {
        const result = resource.read(select["objectOfObjects['object_2']"]);
        expect(result).toEqual(test_Data.objectOfObjects['object_2']);
      });
      it(`should read with selector 'objectOfObjects['object_2'].item'`, () => {
        const result = resource.read(
          select["objectOfObjects['object_2'].item"]
        );
        expect(result).toEqual(test_Data.objectOfObjects['object_2'].item);
      });
    });

    describe(`Test 'objectOfPrimitives'`, () => {
      it(`should read with selector 'objectOfPrimitives'`, () => {
        const result = resource.read(select.objectOfPrimitives);
        expect(result).toEqual(test_Data.objectOfPrimitives);
      });
      it(`should read with selector 'objectOfPrimitives.bool'`, () => {
        const result = resource.read(select['objectOfPrimitives.bool']);
        expect(result).toEqual(test_Data.objectOfPrimitives.bool);
      });
      it(`should read with selector 'objectOfPrimitives['lost']'`, () => {
        const result = resource.read(select["objectOfPrimitives['lost']"]);
        expect(result).toEqual(test_Data.objectOfPrimitives['lost']);
      });
    });
  });

  describe(`Test source.write(*)`, () => {
    afterEach(() => {
      resource.write((src) => src, test_Data);
    });
    describe(`Test 'listOfObjects'`, () => {
      it(`should write 'test_Results.listOfObjects' with selector 'listOfObjects'`, () => {
        resource.write(select.listOfObjects, test_Results.listOfObjects);
        expect(resource.read(select.listOfObjects)).toEqual(
          test_Results.listOfObjects
        );
      });
    });

    describe(`Test 'mapOfObjects'`, () => {
      it(`should write 'test_Results.mapOfObjects' with selector 'mapOfObjects'`, () => {
        resource.write(select.mapOfObjects, test_Results.mapOfObjects);
        expect(resource.read(select.mapOfObjects)).toEqual(
          test_Results.mapOfObjects
        );
      });
    });

    describe(`Test 'objectOfLists'`, () => {
      it(`should write 'test_Results.objectOfLists' with selector 'objectOfLists'`, () => {
        resource.write(select.objectOfLists, test_Results.objectOfLists);
        expect(resource.read(select.objectOfLists)).toEqual(
          test_Results.objectOfLists
        );
      });
    });

    describe(`Test 'objectOfObjects'`, () => {
      it(`should write 'test_Results.objectOfObjects' with selector 'objectOfObjects'`, () => {
        resource.write(select.objectOfObjects, test_Results.objectOfObjects);
        expect(resource.read(select.objectOfObjects)).toEqual(
          test_Results.objectOfObjects
        );
      });
    });

    describe(`Test 'objectOfPrimitives'`, () => {
      it(`should write 'test_Results.objectOfPrimitives' with selector 'objectOfPrimitives'`, () => {
        resource.write(
          select.objectOfPrimitives,
          test_Results.objectOfPrimitives
        );
        expect(resource.read(select.objectOfPrimitives)).toEqual(
          test_Results.objectOfPrimitives
        );
      });
      it(`should write '2' with selector`, () => {
        resource.write(select.objectOfPrimitives, { int: 2 });
        expect(resource.read((src) => src.objectOfPrimitives.int)).toEqual(2);
      });
    });
  });
});
