export const test_Data = {
  listOfObjects: [{ item: 'object_1' }, { item: 'object_2' }],
  objectOfLists: { list_1: [{ item: 'object_1' }] },
  mapOfObjects: new Map([['object_1', { item: 'object_1' }]]),
  objectOfPrimitives: {
    int: 1,
    bool: true,
    lost: undefined as unknown,
    text: 'primitive_1',
  },
  objectOfObjects: {
    object_1: { item: 'object_1' },
    object_2: { item: 'object_2' },
  },
};

export const test_Results = {
  listOfObjects: [{ item: 'object_1' }, { item: 'object_2' }],
  objectOfLists: {
    list_1: [{ item: 'object_1' }],
    list_2: ['potato', 'tomato'],
  },
  mapOfObjects: new Map([
    ['object_1', { item: 'object_1' }],
    ['object_2', { item: 'object_2' }],
  ]),
  objectOfPrimitives: {
    int: 2,
    bool: false,
    lost: false,
    text: 'potato',
  },
  objectOfObjects: {
    object_1: { item: 'object_1' },
    object_2: { item: 'object_2' },
    object_3: { item: 'object_3', addendum: 'addendum_3' },
  },
};

export const test_DataPaths = {
  listOfObjects: [{ item: 'object_1' }],
  'objectOfLists.list_1': [{ item: 'object_1' }],
  mapOfObjects: new Map<string, { item: string }>([['object_1', { item: 'object_1' }]]),
  'objectOfPrimitives.int': 1,
  'objectOfPrimitives.bool': true,
  'objectOfPrimitives.lost': undefined,
  'objectOfPrimitives.text': 'primitive_1',
  'objectOfObjects.object_1.item': 'object_1',
  'objectOfObjects.object_2.item': 'object_2',
};
export const test_PathsResults = {
  listOfObjects: [{ item: 'object_1' }, { item: 'object_2' }],
  'objectOfLists.list_1': [{ item: 'object_1' }, { item: 'object_2' }],
  'objectOfLists.list_2': ['potato', 'tomato'],
  mapOfObjects: new Map<string, { item: string }>([
    ['object_1', { item: 'object_1' }],
    ['object_2', { item: 'object_2' }],
  ]),
  'objectOfPrimitives.int': 2,
  'objectOfPrimitives.bool': false,
  'objectOfPrimitives.lost': false,
  'objectOfPrimitives.text': 'potato',
  'objectOfObjects.object_1.item': 'object_1',
  'objectOfObjects.object_2.item': 'object_2',
  'objectOfObjects.object_3.item': 'object_3',
  'objectOfObjects.object_3.addendum': 'addendum_3',
};
