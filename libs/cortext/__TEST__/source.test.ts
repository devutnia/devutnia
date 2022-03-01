import { test_Data, test_Results } from './mocks';
import { source } from '../src/lib/source';

describe('Test source', () => {
  const resource = source(test_Data);

  describe('Test source.read(*) method', () => {
    it('"read((src) => src)" should return "test_Data"', () => {
      expect(resource.read((src) => src)).toEqual(test_Data);
    });
    it('"read((src) => src.functionOfNone)(1)" should return "1"', () => {
      const result = resource.read((src) => src.functionOfNone)(1);
      expect(result).toEqual(test_Data.objectOfPrimitives.int);
    });
    it('"read((src) => src.functionOfNone(1))" should return "1"', () => {
      const result = resource.read((src) => src.functionOfNone(1));
      expect(result).toEqual(test_Data.objectOfPrimitives.int);
    });
    it('"read((src) => src.listOfObjects)" should return "test_Data.listOfObjects"', () => {
      const result = resource.read((src) => src.listOfObjects);
      expect(result).toEqual(test_Data.listOfObjects);
    });
    it('"read((src) => src.listOfObjects[0])" should return "test_Data.listOfObjects[0]"', () => {
      const result = resource.read((src) => src.listOfObjects[0]);
      expect(result).toEqual(test_Data.listOfObjects[0]);
    });
    it('"read((src) => src.listOfObjects[0].item)" should return "test_Data.listOfObjects[0].item"', () => {
      const result = resource.read((src) => src.listOfObjects[0].item);
      expect(result).toEqual(test_Data.listOfObjects[0].item);
    });
    it('"read((src) => src.mapOfObjects)" should return "test_Data.mapOfObjects"', () => {
      const result = resource.read((src) => src.mapOfObjects);
      expect(result).toEqual(test_Data.mapOfObjects);
    });
    it('"read((src) => src.mapOfObjects.get("object_1"))" should return "test_Data.mapOfObjects.get("object_1")"', () => {
      const result = resource.read((src) => src.mapOfObjects.get('object_1'));
      expect(result).toEqual(test_Data.mapOfObjects.get('object_1'));
    });
    it('"read((src) => src.objectOfLists)" should return "test_Data.objectOfLists"', () => {
      const result = resource.read((src) => src.objectOfLists);
      expect(result).toEqual(test_Data.objectOfLists);
    });
    it('"read((src) => src.objectOfLists.list_1)" should return "test_Data.objectOfLists.list_1"', () => {
      const result = resource.read((src) => src.objectOfLists.list_1);
      expect(result).toEqual(test_Data.objectOfLists.list_1);
    });
    it('"read((src) => src.objectOfLists.list_1[0])" should return "test_Data.objectOfLists.list_1[0]"', () => {
      const result = resource.read((src) => src.objectOfLists.list_1[0]);
      expect(result).toEqual(test_Data.objectOfLists.list_1[0]);
    });
  });

  describe('Test source.write(*) method', () => {
    describe('Test "listOfObjects"', () => {
      it('"write((src) => src.listOfObjects, (data) => data.push({...}))" should return "test_Results.listOfObjects"', () => {
        resource.write(
          (src) => src.listOfObjects,
          (data) => data.push({ item: 'object_2' })
        );
        expect(resource.read((src) => src.listOfObjects)).toEqual(
          test_Results.listOfObjects
        );
        resource.write((src) => src, test_Data);
      });
      it('"write((src) => src.listOfObjects,  [{...}, {...}])" should return "test_Results.listOfObjects"', () => {
        resource.write(
          (src) => src.listOfObjects,
          [{ item: 'object_1' }, { item: 'object_2' }]
        );
        expect(resource.read((src) => src.listOfObjects)).toEqual(
          test_Results.listOfObjects
        );
        resource.write((src) => src, test_Data);
      });
    });

    describe('Test "mapOfObjects"', () => {
      it('"write((src) => src.mapOfObjects, (data) => data.set({...}))" should return "test_Results.mapOfObjects"', () => {
        resource.write(
          (src) => src.mapOfObjects,
          (data) => data.set('object_2', { item: 'object_2' })
        );
        expect(resource.read((src) => src.mapOfObjects)).toEqual(
          test_Results.mapOfObjects
        );
        resource.write((src) => src, test_Data);
      });
      it('"write((src) => src.mapOfObjects, new Map([...]))" should return "test_Results.mapOfObjects"', () => {
        resource.write(
          (src) => src.mapOfObjects,
          new Map([
            ['object_1', { item: 'object_1' }],
            ['object_2', { item: 'object_2' }],
          ])
        );
        expect(resource.read((src) => src.mapOfObjects)).toEqual(
          test_Results.mapOfObjects
        );
        resource.write((src) => src, test_Data);
      });
    });

    describe('Test "objectOfLists"', () => {
      it('"write((src) => src.objectOfLists, (data) => { return {...} }))" should return "test_Results.objectOfLists"', () => {
        resource.write(
          (src) => src.objectOfLists,
          (data) => {
            return { ...data, list_2: ['potato', 'tomato'] };
          }
        );
        expect(resource.read((src) => src.objectOfLists)).toEqual(
          test_Results.objectOfLists
        );
        resource.write((src) => src, test_Data);
      });
      it('"write((src) => src.objectOfLists, {...})" should return "test_Results.objectOfLists"', () => {
        resource.write((src) => src.objectOfLists, {
          list_1: [{ item: 'object_1' }],
          list_2: ['potato', 'tomato'],
        });
        expect(resource.read((src) => src.objectOfLists)).toEqual(
          test_Results.objectOfLists
        );
        resource.write((src) => src, test_Data);
      });
      it('"write((src) => src.objectOfLists.list_2, (data) => return {...})" should return "test_Results.objectOfLists.list_2"', () => {
        resource.write(
          (src) => src.objectOfLists.list_2,
          (data) => (data = ['potato', 'tomato'])
        );
        expect(resource.read((src) => src.objectOfLists.list_2)).toEqual(
          test_Results.objectOfLists.list_2
        );
        resource.write((src) => src, test_Data);
      });
      it('"write((src) => src.objectOfLists.list_2, [...])" should return "test_Results.objectOfLists.list_2"', () => {
        resource.write((src) => src.objectOfLists.list_2, ['potato', 'tomato']);
        expect(resource.read((src) => src.objectOfLists.list_2)).toEqual(
          test_Results.objectOfLists.list_2
        );
        resource.write((src) => src, test_Data);
      });
    });
  });
});
